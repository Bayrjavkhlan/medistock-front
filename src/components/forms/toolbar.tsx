"use client";

import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import {
  Button,
  CircularProgress,
  InputAdornment,
  TextField,
} from "@mui/material";

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
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon className="text-gray-500" />
            </InputAdornment>
          ),
        }}
        sx={{
          minWidth: { xs: "100%", sm: 280 },
          "& .MuiOutlinedInput-root": {
            borderRadius: "0.75rem",
            backgroundColor: "white",
            fontSize: "0.95rem",
            "& fieldset": {
              borderColor: "#e2e8f0",
            },
            "&:hover fieldset": {
              borderColor: "primary.500",
            },
            "&.Mui-focused fieldset": {
              borderColor: "primary.600",
              borderWidth: 2,
            },
          },
          "& .MuiInputBase-input": {
            py: 1.5,
          },
          ".dark & .MuiOutlinedInput-root": {
            backgroundColor: "#1e293b",
            color: "white",
            "& fieldset": { borderColor: "#334155" },
            "&:hover fieldset": { borderColor: "primary.500" },
          },
        }}
      />

      <Button
        variant="contained"
        onClick={onCreateClick}
        disabled={createDisabled || createLoading}
        startIcon={createLoading ? null : <AddIcon />}
        className="rounded-xl shadow-lg hover:shadow-xl h-12 whitespace-nowrap px-8 font-semibold transition-all disabled:opacity-60"
        sx={{
          backgroundColor: "primary.500",
          "&:hover": {
            backgroundColor: "primary.600",
          },
          "&:disabled": {
            backgroundColor: "#94a3b8",
          },
          textTransform: "none",
          fontSize: "0.95rem",
          "&.dark, .dark &": {
            backgroundColor: "primary.700",
            "&:hover": {
              backgroundColor: "primary.600",
            },
          },
        }}
      >
        {createLoading ? (
          <>
            <CircularProgress size={20} color="inherit" className="mr-2" />
            Үүсгэж байна...
          </>
        ) : (
          buttonText
        )}
      </Button>
    </div>
  );
}
