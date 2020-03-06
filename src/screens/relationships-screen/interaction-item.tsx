import {
  DatePickerView,
  Modal,
  TextareaItem,
  Toast
} from "@ant-design/react-native";
// @ts-ignore
import * as Icon from "@expo/vector-icons";
import moment from "moment";
import * as React from "react";
import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { ActiveOpacity } from "../../common/active-opacity";
import { apolloClient } from "../../common/apollo-client";
import {
  DELETE_NOTE,
  GET_INTERACTIONS,
  UPSERT_INTERACTION
} from "../../common/gqls";
import { theme } from "../../common/theme";
import i18n from "../../translations";
import { Interaction } from "../../types/interactions";

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
  const [isPublic, setPublic] = useState(item.public);
  const [content, setContent] = useState(item.content);
  const [timestamp, setTimestamp] = useState(item.timestamp);
  const [showDatePicker, setShowDatePicker] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.timestamp}>
        {moment(item.timestamp).format("YYYY-MM-DD HH:mm")}
      </Text>
      <Text style={styles.content}>{item.content}</Text>
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
      <Modal
        popup
        visible={editModalVisible}
        animationType="slide-up"
        onClose={() => {
          setEditModalVisible(false);
        }}
      >
        <View style={styles.modalViewContainer}>
          <View style={styles.timestampContainer}>
            <Text style={styles.timestamp}>
              {moment(timestamp).format("YYYY-MM-DD HH:mm")}
            </Text>
            <TouchableOpacity
              activeOpacity={ActiveOpacity.value}
              style={styles.reselectButton}
              onPress={() => {
                setShowDatePicker(!showDatePicker);
              }}
            >
              <Text style={styles.reselectText}>
                {showDatePicker ? i18n.t("confirm") : i18n.t("reSelect")}
              </Text>
            </TouchableOpacity>
          </View>
          {showDatePicker && (
            <DatePickerView
              mode="datetime"
              value={new Date(timestamp)}
              onChange={d => {
                setTimestamp(d);
              }}
            />
          )}
          <TextareaItem
            rows={4}
            placeholderTextColor={theme.black80}
            placeholder={i18n.t("noteHolder")}
            style={styles.contentTextArea}
            value={content}
            onChange={txt => {
              setContent(txt ? txt : "");
            }}
          />
          <View style={styles.openContainer}>
            <Text style={styles.openText}>{i18n.t("open")}</Text>
            <Switch
              value={isPublic}
              onValueChange={value => {
                setPublic(value);
              }}
            />
          </View>
          <View style={styles.bottomButtons}>
            <TouchableOpacity
              activeOpacity={ActiveOpacity.value}
              style={styles.button}
              onPress={() => {
                setEditModalVisible(false);
              }}
            >
              <Icon.MaterialIcons
                name="cancel"
                size={29}
                color={theme.information}
              />
              <Text
                style={[
                  styles.buttonText,
                  { color: theme.information, fontSize: 16 }
                ]}
              >
                {i18n.t("cancel")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={ActiveOpacity.value}
              style={styles.button}
              onPress={async () => {
                await upsertAction(
                  item,
                  contactId,
                  isSelf,
                  content,
                  timestamp,
                  isPublic,
                  setEditModalVisible
                );
              }}
            >
              <Icon.MaterialIcons
                name="check-circle"
                size={29}
                color={theme.success}
              />
              <Text
                style={[
                  styles.buttonText,
                  { color: theme.success, fontSize: 16 }
                ]}
              >
                {i18n.t("confirm")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

async function upsertAction(
  item: Interaction,
  contactId: string,
  isSelf: boolean,
  content: string,
  timestamp: Date,
  isPublic: boolean,
  callback: Function
): Promise<void> {
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
  const variables = {
    upsertInteraction: {
      id: item.id,
      content,
      timestamp: new Date(timestamp),
      relatedHumans: [],
      public: isPublic
    }
  };

  try {
    const resp = await apolloClient.mutate({
      mutation: UPSERT_INTERACTION,
      variables,
      refetchQueries
    });
    if (resp.data.upsertInteraction) {
      Toast.success(i18n.t("upsertSuccess"), 2, () => {
        callback(false);
      });
    }
  } catch (error) {
    // tslint:disable-next-line
    window.console.error(`failed to  upsert interaction node: ${error}`);
  }
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
      marginTop: 5,
      fontWeight: "bold"
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
    },
    modalViewContainer: {
      paddingBottom: 50,
      paddingTop: 20,
      paddingHorizontal: 20,
      backgroundColor: theme.white
    },
    timestampContainer: { flexDirection: "row", alignItems: "center" },
    reselectButton: {
      marginRight: 5,
      paddingHorizontal: 10,
      paddingVertical: 3
    },
    reselectText: { fontSize: 16, color: theme.primary },
    contentTextArea: {
      padding: 5,
      borderWidth: 1,
      borderColor: theme.separator,
      backgroundColor: theme.white,
      color: theme.text01,
      borderRadius: 5,
      marginTop: 10
    },
    openContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 10
    },
    openText: { fontSize: 16, color: theme.text01, marginRight: 10 }
  });
