"use client";

import { ArrowBack, Mail } from "@mui/icons-material";
import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useRef } from "react";

import { useThemeMode } from "@/hooks/useThemeMode";

type ForgotPasswordFormProps = {
  setSnackbarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
};

export default function ForgotPasswordForm({
  setSnackbarOpen,
  setErrorMessage,
}: ForgotPasswordFormProps) {
  const { mode } = useThemeMode();
  const isDark = mode === "dark";

  const emailInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    emailInputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSnackbarOpen(true);
    setErrorMessage("Нууц үг сэргээх дарсан");
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Typography variant="body1" align="center" color="text.secondary" mb={4}>
        Имэйл хаягаа оруулаарай. Сэргээх холбоосыг илгээнэ.
      </Typography>
      <TextField
        inputRef={emailInputRef}
        fullWidth
        label="И-мэйл хаяг"
        type="email"
        required
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Mail />
              </InputAdornment>
            ),
          },
        }}
        sx={{
          mb: 4,
          "& .MuiOutlinedInput-root": {
            borderRadius: 4,
            bgcolor: isDark
              ? "rgba(255,255,255,0.05)"
              : "rgba(255,255,255,0.6)",
            backdropFilter: "blur(10px)",
          },
        }}
      />

      <Button
        type="submit"
        fullWidth
        size="large"
        variant="contained"
        sx={{
          py: 2,
          borderRadius: 4,
          fontSize: "1.1rem",
          fontWeight: 600,
          background: "linear-gradient(90deg, #3b82f6, #2563eb)",
          boxShadow: "0 10px 30px rgba(59,130,246,0.4)",
          "&:hover": {
            background: "linear-gradient(90deg, #2563eb, #1d4ed8)",
            transform: "translateY(-2px)",
            boxShadow: "0 15px 40px rgba(59,130,246,0.5)",
          },
        }}
      >
        Холбоос илгээх
      </Button>

      <Box sx={{ mt: 4, textAlign: "center" }}>
        <Button
          startIcon={<ArrowBack />}
          variant="text"
          onClick={() => (window.location.href = "/login")}
          sx={{ textTransform: "none", color: "primary.main" }}
        >
          Нэвтрэх цонхруу буцах
        </Button>
      </Box>
    </Box>
  );
}
