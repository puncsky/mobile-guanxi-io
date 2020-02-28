import { Appearance } from "react-native-appearance";
const colorScheme = Appearance.getColorScheme();
const colorMode = colorScheme === "dark" ? "dark" : "light";

const lightTheme = {
  name: "light",

  primary: "#B46BD6",
  secondary: "#278CFF",
  white: "#fff",

  black: "#000000",
  black90: "#050505",
  black80: "#999999",
  black60: "#CCCCCC",
  black40: "#E5E5E5",
  black20: "#F0F0F0",
  black10: "#F7F7F7",
  black05: "#F2F2F2",

  text01: "#4c4c4c", //		Primary text, Body copy

  error: "#E54937", //	Error
  success: "#07A35A", //	Success
  warning: "#F9CC64", //	Warning
  warning01: "#FAF0C7",
  information: "#5aaafa", //	Information

  nav01: "#011627", //	Global top bar
  nav02: "#20232a", //	CTA footer

  tabIconDefault: "#999999",
  tabIconSelected: "#B46BD6",
  activeTintColor: "#B46BD6",
  inactiveTintColor: "#999999",
  activeBackgroundColor: "#fff",
  inactiveBackgroundColor: "#fff",
  navBg: "#fff",
  navText: "#000",
  linkText: "#999999",
  separator: "#CCCCCC"
};

const darkTheme = {
  name: "dark",

  primary: "#B46BD6",
  secondary: "#278CFF",
  white: "#333333",

  black: "#FFF",
  black90: "#F7F7F7",
  black80: "#F0F0F0",
  black60: "#E5E5E5",
  black40: "#CCCCCC",
  black20: "#999999",
  black10: "#333333",

  text01: "#FFFFFF", //		Primary text, Body copy

  error: "#E54937", //	Error
  success: "#07A35A", //	Success
  warning: "#F9CC64", //	Warning
  warning01: "#FAF0C7",
  information: "#5aaafa", //	Information

  nav01: "#011627", //	Global top bar
  nav02: "#20232a", //	CTA footer

  tabIconDefault: "#ccc",
  tabIconSelected: "#B46BD6",
  activeTintColor: "#B46BD6",
  inactiveTintColor: "#CFCFCF",
  activeBackgroundColor: "#2E3235",
  inactiveBackgroundColor: "#2E3235",
  navBg: "#2E3235",
  navText: "#fff",
  linkText: "#999999",
  separator: "#CCCCCC"
};

export let theme = colorMode === "dark" ? darkTheme : lightTheme;

export function setTheme(mode: "dark" | "light" | undefined): void {
  theme = mode === "dark" ? darkTheme : lightTheme;
}

export const antdLightTheme = {
  color_text_base: lightTheme.text01,
  brand_primary: lightTheme.primary,
  color_link: lightTheme.primary,
  primary_button_fill: lightTheme.primary,
  primary_button_fill_tap: lightTheme.primary
};

export const antdDarkTheme = {
  color_text_base: darkTheme.text01,
  brand_primary: darkTheme.primary,
  color_link: darkTheme.primary,
  primary_button_fill: darkTheme.primary,
  primary_button_fill_tap: darkTheme.primary
};
