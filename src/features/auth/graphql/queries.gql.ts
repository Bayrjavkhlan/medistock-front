import { gql } from "@apollo/client";

export const CURRENT_USER = gql`
  query CurrentUser {
    currentUser {
      id
      name
      email
      phone
      roles {
        key
        id
      }
      roleKey
      hospital {
        id
        name
        email
      }
    }
  }
`;
