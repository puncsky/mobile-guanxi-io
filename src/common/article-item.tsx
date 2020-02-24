import { ActionSheet } from "@ant-design/react-native";
import { Button, Modal, Toast } from "@ant-design/react-native";
// @ts-ignore
import * as Icon from "@expo/vector-icons";
import * as React from "react";
import {
  Image,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import { NavigationScreenProp } from "react-navigation";
import { connect } from "react-redux";
import { LoginWebView } from "../screens/mine-screen/login-web-view";
import i18n from "../translations";
import { Article } from "../types/article";
import { ActiveOpacity } from "./active-opacity";
import { analytics } from "./analytics";
import { apolloClient } from "./apollo-client";
import {
  ADD_FAVES,
  DELETE_FAVES,
  GET_FAVE_ARTICLE,
  GET_IO_ARTICLE
} from "./gqls";
import { getEndpoint } from "./request";
import { AppState } from "./store";
import { theme } from "./theme";
import { TimeUtil } from "./time-util";
const ICON_SIZE = 18;
const ICON_SIZE_SM = 14;

type Props = {
  item: Article;
  navigation: NavigationScreenProp<string>;
  locale: string;
};

type State = {
  faved: boolean | undefined;
  shouldDisplayModal: boolean;
};

export const ArticleItem = connect((state: AppState) => {
  return {
    locale: state.base.locale
  };
})(
  class ArticleItemInner extends React.Component<Props, State> {
    state: State = { faved: undefined, shouldDisplayModal: false };

    public showActionSheet = async () => {
      const { item, navigation } = this.props;
      await analytics.track("tap_tags", { id: item.id });
      const { tags } = item;
      const buttons = tags.map(item => item);
      buttons.push("Cancel");
      ActionSheet.showActionSheetWithOptions(
        {
          title: i18n.t("sheetActionTitle"),
          options: buttons,
          cancelButtonIndex: buttons.length - 1
        },
        buttonIndex => {
          if (buttonIndex < tags.length) {
            const tag = tags[buttonIndex];
            navigation.navigate("ArticlesByTag", { item: { tag, title: tag } });
          }
        }
      );
    };

    public onShare = async () => {
      const { item } = this.props;
      await analytics.track("tap_share", { id: item.id });
      const { title, content, url } = item;
      Share.share({
        // TODO: substring is not accurate for English
        message: `${i18n.t("recommend")}【${title}】 ${content.substring(
          0,
          30
        )}... ${url}`
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
          Toast.fail(i18n.t("shareError"));
        });
    };

    public onNavigateToBriefScreen = async () => {
      const { item, navigation } = this.props;
      await analytics.track("tap_brief", { id: item.id });
      navigation.navigate("BriefComment", { item });
    };

    public onNavigateToLinkScreen = async () => {
      const { item, navigation } = this.props;
      await analytics.track("tap_op", { id: item.id });
      navigation.navigate("OriginalLink", { item });
    };

    public renderBottomButton(
      title: string,
      icon: string,
      onPress?: () => void,
      isSmall?: boolean
    ): JSX.Element {
      const styles = getStyles();
      const fontSize = isSmall ? ICON_SIZE_SM : ICON_SIZE;
      const style = isSmall ? styles.buttonTextSm : styles.buttonText;
      return (
        <TouchableOpacity
          activeOpacity={ActiveOpacity.value}
          style={styles.rowCenter}
          onPress={onPress}
        >
          <Icon.FontAwesome name={icon} size={fontSize} color={theme.black80} />
          <Text style={[style, { color: theme.black80 }]}>{title}</Text>
        </TouchableOpacity>
      );
    }

    public onFavorite = async () => {
      const { item, locale } = this.props;
      const { id } = item;
      await analytics.track("tap_fave", { id });
      let { isFave } = item;
      if (this.state.faved !== undefined) {
        isFave = this.state.faved;
      }
      const mutation = isFave ? DELETE_FAVES : ADD_FAVES;
      try {
        const resp = await apolloClient.mutate({
          mutation,
          variables: {
            id
          },
          refetchQueries: [
            {
              query: GET_FAVE_ARTICLE,
              variables: {
                skip: 0,
                limit: 5
              }
            },
            {
              // TODO: should refactor to re-fetch only one
              query: GET_IO_ARTICLE,
              variables: {
                skip: 0,
                limit: 100,
                locale
              }
            }
          ]
        });
        const faved = isFave
          ? !resp.data.deleteFromFaves
          : resp.data.addToFaves;
        this.setState({ faved });
      } catch (error) {
        if (error.message.indexOf("login") !== -1) {
          this.setState({ shouldDisplayModal: true });
        } else {
          // tslint:disable-next-line
          window.console.error(`failed to add or delete faves: ${error}`);
        }
      }
    };

    private readonly onCloseModal = () => {
      this.setState({ shouldDisplayModal: false });
    };

    // tslint:disable-next-line:max-func-body-length
    public render(): JSX.Element {
      const { item } = this.props;
      const { title, description, forwardedFor, date, visitorCount } = item;

      // TODO(Tian): ignore for now
      // let { isFave } = item;
      // if (this.state.faved !== undefined) {
      //   isFave = this.state.faved;
      // }
      const arrUrls = String(forwardedFor).split("//");
      let formattedUrl;
      try {
        formattedUrl = `${arrUrls[1].substring(0, arrUrls[1].indexOf("/"))}`;
      } catch (e) {
        formattedUrl = getEndpoint("").replace(/(^https:\/\/|\/)/g, "");
      }
      const webIcon = `https://www.google.com/s2/favicons?domain=${formattedUrl}`;
      const shortDate = TimeUtil.getTimeAgo(date);
      const formattedVisitorCount =
        visitorCount === null
          ? 0
          : visitorCount.toString().replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
      const styles = getStyles();
      return (
        <View style={[styles.container, { backgroundColor: theme.white }]}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={{ uri: webIcon }}
                style={styles.leftTopImg}
                resizeMode="contain"
              />
              <Text
                numberOfLines={1}
                style={[styles.leftTopText, { color: theme.linkText }]}
              >
                {formattedUrl}
              </Text>
            </View>
            {/*
            // @ts-ignore: TODO(tian) ignore this for now*/}
            {/*{ this.renderBottomButton(*/}
            {/*  i18n.t("fave"),*/}
            {/*  isFave ? "bookmark" : "bookmark-o",*/}
            {/*  this.onFavorite,*/}
            {/*  true*/}
            {/*)}*/}
          </View>
          <TouchableOpacity
            activeOpacity={1}
            onPress={this.onNavigateToBriefScreen}
          >
            <Text style={[styles.titleText, { color: theme.text01 }]}>
              {title}
            </Text>
            <Text style={[styles.contentText, { color: theme.text01 }]}>
              {description}
            </Text>
            <Text style={[styles.summaryText, { color: theme.text01 }]}>
              {`${shortDate}${
                visitorCount
                  ? ` · ${i18n.t("views")} ${formattedVisitorCount}`
                  : ""
              }`}
            </Text>
          </TouchableOpacity>
          <View
            style={[
              styles.rowCenter,
              { justifyContent: "space-around", marginTop: 8 }
            ]}
          >
            {this.renderBottomButton(
              i18n.t("share"),
              "share-alt",
              this.onShare
            )}
            {this.renderBottomButton(
              i18n.t("brief"),
              "wechat",
              this.onNavigateToBriefScreen
            )}
            {this.renderBottomButton(
              i18n.t("originLink"),
              "link",
              this.onNavigateToLinkScreen
            )}
            {this.renderBottomButton(
              i18n.t("tag"),
              "tags",
              this.showActionSheet
            )}
          </View>

          <Modal
            popup
            transparent={false}
            visible={this.state.shouldDisplayModal}
            animationType="slide-up"
            onClose={this.onCloseModal}
          >
            <LoginWebView onClose={this.onCloseModal} isSignUp={false} />
            <Button
              style={[styles.closeButton, { backgroundColor: theme.primary }]}
              onPress={this.onCloseModal}
            >
              <Text style={[styles.closeText, { color: theme.white }]}>✕</Text>
            </Button>
          </Modal>
        </View>
      );
    }
  }
);

const getStyles = () =>
  StyleSheet.create({
    container: { padding: 20, backgroundColor: theme.white },
    leftTopImg: { height: 16, width: 16, marginRight: 8 },
    leftTopText: { color: theme.linkText, fontSize: 12 },
    rowCenter: { flexDirection: "row", alignItems: "center" },
    titleText: {
      color: theme.text01,
      fontSize: 20,
      marginVertical: 10,
      lineHeight: 24
    },
    contentText: { color: theme.text01, fontSize: 16, lineHeight: 24 },
    summaryText: {
      color: theme.text01,
      fontSize: 14,
      marginVertical: 8
    },
    buttonText: { fontSize: ICON_SIZE, color: theme.primary, marginLeft: 4 },
    buttonTextSm: {
      fontSize: ICON_SIZE_SM,
      color: theme.primary,
      marginLeft: 4
    },
    closeButton: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: theme.primary,
      position: "absolute",
      bottom: 10,
      right: 10
    },
    closeText: {
      color: theme.white,
      fontSize: 24
    }
  });
