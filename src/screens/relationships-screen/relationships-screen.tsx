import gql from "graphql-tag";
import * as React from "react";
import { Query, QueryResult } from "react-apollo";
import { FlatList, RefreshControl, View } from "react-native";
import { Text } from "react-native";
import { connect } from "react-redux";
import { AppState } from "../../common/store";
import { NavigationBar } from "../../components/navigation-bar";
import i18n from "../../translations";
import { ThemeProps } from "../../types/theme-props";

export type Contact = {
  _id: string;
  emails: string;
  name: string;
  avatarUrl: string;
  createAt: Date;
  updateAt: Date;
};

export const GET_CONTACTS = gql`
  query contacts($offset: Float, $limit: Float) {
    contacts(offset: $offset, limit: $limit) {
      _id
      emails
      name
      avatarUrl
      createAt
      updateAt
    }
  }
`;

type Props = {
  currentTheme: ThemeProps;
};

export const RelationshipsScreen = connect((state: AppState) => {
  return {
    currentTheme: state.base.currentTheme
  };
})(
  class LinksScreenInner extends React.Component<Props> {
    public render(): JSX.Element {
      const { currentTheme } = this.props;
      return (
        <View>
          <NavigationBar title={i18n.t("links")} />
          <Query query={GET_CONTACTS} variables={{}}>
            {({ data, loading }: QueryResult<{ contacts: Array<Contact> }>) => {
              if (!data) {
                return <View />;
              }

              return (
                <FlatList
                  data={data.contacts}
                  refreshControl={
                    <RefreshControl
                      refreshing={loading}
                      tintColor={currentTheme.theme.primary}
                    />
                  }
                  keyExtractor={(item: Contact, index: number) =>
                    `${item._id} - ${index}`
                  }
                  renderItem={({ item }: { item: Contact }) => (
                    <Text>{item.name}</Text>
                  )}
                />
              );
            }}
          </Query>
        </View>
      );
    }
  }
);
