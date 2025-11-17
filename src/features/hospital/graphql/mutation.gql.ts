import { gql } from "@apollo/client";

export const HOSPITAL_CREATE = gql`
  mutation HospitalCreate($input: HospitalCreateInput!) {
    hospitalCreate(input: $input)
  }
`;
export const HOSPITAL_UPDATE = gql`
  mutation HospitalUpdate(
    $hospitalUpdateId: String!
    $input: HospitalCreateInput!
  ) {
    hospitalUpdate(id: $hospitalUpdateId, input: $input)
  }
`;
