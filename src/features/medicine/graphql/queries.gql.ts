import { gql } from "@apollo/client";
import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

import type {
  DrugsWhereInput,
  InputMaybe,
  PharmacyDrugs,
  PharmacyDrugsWhereInput,
  Scalars,
} from "@/generated/graphql";

export type DrugsQueryVariables = {
  take: Scalars["Int"]["input"];
  skip: Scalars["Int"]["input"];
  where?: InputMaybe<DrugsWhereInput>;
};

export type PharmacyDrugsQueryVariables = {
  take: Scalars["Int"]["input"];
  skip: Scalars["Int"]["input"];
  where?: InputMaybe<PharmacyDrugsWhereInput>;
};

export type PharmacyDrugsQuery = {
  __typename?: "Query";
  pharmacyDrugs?: PharmacyDrugs | null;
};

export const PharmacyDrugsDocument = gql`
  query PharmacyDrugs(
    $take: Int!
    $skip: Int!
    $where: PharmacyDrugsWhereInput
  ) {
    pharmacyDrugs(take: $take, skip: $skip, where: $where) {
      count
      data {
        id
        quantity
        price
        status
        updatedAt
        drug {
          id
          name
          genericName
          dosageForm
          strength
          manufacturer
          description
        }
      }
    }
  }
` as DocumentNode<PharmacyDrugsQuery, PharmacyDrugsQueryVariables>;
