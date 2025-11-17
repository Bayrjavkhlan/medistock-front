import { gql } from "@apollo/client";

export const EQUIPMENTS = gql`
  query Equipments($take: Int!, $skip: Int!, $where: EquipmentsWhereInput) {
    equipments(take: $take, skip: $skip, where: $where) {
      data {
        id
        name
        serialNo
        assignedTo {
          id
          name
          email
          phone
        }
        state
        category
        hospital {
          id
          name
          email
        }
      }
      count
    }
  }
`;

export const EQUIPMENT_DETAIL = gql`
  query EquipmentDetail($equipmentDetailId: String!) {
    equipmentDetail(id: $equipmentDetailId) {
      id
      name
      serialNo
      state
      assignedTo {
        id
        name
        email
      }
      hospital {
        id
        name
      }
    }
  }
`;
