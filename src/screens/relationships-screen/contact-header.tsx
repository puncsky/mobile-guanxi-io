import * as React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { theme } from "../../common/theme";
import { Contact } from "../../types/contact";

export function ContactHeader({ item }: { item: Contact }): JSX.Element {
  const styles = getStyles();
  return (
    <View style={{ flexDirection: "row" }}>
      {item.avatarUrl ? (
        <Image style={styles.avatar} source={{ uri: item.avatarUrl }} />
      ) : (
        <View style={styles.nameCircleBg}>
          <Text style={styles.nameTextInCircle}>
            {letterFirstUpper(item.name)}
          </Text>
        </View>
      )}
      <View style={styles.nameMailContainer}>
        <Text style={styles.nameText}>{item.name}</Text>
        <Text style={styles.mailText}>
          {firstOne(item.emails) || firstOne(item.phones)}
        </Text>
      </View>
    </View>
  );
}

function firstOne(strs: Array<string>): string {
  return strs.length > 0 ? strs[0] : "";
}

function letterFirstUpper(str: string): string {
  return String(str)
    .split(" ")
    .map((letter: string) => letter.toUpperCase().substring(0, 1))
    .join(" ");
}

const getStyles = () =>
  StyleSheet.create({
    avatar: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: theme.black10
    },
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
    }
  });
