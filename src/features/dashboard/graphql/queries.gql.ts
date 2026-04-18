import { gql } from "@apollo/client";

export type DashboardMapLocation = {
  __typename?: "DashboardMapLocation";
  id: string;
  name: string;
  type: string;
  address: string;
  address2?: string | null;
  province: string;
  opensAt: string;
  closesAt: string;
  latitude: number;
  longitude: number;
};

export type AdminMapLocationsQuery = {
  __typename?: "Query";
  adminMapLocations?: {
    __typename?: "AdminMapLocationsPayload";
    hospitals: DashboardMapLocation[];
    drugstores: DashboardMapLocation[];
  } | null;
};

export const ADMIN_MAP_LOCATIONS = gql`
  query AdminMapLocations {
    adminMapLocations {
      hospitals {
        id
        name
        type
        address
        address2
        province
        opensAt
        closesAt
        latitude
        longitude
      }
      drugstores {
        id
        name
        type
        address
        address2
        province
        opensAt
        closesAt
        latitude
        longitude
      }
    }
  }
`;
