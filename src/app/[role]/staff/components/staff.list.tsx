// components/staff.list.tsx
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
import type { UserSortField } from "@/constants/types";
import { EnumSortOrder } from "@/generated/graphql";

import SortableTableHeader from "./staff.head";

type StaffListTableProps = {
  users: any[];
  totalCount: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rows: number) => void;
  sortBy: { field: UserSortField; order: EnumSortOrder };
  onSort: (field: UserSortField, order: EnumSortOrder) => void;
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
                    field as UserSortField,
                    order === "asc" ? EnumSortOrder.ASC : EnumSortOrder.DESC,
                  );
                }}
              />
              {/* <TableCell>Email</TableCell> */}
              <SortableTableHeader
                field="email"
                label="Email"
                currentSort={{
                  field: sortBy.field,
                  order: sortBy.order === EnumSortOrder.ASC ? "asc" : "desc",
                }}
                onSort={(field, order) => {
                  onSort(
                    field as UserSortField,
                    order === "asc" ? EnumSortOrder.ASC : EnumSortOrder.DESC,
                  );
                }}
              />
              <TableCell>Phone</TableCell>
              <TableCell>Hospital</TableCell>
              <TableCell>Role</TableCell>
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
