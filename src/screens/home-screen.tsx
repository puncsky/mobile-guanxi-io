/* tslint:disable:no-any */
// @ts-ignore
import * as Icon from "@expo/vector-icons";
import * as lodash from "lodash";
import * as React from "react";
import { Query, QueryResult } from "react-apollo";
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";
import { NavigationScreenProps } from "react-navigation";
import { connect } from "react-redux";
import { analytics } from "../common/analytics";
import { apolloClient } from "../common/apollo-client";
import { colors } from "../common/colors";
import { GET_IO_ARTICLE } from "../common/gqls";
import { isEnglish } from "../common/is-english";
import { AppState } from "../common/store";
import { ArticleItem } from "../components/article-item";
import {
  EmptyView,
  LoadingFinishedFooterView,
  LoadingFooterView,
  NetworkErrorView,
  Separator
} from "../components/list-components";
import { NavigationBar } from "../components/navigation-bar";
import i18n from "../translations";
import { Article } from "../types/article";
import { TFuncType } from "../types/screen-props";

type FlatListItem = {
  item: Article;
};

type HomeScreenProps = {
  navigation: any;
  locale: string;
};

type HomeScreenState = {
  refreshing: boolean;
  loadFinished: boolean;
};

export const HomeScreen = connect((state: AppState) => {
  return {
    locale: state.base.locale
  };
})(
  class NewestScreenInner extends React.Component<
    HomeScreenProps,
    HomeScreenState
  > {
    public static navigationOptions = ({
      navigation,
      screenProps: { t }
    }: {
      navigation: NavigationScreenProps;
      screenProps: { t: TFuncType };
    }) => {
      return {
        headerTitle: t("newest"),
        headerRight: (
          <TouchableOpacity
            activeOpacity={0.9}
            style={{ paddingHorizontal: 5 }}
            onPress={() => {
              //@ts-ignore
              navigation.navigate("Search");
            }}
          >
            <Icon.FontAwesome
              name="search"
              size={23}
              color={colors.primary}
              style={{ paddingHorizontal: 10 }}
            />
          </TouchableOpacity>
        )
      };
    };

    public state: HomeScreenState = {
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

    public render(): JSX.Element {
      const { locale } = this.props;
      return (
        <View style={styles.container}>
          <NavigationBar title={i18n.t("home")} />
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
                      tintColor={colors.primary}
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
                    return this.state.refreshing || loading ? null : this.state
                        .loadFinished ? (
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
    backgroundColor: colors.white,
    flex: 1
  }
});
