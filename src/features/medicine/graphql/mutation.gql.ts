import { gql } from "@apollo/client";
import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

import type { DrugCreateInput, Scalars } from "@/generated/graphql";

export type DrugCreateMutationVariables = {
  input: DrugCreateInput;
};

export type DrugCreateMutation = {
  __typename?: "Mutation";
  drugCreate?: boolean | null;
};

export const DRUG_CREATE = gql`
  mutation DrugCreate($input: DrugCreateInput!) {
    drugCreate(input: $input)
  }
` as DocumentNode<DrugCreateMutation, DrugCreateMutationVariables>;

export type DrugUpdateMutationVariables = {
  drugUpdateId: Scalars["String"]["input"];
  input: DrugCreateInput;
};

export type DrugUpdateMutation = {
  __typename?: "Mutation";
  drugUpdate?: boolean | null;
};

export const DRUG_UPDATE = gql`
  mutation DrugUpdate($drugUpdateId: String!, $input: DrugCreateInput!) {
    drugUpdate(id: $drugUpdateId, input: $input)
  }
` as DocumentNode<DrugUpdateMutation, DrugUpdateMutationVariables>;

export type DrugDeleteMutationVariables = {
  id: Scalars["String"]["input"];
};

export type DrugDeleteMutation = {
  __typename?: "Mutation";
  drugDelete?: boolean | null;
};

export const DRUG_DELETE = gql`
  mutation DrugDelete($id: String!) {
    drugDelete(id: $id)
  }
` as DocumentNode<DrugDeleteMutation, DrugDeleteMutationVariables>;

export type PharmacyDrugUpsertMutationVariables = {
  input: {
    drugId: string;
    quantity: number;
    price?: number | null;
    status: string;
  };
};

export type PharmacyDrugUpsertMutation = {
  __typename?: "Mutation";
  pharmacyDrugUpsert?: boolean | null;
};

export const PHARMACY_DRUG_UPSERT = gql`
  mutation PharmacyDrugUpsert($input: PharmacyDrugUpsertInput!) {
    pharmacyDrugUpsert(input: $input)
  }
` as DocumentNode<
  PharmacyDrugUpsertMutation,
  PharmacyDrugUpsertMutationVariables
>;

export type PharmacyDrugDeleteMutationVariables = {
  drugId: Scalars["String"]["input"];
};

export type PharmacyDrugDeleteMutation = {
  __typename?: "Mutation";
  pharmacyDrugDelete?: boolean | null;
};

export const PHARMACY_DRUG_DELETE = gql`
  mutation PharmacyDrugDelete($drugId: String!) {
    pharmacyDrugDelete(drugId: $drugId)
  }
` as DocumentNode<
  PharmacyDrugDeleteMutation,
  PharmacyDrugDeleteMutationVariables
>;
