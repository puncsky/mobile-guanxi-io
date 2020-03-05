import * as lodash from "lodash";
import * as React from "react";
import { Query, QueryResult } from "react-apollo";
import { FlatList, RefreshControl, StyleSheet, View } from "react-native";
import { apolloClient } from "../../common/apollo-client";
import { GET_INTERACTIONS } from "../../common/gqls";
import {
  EmptyView,
  LoadingFinishedFooterView,
  LoadingFooterView,
  NetworkErrorView,
  Separator
} from "../../common/list-components";
import { theme } from "../../common/theme";
import i18n from "../../translations";
import { Interaction, Interactions } from "../../types/interactions";
import { InteractionItem } from "./interaction-item";

type Props = {
  contactId: string;
  isSelf: boolean;
};

type State = {
  refreshing: boolean;
  loadFinished: boolean;
};

export class InteractionsView extends React.Component<Props, State> {
  public state: State = {
    refreshing: false,
    loadFinished: false
  };
  page: number = 1;
  pageLimit: number = 5;

  public render(): JSX.Element {
    const styles = getStyles();
    const { refreshing, loadFinished } = this.state;
    const { contactId, isSelf } = this.props;
    return (
      <View style={styles.container}>
        <Query
          query={GET_INTERACTIONS}
          ssr={false}
          fetchPolicy={"network-only"}
          variables={{
            contactId,
            offset: (this.page - 1) * this.pageLimit,
            limit: this.pageLimit,
            isSelf
          }}
          client={apolloClient}
        >
          {({
            loading,
            error,
            data,
            fetchMore,
            refetch
          }: QueryResult<{ interactions: Interactions }>) => {
            if (error) {
              return (
                <NetworkErrorView info={error.message} callback={refetch} />
              );
            }
            if (!data) {
              return <View style={styles.container} />;
            }
            const listData = data.interactions.interactions;

            return (
              <FlatList
                style={styles.container}
                data={listData}
                refreshControl={
                  <RefreshControl
                    refreshing={
                      refreshing || (loading && listData.length === 0)
                    }
                    tintColor={theme.primary}
                    onRefresh={async () => {
                      this.setState({ refreshing: true }, async () => {
                        try {
                          await refetch();
                          this.setState({ refreshing: false });
                        } catch (error) {
                          window.console.error(
                            `failed to  refetch interactions: ${error}`
                          );
                        }
                      });
                    }}
                  />
                }
                keyExtractor={(item: Interaction, index: number) =>
                  `${item.id} - ${index}`
                }
                renderItem={({ item }: { item: Interaction }) => (
                  <InteractionItem
                    item={item}
                    contactId={contactId}
                    isSelf={isSelf}
                  />
                )}
                ItemSeparatorComponent={() => <Separator />}
                onEndReachedThreshold={1}
                ListEmptyComponent={() => (
                  <EmptyView
                    info={refreshing || loading ? "" : i18n.t("noData")}
                    callback={refetch}
                  />
                )}
                ListFooterComponent={() => {
                  return refreshing ||
                    listData.length === 0 ? null : loadFinished ? (
                    <LoadingFinishedFooterView />
                  ) : (
                    <LoadingFooterView />
                  );
                }}
                onEndReached={async () => {
                  this.setState({ loadFinished: false });
                  try {
                    await fetchMore({
                      variables: {
                        contactId,
                        offset: listData.length,
                        limit: this.pageLimit,
                        isSelf
                      },
                      // @ts-ignore
                      updateQuery: (previousResult, { fetchMoreResult }) => {
                        const newData = lodash.isUndefined(fetchMoreResult)
                          ? []
                          : fetchMoreResult.interactions.interactions;

                        this.setState({
                          loadFinished: newData.length < this.pageLimit
                        });

                        if (
                          newData.length > 0 &&
                          lodash.findIndex(
                            previousResult.interactions.interactions,
                            (interaction: Interaction) =>
                              interaction.id === newData[0].id
                          ) < 0
                        ) {
                          previousResult.interactions.interactions = [
                            ...previousResult.interactions.interactions,
                            ...newData
                          ];
                        }
                        return previousResult;
                      }
                    });
                  } catch (error) {
                    window.console.error(
                      `failed to fetch more interactions: ${error}`
                    );
                  }
                }}
              />
            );
          }}
        </Query>
      </View>
    );
  }
}

const getStyles = () =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.white }
  });
