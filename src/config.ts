export const config = {
  project: require("../package.json").name,
  sentryDsn: "", // TODO
  analytics: {
    googleTid: "TODO",
    mixpanelProjectToken: "TODO"
  },
  serverUrl: __DEV__ ? "https://guigu.io/" : "https://guanxi.io/"
};
