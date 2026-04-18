"use client";

import { useMutation, useQuery } from "@apollo/client/react";
import { debounce } from "lodash";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";

import AbilityGuard from "@/components/AbilityGuard";
import ConfirmDialog from "@/components/core/ConfirmDialog";
import StateView from "@/components/core/StateView";
import Toast from "@/components/core/Toast";
import PageToolbar from "@/components/forms/toolbar";
import { DRUG_DELETE } from "@/features/medicine/graphql/mutation.gql";
import {
  DrugsDocument,
  type DrugsQuery,
  type DrugsQueryVariables,
} from "@/features/medicine/graphql/queries.gql";
import { useActiveOrganization } from "@/hooks/useActiveOrganization";
import { getMedicineSubjectForRole, getPortalRole } from "@/lib/casl";
import { useAbility } from "@/lib/casl/useAbility";
import { getApolloErrorMessage } from "@/utils/getApolloErrorMessage";

import MedicineListTable from "../components/medicine.list";
import MedicineModal from "../components/medicine.modal";

export default function MedicineContainer() {
  const router = useRouter();
  const { data: session } = useSession();
  const { activeOrganization } = useActiveOrganization();
  const portalRole = getPortalRole(
    session?.user ?? null,
    activeOrganization ?? null,
  );
  const subject = getMedicineSubjectForRole(portalRole);

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
  const [rowsPerPage, setRowsPerPage] = useState(10);
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

  const { data, loading, error, refetch } = useQuery<
    DrugsQuery,
    DrugsQueryVariables
  >(DrugsDocument, {
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

  const drugsData: NonNullable<DrugsQuery["drugs"]> = {
    count: data?.drugs?.count ?? 0,
    data: data?.drugs?.data ?? [],
  };

  const editingDrug = useMemo(
    () => (drugsData.data ?? []).find((item) => item.id === editingId) ?? null,
    [drugsData.data, editingId],
  );

  const [deleteDrug, deleteState] = useMutation(DRUG_DELETE, {
    onCompleted: async () => {
      setToast({
        message: "Эмийн бүртгэлийг амжилттай устгалаа.",
        severity: "success",
      });
      setDeleteId(null);
      await refetch();
    },
    onError: (mutationError) => {
      setToast({
        message: getApolloErrorMessage(
          mutationError,
          "Эмийн бүртгэлийг устгах үед алдаа гарлаа.",
        ),
        severity: "error",
      });
    },
  });

  const rolePrefix = session?.user?.isPlatformAdmin
    ? "admin"
    : portalRole === "USER"
      ? "user"
      : "pharmacy";

  const handleSuccess = async (message: string) => {
    setToast({ message, severity: "success" });
    setOpen(false);
    setEditingId(null);
    await refetch();
  };

  return (
    <AbilityGuard action="read" subject={subject}>
      {loading ? (
        <StateView title="Эмийн бүртгэлийг уншиж байна..." loading />
      ) : error ? (
        <StateView title="Алдаа гарлаа" description={error.message} />
      ) : (
        <>
          <PageToolbar
            search={search}
            onSearchChange={setSearch}
            onCreateClick={() => {
              setEditingId(null);
              setOpen(true);
            }}
            placeholder="Эмийн нэр, хэлбэр, үйлдвэрлэгчээр хайх..."
            buttonText="Шинэ эм нэмэх"
            createDisabled={!canCreate}
          />
          <MedicineModal
            open={open}
            mode={editingId ? "update" : "create"}
            initialData={editingDrug}
            onClose={() => {
              setOpen(false);
              setEditingId(null);
            }}
            onSuccess={() =>
              handleSuccess(
                editingId
                  ? "Эмийн мэдээллийг амжилттай шинэчиллээ."
                  : "Эмийн бүртгэлийг амжилттай үүсгэлээ.",
              )
            }
          />
          <MedicineListTable
            drugs={drugsData}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={setPage}
            onRowsPerPageChange={(newRows) => {
              setRowsPerPage(newRows);
              setPage(0);
            }}
            onView={(id) => router.push(`/${rolePrefix}/medicine/${id}`)}
            onEdit={(id) => {
              setEditingId(id);
              setOpen(true);
            }}
            onDelete={setDeleteId}
            canUpdate={canUpdate}
            canDelete={canDelete}
            loading={loading}
          />
          <ConfirmDialog
            open={!!deleteId}
            title="Эмийн бүртгэлийг устгах уу?"
            confirmText="Устгах"
            loading={deleteState.loading}
            onClose={() => setDeleteId(null)}
            onConfirm={() => {
              if (!deleteId) return;
              deleteDrug({ variables: { id: deleteId } });
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
