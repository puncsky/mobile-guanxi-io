import * as Icon from "@expo/vector-icons";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import * as React from "react";
import { connect } from "react-redux";
import { actionUpdateReduxState } from "./common/root-reducer";
import { AppState } from "./common/store";
import { setTheme, theme } from "./common/theme";
import i18n from "./translations";

export function AppLoaderRoot({ onFinish }: { onFinish(): void }): JSX.Element {
  return <AppLoadingContainer onFinish={onFinish} />;
}

interface Props {
  onFinish(): void;
  mixpanelId?: string;
  userId?: string;
  locale?: string;
  currentTheme?: "dark" | "light";
}

const AppLoadingContainer = connect(
  (state: AppState) => ({
    userId: state.base.userId,
    mixpanelId: state.base.mixpanelId,
    locale: state.base.locale,
    currentTheme: state.base.currentTheme
  }),
  dispatch => ({
    actionUpdateReduxState(payload: Object): void {
      dispatch(actionUpdateReduxState(payload));
    }
  })
)(function AppLoadingInner(props: Props): JSX.Element {
  const { locale, onFinish, currentTheme } = props;

  if (locale) {
    i18n.locale = locale;
  }

  if (currentTheme !== theme.name) {
    setTheme(currentTheme);
  }

  const loadResourcesAsync = async () => {
    try {
      await Promise.all([
        Font.loadAsync({
          // This is the font that we are using for our tab bar
          ...Icon.Ionicons.font
        }),
        Font.loadAsync(
          "antoutline",
          require("../node_modules/@ant-design/icons-react-native/fonts/antoutline.ttf")
        )
      ]);
    } catch (error) {
      // tslint:disable-next-line
      console.error(`failed to loadResourcesAsync: ${error}`);
    }
  };

  const handleLoadingError = (error: Error) => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  return (
    <AppLoading
      startAsync={loadResourcesAsync}
      onError={handleLoadingError}
      onFinish={onFinish}
      autoHideSplash={false}
    />
  );
});
