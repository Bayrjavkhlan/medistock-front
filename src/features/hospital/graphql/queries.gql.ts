import { gql } from "@apollo/client";
import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

import type {
  HospitalsQuery,
  HospitalsQueryVariables,
} from "@/generated/graphql";

export const HOSPITALS = gql`
  query Hospitals($take: Int!, $skip: Int!, $where: HospitalsWhereInput) {
    hospitals(take: $take, skip: $skip, where: $where) {
      count
      data {
        id
        name
        email
        phone
        address {
          address1
          address2
          id
          province
        }
      }
    }
  }
`;

export type HospitalDetailQueryVariables = {
  hospitalDetailId: string;
};

export type HospitalDetailQuery = {
  __typename?: "Query";
  hospitalDetail?: {
    __typename?: "Hospital";
    id?: string | null;
    name?: string | null;
    email?: string | null;
    phone?: string | null;
    createdAt?: unknown;
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
  } | null;
};

export const HospitalDetailDocument = gql`
  query HospitalDetail($hospitalDetailId: String!) {
    hospitalDetail(id: $hospitalDetailId) {
      id
      name
      email
      phone
      createdAt
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
` as DocumentNode<HospitalDetailQuery, HospitalDetailQueryVariables>;

export const HOSPITAL_OPTIONS = gql`
  query HospitalOption {
    hospitalOption {
      id
      name
    }
  }
`;

export const HospitalsDocument = HOSPITALS as DocumentNode<
  HospitalsQuery,
  HospitalsQueryVariables
>;
