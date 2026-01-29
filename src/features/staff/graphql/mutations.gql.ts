import { gql } from "@apollo/client";

export const USER_CREATE = gql`
  mutation UserCreate($input: UserCreateInput!) {
    userCreate(input: $input)
  }
`;

export const USER_UPDATE = gql`
  mutation UserUpdate($userUpdateId: String!, $input: UserUpdateInput!) {
    userUpdate(id: $userUpdateId, input: $input)
  }
`;

export const MEMBERSHIP_UPDATE = gql`
  mutation MembershipUpdate(
    $membershipUpdateId: String!
    $input: MembershipUpdateInput!
  ) {
    membershipUpdate(id: $membershipUpdateId, input: $input)
  }
`;
