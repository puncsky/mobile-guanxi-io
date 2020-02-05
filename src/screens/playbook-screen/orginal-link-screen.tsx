// @ts-ignore
import * as React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";
import { NavigationScreenProp } from "react-navigation";
import { connect } from "react-redux";
import { NavigationBar } from "../../common/navigation-bar";
import { theme } from "../../common/theme";
import i18n from "../../translations";
import { Article } from "../../types/article";
import { ThemeProps } from "../../types/theme-props";
import { PayShareButtons } from "./pay-share-buttons";

type Props = {
  item: Article;
  navigation: NavigationScreenProp<string>;
  currentTheme: ThemeProps;
};

type State = {
  isLoading: boolean;
};

export const OriginalLinkScreen = connect(() => ({}))(
  class OriginalLinkScreenInner extends React.Component<Props, State> {
    public state: State = { isLoading: true };

    public render(): JSX.Element {
      const { navigation } = this.props;
      const item = navigation.getParam("item");
      const { forwardedFor } = item;
      const { isLoading } = this.state;

      return (
        <View style={{ flex: 1, backgroundColor: theme.white }}>
          <NavigationBar title={i18n.t("originLink")} showBack />
          <View
            style={{
              flex: 1,
              backgroundColor: theme.white,
              paddingHorizontal: 10
            }}
          >
            <WebView
              showsVerticalScrollIndicator={false}
              source={{ uri: forwardedFor }}
              onLoadStart={() => {
                this.setState({ isLoading: true });
              }}
              onLoadEnd={() => {
                this.setState({ isLoading: false });
              }}
              //@ts-ignore
              useWebKit={true}
            />
            {isLoading && (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={theme.primary} />
              </View>
            )}
          </View>
          <PayShareButtons item={item} navigation={navigation} />
        </View>
      );
    }
  }
);

const styles = StyleSheet.create({
  loadingContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center"
  }
});
