import gql from "graphql-tag";

//playbook
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

//relationship

export const GET_CONTACTS = gql`
  query contacts($offset: Float, $limit: Float) {
    contacts(offset: $offset, limit: $limit) {
      _id
      emails
      name
      avatarUrl
      phones
      address
      bornAt
      bornAddress
      knownAt
      knownSource
      extraversionIntroversion
      intuitingSensing
      thinkingFeeling
      planingPerceiving
      tdp
      workingOn
      desire
      title
      linkedin
      facebook
      github
      createAt
      updateAt
    }
  }
`;

//contact detail
//{isSelf: true, contactId: "5e489f55fffeb700341ba7c8"}
export const INTERACTION_COUNT = gql`
  query interactionCounts($isSelf: Boolean, $contactId: String) {
    interactionCounts(isSelf: $isSelf, contactId: $contactId) {
      count
      date
    }
  }
`;

//{offset: 0, limit: 5, isSelf: true}
export const GET_INTERACTIONS = gql`
  query interactions(
    $contactId: String
    $offset: Float
    $limit: Float
    $isSelf: Boolean
  ) {
    interactions(
      contactId: $contactId
      offset: $offset
      limit: $limit
      isSelf: $isSelf
    ) {
      interactions {
        id
        content
        public
        timestamp
      }
      count
    }
  }
`;

// {"upsertInteraction":{
//   "id": "5e5cdc21f77f2800457e61eb",
//   "content": "test1234",
// 	"relatedHumans": ["5e489f55fffeb700341ba7c8", "5e489f55fffeb700341ba7c8"],
//   "public": false,
//   "timestamp": "2020-03-05T10:15:34.747Z"}
// }
export const UPSERT_INTERACTION = gql`
  mutation upsertInteraction($upsertInteraction: UpsertInteraction!) {
    upsertInteraction(upsertInteraction: $upsertInteraction) {
      id
      timestamp
      content
      relatedHumans
      public
    }
  }
`;

//{"id":  "5e5cdc21f77f2800457e61eb"}
export const DELETE_NOTE = gql`
  mutation deleteNote($id: String!) {
    deleteNote(deleteNoteInput: { _id: $id })
  }
`;
