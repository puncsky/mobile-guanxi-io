import { Button, Icon } from "@ant-design/react-native";
import * as lodash from "lodash";
import * as React from "react";
import { ActivityIndicator, Dimensions, Text, View } from "react-native";
import { connect } from "react-redux";
import i18n from "../translations";
import { theme } from "./theme";

const { width } = Dimensions.get("window");

type SeparatorProps = {};
export const Separator = connect(() => ({}))(
  class SeparatorInner extends React.Component<SeparatorProps> {
    render(): JSX.Element {
      return <View style={{ height: 1, backgroundColor: theme.separator }} />;
    }
  }
);

type EmptyViewProps = {
  info: String;
  callback: Function | undefined;
};

export const EmptyView = connect(() => ({}))(
  class EmptyViewInner extends React.Component<EmptyViewProps> {
    render(): JSX.Element {
      const { info, callback } = this.props;
      return (
        <View
          style={{
            width: "100%",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            minHeight: 100
          }}
        >
          <Text
            onPress={() => {
              if (!lodash.isUndefined(callback)) {
                callback();
              }
            }}
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: theme.primary
            }}
          >
            {info}
          </Text>
        </View>
      );
    }
  }
);

type NetWorkErrorViewProps = {
  info: String;
  callback: Function | undefined;
};

export const NetworkErrorView = connect(() => ({}))(
  class NetworkErrorViewInner extends React.Component<NetWorkErrorViewProps> {
    render(): JSX.Element {
      const { callback, info } = this.props;
      // tslint:disable-next-line:no-console
      console.log(`render network error view: ${info}`);
      const refresh = () => {
        if (!lodash.isUndefined(callback)) {
          callback();
        }
      };
      return (
        <View
          style={{
            width,
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Icon name="api" style={{ fontSize: 96 }} color={theme.black80} />
          <Text onPress={refresh} style={{ margin: 32, color: theme.black80 }}>
            {i18n.t("networkError")}
          </Text>
          <Button type="ghost" onPress={refresh}>
            {i18n.t("refresh")}
          </Button>
        </View>
      );
    }
  }
);

type JustThemeProps = {};
export const LoadingView = connect(() => ({}))(
  class LoadingViewInner extends React.Component<JustThemeProps> {
    render(): JSX.Element {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <ActivityIndicator size="large" color={theme.primary} />
        </View>
      );
    }
  }
);

export const LoadingFinishedFooterView = connect(() => ({}))(
  class LoadingFinishedFooterViewInner extends React.Component<JustThemeProps> {
    render(): JSX.Element {
      return (
        <View
          style={{
            height: 40,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            backgroundColor: theme.white
          }}
        >
          <Text
            style={{
              fontSize: 14,
              color: theme.black80,
              marginLeft: 10
            }}
          >
            {i18n.t("loadingFinished")}
          </Text>
        </View>
      );
    }
  }
);

export const LoadingFooterView = connect(() => ({}))(
  class LoadingFooterViewInner extends React.Component<JustThemeProps> {
    render(): JSX.Element {
      return (
        <View
          style={{
            height: 40,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            backgroundColor: theme.white
          }}
        >
          <ActivityIndicator size="small" color={theme.black80} />
          <Text
            style={{
              fontSize: 14,
              color: theme.black80,
              marginLeft: 10
            }}
          >
            {i18n.t("loading")}
          </Text>
        </View>
      );
    }
  }
);
