import { gql } from "@apollo/client";

export const SUPPLY_ITEM_CREATE = gql`
  mutation SupplyItemCreate($input: SupplyItemCreateInput!) {
    supplyItemCreate(input: $input)
  }
`;

export const SUPPLY_ITEM_UPDATE = gql`
  mutation SupplyItemUpdate($id: String!, $input: SupplyItemUpdateInput!) {
    supplyItemUpdate(id: $id, input: $input)
  }
`;

export const SUPPLY_ITEM_DELETE = gql`
  mutation SupplyItemDelete($id: String!) {
    supplyItemDelete(id: $id)
  }
`;

export const SUPPLIER_CREATE = gql`
  mutation SupplierCreate($input: SupplierCreateInput!) {
    supplierCreate(input: $input)
  }
`;

export const SUPPLIER_UPDATE = gql`
  mutation SupplierUpdate($id: String!, $input: SupplierUpdateInput!) {
    supplierUpdate(id: $id, input: $input)
  }
`;

export const SUPPLIER_DELETE = gql`
  mutation SupplierDelete($id: String!) {
    supplierDelete(id: $id)
  }
`;
