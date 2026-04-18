"use client";

import { useQuery } from "@apollo/client/react";
import { debounce } from "lodash";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import AbilityGuard from "@/components/AbilityGuard";
import StateView from "@/components/core/StateView";
import PageToolbar from "@/components/forms/toolbar";
import {
  PharmacyDrugsDocument,
  type PharmacyDrugsQuery,
  type PharmacyDrugsQueryVariables,
} from "@/features/medicine/graphql/queries.gql";
import { useAbility } from "@/lib/casl/useAbility";

import MedicineListTable from "../components/medicine.list";

export default function MedicineContainer() {
  const router = useRouter();
  const subject = "Pharmacy_Medicine";
  const ability = useAbility();
  const canRead = ability.can("read", subject);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const handler = debounce(() => setDebouncedSearch(search), 500);
    handler();
    return () => handler.cancel();
  }, [search]);

  const { data, loading, error } = useQuery<
    PharmacyDrugsQuery,
    PharmacyDrugsQueryVariables
  >(PharmacyDrugsDocument, {
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

  const drugsData = data?.pharmacyDrugs ?? { data: [], count: 0 };

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
            placeholder="Эм хайх..."
            buttonText="Шинэ эм"
            showCreate={false}
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
            onView={(id) => router.push(`/pharmacy/medicine/${id}`)}
            loading={loading}
          />
        </>
      )}
    </AbilityGuard>
  );
}
