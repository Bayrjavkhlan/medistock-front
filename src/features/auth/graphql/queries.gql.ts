import { gql } from "@apollo/client";

export const CURRENT_STAFF = gql`
  query CurrentStaff {
    currentStaff {
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
