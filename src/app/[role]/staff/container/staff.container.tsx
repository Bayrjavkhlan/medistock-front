"use client";
import { debounce } from "lodash";
import { useEffect, useState } from "react";

import { USER_SORT_FIELDS, type UserSortField } from "@/constants/types";
import type { UsersOrderByInput } from "@/generated/graphql";
import {
  EnumSortOrder,
  EnumUserRole,
  useUsersQuery,
} from "@/generated/graphql";

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
    switch (sortBy.field) {
      case "name":
        return { name: sortBy.order };
      case "email":
        return { email: sortBy.order };
      case "phone":
        return { phone: sortBy.order };
      default:
        return { name: EnumSortOrder.ASC };
    }
  };

  const { data, loading, error } = useUsersQuery({
    variables: {
      where: {
        search: debouncedSearch || undefined,
        roleKey: EnumUserRole.STAFF,
      },
      orderBy: buildOrderBy(),
      take: rowsPerPage,
      skip: page * rowsPerPage,
    },
    fetchPolicy: "cache-and-network",
  });

  if (loading) return <div>Уншиж байна...</div>;
  if (error) return <div>Алдаа: {error.message}</div>;

  const users = data?.users?.data ?? [];
  const totalCount = data?.users?.count ?? 0;

  return (
    <>
      <StaffToolbar
        search={search}
        onSearchChange={setSearch}
        sortBy={`${sortBy.field}_${sortBy.order.toLowerCase()}`}
        onSortChange={(value) => {
          const [field, orderStr] = value.split("_") as [string, string];

          if (!USER_SORT_FIELDS.includes(field as any)) return;

          const order =
            orderStr === "asc" ? EnumSortOrder.ASC : EnumSortOrder.DESC;

          setSortBy({
            field: field as UserSortField,
            order,
          });
          setPage(0);
        }}
      />
      <StaffListTable
        users={users}
        totalCount={totalCount}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={setPage}
        onRowsPerPageChange={(newRows) => {
          setRowsPerPage(newRows);
          setPage(0);
        }}
      />
    </>
  );
}
