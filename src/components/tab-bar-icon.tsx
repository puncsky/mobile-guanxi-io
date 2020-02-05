import * as Icon from "@expo/vector-icons";
import * as React from "react";
import { connect } from "react-redux";
import { theme } from "../common/theme";
interface Props {
  name: string;
  focused: boolean;
}

export const TabBarIcon = connect(() => ({}))(
  class TabBarIconInner extends React.Component<Props> {
    public render(): JSX.Element {
      const { focused, name } = this.props;
      const color = focused ? theme.tabIconSelected : theme.tabIconDefault;
      return (
        <Icon.Ionicons
          name={name}
          size={26}
          style={{ marginBottom: -3 }}
          color={color}
        />
      );
    }
  }
);
