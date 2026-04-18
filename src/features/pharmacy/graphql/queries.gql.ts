import { gql } from "@apollo/client";
import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

export type PharmacyDetailQueryVariables = {
  pharmacyDetailId: string;
};

export type PharmacyDetailQuery = {
  __typename?: "Query";
  pharmacyDetail?: {
    __typename?: "Pharmacy";
    id?: string | null;
    name?: string | null;
    email?: string | null;
    phone?: string | null;
    createdAt?: unknown;
    updatedAt?: unknown;
    inventoryCount: number;
    address?: {
      __typename?: "Address";
      id?: string | null;
      address1?: string | null;
      address2?: string | null;
      province?: string | null;
      latitude?: number | null;
      longitude?: number | null;
    } | null;
    inventory: Array<{
      __typename?: "PharmacyDrug";
      id?: string | null;
      quantity?: number | null;
      price?: number | null;
      status?: string | null;
      updatedAt?: unknown;
      drug: {
        __typename?: "Drug";
        id?: string | null;
        name?: string | null;
        genericName?: string | null;
        dosageForm?: string | null;
        strength?: string | null;
        manufacturer?: string | null;
      };
    }>;
  } | null;
};

export const PharmacyDetailDocument = gql`
  query PharmacyDetail($pharmacyDetailId: String!) {
    pharmacyDetail(id: $pharmacyDetailId) {
      id
      name
      email
      phone
      createdAt
      updatedAt
      inventoryCount
      address {
        id
        address1
        address2
        province
        latitude
        longitude
      }
      inventory {
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
        }
      }
    }
  }
` as DocumentNode<PharmacyDetailQuery, PharmacyDetailQueryVariables>;
