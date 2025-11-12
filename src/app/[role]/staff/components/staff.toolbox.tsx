"use client";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

interface StaffToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
}

const sortOptions = [
  { value: "name_asc", label: "Name (A-Z)" },
  { value: "name_desc", label: "Name (Z-A)" },
  { value: "email_asc", label: "Email (A-Z)" },
  { value: "email_desc", label: "Email (Z-A)" },
];

export default function StaffToolbar({
  search,
  onSearchChange,
  sortBy,
  onSortChange,
}: StaffToolbarProps) {
  return (
    <div className="mb-6 flex flex-wrap items-center gap-4">
      {/* Search */}
      <TextField
        size="small"
        placeholder="Хайх..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        sx={{ minWidth: 240 }}
      />

      {/* Sort */}
      <FormControl size="small" sx={{ minWidth: 180 }}>
        <InputLabel>Эрэмбэ</InputLabel>
        <Select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          label="Эрэмбэ"
        >
          {sortOptions.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
