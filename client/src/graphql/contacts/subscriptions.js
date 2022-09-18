import { gql } from "@apollo/client";

export const SUBCRIBE_CONTACT_REQUESTS = gql`
  subscription {
    contactRequests {
      id
      friend {
        id
        avatarUrl
        name
      }
    }
  }
`;
