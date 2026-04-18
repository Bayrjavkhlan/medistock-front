"use client";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
} from "@mui/material";

import TableSkeleton from "@/components/forms/table/tableSkeleton";
import type { PharmacyDrugsQuery } from "@/features/medicine/graphql/queries.gql";

type MedicineListTableProps = {
  drugs: NonNullable<PharmacyDrugsQuery["pharmacyDrugs"]>;
  page: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rows: number) => void;
  onView: (id: string) => void;
  loading: boolean;
};

export default function MedicineListTable({
  drugs,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  onView,
  loading,
}: MedicineListTableProps) {
  const columnCount = 9;
  return (
    <Paper
      sx={{
        width: "100%",
        overflow: "hidden",
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
      }}
      className="shadow-sm"
    >
      <TableContainer sx={{ maxHeight: 640 }}>
        <Table
          stickyHeader
          sx={{
            "& tbody tr:hover": {
              backgroundColor: "action.hover",
            },
            "& th": {
              backgroundColor: "background.paper",
            },
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>Нэр</TableCell>
              <TableCell>Ерөнхий нэр</TableCell>
              <TableCell>Хэлбэр</TableCell>
              <TableCell>Хүч</TableCell>
              <TableCell>Үйлдвэрлэгч</TableCell>
              <TableCell align="right">Тоо ширхэг</TableCell>
              <TableCell align="right">Үнэ</TableCell>
              <TableCell>Төлөв</TableCell>
              <TableCell align="right">Үйлдэл</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableSkeleton rows={rowsPerPage} columns={columnCount} />
            ) : drugs.count === 0 ? (
              <TableRow>
                <TableCell colSpan={columnCount} align="center" sx={{ py: 4 }}>
                  Эм олдсонгүй
                </TableCell>
              </TableRow>
            ) : (
              drugs.data?.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell>{entry.drug?.name ?? "-"}</TableCell>
                  <TableCell>{entry.drug?.genericName ?? "-"}</TableCell>
                  <TableCell>{entry.drug?.dosageForm ?? "-"}</TableCell>
                  <TableCell>{entry.drug?.strength ?? "-"}</TableCell>
                  <TableCell>{entry.drug?.manufacturer ?? "-"}</TableCell>
                  <TableCell align="right">{entry.quantity ?? 0}</TableCell>
                  <TableCell align="right">
                    {entry.price != null ? entry.price.toFixed(2) : "-"}
                  </TableCell>
                  <TableCell>{entry.status ?? "-"}</TableCell>
                  <TableCell align="right">
                    {entry.drug?.id ? (
                      <Tooltip title="Дэлгэрэнгүй харах">
                        <IconButton
                          size="small"
                          onClick={() => onView(entry.drug!.id!)}
                        >
                          <VisibilityOutlinedIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    ) : null}
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
        count={drugs.count}
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
