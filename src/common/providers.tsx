import AntdProvider from "@ant-design/react-native/lib/provider";
import React from "react";
import { ApolloProvider } from "react-apollo";
import { connect, Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { apolloClient } from "./apollo-client";
import { persistor, store } from "./store";
import { antdDarkTheme, antdLightTheme } from "./theme";

export function Providers({
  children
}: {
  children: JSX.Element | Array<JSX.Element>;
}): JSX.Element {
  return (
    //@ts-ignore
    <Provider store={store}>
      <AntdProviderContainer>
        <PersistGate persistor={persistor}>
          <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
        </PersistGate>
      </AntdProviderContainer>
    </Provider>
  );
}

const AntdProviderContainer = connect(
  (state: { base: { currentTheme: string } }) => {
    return {
      currentTheme: state.base.currentTheme
    };
  }
)(function({
  currentTheme,
  children
}: {
  currentTheme: "dark" | "light";
  children: JSX.Element | Array<JSX.Element>;
}): JSX.Element {
  return (
    <AntdProvider
      theme={currentTheme === "dark" ? antdDarkTheme : antdLightTheme}
    >
      {children}
    </AntdProvider>
  );
});
