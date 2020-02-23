import * as React from "react";
import { Query, QueryResult } from "react-apollo";
import { FlatList, RefreshControl, StyleSheet, View } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import { connect } from "react-redux";
import { GET_CONTACTS } from "../../common/gqls";
import { NavigationBar } from "../../common/navigation-bar";
import { ScreenHeight } from "../../common/screen-util";
import { theme } from "../../common/theme";
import i18n from "../../translations";
import { Contact } from "../../types/contact";
import { ThemeProps } from "../../types/theme-props";
import { ContactCard } from "./contact-card";

type Props = {
  currentTheme: ThemeProps;
  navigation: NavigationScreenProp<String>;
};

export const RelationshipsScreen = connect(() => {
  return {};
})(
  class RelationshipsScreenInner extends React.Component<Props> {
    public render(): JSX.Element {
      const styles = getStyles();
      const { navigation } = this.props;
      return (
        <View style={{ ...styles.background, height: ScreenHeight }}>
          <NavigationBar title={i18n.t("links")} />
          <Query query={GET_CONTACTS} variables={{}}>
            {({ data, loading }: QueryResult<{ contacts: Array<Contact> }>) => {
              if (!data) {
                return <View style={styles.background} />;
              }

              return (
                <FlatList
                  style={styles.background}
                  data={data.contacts}
                  refreshControl={
                    <RefreshControl
                      refreshing={loading}
                      tintColor={theme.primary}
                    />
                  }
                  keyExtractor={(item: Contact, index: number) =>
                    `${item._id} - ${index}`
                  }
                  renderItem={({ item }: { item: Contact }) => (
                    <ContactCard item={item} navigation={navigation} />
                  )}
                />
              );
            }}
          </Query>
          <View style={styles.pad} />
        </View>
      );
    }
  }
);

const getStyles = () =>
  StyleSheet.create({
    background: {
      backgroundColor: theme.black10
    },
    pad: {
      height: 52
    }
  });
