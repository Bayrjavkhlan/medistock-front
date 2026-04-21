import { gql } from "@apollo/client";
import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

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

export type DashboardStat = {
  __typename?: "DashboardStat";
  label: string;
  value: number;
  helper?: string | null;
  tone?: string | null;
};

export type DashboardSeries = {
  __typename?: "DashboardSeries";
  key: string;
  label: string;
  color?: string | null;
  points: Array<{
    __typename?: "DashboardSeriesPoint";
    label: string;
    value: number;
  }>;
};

export type DashboardActivityItem = {
  __typename?: "DashboardActivityItem";
  id: string;
  title: string;
  subtitle?: string | null;
  meta?: string | null;
  href?: string | null;
  createdAt?: string | null;
};

export type DashboardAlertItem = {
  __typename?: "DashboardAlertItem";
  id: string;
  title: string;
  description: string;
  severity: string;
};

export type DashboardProfile = {
  __typename?: "DashboardProfile";
  id: string;
  name: string;
  email?: string | null;
  phone?: string | null;
  address: string;
  province?: string | null;
  latitude?: number | null;
  longitude?: number | null;
};

export type DashboardOverviewQuery = {
  __typename?: "Query";
  dashboardOverview?: {
    __typename?: "DashboardOverview";
    role?: string | null;
    admin?: {
      __typename?: "AdminDashboardOverview";
      stats: DashboardStat[];
      growthSeries: DashboardSeries[];
      inventoryStatus: DashboardStat[];
      recentItems: DashboardActivityItem[];
      topHospitals: DashboardStat[];
      topPharmacies: DashboardStat[];
      alerts: DashboardAlertItem[];
      map: {
        __typename?: "AdminMapLocationsPayload";
        hospitals: DashboardMapLocation[];
        drugstores: DashboardMapLocation[];
      };
    } | null;
    hospital?: {
      __typename?: "HospitalDashboardOverview";
      profile: DashboardProfile;
      stats: DashboardStat[];
      activitySeries: DashboardSeries[];
      equipmentStates: DashboardStat[];
      recentLogs: DashboardActivityItem[];
      upcomingBookings: DashboardActivityItem[];
      nearbyPharmacies: DashboardActivityItem[];
      alerts: DashboardAlertItem[];
    } | null;
    pharmacy?: {
      __typename?: "PharmacyDashboardOverview";
      profile: DashboardProfile;
      stats: DashboardStat[];
      activitySeries: DashboardSeries[];
      inventoryStatus: DashboardStat[];
      topDrugs: DashboardActivityItem[];
      lowStockItems: DashboardActivityItem[];
      recentUpdates: DashboardActivityItem[];
      alerts: DashboardAlertItem[];
    } | null;
  } | null;
};

export const DASHBOARD_OVERVIEW = gql`
  query DashboardOverview {
    dashboardOverview {
      role
      admin {
        stats {
          label
          value
          helper
          tone
        }
        growthSeries {
          key
          label
          color
          points {
            label
            value
          }
        }
        inventoryStatus {
          label
          value
          helper
          tone
        }
        recentItems {
          id
          title
          subtitle
          meta
          href
          createdAt
        }
        topHospitals {
          label
          value
          helper
          tone
        }
        topPharmacies {
          label
          value
          helper
          tone
        }
        alerts {
          id
          title
          description
          severity
        }
        map {
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
      hospital {
        profile {
          id
          name
          email
          phone
          address
          province
          latitude
          longitude
        }
        stats {
          label
          value
          helper
          tone
        }
        activitySeries {
          key
          label
          color
          points {
            label
            value
          }
        }
        equipmentStates {
          label
          value
          helper
          tone
        }
        recentLogs {
          id
          title
          subtitle
          meta
          href
          createdAt
        }
        upcomingBookings {
          id
          title
          subtitle
          meta
          href
          createdAt
        }
        nearbyPharmacies {
          id
          title
          subtitle
          meta
          href
          createdAt
        }
        alerts {
          id
          title
          description
          severity
        }
      }
      pharmacy {
        profile {
          id
          name
          email
          phone
          address
          province
          latitude
          longitude
        }
        stats {
          label
          value
          helper
          tone
        }
        activitySeries {
          key
          label
          color
          points {
            label
            value
          }
        }
        inventoryStatus {
          label
          value
          helper
          tone
        }
        topDrugs {
          id
          title
          subtitle
          meta
          href
          createdAt
        }
        lowStockItems {
          id
          title
          subtitle
          meta
          href
          createdAt
        }
        recentUpdates {
          id
          title
          subtitle
          meta
          href
          createdAt
        }
        alerts {
          id
          title
          description
          severity
        }
      }
    }
  }
` as DocumentNode<DashboardOverviewQuery, never>;

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
