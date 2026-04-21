import { gql } from "@apollo/client";

export const PHARMACIES = gql`
  query Pharmacies($take: Int!, $skip: Int!, $where: PharmaciesWhereInput) {
    pharmacies(take: $take, skip: $skip, where: $where) {
      count
      data {
        id
        name
        email
        phone
        address {
          address1
          address2
          province
          latitude
          longitude
        }
      }
    }
  }
`;
