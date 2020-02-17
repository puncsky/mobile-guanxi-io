import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator
} from "react-navigation";

import { DebugScreen } from "../../screens/debug-screen/debug-screen";
import { HomeScreen } from "../../screens/home-screen";
import { ArticlesByTagScreen } from "../../screens/playbook-screen/articles-by-tag-screen";
import { BriefCommentScreen } from "../../screens/playbook-screen/brief-comment-screen";
import { OriginalLinkScreen } from "../../screens/playbook-screen/orginal-link-screen";
import { PlaybookScreen } from "../../screens/playbook-screen/playbook-screen";
import { RelationshipsScreen } from "../../screens/relationships-screen/relationships-screen";
import { MainTabNavigator } from "./main-tab-navigator";

import { ContactDetailScreen } from "../../screens/relationships-screen/contact-detail-screen";

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
    ArticlesByTag: ArticlesByTagScreen,
    ContactDetail: ContactDetailScreen,
    Debug: DebugScreen,
    HomeDebug: HomeScreen,
    RelationshipsDebug: RelationshipsScreen,
    PlaybookDebug: PlaybookScreen
  },
  {
    headerMode: "none"
  }
);

export const AppNavigator = createAppContainer(AppRoot);
