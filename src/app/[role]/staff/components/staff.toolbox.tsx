// components/staff.toolbox.tsx
"use client";
import { TextField } from "@mui/material";

interface StaffToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export default function StaffToolbar({
  search,
  onSearchChange,
}: StaffToolbarProps) {
  return (
    <div className="mb-6">
      <TextField
        size="small"
        placeholder="Хайх..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        sx={{ minWidth: 240 }}
      />
    </div>
  );
}
