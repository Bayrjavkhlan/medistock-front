"use client";

import { debounce } from "lodash";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import AbilityGuard from "@/components/AbilityGuard";
import StateView from "@/components/core/StateView";
import PageToolbar from "@/components/forms/toolbar";
import { useEquipmentLogsQuery } from "@/generated/hooks";
import { useAbility } from "@/lib/casl/useAbility";

import EquipmentLogList from "../components/equipment-log.list";

export default function EquipmentLogContainer() {
  const params = useParams();
  const roleParam = typeof params?.role === "string" ? params.role : "user";
  const role = roleParam.toLowerCase();
  const subject =
    role === "admin"
      ? "Admin_EquipmentLog"
      : role === "hospital"
        ? "Hospital_EquipmentLog"
        : role === "pharmacy"
          ? "Pharmacy_EquipmentLog"
          : "User_EquipmentLog";

  const ability = useAbility();
  const canRead = ability.can("read", subject);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const handler = debounce(() => setDebouncedSearch(search), 500);
    handler();
    return () => handler.cancel();
  }, [search]);

  const { data, loading, error } = useEquipmentLogsQuery({
    variables: {
      take: rowsPerPage,
      skip: page * rowsPerPage,
      where: {
        search: debouncedSearch || undefined,
      },
    },
    fetchPolicy: "no-cache",
    skip: !canRead,
  });

  const logsData = data?.equipmentLogs ?? { data: [], count: 0 };

  return (
    <AbilityGuard action="read" subject={subject}>
      {loading ? (
        <StateView title="Уншиж байна..." loading />
      ) : error ? (
        <StateView title="Алдаа гарлаа" description={error.message} />
      ) : (
        <>
          <PageToolbar
            search={search}
            onSearchChange={setSearch}
            onCreateClick={() => {}}
            placeholder="Лог хайх..."
            buttonText="Шинэ лог"
            showCreate={false}
          />
          <EquipmentLogList
            logs={logsData}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={(newPage) => {
              setPage(newPage);
            }}
            onRowsPerPageChange={(newRows) => {
              setRowsPerPage(newRows);
              setPage(0);
            }}
            loading={loading}
          />
        </>
      )}
    </AbilityGuard>
  );
}
