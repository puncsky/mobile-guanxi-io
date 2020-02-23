import * as React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import { ActiveOpacity } from "../../common/active-opacity";
import { theme } from "../../common/theme";
import { Contact } from "../../types/contact";

export function ContactCard({
  item,
  navigation
}: {
  item: Contact;
  navigation: NavigationScreenProp<String>;
}): JSX.Element {
  const styles = getStyles();
  return (
    <TouchableOpacity
      style={styles.contactCard}
      activeOpacity={ActiveOpacity.value}
      onPress={() => {
        navigation.navigate("ContactDetail", { item });
      }}
    >
      {item.avatarUrl ? (
        <Image style={styles.avatar} source={{ uri: item.avatarUrl }} />
      ) : (
        <View style={styles.avatar} />
      )}

      <View style={styles.right}>
        <Text style={styles.name}>{item.name}</Text>
        <Text>{firstOne(item.emails) || firstOne(item.phones)}</Text>
      </View>
    </TouchableOpacity>
  );
}

function firstOne(strs: Array<string>): string {
  return strs.length > 0 ? strs[0] : "";
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
