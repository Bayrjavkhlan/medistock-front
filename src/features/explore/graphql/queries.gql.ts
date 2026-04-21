import { gql } from "@apollo/client";

export const PUBLIC_EXPLORE_MAP = gql`
  query PublicExploreMap($search: String) {
    publicExploreMap(search: $search) {
      id
      name
      type
      address1
      address2
      province
      latitude
      longitude
    }
  }
`;
