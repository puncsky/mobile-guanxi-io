import * as Icon from "@expo/vector-icons";
import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { theme } from "../../common/theme";

export function ReminderTimer({
  dateText,
  dayText
}: {
  dateText: String;
  dayText: String;
}): JSX.Element {
  const styles = getStyles();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{dateText}</Text>
      <Icon.Ionicons
        name="ios-timer"
        size={15}
        color={theme.black80}
        style={styles.icon}
      />
      <Text style={styles.text}>{dayText}</Text>
    </View>
  );
}

const getStyles = () =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center"
    },
    text: { color: theme.black80, fontSize: 14 },
    icon: { marginHorizontal: 5 }
  });
