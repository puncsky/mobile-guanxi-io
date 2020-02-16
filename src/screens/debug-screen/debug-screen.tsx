/* tslint:disable:no-any */
import { List } from "@ant-design/react-native";
import * as React from "react";
import { View } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import { connect } from "react-redux";
import { NavigationBar } from "../../common/navigation-bar";
import { theme } from "../../common/theme";
import i18n from "../../translations";

const MockArticle = {
  content:
    "对于一天当中发生的每件事，我们都会有正面或负面的感受和看法。同样，在工作场所也会出现负面情绪，越是压抑，反而会深陷其中。卓越的领导人通常不会压抑负面情绪，而是懂得运用情绪的灵敏度降低负面情绪的影响。有三个方法能帮你提升情绪灵敏度：清楚区分情绪与事实；接受你的想法和情绪；根据你的价值观来行动。",
  date: "2020-02-09T14:42:00.000Z",
  description:
    "工作场所中的负面情绪，越是想减少，却反而越是会深陷其中。卓越的领导人通常不会压抑负面情绪，而是懂得运用情绪的灵敏度降低负面情绪的影响。学会提升自己的情绪灵敏度，你需要做到：清楚区分情绪与事实；接受你的想法和情绪；根据你的价值观来行动。",
  forwardedFor: "https://www.hbrtaiwan.com/article_content_AR0009037.html",
  id: "0-how-to-improve-emotion-sensibility",
  isFave: false,
  tags: ["管理", "情绪"],
  title: "如何提升情绪灵敏度",
  url: "https://guanxi.io/0-how-to-improve-emotion-sensibility",
  visitorCount: 0
};
const Item = List.Item;
const Routers = [
  { title: i18n.t("home"), path: "HomeDebug" },
  { title: i18n.t("links"), path: "RelationshipsDebug" },
  { title: i18n.t("playbook"), path: "PlaybookDebug" },
  { title: "Tag", path: "ArticlesByTag" },
  { title: i18n.t("brief"), path: "BriefComment" },
  { title: i18n.t("originLink"), path: "OriginalLink" }
];

type Props = {
  navigation: NavigationScreenProp<string>;
};

export const DebugScreen = connect(() => {
  return {};
})(
  class DebugScreenInner extends React.Component<Props> {
    public render(): JSX.Element {
      const backgroundColor = {
        backgroundColor: theme.white,
        color: theme.text01
      };
      return (
        <View style={[{ flex: 1 }, backgroundColor]}>
          <NavigationBar title={i18n.t("debug")} showBack />
          <View style={[{ flex: 1 }, backgroundColor]}>
            <List style={backgroundColor}>
              {Routers.map((router, index) => {
                const { navigation } = this.props;
                return (
                  <Item
                    key={`router-${index}`}
                    arrow="horizontal"
                    style={backgroundColor}
                    onPress={() => {
                      navigation.navigate(router.path, { item: MockArticle });
                    }}
                  >
                    {router.title}
                  </Item>
                );
              })}
            </List>
          </View>
        </View>
      );
    }
  }
);
