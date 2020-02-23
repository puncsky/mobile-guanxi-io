import * as Icon from "@expo/vector-icons";
import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import { connect } from "react-redux";
import { NavigationBar } from "../../common/navigation-bar";
import { theme } from "../../common/theme";
import { ContactActions } from "./contact-actions";
import { ContactHeader } from "./contact-header";
import { ReminderTimer } from "./reminder-timer";
type Props = {
  navigation: NavigationScreenProp<String>;
};

export const ContactDetailScreen = connect(() => {
  return {};
})(
  class ContactDetailScreenInner extends React.Component<Props> {
    public render(): JSX.Element {
      const { navigation } = this.props;
      const contact = navigation.getParam("item");
      const styles = getStyles();
      return (
        <View style={styles.background}>
          <NavigationBar title={contact.name} showBack />
          <View style={[styles.background, styles.pad]}>
            <ContactHeader item={contact} />

            <View style={{ flexDirection: "row", marginTop: 20 }}>
              <View style={[styles.iconCircleBg, { marginRight: 5 }]}>
                <Icon.Ionicons
                  name="logo-twitter"
                  size={20}
                  color={theme.black40}
                />
              </View>
              <View style={styles.iconCircleBg}>
                <Icon.AntDesign name="plus" size={28} color={theme.black40} />
              </View>
              <View style={{ flex: 1 }} />
              <Icon.Ionicons name="md-search" size={32} color={theme.primary} />
            </View>

            <Text style={[styles.primary14Text, { marginTop: 10 }]}>
              1404744502:http://link.gc.apple.com/players/
            </Text>
            <Text style={[styles.primary14Text, { marginBottom: 40 }]}>
              G:1404744502
            </Text>

            <ContactActions item={contact} />

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 40
              }}
            >
              <View style={styles.bgWithBorder}>
                <ReminderTimer dateText="Sun Apr 5" dayText="1D" />
                <View style={styles.smallSeparator} />
                <Icon.AntDesign name="plus" size={15} color={theme.black80} />
              </View>
              <View style={{ flex: 1 }} />
              <View style={[styles.bgWithBorder, { marginRight: 5 }]}>
                <Text style={styles.primary14Text}>Notes</Text>
              </View>
              <View style={styles.bgWithBorder}>
                <Text style={styles.primary14Text}>Tags</Text>
              </View>
            </View>
            <Text style={styles.reminderText}>Reminder</Text>
            <ReminderTimer dateText="Sun Apr 5, 2020" dayText="1D" />
          </View>
        </View>
      );
    }
  }
);

const getStyles = () =>
  StyleSheet.create({
    background: { flex: 1, backgroundColor: theme.white },
    pad: { paddingHorizontal: 15, paddingVertical: 20 },
    nameCircleBg: {
      height: 48,
      width: 48,
      borderRadius: 24,
      backgroundColor: theme.primary,
      justifyContent: "center",
      alignItems: "center"
    },
    nameTextInCircle: { fontSize: 18, fontWeight: "bold", color: theme.white },
    nameText: { color: theme.black, fontSize: 16, fontWeight: "bold" },
    mailText: { color: theme.black, fontSize: 14 },
    nameMailContainer: {
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginLeft: 10
    },
    reminderText: {
      width: "100%",
      marginTop: 20,
      marginBottom: 10,
      fontSize: 18,
      fontWeight: "bold",
      color: theme.black,
      textAlign: "center"
    },
    primary14Text: { color: theme.primary, fontSize: 14 },
    bgWithBorder: {
      height: 40,
      borderRadius: 20,
      borderColor: theme.black40,
      borderWidth: 1,
      paddingHorizontal: 10,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row"
    },
    iconCircleBg: {
      height: 36,
      width: 36,
      borderRadius: 18,
      alignItems: "center",
      justifyContent: "center",
      borderColor: theme.black40,
      borderWidth: 1
    },
    smallSeparator: {
      height: 20,
      width: 1,
      backgroundColor: theme.separator,
      marginHorizontal: 10
    }
  });
