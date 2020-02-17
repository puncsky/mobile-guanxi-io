import * as Icon from "@expo/vector-icons";
import * as React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Constants } from "../../common/constants";
import { theme } from "../../common/theme";

export function ContactActions(): JSX.Element {
  const styles = getStyles();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={Constants.activeOpacity}
        style={styles.actionContainer}
      >
        <Icon.Zocial name="email" size={28} color={theme.primary} />
        <Text style={styles.actionTitle}>email</Text>
      </TouchableOpacity>
      <View style={styles.separator} />
      <TouchableOpacity
        activeOpacity={Constants.activeOpacity}
        style={styles.actionContainer}
      >
        <Icon.Zocial name="call" size={28} color={theme.primary} />
        <Text style={styles.actionTitle}>call</Text>
      </TouchableOpacity>
      <View
        style={{ height: 60, width: 1, backgroundColor: theme.separator }}
      />
      <TouchableOpacity
        activeOpacity={Constants.activeOpacity}
        style={styles.actionContainer}
      >
        <Icon.AntDesign name="message1" size={28} color={theme.primary} />
        <Text style={styles.actionTitle}>message</Text>
      </TouchableOpacity>
    </View>
  );
}

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
