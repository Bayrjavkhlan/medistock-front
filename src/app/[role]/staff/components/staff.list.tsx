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

import SortableTableHeader from "@/components/forms/table/sortableTableHeader";
import StyledTableHeadCell from "@/components/forms/table/styledTableHeader";
import TableSkeleton from "@/components/forms/table/tableSkeleton";
import type { StaffSortField } from "@/constants/types";
import { EnumSortOrder } from "@/generated/graphql";

type StaffListTableProps = {
  users: any[];
  totalCount: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rows: number) => void;
  sortBy: { field: StaffSortField; order: EnumSortOrder };
  onSort: (field: StaffSortField, order: EnumSortOrder) => void;
  loading: boolean;
};

export default function StaffListTable({
  users,
  totalCount,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  sortBy,
  onSort,
  loading,
}: StaffListTableProps) {
  const columnCount = 5; // Name, Email, Phone, Hospital, Role
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <SortableTableHeader
                field="name"
                label="Name"
                currentSort={{
                  field: sortBy.field,
                  order: sortBy.order === EnumSortOrder.ASC ? "asc" : "desc",
                }}
                onSort={(field, order) => {
                  onSort(
                    field as StaffSortField,
                    order === "asc" ? EnumSortOrder.ASC : EnumSortOrder.DESC,
                  );
                }}
              />
              <SortableTableHeader
                field="email"
                label="Email"
                currentSort={{
                  field: sortBy.field,
                  order: sortBy.order === EnumSortOrder.ASC ? "asc" : "desc",
                }}
                onSort={(field, order) => {
                  onSort(
                    field as StaffSortField,
                    order === "asc" ? EnumSortOrder.ASC : EnumSortOrder.DESC,
                  );
                }}
              />
              <StyledTableHeadCell>Phone</StyledTableHeadCell>
              <StyledTableHeadCell>Hospital</StyledTableHeadCell>
              <StyledTableHeadCell>Role</StyledTableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableSkeleton rows={rowsPerPage} columns={columnCount} />
            ) : users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columnCount} align="center" sx={{ py: 4 }}>
                  Хэрэглэгч олдсонгүй
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name ?? "-"}</TableCell>
                  <TableCell>{user.email ?? "-"}</TableCell>
                  <TableCell>{user.phone ?? "-"}</TableCell>
                  <TableCell>{user.hospital?.name ?? "-"}</TableCell>
                  <TableCell>
                    {user.roles?.map((r: any) => r?.key).join(", ") ?? "-"}
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
        count={totalCount}
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
