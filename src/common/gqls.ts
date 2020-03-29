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

export const DELETE_NOTE = gql`
  mutation deleteNote($id: String!) {
    deleteNote(deleteNoteInput: { _id: $id })
  }
`;

export const GET_USER_TASKS = gql`
  query getUserTasks {
    getUserTasks {
      id
      title
      done
      contacts
      rrule
      due
      ownerId
    }
  }
`;

//{
//   "upsertTaskInput":{
//     "title": "test1",
//     "done": false,
//     "due": "2020-03-17T07:09:50.426Z",
//     "rrule": "",
//     "contacts": []
//   }
// }
export const UPSERT_TASK = gql`
  mutation upsertTask($upsertTaskInput: UpsertTaskInput!) {
    upsertTask(upsertTaskInput: $upsertTaskInput) {
      id
      title
      done
      contacts
      rrule
      due
      ownerId
    }
  }
`;
