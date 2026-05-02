import { gql } from "@apollo/client";
import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

export type SupplyAddress = {
  __typename?: "Address";
  id?: string | null;
  address1?: string | null;
  address2?: string | null;
  province?: string | null;
  latitude?: number | null;
  longitude?: number | null;
};

export type SupplierSummary = {
  __typename?: "Supplier";
  id?: string | null;
  organizationId: string;
  name: string;
  description?: string | null;
  logoUrl?: string | null;
  email?: string | null;
  phone?: string | null;
  website?: string | null;
  status: string;
  categoriesSupplied: string[];
  supplyItemCount: number;
  createdAt?: unknown;
  updatedAt?: unknown;
  address?: SupplyAddress | null;
};

export type SupplyItemSummary = {
  __typename?: "SupplyItem";
  id?: string | null;
  supplierId: string;
  name: string;
  shortDescription?: string | null;
  description?: string | null;
  category: string;
  model?: string | null;
  brand?: string | null;
  manufacturer?: string | null;
  price?: number | null;
  currency?: string | null;
  availability: string;
  warranty?: string | null;
  contactInfo?: string | null;
  imageUrls: string[];
  documentUrls: string[];
  specifications?: unknown;
  createdAt?: unknown;
  updatedAt?: unknown;
  supplier: SupplierSummary;
};

export type SupplyItemsWhereInput = {
  search?: string | null;
  supplierId?: string | null;
  category?: string | null;
  availability?: string | null;
  minPrice?: number | null;
  maxPrice?: number | null;
  sortBy?: string | null;
  sortOrder?: "asc" | "desc" | null;
};

export type SuppliersWhereInput = {
  search?: string | null;
  status?: string | null;
};

export type SupplyItemsQueryVariables = {
  take: number;
  skip: number;
  where?: SupplyItemsWhereInput | null;
};

export type SupplyItemsQuery = {
  __typename?: "Query";
  supplyItems?: {
    __typename?: "SupplyItems";
    count: number;
    data?: SupplyItemSummary[] | null;
  } | null;
};

export const SupplyItemsDocument = gql`
  query SupplyItems($take: Int!, $skip: Int!, $where: SupplyItemsWhereInput) {
    supplyItems(take: $take, skip: $skip, where: $where) {
      count
      data {
        id
        supplierId
        name
        shortDescription
        description
        category
        model
        brand
        manufacturer
        price
        currency
        availability
        warranty
        contactInfo
        imageUrls
        documentUrls
        specifications
        createdAt
        updatedAt
        supplier {
          id
          organizationId
          name
          description
          logoUrl
          email
          phone
          website
          status
          categoriesSupplied
          supplyItemCount
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
    }
  }
` as DocumentNode<SupplyItemsQuery, SupplyItemsQueryVariables>;

export type SupplyItemDetailQueryVariables = {
  supplyItemDetailId: string;
};

export type SupplyItemDetailQuery = {
  __typename?: "Query";
  supplyItemDetail?: SupplyItemSummary | null;
};

export const SupplyItemDetailDocument = gql`
  query SupplyItemDetail($supplyItemDetailId: String!) {
    supplyItemDetail(id: $supplyItemDetailId) {
      id
      supplierId
      name
      shortDescription
      description
      category
      model
      brand
      manufacturer
      price
      currency
      availability
      warranty
      contactInfo
      imageUrls
      documentUrls
      specifications
      createdAt
      updatedAt
      supplier {
        id
        organizationId
        name
        description
        logoUrl
        email
        phone
        website
        status
        categoriesSupplied
        supplyItemCount
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
  }
` as DocumentNode<SupplyItemDetailQuery, SupplyItemDetailQueryVariables>;

export type SuppliersQueryVariables = {
  take: number;
  skip: number;
  where?: SuppliersWhereInput | null;
};

export type SuppliersQuery = {
  __typename?: "Query";
  suppliers?: {
    __typename?: "Suppliers";
    count: number;
    data?: SupplierSummary[] | null;
  } | null;
};

export const SuppliersDocument = gql`
  query Suppliers($take: Int!, $skip: Int!, $where: SuppliersWhereInput) {
    suppliers(take: $take, skip: $skip, where: $where) {
      count
      data {
        id
        organizationId
        name
        description
        logoUrl
        email
        phone
        website
        status
        categoriesSupplied
        supplyItemCount
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
  }
` as DocumentNode<SuppliersQuery, SuppliersQueryVariables>;

export type SupplierDetailQueryVariables = {
  supplierDetailId: string;
};

export type SupplierDetailQuery = {
  __typename?: "Query";
  supplierDetail?: SupplierSummary | null;
};

export const SupplierDetailDocument = gql`
  query SupplierDetail($supplierDetailId: String!) {
    supplierDetail(id: $supplierDetailId) {
      id
      organizationId
      name
      description
      logoUrl
      email
      phone
      website
      status
      categoriesSupplied
      supplyItemCount
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
` as DocumentNode<SupplierDetailQuery, SupplierDetailQueryVariables>;

export type SupplierSupplyItemsQueryVariables = {
  supplierId: string;
  take: number;
  skip: number;
};

export type SupplierSupplyItemsQuery = {
  __typename?: "Query";
  supplierSupplyItems?: {
    __typename?: "SupplyItems";
    count: number;
    data?: SupplyItemSummary[] | null;
  } | null;
};

export const SupplierSupplyItemsDocument = gql`
  query SupplierSupplyItems($supplierId: String!, $take: Int!, $skip: Int!) {
    supplierSupplyItems(supplierId: $supplierId, take: $take, skip: $skip) {
      count
      data {
        id
        supplierId
        name
        shortDescription
        description
        category
        model
        brand
        manufacturer
        price
        currency
        availability
        warranty
        contactInfo
        imageUrls
        documentUrls
        specifications
        createdAt
        updatedAt
        supplier {
          id
          organizationId
          name
          description
          logoUrl
          email
          phone
          website
          status
          categoriesSupplied
          supplyItemCount
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
    }
  }
` as DocumentNode<SupplierSupplyItemsQuery, SupplierSupplyItemsQueryVariables>;
