// @ts-ignore
import * as Icon from "@expo/vector-icons";
//@ts-ignore
import MarkdownIt from "markdown-it";
//@ts-ignore
import markMiddleware from "markdown-it-mark";
import * as React from "react";
import { View } from "react-native";
import { WebView } from "react-native-webview";
import { NavigationScreenProp } from "react-navigation";
import { connect } from "react-redux";
import { readabilityStyles } from "../../common/readability-styles";
import { AppState } from "../../common/store";
import { TimeUtil } from "../../common/time-util";
import { NavigationBar } from "../../components/navigation-bar";
import i18n from "../../translations";
import { Article } from "../../types/article";
import { ThemeProps } from "../../types/theme-props";
import { PayShareButtons } from "./pay-share-buttons";
type Props = {
  item: Article;
  navigation: NavigationScreenProp<string>;
  currentTheme: ThemeProps;
};

const viewportTag = `<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
${readabilityStyles}`;

function getHtml(content: string): string {
  return `<!doctype html>
<html>

<head>
  <meta charset="utf-8">
  ${viewportTag}
</head>

<body>
<article>
${content}
</article>

  <!-- Google Analytics: change UA-XXXXX-Y to be your site's ID. -->
  <script>
    window.ga = function () { ga.q.push(arguments) }; ga.q = []; ga.l = +new Date;
    ga('create', 'UA-43072488-4', 'auto'); ga('set','transport','beacon'); ga('send', 'pageview')
  </script>
  <script src="https://www.google-analytics.com/analytics.js" async></script>
</body>

</html>`;
}

const mdit = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  breaks: true
}).use(markMiddleware);

export const BriefCommentScreen = connect((state: AppState) => ({
  currentTheme: state.base.currentTheme
}))(
  class BriefCommentScreenInner extends React.Component<Props> {
    public render(): JSX.Element {
      const { navigation, currentTheme } = this.props;
      const item = navigation.getParam("item");
      const { title, content, date, visitorCount } = item;
      const shortDate = TimeUtil.getTimeAgo(date);
      const formatedVisitorCount =
        visitorCount === null
          ? 0
          : visitorCount.toString().replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");

      const composedContent = `# ${title}
  
  ${shortDate} · ${i18n.t("views")} ${formatedVisitorCount}
  
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
            backgroundColor: currentTheme.theme.white
          }}
        >
          <NavigationBar title={i18n.t("brief")} showBack />
          <View
            style={{
              flex: 1,
              paddingHorizontal: 10,
              backgroundColor: currentTheme.theme.white
            }}
          >
            <WebView
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