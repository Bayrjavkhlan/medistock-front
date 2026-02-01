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
import { type StaffSortField } from "@/constants/types";
import { MEMBERSHIP_DELETE } from "@/features/staff/graphql/mutations.gql";
import type { Membership } from "@/generated/graphql";
import { EnumSortOrder } from "@/generated/graphql";
import { useMembershipsQuery } from "@/generated/hooks";
import { useActiveOrganization } from "@/hooks/useActiveOrganization";
import { useAbility } from "@/lib/casl/useAbility";

import StaffModal from "../components/modal/staff.modal";
import StaffListTable from "../components/staff.list";

export default function StaffContainer() {
  const params = useParams();
  const roleParam = typeof params?.role === "string" ? params.role : "user";
  const role = roleParam.toLowerCase();
  const subject =
    role === "admin"
      ? "Admin_Staff"
      : role === "pharmacy"
        ? "Pharmacy_Staff"
        : "Hospital_Staff";

  const ability = useAbility();
  const canRead = ability.can("read", subject);
  const canCreate = ability.can("create", subject);
  const canUpdate = ability.can("update", subject);
  const canDelete = ability.can("delete", subject);

  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
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
  const [toast, setToast] = useState<{
    message: string;
    severity: "success" | "error";
  } | null>(null);

  useEffect(() => {
    const handler = debounce(() => setDebouncedSearch(search), 500);
    handler();
    return () => handler.cancel();
  }, [search]);

  const { activeOrganization } = useActiveOrganization();

  const { data, loading, error, refetch } = useMembershipsQuery({
    variables: {
      take: rowsPerPage,
      skip: page * rowsPerPage,
    },
    fetchPolicy: "no-cache",
    skip: !canRead,
  });

  const memberships = data?.memberships?.data ?? [];
  const totalCount = data?.memberships?.count ?? 0;
  const editingMembership = useMemo(
    () => memberships.find((item) => item.id === editingId) ?? null,
    [editingId, memberships],
  );

  const [deleteMembership, deleteState] = useMutation(MEMBERSHIP_DELETE, {
    onCompleted: async () => {
      setToast({ message: "Амжилттай устгалаа.", severity: "success" });
      setDeleteId(null);
      await refetch();
    },
    onError: (err) => {
      setToast({ message: err.message, severity: "error" });
    },
  });

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
            onCreateClick={() => {
              setEditingId(null);
              setOpen(true);
            }}
            placeholder="Ажилтан хайх..."
            buttonText="Шинэ ажилтан нэмэх"
            createDisabled={!canCreate}
          />
          <StaffModal
            open={open}
            onClose={() => setOpen(false)}
            onSuccess={() => {
              setToast({
                message: editingId
                  ? "Амжилттай шинэчиллээ."
                  : "Амжилттай үүсгэлээ.",
                severity: "success",
              });
              setOpen(false);
              setEditingId(null);
              refetch();
            }}
            activeOrgId={activeOrganization?.organization?.id ?? null}
            mode={editingId ? "update" : "create"}
            initialData={editingMembership}
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
            onEdit={(membershipId) => {
              setEditingId(membershipId);
              setOpen(true);
            }}
            onDelete={(membershipId) => setDeleteId(membershipId)}
            canUpdate={canUpdate}
            canDelete={canDelete}
          />
          <ConfirmDialog
            open={!!deleteId}
            title="Ажилтан устгах уу?"
            confirmText="Устгах"
            loading={deleteState.loading}
            onClose={() => setDeleteId(null)}
            onConfirm={() => {
              if (!deleteId) return;
              deleteMembership({ variables: { membershipDeleteId: deleteId } });
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
