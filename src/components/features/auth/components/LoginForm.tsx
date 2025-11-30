"use client";

import {
  DarkMode,
  Favorite,
  LightMode,
  Lock,
  Mail,
  MonitorHeart,
  MonitorHeartOutlined,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Card,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useEffect, useRef, useState } from "react";

import { useThemeMode } from "@/hooks/useThemeMode";

export default function LoginForm() {
  const router = useRouter();
  const { mode, toggleMode } = useThemeMode();
  const isDark = mode === "dark";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const emailInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    emailInputRef.current?.focus();
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("rememberedEmail");
    if (saved) {
      setEmail(saved);
      setRemember(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setLoading(true);
    setSnackbarOpen(false);
    setErrorMessage("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setErrorMessage("Нэвтрэх нэр эсвэл нууц үг буруу байна.");
        setSnackbarOpen(true);
      } else {
        if (remember) {
          localStorage.setItem("rememberedEmail", email);
        } else {
          localStorage.removeItem("rememberedEmail");
        }
        router.push("/admin/dashboard");
        router.refresh();
      }
    } catch {
      setErrorMessage("Сервертэй холбогдоход алдаа гарлаа.");
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
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
        <Box
          sx={{
            height: 8,
            background: "linear-gradient(90deg, #3b82f6, #60a5fa, #3b82f6)",
          }}
        />

        <Box sx={{ p: { xs: 4, md: 8 } }}>
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
              <MonitorHeartOutlined sx={{ fontSize: 50, color: "white" }} />
            </Box>
          </Box>

          <Typography
            variant="h4"
            align="center"
            fontWeight={700}
            gutterBottom
            color="text.primary"
          >
            Нэвтрэх
          </Typography>
          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            mb={4}
          >
            Medistock • Тоног төхөөрөмжийн менежмент
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              inputRef={emailInputRef}
              fullWidth
              label="И-мэйл хаяг"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
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
              label="Нууц үг"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 4,
                  bgcolor: isDark
                    ? "rgba(255,255,255,0.05)"
                    : "rgba(255,255,255,0.6)",
                  backdropFilter: "blur(10px)",
                },
              }}
            />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    disabled={loading}
                  />
                }
                label="Намайг сана"
              />
              <Button
                variant="text"
                size="small"
                onClick={() => router.push("/forgot-password")}
              >
                Нууц үг мартсан?
              </Button>
            </Box>

            <Button
              type="submit"
              fullWidth
              size="large"
              variant="contained"
              disabled={loading || !email || !password}
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
              {loading ? "Нэвтэрж байна..." : "Нэвтрэх"}
            </Button>
          </Box>

          <Typography
            variant="body2"
            align="center"
            color="text.secondary"
            mt={4}
          >
            © 2025 Medistock • Mongolia
          </Typography>
        </Box>
      </Card>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="error"
          variant="filled"
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
