// components/table/TableSkeleton.tsx
import { Skeleton, TableBody, TableCell, TableRow } from "@mui/material";

type TableSkeletonProps = {
  rows: number;
  columns: number;
};

export default function TableSkeleton({ rows, columns }: TableSkeletonProps) {
  return (
    <TableBody>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <TableRow key={rowIndex}>
          {Array.from({ length: columns }).map((_, colIndex) => (
            <TableCell key={colIndex}>
              <Skeleton
                variant="rectangular"
                width="100%"
                height={36}
                sx={{
                  borderRadius: 1,
                  bgcolor: "grey.200",
                  animation: "pulse 1.5s ease-in-out infinite",
                  "@keyframes pulse": {
                    "0%, 100%": { opacity: 1 },
                    "50%": { opacity: 0.6 },
                  },
                }}
              />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
}
