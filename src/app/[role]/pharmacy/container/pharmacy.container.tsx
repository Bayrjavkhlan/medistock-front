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
import { PHARMACY_DELETE } from "@/features/pharmacy/graphql/mutations.gql";
import type { PharmaciesQuery } from "@/generated/hooks";
import { usePharmaciesQuery } from "@/generated/hooks";
import { useAbility } from "@/lib/casl/useAbility";

import PharmacyListTable from "../components/pharmacy.list";
import PharmacyModal from "../components/pharmacy.modal";

export default function PharmacyContainer() {
  const params = useParams();
  const roleParam = typeof params?.role === "string" ? params.role : "user";
  const role = roleParam.toLowerCase();
  const subject = role === "user" ? "User_Pharmacy" : "Admin_Pharmacy";
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

  const { data, loading, error, refetch } = usePharmaciesQuery({
    variables: {
      where: {
        search: debouncedSearch || undefined,
      },
      take: rowsPerPage,
      skip: page * rowsPerPage,
    },
    fetchPolicy: "no-cache",
    skip: !canRead,
  });

  const pharmaciesData: NonNullable<PharmaciesQuery["pharmacies"]> = {
    count: data?.pharmacies?.count ?? 0,
    data: data?.pharmacies?.data ?? [],
  };
  const editingPharmacy = useMemo(
    () => pharmaciesData.data?.find((item) => item.id === editingId) ?? null,
    [editingId, pharmaciesData.data],
  );

  const [deletePharmacy, deleteState] = useMutation(PHARMACY_DELETE, {
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
            placeholder="Эмийн сан хайх..."
            buttonText="Шинэ эмийн сан нэмэх"
            createDisabled={!canCreate}
          />
          <PharmacyModal
            open={open}
            mode={editingId ? "update" : "create"}
            initialData={editingPharmacy}
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
          <PharmacyListTable
            pharmacies={pharmaciesData}
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
            title="Эмийн сан устгах уу?"
            confirmText="Устгах"
            loading={deleteState.loading}
            onClose={() => setDeleteId(null)}
            onConfirm={() => {
              if (!deleteId) return;
              deletePharmacy({ variables: { pharmacyDeleteId: deleteId } });
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
