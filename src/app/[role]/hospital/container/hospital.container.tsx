"use client";
import { useQuery } from "@apollo/client/react";
import { debounce } from "lodash";
import { useEffect, useState } from "react";

import PageToolbar from "@/components/forms/toolbar";
import { HospitalsDocument } from "@/generated/graphql";

import HospitalListTable from "../components/hospital.list";

export default function HospitalContainer() {
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

  const { data, loading, error } = useQuery(HospitalsDocument, {
    variables: {
      where: {
        search: debouncedSearch || undefined,
        address: undefined,
      },
      take: rowsPerPage,
      skip: page,
    },
    fetchPolicy: "no-cache",
  });

  if (loading) return <div>Уншиж байна...</div>;
  if (error) return <div>Алдаа: {error.message}</div>;

  console.log("Staff data:", open);

  const hospitalsData = data?.hospitals ?? { data: [], count: 0 };

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
