import * as React from "react";
import { View } from "react-native";
import { WebView } from "react-native-webview";
import { NavigationScreenProp } from "react-navigation";
import { connect } from "react-redux";
import { getHtml, mdit } from "../../common/mdit";
import { NavigationBar } from "../../common/navigation-bar";
import { theme } from "../../common/theme";
import { TimeUtil } from "../../common/time-util";
import i18n from "../../translations";
import { Article } from "../../types/article";
import { ThemeProps } from "../../types/theme-props";
import { PayShareButtons } from "./pay-share-buttons";
type Props = {
  item: Article;
  navigation: NavigationScreenProp<string>;
  currentTheme: ThemeProps;
};

export const BriefCommentScreen = connect(() => ({}))(
  class BriefCommentScreenInner extends React.Component<Props> {
    public render(): JSX.Element {
      const { navigation } = this.props;
      const item = navigation.getParam("item");
      const { title, content, date, visitorCount } = item;
      const shortDate = TimeUtil.getTimeAgo(date);
      const formatedVisitorCount =
        visitorCount === null
          ? 0
          : visitorCount.toString().replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
      const truthyVisitorCount = visitorCount
        ? ` · ${i18n.t("views")} ${formatedVisitorCount}`
        : "";

      const composedContent = `# ${title}

  ${shortDate}${truthyVisitorCount}

  <hr/>

  ${content}

  <br/>
  <br/>
  <br/>
  `;
      const rendered = mdit.render(composedContent);
      const html = getHtml(rendered);
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: theme.white
          }}
        >
          <NavigationBar title={i18n.t("brief")} showBack />
          <View
            style={{
              flex: 1,
              paddingHorizontal: 10,
              backgroundColor: theme.white
            }}
          >
            <WebView
              style={{ backgroundColor: theme.white }}
              showsVerticalScrollIndicator={false}
              source={{
                html
              }}
              //@ts-ignore
              useWebKit={true}
            />
          </View>
          <PayShareButtons item={item} navigation={navigation} />
        </View>
      );
    }
  }
);
