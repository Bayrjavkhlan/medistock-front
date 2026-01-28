"use client";
import { useQuery } from "@apollo/client/react";
import { debounce } from "lodash";
import { useEffect, useState } from "react";

import PageToolbar from "@/components/forms/toolbar";
import { EquipmentsDocument } from "@/generated/graphql";

import EquipmentListTable from "../components/euipment.list";

// import CreateStaffModal from "../components/modal/staff.modal";
// import StaffListTable from "../components/staff.list";

export default function EquipmentContainer() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const handler = debounce(() => setDebouncedSearch(search), 500);
    handler();
    return () => handler.cancel();
  }, [search]);
  console.log("open:\t", open);
  const { data, loading, error } = useQuery(EquipmentsDocument, {
    variables: {
      where: {
        search: debouncedSearch || undefined,
      },
      take: rowsPerPage,
      skip: page,
    },
    fetchPolicy: "no-cache",
  });

  if (loading) return <div>Уншиж байна...</div>;
  if (error) return <div>Алдаа: {error.message}</div>;

  const equipmentsData = data?.equipments ?? { data: [], count: 0 };

  return (
    <>
      <PageToolbar
        search={search}
        onSearchChange={setSearch}
        onCreateClick={() => setOpen(true)}
        placeholder="Ажилтан хайх..."
        buttonText="Шинэ ажилтан нэмэх"
      />
      {/* <CreateHospitalModal
        open={open}
        onClose={() => setOpen(false)}
        onSuccess={() => {
          setOpen(false);
          refetch();
        }}
      /> */}
      <EquipmentListTable
        equipments={equipmentsData}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={(newPage) => {
          setPage(newPage);
        }}
        onRowsPerPageChange={(newRows) => {
          setRowsPerPage(newRows);
          setPage(0);
        }}
        // sortBy={sortBy}
        // onSort={(field, order) => {
        //   setSortBy({ field, order });
        //   setPage(0);
        // }}
        loading={loading}
      />
    </>
  );
}
