// src/app/admin/user/queries.gql.ts
import { gql } from "@apollo/client";

export const STAFFS = gql`
  query Staffs(
    $where: StaffsWhereInput
    $take: Int!
    $skip: Int!
    $orderBy: StaffsOrderByInput
  ) {
    staffs(where: $where, take: $take, skip: $skip, orderBy: $orderBy) {
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

export const STAFF_DETAIL = gql`
  query StaffDetail($staffDetailId: String!) {
    staffDetail(id: $staffDetailId) {
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
