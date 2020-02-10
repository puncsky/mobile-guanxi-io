import gql from "graphql-tag";

export const GET_IO_ARTICLE = gql`
  query playbookArticles(
    $skip: Float!
    $limit: Float!
    $tag: String
    $locale: String
  ) {
    playbookArticles(skip: $skip, limit: $limit, tag: $tag, locale: $locale) {
      id
      url
      isFave
      description
      title
      content
      forwardedFor
      date
      visitorCount
      tags
    }
  }
`;

export const GET_FAVE_ARTICLE = gql`
  query faves($skip: Int, $limit: Int) {
    faves(skip: $skip, limit: $limit) {
      id
      url
      isFave
      description
      title
      content
      forwardedFor
      date
      visitorCount
      tags
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
