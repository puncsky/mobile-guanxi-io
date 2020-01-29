export const config = {
  project: require("../package.json").name,
  sentryDsn: "", // TODO
  analytics: {
    googleTid: "TODO",
    mixpanelProjectToken: "TODO"
  },
  serverUrl: __DEV__ ? "https://a39fcadf.ngrok.io/" : "https://guanxi.io/"
};
