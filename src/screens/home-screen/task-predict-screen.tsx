import * as React from "react";
import { View } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import { NavigationBar } from "../../common/navigation-bar";
import i18n from "../../translations";

type Props = {
  navigation: NavigationScreenProp<string>;
};

export class TaskPredictScreen extends React.Component<Props> {
  public render(): JSX.Element {
    return (
      <View>
        <NavigationBar title={i18n.t("predict")} showBack />
      </View>
    );
  }
}
