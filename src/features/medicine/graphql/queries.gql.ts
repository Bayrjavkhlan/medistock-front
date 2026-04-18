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

export type DrugsQuery = {
  __typename?: "Query";
  drugs?: {
    __typename?: "Drugs";
    count: number;
    data?: Array<{
      __typename?: "Drug";
      id?: string | null;
      name?: string | null;
      genericName?: string | null;
      dosageForm?: string | null;
      strength?: string | null;
      manufacturer?: string | null;
      description?: string | null;
      totalStock: number;
      startingPrice?: number | null;
      availabilityCount: number;
      createdAt?: unknown;
      updatedAt?: unknown;
    }> | null;
  } | null;
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

export const DrugsDocument = gql`
  query Drugs($take: Int!, $skip: Int!, $where: DrugsWhereInput) {
    drugs(take: $take, skip: $skip, where: $where) {
      count
      data {
        id
        name
        genericName
        dosageForm
        strength
        manufacturer
        description
        totalStock
        startingPrice
        availabilityCount
        createdAt
        updatedAt
      }
    }
  }
` as DocumentNode<DrugsQuery, DrugsQueryVariables>;

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

export type DrugDetailQueryVariables = {
  drugDetailId: string;
};

export type DrugDetailQuery = {
  __typename?: "Query";
  drugDetail?: {
    __typename?: "Drug";
    id?: string | null;
    name?: string | null;
    genericName?: string | null;
    dosageForm?: string | null;
    strength?: string | null;
    manufacturer?: string | null;
    description?: string | null;
    totalStock: number;
    startingPrice?: number | null;
    availabilityCount: number;
    createdAt?: unknown;
    updatedAt?: unknown;
    availability: Array<{
      __typename?: "DrugAvailability";
      id: string;
      pharmacyId: string;
      pharmacyName: string;
      quantity: number;
      price?: number | null;
      status?: string | null;
      updatedAt?: unknown;
      address?: {
        __typename?: "Address";
        id?: string | null;
        address1?: string | null;
        address2?: string | null;
        province?: string | null;
        latitude?: number | null;
        longitude?: number | null;
      } | null;
    }>;
  } | null;
};

export const DrugDetailDocument = gql`
  query DrugDetail($drugDetailId: String!) {
    drugDetail(id: $drugDetailId) {
      id
      name
      genericName
      dosageForm
      strength
      manufacturer
      description
      totalStock
      startingPrice
      availabilityCount
      createdAt
      updatedAt
      availability {
        id
        pharmacyId
        pharmacyName
        quantity
        price
        status
        updatedAt
        address {
          id
          address1
          address2
          province
          latitude
          longitude
        }
      }
    }
  }
` as DocumentNode<DrugDetailQuery, DrugDetailQueryVariables>;
