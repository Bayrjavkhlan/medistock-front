// src/app/admin/user/queries.gql.ts
import { gql } from "@apollo/client";

export const USERS = gql`
  query Users(
    $where: UsersWhereInput
    $take: Int!
    $skip: Int!
    $orderBy: UsersOrderByInput
  ) {
    users(where: $where, take: $take, skip: $skip, orderBy: $orderBy) {
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
          key
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
