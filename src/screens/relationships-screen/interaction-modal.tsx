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
import { useEffect, useState } from "react";
import {
  Keyboard,
  Platform,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { ActiveOpacity } from "../../common/active-opacity";
import { apolloClient } from "../../common/apollo-client";
import { GET_INTERACTIONS, UPSERT_INTERACTION } from "../../common/gqls";
import { theme } from "../../common/theme";
import i18n from "../../translations";
import { Interaction } from "../../types/interactions";

export function InteractionModal({
  item,
  contactId,
  isSelf,
  showModal,
  onClose
}: {
  item: Interaction;
  contactId: string;
  isSelf: boolean;
  showModal: boolean;
  onClose: Function;
}): JSX.Element {
  const styles = getStyles();
  const [isPublic, setPublic] = useState(item.public);
  const [content, setContent] = useState(item.content);
  const [timestamp, setTimestamp] = useState(item.timestamp);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const handleShowEvent = (event: KeyboardEvent) => {
    //@ts-ignore
    setKeyboardHeight(event.endCoordinates.height);
  };
  const handleHideEvent = () => {
    setKeyboardHeight(0);
  };
  if (Platform.OS === "ios") {
    useEffect(() => {
      //@ts-ignore
      Keyboard.addListener("keyboardWillShow", handleShowEvent);
      return () => {
        Keyboard.removeListener("keyboardWillShow", handleShowEvent);
      };
    });
    useEffect(() => {
      //@ts-ignore
      Keyboard.addListener("keyboardWillHide", handleHideEvent);
      return () => {
        Keyboard.removeListener("keyboardWillHide", handleHideEvent);
      };
    });
  } else {
    useEffect(() => {
      //@ts-ignore
      Keyboard.addListener("keyboardDidShow", handleShowEvent);
      return () => {
        Keyboard.removeListener("keyboardDidShow", handleShowEvent);
      };
    });
    useEffect(() => {
      //@ts-ignore
      Keyboard.addListener("keyboardDidHide", handleHideEvent);
      return () => {
        Keyboard.removeListener("keyboardDidHide", handleHideEvent);
      };
    });
  }

  return (
    <Modal
      popup
      maskClosable
      visible={showModal}
      animationType="slide-up"
      onClose={() => {
        Keyboard.dismiss();
      }}
    >
      <View
        style={[
          styles.modalViewContainer,
          { paddingBottom: keyboardHeight + 50 }
        ]}
      >
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
              Keyboard.dismiss();
              onClose();
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
                onClose
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
      callback();
      Toast.success(i18n.t("upsertSuccess"));
    }
  } catch (error) {
    // tslint:disable-next-line
    window.console.error(`failed to  upsert interaction node: ${error}`);
  }
}

const getStyles = () =>
  StyleSheet.create({
    timestamp: { fontSize: 14, color: theme.text01 },

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
