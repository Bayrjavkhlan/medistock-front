// components/table/StyledTableHeadCell.tsx
import type { TableCellProps } from "@mui/material";
import { TableCell } from "@mui/material";

export default function StyledTableHeadCell(props: TableCellProps) {
  return (
    <TableCell
      {...props}
      sx={{
        bgcolor: "primary.500",
        color: "white",
        fontWeight: 700,
        fontSize: "0.95rem",
        py: 2,
        ".dark &": {
          bgcolor: "primary.700",
          color: "white",
        },
        ...props.sx,
      }}
      className={props.className}
    />
  );
}
