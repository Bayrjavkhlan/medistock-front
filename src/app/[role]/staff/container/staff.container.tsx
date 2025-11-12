"use client";
import { debounce } from "lodash";
import { useEffect, useState } from "react";

import { type UserSortField } from "@/constants/types";
import type { UsersOrderByInput } from "@/generated/graphql";
import { EnumSortOrder, useUsersQuery } from "@/generated/graphql";

import StaffListTable from "../components/staff.list";
import StaffToolbar from "../components/staff.toolbox";

export default function StaffContainer() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<{
    field: UserSortField;
    order: EnumSortOrder;
  }>({
    field: "name",
    order: EnumSortOrder.ASC,
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const handler = debounce(() => setDebouncedSearch(search), 500);
    handler();
    return () => handler.cancel();
  }, [search]);

  const buildOrderBy = (): UsersOrderByInput => {
    const order: Partial<Record<UserSortField, EnumSortOrder>> = {};
    order[sortBy.field] = sortBy.order;
    return order as UsersOrderByInput;
  };

  const { data, loading, error } = useUsersQuery({
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

  const users = data?.users?.data ?? [];
  const totalCount = data?.users?.count ?? 0;

  return (
    <>
      <StaffToolbar search={search} onSearchChange={setSearch} />
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
