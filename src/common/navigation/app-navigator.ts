import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator
} from "react-navigation";

import { ArticlesByTagScreen } from "../../screens/playbook-screen/articles-by-tag-screen";
import { BriefCommentScreen } from "../../screens/playbook-screen/brief-comment-screen";
import { OriginalLinkScreen } from "../../screens/playbook-screen/orginal-link-screen";
import { MainTabNavigator } from "./main-tab-navigator";

const RootScreen = createSwitchNavigator({
  Main: MainTabNavigator
});

const AppRoot = createStackNavigator(
  {
    Root: {
      screen: RootScreen,
      navigationOptions: {
        header: null
      }
    },
    BriefComment: BriefCommentScreen,
    OriginalLink: OriginalLinkScreen,
    ArticlesByTag: ArticlesByTagScreen
  },
  {
    headerMode: "none"
  }
);

export const AppNavigator = createAppContainer(AppRoot);
