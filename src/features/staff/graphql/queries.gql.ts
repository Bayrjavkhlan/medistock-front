// src/app/admin/user/queries.gql.ts
import { gql } from "@apollo/client";

export const MEMBERSHIPS = gql`
  query Memberships($take: Int!, $skip: Int!) {
    memberships(take: $take, skip: $skip) {
      data {
        id
        role
        user {
          id
          name
          email
          phone
        }
        organization {
          id
          name
          type
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
      name
      email
      phone
      isPlatformAdmin
    }
  }
`;
