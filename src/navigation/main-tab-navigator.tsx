import * as Haptics from "expo-haptics";
import * as React from "react";
import { Platform } from "react-native";
import {
  createBottomTabNavigator,
  createStackNavigator,
  NavigationScreenProp
} from "react-navigation";
import { ThemedBottomTabBar } from "../components/themed-bottom-tab-bar";

import { TFuncType } from "../types/screen-props";

import { TabBarIcon } from "../components/tab-bar-icon";
import { HomeScreen } from "../screens/home-screen";
import { MineScreen } from "../screens/mine-screen/mine-screen";
import { PlaybookScreen } from "../screens/playbook-screen/playbook-screen";
import { RelationshipsScreen } from "../screens/relationships-screen/relationships-screen";

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen
  },
  {
    headerMode: "none"
  }
);

HomeStack.navigationOptions = ({
  screenProps: { t }
}: {
  screenProps: { t: TFuncType };
}) => ({
  tabBarLabel: t("home"),
  tabBarIcon: ({ focused }: { focused: boolean }) => {
    const name =
      Platform.OS === "ios"
        ? `ios-information-circle${focused ? "" : "-outline"}`
        : "md-information-circle";
    return <TabBarIcon focused={focused} name={name} />;
  },
  tabBarOnPress: async ({
    navigation
  }: {
    navigation: NavigationScreenProp<{}>;
  }) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.navigate("Home");
  }
});

const LinksStack = createStackNavigator(
  {
    Links: RelationshipsScreen
  },
  {
    headerMode: "none"
  }
);

LinksStack.navigationOptions = ({
  screenProps: { t }
}: {
  screenProps: { t: TFuncType };
}) => ({
  tabBarLabel: t("links"),
  tabBarIcon: ({ focused }: { focused: boolean }) => {
    const name = Platform.OS === "ios" ? "ios-link" : "md-link";
    return <TabBarIcon focused={focused} name={name} />;
  },
  tabBarOnPress: async ({
    navigation
  }: {
    navigation: NavigationScreenProp<{}>;
  }) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.navigate("Links");
  }
});

const PlaybookStack = createStackNavigator(
  {
    Settings: PlaybookScreen
  },
  {
    headerMode: "none"
  }
);

PlaybookStack.navigationOptions = ({
  screenProps: { t }
}: {
  screenProps: { t: TFuncType };
}) => ({
  tabBarLabel: t("playbook"),
  tabBarIcon: ({ focused }: { focused: boolean }) => {
    const name = Platform.OS === "ios" ? "ios-book" : "md-book";
    return <TabBarIcon focused={focused} name={name} />;
  },
  tabBarOnPress: async ({
    navigation
  }: {
    navigation: NavigationScreenProp<{}>;
  }) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.navigate("Settings");
  }
});

const MineStack = createStackNavigator(
  {
    Mine: MineScreen
  },
  {
    headerMode: "none"
  }
);

MineStack.navigationOptions = ({
  screenProps: { t }
}: {
  screenProps: { t: TFuncType };
}) => ({
  tabBarLabel: t("mine"),
  tabBarIcon: ({ focused }: { focused: boolean }) => {
    const name = Platform.OS === "ios" ? "ios-contact" : "md-contact";
    return <TabBarIcon focused={focused} name={name} />;
  },
  tabBarOnPress: async ({
    navigation
  }: {
    navigation: NavigationScreenProp<{}>;
  }) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.navigate("Mine");
  }
});

export const MainTabNavigator = createBottomTabNavigator(
  {
    HomeStack,
    LinksStack,
    PlaybookStack,
    MineStack
  },
  {
    navigationOptions: {
      header: null
    },
    tabBarComponent: props => <ThemedBottomTabBar {...props} />
  }
);
