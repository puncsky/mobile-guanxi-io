import * as React from "react";
import { Text } from "react-native";
import { Contact } from "../../types/contact";

export function ContactSnippet({ contact }: { contact: Contact }): JSX.Element {
  return <Text>{contact.name}</Text>;
}
