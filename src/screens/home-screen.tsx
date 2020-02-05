import * as React from "react";
import { View } from "react-native";
import { NavigationBar } from "../common/navigation-bar";
import i18n from "../translations";

type State = {
  shouldDisplayModal: boolean;
};

export class HomeScreen extends React.Component<{}, State> {
  public state: State = {
    shouldDisplayModal: false
  };

  public render(): JSX.Element {
    return (
      <View>
        <NavigationBar title={i18n.t("home")} />
      </View>
    );
  }
}
