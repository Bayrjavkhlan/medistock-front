"use client";

import {
  ArrowBack,
  DarkMode,
  Favorite,
  LightMode,
  Lock,
  MonitorHeart,
  MonitorHeartOutlined,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";

import { useThemeMode } from "@/hooks/useThemeMode";

export default function NewPasswordForm() {
  const { mode, toggleMode } = useThemeMode();
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
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: isDark
          ? "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)"
          : "linear-gradient(135deg, #dbeafe 0%, #ffffff 50%, #eff6ff 100%)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      {/* Medical Icon Background */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          opacity: isDark ? 0.08 : 0.06,
          pointerEvents: "none",
        }}
      >
        {[...Array(25)].map((_, i) => {
          const Icon =
            i % 3 === 0
              ? MonitorHeartOutlined
              : i % 3 === 1
                ? Favorite
                : MonitorHeart;
          return (
            <Box
              key={i}
              sx={{
                position: "absolute",
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                transform: `translate(-50%, -50%) rotate(${Math.random() * 360}deg) scale(0.8)`,
                color: isDark ? "#60a5fa" : "#3b82f6",
              }}
            >
              <Icon sx={{ fontSize: { xs: 60, sm: 80 } }} />
            </Box>
          );
        })}
      </Box>

      {/* Dark Mode Toggle */}
      <IconButton
        onClick={toggleMode}
        sx={{
          position: "absolute",
          top: 24,
          right: 24,
          bgcolor: "background.paper",
          backdropFilter: "blur(20px)",
          border: "1px solid",
          borderColor: "divider",
          boxShadow: 3,
          zIndex: 10,
          "&:hover": { transform: "scale(1.1)" },
        }}
      >
        {isDark ? (
          <LightMode sx={{ fontSize: 28 }} />
        ) : (
          <DarkMode sx={{ fontSize: 28 }} />
        )}
      </IconButton>

      {/* New Password Card */}
      <Card
        sx={{
          maxWidth: 500,
          width: "100%",
          borderRadius: 6,
          overflow: "hidden",
          position: "relative",
          backdropFilter: "blur(30px)",
          background: isDark
            ? "rgba(30, 41, 59, 0.8)"
            : "rgba(255, 255, 255, 0.8)",
          border: "1px solid",
          borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)",
          boxShadow: "0 25px 50px rgba(0,0,0,0.2)",
        }}
      >
        {/* Gradient Top Bar */}
        <Box
          sx={{
            height: 8,
            background: "linear-gradient(90deg, #3b82f6, #60a5fa, #3b82f6)",
          }}
        />

        <Box sx={{ p: { xs: 4, md: 8 } }}>
          {/* Logo */}
          <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
            <Box
              sx={{
                width: 90,
                height: 90,
                borderRadius: 5,
                background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 15px 35px rgba(59,130,246,0.4)",
              }}
            >
              <Lock sx={{ fontSize: 50, color: "white" }} />
            </Box>
          </Box>

          <Typography
            variant="h4"
            align="center"
            fontWeight={700}
            gutterBottom
            color="text.primary"
          >
            Нууц үг шинэчлэх
          </Typography>
          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            mb={4}
          >
            Шинэ нууц үгээ оруулаад баталгаажуулаарай
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            {/* New Password */}
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

            {/* Confirm Password */}
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

            {/* Back to Login */}
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

          <Typography
            variant="body2"
            align="center"
            color="text.secondary"
            mt={6}
          >
            © 2025 Medistock • Mongolia
          </Typography>
        </Box>
      </Card>
    </Box>
  );
}
