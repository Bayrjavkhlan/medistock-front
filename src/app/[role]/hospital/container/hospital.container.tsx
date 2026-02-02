"use client";
import { useMutation } from "@apollo/client/react";
import { debounce } from "lodash";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import AbilityGuard from "@/components/AbilityGuard";
import ConfirmDialog from "@/components/core/ConfirmDialog";
import StateView from "@/components/core/StateView";
import Toast from "@/components/core/Toast";
import PageToolbar from "@/components/forms/toolbar";
import { HOSPITAL_DELETE } from "@/features/hospital/graphql/mutation.gql";
import type { HospitalsQuery } from "@/generated/graphql";
import { useHospitalsQuery } from "@/generated/hooks";
import { useAbility } from "@/lib/casl/useAbility";

import HospitalListTable from "../components/hospital.list";
import HospitalModal from "../components/hospital.modal";

export default function HospitalContainer() {
  const params = useParams();
  const roleParam = typeof params?.role === "string" ? params.role : "user";
  const role = roleParam.toLowerCase();
  const subject = role === "user" ? "User_Hospital" : "Admin_Hospital";

  const ability = useAbility();
  const canRead = ability.can("read", subject);
  const canCreate = ability.can("create", subject);
  const canUpdate = ability.can("update", subject);
  const canDelete = ability.can("delete", subject);

  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [toast, setToast] = useState<{
    message: string;
    severity: "success" | "error";
  } | null>(null);

  useEffect(() => {
    const handler = debounce(() => setDebouncedSearch(search), 500);
    handler();
    return () => handler.cancel();
  }, [search]);

  const { data, loading, error, refetch } = useHospitalsQuery({
    variables: {
      where: {
        search: debouncedSearch || undefined,
        address: undefined,
      },
      take: rowsPerPage,
      skip: page * rowsPerPage,
    },
    fetchPolicy: "no-cache",
    skip: !canRead,
  });

  const hospitalsData: NonNullable<HospitalsQuery["hospitals"]> = {
    count: data?.hospitals?.count ?? 0,
    data: data?.hospitals?.data ?? [],
  };
  const editingHospital = useMemo(
    () => hospitalsData.data?.find((item) => item.id === editingId) ?? null,
    [editingId, hospitalsData.data],
  );

  const [deleteHospital, deleteState] = useMutation(HOSPITAL_DELETE, {
    onCompleted: async () => {
      setToast({ message: "Амжилттай устгалаа.", severity: "success" });
      setDeleteId(null);
      await refetch();
    },
    onError: (err) => {
      setToast({ message: err.message, severity: "error" });
    },
  });

  const handleCreate = () => {
    setEditingId(null);
    setOpen(true);
  };

  const handleSuccess = async (message: string) => {
    setToast({ message, severity: "success" });
    setOpen(false);
    setEditingId(null);
    await refetch();
  };

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
            onCreateClick={handleCreate}
            placeholder="Эмнэлэг хайх..."
            buttonText="Шинэ эмнэлэг нэмэх"
            createDisabled={!canCreate}
          />
          <HospitalModal
            open={open}
            mode={editingId ? "update" : "create"}
            initialData={editingHospital}
            onClose={() => {
              setOpen(false);
              setEditingId(null);
            }}
            onSuccess={() =>
              handleSuccess(
                editingId ? "Амжилттай шинэчиллээ." : "Амжилттай үүсгэлээ.",
              )
            }
          />
          <HospitalListTable
            hospitals={hospitalsData}
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
            onEdit={(id) => {
              setEditingId(id);
              setOpen(true);
            }}
            onDelete={(id) => setDeleteId(id)}
            canUpdate={canUpdate}
            canDelete={canDelete}
          />
          <ConfirmDialog
            open={!!deleteId}
            title="Эмнэлэг устгах уу?"
            confirmText="Устгах"
            loading={deleteState.loading}
            onClose={() => setDeleteId(null)}
            onConfirm={() => {
              if (!deleteId) return;
              deleteHospital({ variables: { hospitalDeleteId: deleteId } });
            }}
          />
          <Toast
            open={!!toast}
            message={toast?.message ?? ""}
            severity={toast?.severity ?? "success"}
            onClose={() => setToast(null)}
          />
        </>
      )}
    </AbilityGuard>
  );
}
