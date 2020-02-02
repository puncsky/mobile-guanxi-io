/* tslint:disable:no-any */
// @ts-ignore
import * as Icon from "@expo/vector-icons";
import * as lodash from "lodash";
import * as React from "react";
import { Query, QueryResult } from "react-apollo";
import { FlatList, RefreshControl, StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { analytics } from "../../common/analytics";
import { apolloClient } from "../../common/apollo-client";
import { GET_IO_ARTICLE } from "../../common/gqls";
import { isEnglish } from "../../common/is-english";
import { AppState } from "../../common/store";
import { lightTheme } from "../../common/theme";
import { ArticleItem } from "../../components/article-item";
import {
  EmptyView,
  LoadingFinishedFooterView,
  LoadingFooterView,
  NetworkErrorView,
  Separator
} from "../../components/list-components";
import { NavigationBar } from "../../components/navigation-bar";
import i18n from "../../translations";
import { Article } from "../../types/article";
import { ThemeProps } from "../../types/theme-props";

type FlatListItem = {
  item: Article;
};

type ScreenProps = {
  navigation: any;
  locale: string;
  currentTheme: ThemeProps;
};

type ScreenState = {
  refreshing: boolean;
  loadFinished: boolean;
};

export const PlaybookScreen = connect((state: AppState) => {
  return {
    locale: state.base.locale,
    currentTheme: state.base.currentTheme
  };
})(
  class PlaybookScreenInner extends React.Component<ScreenProps, ScreenState> {
    public state: ScreenState = {
      refreshing: false,
      loadFinished: false
    };

    public async componentDidMount(): Promise<void> {
      await analytics.track("page_view_newest", {});
    }

    page: number = 1;
    pageLimit: number = 5;

    public renderItem = (item: Article) => {
      const { navigation } = this.props;
      return <ArticleItem item={item} navigation={navigation} />;
    };

    // tslint:disable-next-line:max-func-body-length
    public render(): JSX.Element {
      const { locale, currentTheme } = this.props;
      return (
        <View
          style={[
            styles.container,
            { backgroundColor: currentTheme.theme.white }
          ]}
        >
          <NavigationBar title={i18n.t("playbook")} />
          <Query
            query={GET_IO_ARTICLE}
            ssr={false}
            fetchPolicy={"cache-and-network"}
            variables={{
              skip: (this.page - 1) * this.pageLimit,
              limit: this.pageLimit,
              enOnly: isEnglish(locale)
            }}
            client={apolloClient}
          >
            {({
              loading,
              error,
              data,
              fetchMore,
              refetch
            }: QueryResult<{
              ioArticles: Array<Article>;
            }>) => {
              if (error) {
                return (
                  <NetworkErrorView info={error.message} callback={refetch} />
                );
              }
              const listData = lodash.isUndefined(data) ? [] : data.ioArticles;
              return (
                <FlatList
                  style={{ flex: 1 }}
                  data={listData}
                  refreshControl={
                    <RefreshControl
                      refreshing={this.state.refreshing || loading}
                      onRefresh={() => {
                        this.setState({ refreshing: true }, async () => {
                          try {
                            await refetch();
                            this.setState({ refreshing: false });
                          } catch (error) {
                            window.console.error(
                              `failed to  refetch ioArticles: ${error}`
                            );
                          }
                        });
                      }}
                      tintColor={currentTheme.theme.primary}
                    />
                  }
                  renderItem={({ item }: FlatListItem) => this.renderItem(item)}
                  keyExtractor={(item: Article, index: number) =>
                    `${item.title} - ${index}`
                  }
                  ItemSeparatorComponent={() => <Separator />}
                  ListEmptyComponent={() => (
                    <EmptyView
                      info={
                        this.state.refreshing || loading ? "" : i18n.t("noData")
                      }
                      callback={refetch}
                    />
                  )}
                  onEndReachedThreshold={1}
                  ListFooterComponent={() => {
                    return this.state.refreshing ||
                      listData.length === 0 ? null : this.state.loadFinished ? (
                      <LoadingFinishedFooterView />
                    ) : (
                      <LoadingFooterView />
                    );
                  }}
                  onEndReached={async () => {
                    try {
                      this.setState({ loadFinished: false });
                      await fetchMore({
                        variables: {
                          skip: listData.length,
                          limit: this.pageLimit
                        },
                        // @ts-ignore
                        updateQuery: (previousResult, { fetchMoreResult }) => {
                          const newData = lodash.isUndefined(fetchMoreResult)
                            ? []
                            : fetchMoreResult.ioArticles;
                          this.setState({
                            loadFinished: newData.length < this.pageLimit
                          });
                          return newData.length > 0 &&
                            lodash.findIndex(
                              previousResult.ioArticles,
                              (article: Article) => article.id === newData[0].id
                            ) < 0
                            ? {
                                ioArticles: [
                                  ...previousResult.ioArticles,
                                  ...newData
                                ]
                              }
                            : previousResult;
                        }
                      });
                    } catch (error) {
                      window.console.error(
                        `failed to fetch more ioArticles: ${error}`
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
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: lightTheme.white,
    flex: 1
  }
});
