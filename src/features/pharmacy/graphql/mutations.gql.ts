import { gql } from "@apollo/client";

export const PHARMACY_CREATE = gql`
  mutation PharmacyCreate($input: PharmacyCreateInput!) {
    pharmacyCreate(input: $input)
  }
`;

export const PHARMACY_UPDATE = gql`
  mutation PharmacyUpdate(
    $pharmacyUpdateId: String!
    $input: PharmacyUpdateInput!
  ) {
    pharmacyUpdate(id: $pharmacyUpdateId, input: $input)
  }
`;

export const PHARMACY_DELETE = gql`
  mutation PharmacyDelete($pharmacyDeleteId: String!) {
    pharmacyDelete(id: $pharmacyDeleteId)
  }
`;
