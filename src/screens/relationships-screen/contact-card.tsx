import * as React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { theme } from "../../common/theme";
import { Contact } from "./relationships-screen";

export function ContactCard({ item }: { item: Contact }): JSX.Element {
  const styles = getStyles();
  return (
    <View style={styles.contactCard}>
      {item.avatarUrl ? (
        <Image style={styles.avatar} source={{ uri: item.avatarUrl }} />
      ) : (
        <View style={styles.avatar} />
      )}

      <View style={styles.right}>
        <Text style={styles.name}>{item.name}</Text>
        <Text>{firstOne(item.emails) || firstOne(item.phones)}</Text>
      </View>
    </View>
  );
}

function firstOne(str: string): string {
  return String(str).split(",")[0];
}

const getStyles = () =>
  StyleSheet.create({
    contactCard: {
      flex: 1,
      flexDirection: "row",
      margin: 4,
      padding: 8,
      backgroundColor: theme.white
    },
    avatar: { width: 50, height: 50, backgroundColor: theme.black10 },
    name: { fontSize: 20, fontWeight: "bold" },
    right: { marginLeft: 8 }
  });
