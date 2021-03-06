/* tslint:disable:no-any */
import * as lodash from "lodash";
import * as React from "react";
import { Query, QueryResult } from "react-apollo";
import { FlatList, RefreshControl, View } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import { connect } from "react-redux";
import { ArticleItem } from "../../common/article-item";
import { GET_IO_ARTICLE } from "../../common/gqls";
import {
  EmptyView,
  LoadingFinishedFooterView,
  LoadingFooterView,
  NetworkErrorView,
  Separator
} from "../../common/list-components";
import { NavigationBar } from "../../common/navigation-bar";
import { AppState } from "../../common/store";
import { theme } from "../../common/theme";
import i18n from "../../translations";
import { Article } from "../../types/article";
import { DiscoveryItem } from "../../types/discovery-item";
import { ThemeProps } from "../../types/theme-props";

type FlatListItem = {
  item: Article;
};

type ArticlesByTagScreenProps = {
  locale: string;
  navigation: NavigationScreenProp<string>;
  currentTheme: ThemeProps;
};

type ArticlesByTagScreenState = {
  refreshing: boolean;
  loadFinished: boolean;
};

export const ArticlesByTagScreen = connect((state: AppState) => {
  return {
    locale: state.base.locale
  };
})(
  class ArticlesByTagScreenInner extends React.Component<
    ArticlesByTagScreenProps,
    ArticlesByTagScreenState
  > {
    public state: ArticlesByTagScreenState = {
      refreshing: false,
      loadFinished: false
    };

    page: number = 1;
    pageLimit: number = 5;

    public renderItem = (item: Article) => {
      // @ts-ignore
      const { navigation } = this.props;
      return <ArticleItem item={item} navigation={navigation} />;
    };

    // tslint:disable-next-line:max-func-body-length
    public renderQueryList = (item: DiscoveryItem) => {
      const { locale } = this.props;
      return (
        <Query
          query={GET_IO_ARTICLE}
          ssr={false}
          fetchPolicy="network-only"
          variables={{
            tag: item.tag,
            skip: (this.page - 1) * this.pageLimit,
            limit: this.pageLimit,
            locale
          }}
        >
          {({
            loading,
            error,
            data,
            fetchMore,
            refetch
          }: QueryResult<{
            playbookArticles: Array<Article>;
          }>) => {
            if (error) {
              return (
                <NetworkErrorView info={error.message} callback={refetch} />
              );
            }
            const listData = (data && data.playbookArticles) || [];
            return (
              <FlatList
                style={{ flex: 1 }}
                data={listData}
                refreshControl={
                  <RefreshControl
                    refreshing={
                      this.state.refreshing ||
                      (loading && listData.length === 0)
                    }
                    onRefresh={() => {
                      this.setState({ refreshing: true }, async () => {
                        try {
                          await refetch();
                          this.setState({ refreshing: false });
                        } catch (error) {
                          window.console.error(
                            `failed to  refetch playbookArticles: ${error}`
                          );
                        }
                      });
                    }}
                    tintColor={theme.primary}
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
                        tag: item.tag,
                        skip: listData.length,
                        limit: this.pageLimit,
                        locale
                      },
                      // @ts-ignore
                      updateQuery: (previousResult, { fetchMoreResult }) => {
                        const newData = lodash.isUndefined(fetchMoreResult)
                          ? []
                          : fetchMoreResult.playbookArticles;
                        this.setState({
                          loadFinished: newData.length < this.pageLimit
                        });
                        return newData.length > 0 &&
                          lodash.findIndex(
                            previousResult.playbookArticles,
                            (article: Article) => article.id === newData[0].id
                          ) < 0
                          ? {
                              playbookArticles: [
                                ...previousResult.playbookArticles,
                                ...newData
                              ]
                            }
                          : previousResult;
                      }
                    });
                  } catch (error) {
                    window.console.error(
                      `failed to fetch more playbookArticles: ${error}`
                    );
                  }
                }}
              />
            );
          }}
        </Query>
      );
    };

    public render(): JSX.Element {
      const { navigation } = this.props;
      const item = navigation.getParam("item");
      const { tag } = item;
      return (
        <View style={{ flex: 1, backgroundColor: theme.white }}>
          <NavigationBar title={`Tag:${tag}`} showBack />
          {this.renderQueryList(item)}
        </View>
      );
    }
  }
);
