export const config = {
  project: require("../package.json").name,
  sentryDsn: "", // TODO
  analytics: {
    googleTid: "UA-43072488-3", // TODO
    mixpanelProjectToken: "" // TODO
  },
  serverUrl: __DEV__ ? "https://2a7f9e20.ngrok.io/" : "https://guanxi.io/"
};
