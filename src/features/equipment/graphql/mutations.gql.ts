import { gql } from "@apollo/client";

export const EQUIPMENT_CREATE = gql`
  mutation EquipmentCreate($input: EquipmentCreateInput!) {
    equipmentCreate(input: $input)
  }
`;

export const EQUIPMENT_UPDATE = gql`
  mutation EquipmentUpdate(
    $equipmentUpdateId: String!
    $input: EquipmentCreateInput!
  ) {
    equipmentUpdate(id: $equipmentUpdateId, input: $input)
  }
`;
