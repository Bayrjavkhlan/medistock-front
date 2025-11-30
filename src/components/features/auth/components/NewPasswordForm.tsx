"use client";

import {
  ArrowBack,
  Lock,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";

import { useThemeMode } from "@/hooks/useThemeMode";

type NewPasswordFormProps = {
  setSnackbarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
};

export default function NewPasswordForm({
  setSnackbarOpen,
  setErrorMessage,
}: NewPasswordFormProps) {
  const { mode } = useThemeMode();
  const isDark = mode === "dark";

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const passwordInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    passwordInputRef.current?.focus();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Нууц үгнүүд хоорондоо таарахгүй байна.");
      return;
    }
    setLoading(true);
    console.log("Шинэ нууц үг хадгалах:", newPassword);
    setTimeout(() => setLoading(false), 1000);
    setSnackbarOpen(true);
    setErrorMessage("Дарагдсан");
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="body1" align="center" color="text.secondary" mb={4}>
        Шинэ нууц үгээ оруулаад баталгаажуулаарай
      </Typography>
      <TextField
        inputRef={passwordInputRef}
        fullWidth
        label="Шинэ нууц үг"
        type={showPassword ? "text" : "password"}
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        required
        disabled={loading}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Lock />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
        sx={{
          mb: 3,
          "& .MuiOutlinedInput-root": {
            borderRadius: 4,
            bgcolor: isDark
              ? "rgba(255,255,255,0.05)"
              : "rgba(255,255,255,0.6)",
            backdropFilter: "blur(10px)",
          },
        }}
      />

      <TextField
        fullWidth
        label="Нууц үг дахин оруулах"
        type={showConfirm ? "text" : "password"}
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
        disabled={loading}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Lock />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowConfirm(!showConfirm)}
                  edge="end"
                >
                  {showConfirm ? <VisibilityOff /> : <Visibility />}
                </IconButton>
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
        disabled={
          loading ||
          !newPassword ||
          !confirmPassword ||
          newPassword !== confirmPassword
        }
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
        {loading ? "Хадгалж байна..." : "Нууц үг солих"}
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
