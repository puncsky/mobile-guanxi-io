import * as Icon from "@expo/vector-icons";
import * as React from "react";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ReminderTimer } from "../screens/relationships-screen/reminder-timer";
import i18n from "../translations";
import { theme } from "./theme";

function Reminders(): JSX.Element {
  const styles = getStyles();
  return (
    <View style={styles.bgWithBorder}>
      <ReminderTimer dateText="Sun Apr 5" dayText="1D" />
      <View style={styles.smallSeparator} />
      <Icon.AntDesign name="plus" size={15} color={theme.black80} />
    </View>
  );
}

export function ReminderSetupShortcut(): JSX.Element {
  const styles = getStyles();
  const [showChoices, setShowChoices] = useState(false);
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginTop: 40
      }}
    >
      {showChoices ? (
        <View style={styles.row}>
          <View style={styles.bgWithBorder}>
            <TouchableOpacity
              onPress={() => {
                setShowChoices(false);
              }}
            >
              <Text>×</Text>
            </TouchableOpacity>
          </View>

          <Text>1 M</Text>
          <Text>3 M</Text>
          <Text>6 M</Text>
        </View>
      ) : (
        <View style={styles.bgWithBorder}>
          <TouchableOpacity
            onPress={() => {
              setShowChoices(true);
            }}
          >
            <Text>{i18n.t("setReminder")}</Text>
          </TouchableOpacity>
        </View>
      )}

      <Reminders />

      <View style={{ flex: 1 }} />

      {/*<View style={[styles.bgWithBorder, { marginRight: 5 }]}>*/}
      {/*<Text style={styles.primary14Text}>Notes</Text>*/}
      {/*</View>*/}
      {/*<View style={styles.bgWithBorder}>*/}
      {/*<Text style={styles.primary14Text}>Tags</Text>*/}
      {/*</View>*/}
    </View>
  );
}

const getStyles = () =>
  StyleSheet.create({
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
    smallSeparator: {
      height: 20,
      width: 1,
      backgroundColor: theme.separator,
      marginHorizontal: 10
    },
    row: {
      flexDirection: "row"
    }
  });
