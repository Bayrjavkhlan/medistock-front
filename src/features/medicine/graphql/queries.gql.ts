import { gql } from "@apollo/client";
import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

import type { DrugsWhereInput, InputMaybe, Scalars } from "@/generated/graphql";

export type DrugsQueryVariables = {
  take: Scalars["Int"]["input"];
  skip: Scalars["Int"]["input"];
  where?: InputMaybe<DrugsWhereInput>;
};

export type PharmacyDrugsQueryVariables = {
  take: Scalars["Int"]["input"];
  skip: Scalars["Int"]["input"];
  where?: InputMaybe<{
    search?: InputMaybe<Scalars["String"]["input"]>;
    pharmacyId?: InputMaybe<Scalars["String"]["input"]>;
  }>;
};

export type PharmacyDrugsQuery = {
  __typename?: "Query";
  pharmacyDrugs?: {
    __typename?: "PharmacyDrugs";
    count: number;
    data?: Array<{
      __typename?: "PharmacyDrug";
      id?: string | null;
      quantity?: number | null;
      price?: number | null;
      status?: string | null;
      updatedAt?: unknown;
      drug?: {
        __typename?: "Drug";
        id?: string | null;
        name?: string | null;
        genericName?: string | null;
        dosageForm?: string | null;
        strength?: string | null;
        manufacturer?: string | null;
        description?: string | null;
      } | null;
    }>;
  } | null;
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
