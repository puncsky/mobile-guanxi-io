export const config = {
  project: require("../package.json").name,
  sentryDsn: "", // TODO
  analytics: {
    googleTid: "UA-43072488-3", // TODO
    mixpanelProjectToken: "" // TODO
  },
  serverUrl: __DEV__ ? "https://guanxi.io/" : "https://guanxi.io/"
};
