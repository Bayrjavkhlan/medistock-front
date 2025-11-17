// src/components/common/PageToolbar.tsx
"use client";

import { Button, TextField } from "@mui/material";

interface PageToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  onCreateClick: () => void;
  placeholder?: string;
  buttonText: string;
  createDisabled?: boolean;
  createLoading?: boolean;
}

export default function PageToolbar({
  search,
  onSearchChange,
  onCreateClick,
  placeholder = "Хайх...",
  buttonText,
  createDisabled = false,
  createLoading = false,
}: PageToolbarProps) {
  return (
    <div className="mb-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
      <TextField
        size="small"
        placeholder={placeholder}
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full sm:w-auto"
        sx={{ minWidth: { xs: "100%", sm: 280 } }}
        inputProps={{ "aria-label": placeholder }}
      />

      <Button
        variant="contained"
        onClick={onCreateClick}
        disabled={createDisabled || createLoading}
        className="w-full whitespace-nowrap sm:w-auto"
      >
        {createLoading ? "Үүсгэж байна..." : buttonText}
      </Button>
    </div>
  );
}
