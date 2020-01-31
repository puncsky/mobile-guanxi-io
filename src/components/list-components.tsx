import { Button, Icon } from "@ant-design/react-native";
import * as lodash from "lodash";
import * as React from "react";
import { ActivityIndicator, Dimensions, Text, View } from "react-native";
import { connect } from "react-redux";
import { AppState } from "../common/store";
import i18n from "../translations";
import { ThemeProps } from "../types/theme-props";

const { width } = Dimensions.get("window");

type SeparatorProps = {
  currentTheme: ThemeProps;
};
export const Separator = connect((state: AppState) => ({
  currentTheme: state.base.currentTheme
}))(
  class SeparatorInner extends React.Component<SeparatorProps> {
    render(): JSX.Element {
      const { currentTheme } = this.props;
      return (
        <View
          style={{ height: 1, backgroundColor: currentTheme.theme.separator }}
        />
      );
    }
  }
);

type EmptyViewProps = {
  currentTheme: ThemeProps;
  info: String;
  callback: Function | undefined;
};

export const EmptyView = connect((state: AppState) => ({
  currentTheme: state.base.currentTheme
}))(
  class EmptyViewInner extends React.Component<EmptyViewProps> {
    render(): JSX.Element {
      const { currentTheme, info, callback } = this.props;
      return (
        <View
          style={{
            width,
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
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
              color: currentTheme.theme.primary
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
  currentTheme: ThemeProps;
  info: String;
  callback: Function | undefined;
};

export const NetworkErrorView = connect((state: AppState) => ({
  currentTheme: state.base.currentTheme
}))(
  class NetworkErrorViewInner extends React.Component<NetWorkErrorViewProps> {
    render(): JSX.Element {
      const { currentTheme, callback, info } = this.props;
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
          <Icon
            name="api"
            style={{ fontSize: 96 }}
            color={currentTheme.theme.black80}
          />
          <Text
            onPress={refresh}
            style={{ margin: 32, color: currentTheme.theme.black80 }}
          >
            {i18n.t("networkError")}
          </Text>
          <Button onPress={refresh}>{i18n.t("refresh")}</Button>
        </View>
      );
    }
  }
);

type JustThemeProps = {
  currentTheme: ThemeProps;
};
export const LoadingView = connect((state: AppState) => ({
  currentTheme: state.base.currentTheme
}))(
  class LoadingViewInner extends React.Component<JustThemeProps> {
    render(): JSX.Element {
      const { currentTheme } = this.props;
      return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <ActivityIndicator size="large" color={currentTheme.theme.primary} />
        </View>
      );
    }
  }
);

export const LoadingFinishedFooterView = connect((state: AppState) => ({
  currentTheme: state.base.currentTheme
}))(
  class LoadingFinishedFooterViewInner extends React.Component<JustThemeProps> {
    render(): JSX.Element {
      const { currentTheme } = this.props;
      return (
        <View
          style={{
            height: 40,
            width,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            backgroundColor: currentTheme.theme.white
          }}
        >
          <Text
            style={{
              fontSize: 14,
              color: currentTheme.theme.black80,
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

export const LoadingFooterView = connect((state: AppState) => ({
  currentTheme: state.base.currentTheme
}))(
  class LoadingFooterViewInner extends React.Component<JustThemeProps> {
    render(): JSX.Element {
      const { currentTheme } = this.props;
      return (
        <View
          style={{
            height: 40,
            width,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            backgroundColor: currentTheme.theme.white
          }}
        >
          <ActivityIndicator size="small" color={currentTheme.theme.black80} />
          <Text
            style={{
              fontSize: 14,
              color: currentTheme.theme.black80,
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
