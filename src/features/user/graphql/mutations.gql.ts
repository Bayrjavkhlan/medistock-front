import { gql } from "@apollo/client";

export const STAFF_CREATE = gql`
  mutation UserCreate($input: UserCreateInput!) {
    userCreate(input: $input)
  }
`;

export const STAFF_UPDATE = gql`
  mutation UserUpdate($userUpdateId: String!, $input: UserCreateInput!) {
    userUpdate(id: $userUpdateId, input: $input)
  }
`;
