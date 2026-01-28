"use client";
import { useQuery } from "@apollo/client/react";
import { Button } from "@mui/material";
import { debounce } from "lodash";
import { useEffect, useState } from "react";

import PageToolbar from "@/components/forms/toolbar";
import { type StaffSortField } from "@/constants/types";
import type { StaffsOrderByInput } from "@/generated/graphql";
import { EnumSortOrder, StaffsDocument } from "@/generated/graphql";
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

  const buildOrderBy = (): StaffsOrderByInput => {
    const order: Partial<Record<StaffSortField, EnumSortOrder>> = {};
    order[sortBy.field] = sortBy.order;
    return order as StaffsOrderByInput;
  };

  const { data, loading, error, refetch } = useQuery(StaffsDocument, {
    variables: {
      where: {
        search: debouncedSearch || undefined,
        roleKey: undefined,
      },
      orderBy: buildOrderBy(),
      take: rowsPerPage,
      skip: page,
    },
    fetchPolicy: "no-cache",
  });

  // if (loading) return <div>Уншиж байна...</div>;
  if (error) return <div>Алдаа: {error.message}</div>;

  console.log("Staff data:", data);

  const users = data?.staffs?.data ?? [];
  const totalCount = data?.staffs?.count ?? 0;

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
      />
      <StaffListTable
        users={users}
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
