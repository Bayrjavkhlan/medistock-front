"use client";

import { useQuery } from "@apollo/client/react";
import { useParams } from "next/navigation";

import AbilityGuard from "@/components/AbilityGuard";
import StateView from "@/components/core/StateView";
import type { Subject } from "@/constants/routes";
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
import { useAbility } from "@/lib/casl/useAbility";

import AdminDashboard from "../components/admin-dashboard";
import HospitalDashboard from "../components/hospital-dashboard";
import PharmacyDashboard from "../components/pharmacy-dashboard";
import UserDashboard from "../components/user-dashboard";

const getDashboardSubject = (role: string | null): Subject => {
  if (role === "admin") return "Admin_Dashboard";
  if (role === "hospital") return "Hospital_Dashboard";
  if (role === "pharmacy") return "Pharmacy_Dashboard";
  return "User_Dashboard";
};

export default function DashboardContainer() {
  const params = useParams();
  const roleParam = typeof params?.role === "string" ? params.role : "user";
  const role = roleParam.toLowerCase();
  const subject = getDashboardSubject(role);

  const ability = useAbility();
  const canRead = ability.can("read", subject);

  const { activeOrganization } = useActiveOrganization();
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

  const loading =
    equipmentsQuery.loading ||
    logsQuery.loading ||
    hospitalsQuery.loading ||
    pharmaciesQuery.loading ||
    staffQuery.loading ||
    drugsQuery.loading;

  const error =
    equipmentsQuery.error ||
    logsQuery.error ||
    hospitalsQuery.error ||
    pharmaciesQuery.error ||
    staffQuery.error ||
    drugsQuery.error;

  const equipmentCount = equipmentsQuery.data?.equipments?.count ?? 0;
  const logCount = logsQuery.data?.equipmentLogs?.count ?? 0;
  const hospitalCount = hospitalsQuery.data?.hospitals?.count ?? 0;
  const pharmacyCount = pharmaciesQuery.data?.pharmacies?.count ?? 0;
  const staffCount = staffQuery.data?.memberships?.count ?? 0;
  const drugCount = drugsQuery.data?.pharmacyDrugs?.count ?? 0;

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
