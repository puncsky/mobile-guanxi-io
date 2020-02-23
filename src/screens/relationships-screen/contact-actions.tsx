import { ActionSheet } from "@ant-design/react-native";
import * as Icon from "@expo/vector-icons";
import { Linking } from "expo";
import * as React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ActiveOpacity } from "../../common/active-opacity";
import { theme } from "../../common/theme";
import i18n from "../../translations";
import { Contact } from "../../types/contact";

export function ContactActions({ item }: { item: Contact }): JSX.Element {
  const styles = getStyles();
  const { emails, phones } = item;
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={ActiveOpacity.value}
        style={styles.actionContainer}
        onPress={() => {
          sendEmail(emails);
        }}
      >
        <Icon.Zocial name="email" size={28} color={theme.primary} />
        <Text style={styles.actionTitle}>email</Text>
      </TouchableOpacity>
      <View style={styles.separator} />
      <TouchableOpacity
        activeOpacity={ActiveOpacity.value}
        style={styles.actionContainer}
        onPress={() => {
          call(phones);
        }}
      >
        <Icon.Zocial name="call" size={28} color={theme.primary} />
        <Text style={styles.actionTitle}>call</Text>
      </TouchableOpacity>
      <View
        style={{ height: 60, width: 1, backgroundColor: theme.separator }}
      />
      <TouchableOpacity
        activeOpacity={ActiveOpacity.value}
        style={styles.actionContainer}
        onPress={() => {
          sendMessage(phones);
        }}
      >
        <Icon.AntDesign name="message1" size={28} color={theme.primary} />
        <Text style={styles.actionTitle}>message</Text>
      </TouchableOpacity>
    </View>
  );
}

const sendEmail = (emails: Array<string>) => {
  if (emails.length === 0) {
    return;
  }
  const buttons = emails.map(email => email);
  buttons.push(i18n.t("cancel"));
  ActionSheet.showActionSheetWithOptions(
    {
      title: i18n.t("sendEmail"),
      options: buttons,
      cancelButtonIndex: buttons.length - 1
    },
    async buttonIndex => {
      if (buttonIndex < emails.length) {
        await Linking.openURL(`mailto:${emails[buttonIndex]}`);
      }
    }
  );
};

const call = (phones: Array<string>) => {
  if (phones.length === 0) {
    return;
  }
  const buttons = phones.map(phone => phone);
  buttons.push(i18n.t("cancel"));
  ActionSheet.showActionSheetWithOptions(
    {
      title: i18n.t("call"),
      options: buttons,
      cancelButtonIndex: buttons.length - 1
    },
    async buttonIndex => {
      if (buttonIndex < phones.length) {
        await Linking.openURL(`tel:${phones[buttonIndex]}`);
      }
    }
  );
};

const sendMessage = (phones: Array<string>) => {
  if (phones.length === 0) {
    return;
  }
  const buttons = phones.map(phone => phone);
  buttons.push(i18n.t("cancel"));
  ActionSheet.showActionSheetWithOptions(
    {
      title: i18n.t("sendMsg"),
      options: buttons,
      cancelButtonIndex: buttons.length - 1
    },
    async buttonIndex => {
      if (buttonIndex < phones.length) {
        await Linking.openURL(`sms:${phones[buttonIndex]}`);
      }
    }
  );
};

const getStyles = () =>
  StyleSheet.create({
    container: { flexDirection: "row", height: 60 },
    actionContainer: {
      flex: 1,
      justifyContent: "space-between",
      alignItems: "center"
    },
    actionTitle: { fontSize: 14, color: theme.primary },
    separator: { height: 60, width: 1, backgroundColor: theme.separator }
  });
