import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";

import TableSkeleton from "@/components/forms/table/tableSkeleton";
import type { HospitalsQuery } from "@/generated/graphql";

type HospitalListTableProps = {
  hospitals: NonNullable<HospitalsQuery["hospitals"]>;
  page: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rows: number) => void;
  // sortBy: { field: UserSortField; order: EnumSortOrder };
  // onSort: (field: UserSortField, order: EnumSortOrder) => void;
  loading: boolean;
};

export default function HospitalListTable({
  hospitals,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  // sortBy,
  // onSort,
  loading,
}: HospitalListTableProps) {
  const columnCount = 4; // Name, Email, Phone, Address
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {/* <SortableTableHeader
                field="name"
                label="Name"
                currentSort={{
                  field: sortBy.field,
                  order: sortBy.order === EnumSortOrder.Asc ? "asc" : "desc",
                }}
                onSort={(field, order) => {
                  onSort(
                    field as UserSortField,
                    order === "asc" ? EnumSortOrder.Asc : EnumSortOrder.Desc,
                  );
                }}
              />
              <SortableTableHeader
                field="email"
                label="Email"
                currentSort={{
                  field: sortBy.field,
                  order: sortBy.order === EnumSortOrder.Asc ? "asc" : "desc",
                }}
                onSort={(field, order) => {
                  onSort(
                    field as UserSortField,
                    order === "asc" ? EnumSortOrder.Asc : EnumSortOrder.Desc,
                  );
                }}
              /> */}
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Address</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableSkeleton rows={rowsPerPage} columns={columnCount} />
            ) : hospitals.count === 0 ? (
              <TableRow>
                <TableCell colSpan={columnCount} align="center" sx={{ py: 4 }}>
                  Эмнэлэг олдсонгүй
                </TableCell>
              </TableRow>
            ) : (
              hospitals.data?.map((hospital) => (
                <TableRow key={hospital.id}>
                  <TableCell>{hospital.name ?? "-"}</TableCell>
                  <TableCell>{hospital.email ?? "-"}</TableCell>
                  <TableCell>{hospital.phone ?? "-"}</TableCell>
                  <TableCell>
                    {hospital.address?.address1 ?? "-"}
                    {hospital.address?.address2 ?? "-"}
                    {hospital.address?.province ?? "-"}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={hospitals.count}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(_, newPage) => onPageChange(newPage)}
        onRowsPerPageChange={(e) =>
          onRowsPerPageChange(parseInt(e.target.value, 10))
        }
        labelRowsPerPage="Хуудасны тоо:"
        labelDisplayedRows={({ from, to, count }) => `${from}–${to} / ${count}`}
      />
    </Paper>
  );
}
