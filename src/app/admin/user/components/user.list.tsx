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
import { useState } from "react";

import type { EnumUserRole } from "@/generated/graphql";

type UserListTableProps = {
  users: {
    id: string | undefined;
    name: string | undefined;
    email: string | undefined;
    phone: string | undefined;
    hospital: { name: string | undefined } | undefined;
    roles: ({ key: EnumUserRole | undefined } | undefined)[] | undefined;
  }[];
};

export default function UserListTable({ users }: UserListTableProps) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Paginate users
  const paginatedUsers = users.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="user table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Hospital</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Test</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name ?? "-"}</TableCell>
                <TableCell>{user.email ?? "-"}</TableCell>
                <TableCell>{user.phone ?? "-"}</TableCell>
                <TableCell>{user.hospital?.name ?? "-"}</TableCell>
                <TableCell>
                  {user.roles?.map((r) => r?.key).join(", ") ?? "-"}
                </TableCell>
                <TableCell>test</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
