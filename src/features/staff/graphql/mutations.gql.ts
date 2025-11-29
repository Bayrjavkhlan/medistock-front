import { gql } from "@apollo/client";

export const STAFF_CREATE = gql`
  mutation staffCreate($input: StaffCreateInput!) {
    staffCreate(input: $input)
  }
`;

export const STAFF_UPDATE = gql`
  mutation StaffUpdate($staffUpdateId: String!, $input: StaffCreateInput!) {
    staffUpdate(id: $staffUpdateId, input: $input)
  }
`;
