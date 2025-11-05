// src/app/admin/user/queries.gql.ts
import { gql } from "@apollo/client";

export const USERS = gql`
  query Users {
    users {
      data {
        id
        name
        email
        phone
        hospital {
          id
          name
        }
        roles {
          id
          key
          name
        }
      }
      count
    }
  }
`;

export const USER_DETAIL = gql`
  query UserDetail($userDetailId: String!) {
    userDetail(id: $userDetailId) {
      id
      email
      name
      phone
      roles {
        id
        key
        name
      }
      hospital {
        name
        id
      }
    }
  }
`;
