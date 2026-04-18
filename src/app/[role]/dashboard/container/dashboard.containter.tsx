"use client";

import { useQuery } from "@apollo/client/react";
import { useSession } from "next-auth/react";

import AbilityGuard from "@/components/AbilityGuard";
import StateView from "@/components/core/StateView";
import {
  ADMIN_MAP_LOCATIONS,
  type AdminMapLocationsQuery,
} from "@/features/dashboard/graphql/queries.gql";
import {
  PharmacyDrugsDocument,
  type PharmacyDrugsQuery,
  type PharmacyDrugsQueryVariables,
} from "@/features/medicine/graphql/queries.gql";
import {
  useEquipmentLogsQuery,
  useEquipmentsQuery,
  useHospitalsQuery,
  useMembershipsQuery,
  usePharmaciesQuery,
} from "@/generated/hooks";
import { useActiveOrganization } from "@/hooks/useActiveOrganization";
import { getDashboardSubjectForRole, getPortalRole } from "@/lib/casl";
import { useAbility } from "@/lib/casl/useAbility";

import AdminDashboard from "../components/admin-dashboard";
import HospitalDashboard from "../components/hospital-dashboard";
import PharmacyDashboard from "../components/pharmacy-dashboard";
import UserDashboard from "../components/user-dashboard";

export default function DashboardContainer() {
  const { data: session } = useSession();
  const { activeOrganization } = useActiveOrganization();
  const portalRole = getPortalRole(
    session?.user ?? null,
    activeOrganization ?? null,
  );
  const subject = getDashboardSubjectForRole(portalRole);

  const ability = useAbility();
  const canRead = ability.can("read", subject);
  const role =
    portalRole === "ADMIN"
      ? "admin"
      : portalRole?.startsWith("HOSPITAL_")
        ? "hospital"
        : portalRole?.startsWith("PHARMACY_")
          ? "pharmacy"
          : "user";
  const organizationName =
    activeOrganization?.organization?.name ?? "Танай байгууллага";

  const baseVars = { take: 1, skip: 0 };

  const equipmentsQuery = useEquipmentsQuery({
    variables: { ...baseVars },
    fetchPolicy: "no-cache",
    skip: !canRead,
  });

  const logsQuery = useEquipmentLogsQuery({
    variables: { ...baseVars },
    fetchPolicy: "no-cache",
    skip: !canRead,
  });

  const hospitalsQuery = useHospitalsQuery({
    variables: { ...baseVars, where: undefined },
    fetchPolicy: "no-cache",
    skip: !canRead || role !== "admin",
  });

  const pharmaciesQuery = usePharmaciesQuery({
    variables: { ...baseVars, where: undefined },
    fetchPolicy: "no-cache",
    skip: !canRead || role !== "admin",
  });

  const staffQuery = useMembershipsQuery({
    variables: { ...baseVars },
    fetchPolicy: "no-cache",
    skip: !canRead || (role !== "admin" && role !== "hospital"),
  });

  const drugsQuery = useQuery<PharmacyDrugsQuery, PharmacyDrugsQueryVariables>(
    PharmacyDrugsDocument,
    {
      variables: { ...baseVars, where: undefined },
      fetchPolicy: "no-cache",
      skip: !canRead || role !== "pharmacy",
    },
  );

  const mapLocationsQuery = useQuery<AdminMapLocationsQuery>(
    ADMIN_MAP_LOCATIONS,
    {
      fetchPolicy: "no-cache",
      skip: !canRead || role !== "admin",
    },
  );

  const loading =
    equipmentsQuery.loading ||
    logsQuery.loading ||
    hospitalsQuery.loading ||
    pharmaciesQuery.loading ||
    staffQuery.loading ||
    drugsQuery.loading ||
    mapLocationsQuery.loading;

  const error =
    equipmentsQuery.error ||
    logsQuery.error ||
    hospitalsQuery.error ||
    pharmaciesQuery.error ||
    staffQuery.error ||
    drugsQuery.error ||
    mapLocationsQuery.error;

  const equipmentCount = equipmentsQuery.data?.equipments?.count ?? 0;
  const logCount = logsQuery.data?.equipmentLogs?.count ?? 0;
  const hospitalCount = hospitalsQuery.data?.hospitals?.count ?? 0;
  const pharmacyCount = pharmaciesQuery.data?.pharmacies?.count ?? 0;
  const staffCount = staffQuery.data?.memberships?.count ?? 0;
  const drugCount = drugsQuery.data?.pharmacyDrugs?.count ?? 0;
  const hospitals = mapLocationsQuery.data?.adminMapLocations?.hospitals ?? [];
  const drugstores =
    mapLocationsQuery.data?.adminMapLocations?.drugstores ?? [];

  const isEmpty =
    role === "admin"
      ? hospitalCount +
          pharmacyCount +
          equipmentCount +
          logCount +
          staffCount ===
        0
      : role === "hospital"
        ? equipmentCount + logCount + staffCount === 0
        : role === "pharmacy"
          ? equipmentCount + logCount + drugCount === 0
          : equipmentCount + logCount === 0;

  return (
    <AbilityGuard action="read" subject={subject}>
      {loading ? (
        <StateView title="Уншиж байна..." loading />
      ) : error ? (
        <StateView title="Алдаа гарлаа" description={error.message} />
      ) : isEmpty ? (
        <StateView
          title="Өгөгдөл байхгүй байна"
          description="Ирсэн өгөгдөл алга."
        />
      ) : role === "admin" ? (
        <AdminDashboard
          hospitalCount={hospitalCount}
          pharmacyCount={pharmacyCount}
          equipmentCount={equipmentCount}
          logCount={logCount}
          staffCount={staffCount}
          hospitals={hospitals}
          drugstores={drugstores}
        />
      ) : role === "hospital" ? (
        <HospitalDashboard
          organizationName={organizationName}
          equipmentCount={equipmentCount}
          logCount={logCount}
          staffCount={staffCount}
        />
      ) : role === "pharmacy" ? (
        <PharmacyDashboard
          organizationName={organizationName}
          equipmentCount={equipmentCount}
          logCount={logCount}
          drugCount={drugCount}
        />
      ) : (
        <UserDashboard
          organizationName={organizationName}
          equipmentCount={equipmentCount}
          logCount={logCount}
        />
      )}
    </AbilityGuard>
  );
}
