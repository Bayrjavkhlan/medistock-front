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
import type { EquipmentsQuery } from "@/generated/graphql";

type EquipmentListTableProps = {
  equipments: NonNullable<EquipmentsQuery["equipments"]>;
  page: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rows: number) => void;
  // sortBy: { field: UserSortField; order: EnumSortOrder };
  // onSort: (field: UserSortField, order: EnumSortOrder) => void;
  loading: boolean;
};

export default function EquipmentListTable({
  equipments,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  // sortBy,
  // onSort,
  loading,
}: EquipmentListTableProps) {
  const columnCount = 4; // Name, Category, SerialNu, AssignedTo with HospitalName, State
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>SerialNum</TableCell>
              <TableCell>AssignedTo</TableCell>
              <TableCell>State</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableSkeleton rows={rowsPerPage} columns={columnCount} />
            ) : equipments.count === 0 ? (
              <TableRow>
                <TableCell colSpan={columnCount} align="center" sx={{ py: 4 }}>
                  Эмнэлэг олдсонгүй
                </TableCell>
              </TableRow>
            ) : (
              equipments.data?.map((equipment) => (
                <TableRow key={equipment.id}>
                  <TableCell>{equipment.name ?? "-"}</TableCell>
                  <TableCell>{equipment.category ?? "-"}</TableCell>
                  <TableCell>{equipment.serialNo ?? "-"}</TableCell>
                  <TableCell>
                    {equipment.assignedTo?.name ?? "-"}
                    {"-"}
                    {equipment.hospital?.name ?? "-"}
                  </TableCell>
                  <TableCell>{equipment.state ?? "-"}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={equipments.count}
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
