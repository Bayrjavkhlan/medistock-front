import { Box, TableSortLabel } from "@mui/material";
import { visuallyHidden } from "@mui/utils";

import StyledTableHeadCell from "./styledTableHeader";

type SortableTableHeaderProps = {
  field: string;
  label: string;
  currentSort: { field: string; order: "asc" | "desc" };
  onSort: (field: string, order: "asc" | "desc") => void;
};

export default function SortableTableHeader({
  field,
  label,
  currentSort,
  onSort,
}: SortableTableHeaderProps) {
  const isActive = currentSort.field === field;
  const direction = isActive ? currentSort.order : "asc";

  return (
    <StyledTableHeadCell>
      <TableSortLabel
        active={isActive}
        direction={direction}
        onClick={() => {
          const newOrder =
            isActive && currentSort.order === "asc" ? "desc" : "asc";
          onSort(field, newOrder);
        }}
        sx={{
          color: "white !important",
          "&.Mui-active": { color: "white !important" },
          "& .MuiTableSortLabel-icon": {
            color: "white !important",
            opacity: 0.7,
          },

          ".dark &": {
            color: "white !important",
            "& .MuiTableSortLabel-icon": { color: "white !important" },
          },
        }}
      >
        {label}
        {isActive ? (
          <Box component="span" sx={visuallyHidden}>
            {currentSort.order === "desc"
              ? "sorted descending"
              : "sorted ascending"}
          </Box>
        ) : null}
      </TableSortLabel>
    </StyledTableHeadCell>
  );
}
