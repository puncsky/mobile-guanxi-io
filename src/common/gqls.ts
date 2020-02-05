import gql from "graphql-tag";

export const GET_IO_ARTICLE = gql`
  query playbookArticles($skip: Float!, $limit: Float!) {
    playbookArticles(skip: $skip, limit: $limit) {
      id
      url
      isFave
      short
      title
      content
      forwardedFor
      date
      visitorCount
      tags {
        enum
      }
    }
  }
`;

export const GET_FAVE_ARTICLE = gql`
  query faves($skip: Int, $limit: Int) {
    faves(skip: $skip, limit: $limit) {
      id
      url
      isFave
      short
      title
      content
      forwardedFor
      date
      visitorCount
      tags {
        enum
      }
    }
  }
`;

export const ADD_FAVES = gql`
  mutation addToFaves($id: String) {
    addToFaves(id: $id)
  }
`;

export const DELETE_FAVES = gql`
  mutation deleteFromFaves($id: String) {
    deleteFromFaves(id: $id)
  }
`;

export const ADD_PUSH_TOKEN = gql`
  mutation addPushToken($pushToken: String) {
    addPushToken(token: $pushToken)
  }
`;

export const GET_IO_ARTICLE_BY_TAG = gql`
  query playbookArticlesByTag(
    $tag: String
    $skip: Int
    $limit: Int
    $enOnly: Boolean
  ) {
    playbookArticlesByTag(
      tag: $tag
      skip: $skip
      limit: $limit
      enOnly: $enOnly
    ) {
      id
      url
      isFave
      short
      title
      content
      forwardedFor
      date
      visitorCount
      tags {
        enum
      }
    }
  }
`;
