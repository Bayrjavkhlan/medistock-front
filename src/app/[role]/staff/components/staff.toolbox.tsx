"use client";
import { Button, TextField } from "@mui/material";

interface StaffToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  onCreateClick: () => void;
}

export default function StaffToolbar({
  search,
  onSearchChange,
  onCreateClick,
}: StaffToolbarProps) {
  return (
    <div className="mb-6 flex items-center justify-between gap-4">
      <TextField
        size="small"
        placeholder="Хайх..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        sx={{ minWidth: 240 }}
      />
      <Button variant="contained" onClick={onCreateClick}>
        Шинэ ажилтан нэмэх
      </Button>
    </div>
  );
}
