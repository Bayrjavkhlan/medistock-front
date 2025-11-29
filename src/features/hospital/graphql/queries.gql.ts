import { gql } from "@apollo/client";

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

export const HOSPITAL_DETAIL = gql`
  query HospitalDetail($hospitalDetailId: String!) {
    hospitalDetail(id: $hospitalDetailId) {
      id
      name
      email
      phone
      address {
        id
        address1
        address2
        province
      }
    }
  }
`;

export const HOSPITAL_OPTIONS = gql`
  query HospitalOption {
    hospitalOption {
      id
      name
    }
  }
`;
