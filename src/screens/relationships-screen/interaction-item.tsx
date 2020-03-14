import { Toast } from "@ant-design/react-native";
// @ts-ignore
import * as Icon from "@expo/vector-icons";
import moment from "moment";
import * as React from "react";
import { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AutoHeightWebView from "react-native-autoheight-webview";
import { ActiveOpacity } from "../../common/active-opacity";
import { apolloClient } from "../../common/apollo-client";
import { DELETE_NOTE, GET_INTERACTIONS } from "../../common/gqls";
import { getHtml, mdit } from "../../common/mdit";
import { theme } from "../../common/theme";
import i18n from "../../translations";
import { Interaction } from "../../types/interactions";
import { InteractionModal } from "./interaction-modal";

export function InteractionItem({
  item,
  contactId,
  isSelf
}: {
  item: Interaction;
  contactId: string;
  isSelf: boolean;
}): JSX.Element {
  const styles = getStyles();
  const [editModalVisible, setEditModalVisible] = useState(false);
  return (
    <View style={styles.container}>
      <Text style={styles.timestamp}>
        {moment(item.timestamp).format("YYYY-MM-DD HH:mm")}
      </Text>

      <AutoHeightWebView
        originWhitelist={["*"]}
        style={{ width: "100%" }}
        source={{ html: getHtml(mdit.render(`${item.content}`)) }}
        scalesPageToFit={true}
        scrollEnabledWithZoomedin={false}
        overScrollMode={"never"}
        scrollEnabled={false}
      />
      <View style={styles.bottomButtons}>
        <TouchableOpacity
          activeOpacity={ActiveOpacity.value}
          style={styles.button}
          onPress={() => {
            setEditModalVisible(true);
          }}
        >
          <Icon.AntDesign name="edit" size={19} color={theme.primary} />
          <Text style={styles.buttonText}>{i18n.t("edit")}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={ActiveOpacity.value}
          style={styles.button}
          onPress={() => {
            deleteAction(item, contactId, isSelf);
          }}
        >
          <Icon.AntDesign name="delete" size={19} color={theme.primary} />
          <Text style={styles.buttonText}>{i18n.t("delete")}</Text>
        </TouchableOpacity>
      </View>
      <InteractionModal
        item={item}
        contactId={contactId}
        isSelf={isSelf}
        showModal={editModalVisible}
        onClose={() => {
          setEditModalVisible(false);
        }}
      />
    </View>
  );
}

function deleteAction(
  item: Interaction,
  contactId: string,
  isSelf: boolean
): void {
  const refetchQueries = [
    {
      query: GET_INTERACTIONS,
      variables: {
        offset: 0,
        limit: 5,
        isSelf,
        contactId
      }
    }
  ];
  Alert.alert(
    i18n.t("sureToDelete"),
    "",
    [
      { text: i18n.t("cancel"), style: "cancel" },
      {
        text: i18n.t("confirm"),
        onPress: async () => {
          try {
            const resp = await apolloClient.mutate({
              mutation: DELETE_NOTE,
              variables: {
                id: item.id
              },
              refetchQueries
            });
            if (resp.data.deleteNote) {
              Toast.success(i18n.t("deleteSuccess"));
            }
          } catch (error) {
            // tslint:disable-next-line
            window.console.error(
              `failed to  delete interaction node: ${error}`
            );
          }
        }
      }
    ],
    { cancelable: false }
  );
}

const getStyles = () =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.white,
      paddingVertical: 10,
      paddingHorizontal: 15
    },
    timestamp: { fontSize: 14, color: theme.text01 },
    content: {
      fontSize: 16,
      color: theme.text01,
      marginTop: 8,
      marginBottom: 8
    },
    bottomButtons: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-end"
    },
    button: {
      paddingVertical: 5,
      paddingHorizontal: 10,
      flexDirection: "row",
      alignItems: "center"
    },
    buttonText: {
      fontSize: 14,
      color: theme.primary,
      marginLeft: 5
    }
  });
