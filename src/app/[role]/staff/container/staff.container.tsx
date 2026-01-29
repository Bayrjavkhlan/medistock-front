"use client";
import { useQuery } from "@apollo/client/react";
import { Button } from "@mui/material";
import { debounce } from "lodash";
import { useEffect, useState } from "react";

import PageToolbar from "@/components/forms/toolbar";
import { type StaffSortField } from "@/constants/types";
import type { Membership } from "@/generated/graphql";
import { EnumSortOrder, MembershipsDocument } from "@/generated/graphql";
import { useActiveOrganization } from "@/hooks/useActiveOrganization";
import { useThemeMode } from "@/hooks/useThemeMode";

import CreateStaffModal from "../components/modal/staff.modal";
import StaffListTable from "../components/staff.list";

export default function StaffContainer() {
  const { toggleMode } = useThemeMode();

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<{
    field: StaffSortField;
    order: EnumSortOrder;
  }>({
    field: "name",
    order: EnumSortOrder.Asc,
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const handler = debounce(() => setDebouncedSearch(search), 500);
    handler();
    return () => handler.cancel();
  }, [search]);

  const { activeOrganization } = useActiveOrganization();

  const { data, loading, error, refetch } = useQuery(MembershipsDocument, {
    variables: {
      take: rowsPerPage,
      skip: page * rowsPerPage,
    },
    fetchPolicy: "no-cache",
  });

  // if (loading) return <div>Уншиж байна...</div>;
  if (error) return <div>Алдаа: {error.message}</div>;

  console.log("Staff data:", data);

  const memberships = data?.memberships?.data ?? [];
  const totalCount = data?.memberships?.count ?? 0;

  const normalize = (value: string | null | undefined) =>
    (value ?? "").toLowerCase();

  const filteredMemberships = memberships.filter((membership) => {
    if (!debouncedSearch) return true;
    const target =
      normalize(membership.user?.name) +
      normalize(membership.user?.email) +
      normalize(membership.user?.phone) +
      normalize(membership.role);
    return target.includes(normalize(debouncedSearch));
  });

  const sortedMemberships = [...filteredMemberships].sort((a, b) => {
    const direction = sortBy.order === EnumSortOrder.Asc ? 1 : -1;
    const field = sortBy.field;
    if (field === "email") {
      return (
        normalize(a.user?.email).localeCompare(normalize(b.user?.email)) *
        direction
      );
    }
    if (field === "role") {
      return normalize(a.role).localeCompare(normalize(b.role)) * direction;
    }
    return (
      normalize(a.user?.name).localeCompare(normalize(b.user?.name)) * direction
    );
  });

  return (
    <>
      <Button onClick={toggleMode}>ToggleMode</Button>

      <PageToolbar
        search={search}
        onSearchChange={setSearch}
        onCreateClick={() => setOpen(true)}
        placeholder="Ажилтан хайх..."
        buttonText="Шинэ ажилтан нэмэх"
      />
      <CreateStaffModal
        open={open}
        onClose={() => setOpen(false)}
        onSuccess={() => {
          setOpen(false);
          refetch();
        }}
        activeOrgId={activeOrganization?.organization?.id ?? null}
      />
      <StaffListTable
        memberships={sortedMemberships as Membership[]}
        totalCount={totalCount}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={(newPage) => {
          setPage(newPage);
        }}
        onRowsPerPageChange={(newRows) => {
          setRowsPerPage(newRows);
          setPage(0);
        }}
        sortBy={sortBy}
        onSort={(field, order) => {
          setSortBy({ field, order });
          setPage(0);
        }}
        loading={loading}
      />
    </>
  );
}
