import { useMutation, useQuery } from "@apollo/client/react";
import { useCallback, useEffect, useMemo } from "react";

import { MeDocument, SelectOrganizationDocument } from "@/generated/graphql";

const ACTIVE_ORG_STORAGE_KEY = "medistock.activeOrgId";

const getStoredOrgId = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(ACTIVE_ORG_STORAGE_KEY);
};

export const useActiveOrganization = () => {
  const { data, loading, refetch } = useQuery(MeDocument, {
    fetchPolicy: "cache-and-network",
  });

  const [selectOrganization, { loading: selecting }] = useMutation(
    SelectOrganizationDocument,
  );

  const memberships = data?.me?.user?.memberships ?? [];
  const activeOrganization = data?.me?.activeOrganization ?? null;

  const setActiveOrganization = useCallback(
    async (orgId: string) => {
      await selectOrganization({ variables: { orgId } });
      if (typeof window !== "undefined") {
        localStorage.setItem(ACTIVE_ORG_STORAGE_KEY, orgId);
      }
      await refetch();
    },
    [refetch, selectOrganization],
  );

  const activeOrgId = activeOrganization?.organization?.id ?? null;

  useEffect(() => {
    if (loading || selecting) return;
    if (activeOrgId || memberships.length === 0) return;
    const storedOrgId = getStoredOrgId();
    const fallbackOrgId =
      memberships.find((item) => item.organization.id === storedOrgId)
        ?.organization.id ?? memberships[0]?.organization.id;
    if (fallbackOrgId) {
      void setActiveOrganization(fallbackOrgId);
    }
  }, [activeOrgId, loading, memberships, selecting, setActiveOrganization]);

  const membershipMap = useMemo(() => {
    return new Map(
      memberships.map((item) => [item.organization.id, item.role]),
    );
  }, [memberships]);

  return {
    memberships,
    activeOrganization,
    activeOrgId,
    membershipMap,
    setActiveOrganization,
    loading,
    selecting,
  };
};
