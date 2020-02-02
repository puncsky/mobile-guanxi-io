import * as React from "react";
import { Text } from "react-native";
import { Contact } from "./relationships-screen";

export function ContactSnippet({ contact }: { contact: Contact }): JSX.Element {
  return <Text>{contact.name}</Text>;
}
