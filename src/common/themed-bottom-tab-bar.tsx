import * as React from "react";
import { BottomTabBar } from "react-navigation";
import { connect } from "react-redux";
import { theme } from "./theme";

type Props = {};

export const ThemedBottomTabBar = connect(() => ({}))(
  class ThemedBottomTabBarInner extends React.Component<Props> {
    public render(): JSX.Element {
      return (
        //@ts-ignore
        <BottomTabBar
          {...this.props}
          activeTintColor={theme.activeTintColor}
          inactiveTintColor={theme.inactiveTintColor}
          style={{
            backgroundColor: theme.activeBackgroundColor
          }}
        />
      );
    }
  }
);
