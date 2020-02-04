/* tslint:disable:no-any */
import { Button, Toast } from "@ant-design/react-native";
// @ts-ignore
import * as Icon from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import * as React from "react";
import { Platform, Share, StyleSheet, View } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import { connect } from "react-redux";
import { getEndpoint } from "../../common/request";
import { AppState } from "../../common/store";
import { lightTheme } from "../../common/theme";
import i18n from "../../translations";
import { Article } from "../../types/article";
import { ThemeProps } from "../../types/theme-props";

type Props = {
  item: Article;
  navigation: NavigationScreenProp<string>;
  locale: string;
  currentTheme: ThemeProps;
};

export const PayShareButtons = connect((state: AppState) => ({
  locale: state.base.locale,
  currentTheme: state.base.currentTheme
}))(
  class PayShareButtonsInner extends React.Component<Props> {
    render(): JSX.Element {
      //@ts-ignore
      const { item, navigation, currentTheme } = this.props;
      return (
        <View style={styles.buttonsContainer}>
          {Platform.OS !== "ios" && (
            <Button
              style={styles.circleButton}
              onPress={async () => {
                await WebBrowser.openBrowserAsync(getEndpoint("donate"));
              }}
            >
              <Icon.FontAwesome
                color={currentTheme.theme.white}
                size={24}
                name="dollar"
              />
            </Button>
          )}
          <Button
            style={styles.circleButton}
            onPress={() => {
              Share.share({
                message: `「${item.title}」via ${i18n.t("brand")} for ${
                  Platform.OS === "ios" ? "iOS" : "Android"
                } ${item.url || ""}`
              })
                .then(result => {
                  if (result.action === Share.sharedAction) {
                    if (result.activityType) {
                      // shared with activity type of result.activityType
                    } else {
                      // shared
                    }
                  } else if (result.action === Share.dismissedAction) {
                    // dismissed
                  }
                })
                .catch(_ => {
                  Toast.fail("shareError");
                });
            }}
          >
            <Icon.FontAwesome
              color={currentTheme.theme.white}
              size={24}
              name="share-alt"
            />
          </Button>
          <Button style={styles.circleButton} onPress={() => navigation.pop()}>
            <Icon.FontAwesome
              color={currentTheme.theme.white}
              size={24}
              name="close"
            />
          </Button>
        </View>
      );
    }
  }
);

const styles = StyleSheet.create({
  circleButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: lightTheme.primary,
    marginRight: 10
  },
  buttonsContainer: {
    position: "absolute",
    bottom: 20,
    right: 0,
    height: 60,
    flexDirection: "row",
    alignItems: "center"
  }
});
