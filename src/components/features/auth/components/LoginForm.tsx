"use client";

import { Lock, Mail, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getSession, signIn } from "next-auth/react";
import { useEffect, useRef, useState } from "react";

import { useThemeMode } from "@/hooks/useThemeMode";
import { resolvePostLoginPath } from "@/utils/authRedirect";

type LoginFormProps = {
  setSnackbarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginForm({
  setSnackbarOpen,
  setErrorMessage,
}: LoginFormProps) {
  const router = useRouter();
  const { mode } = useThemeMode();
  const isDark = mode === "dark";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

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

  const validate = () => {
    const nextErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      nextErrors.email = "И-мэйл хаягаа оруулна уу.";
    } else if (!emailRegex.test(email.trim())) {
      nextErrors.email = "И-мэйл хаягийн формат буруу байна.";
    }

    if (!password) {
      nextErrors.password = "Нууц үгээ оруулна уу.";
    }

    setFieldErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);
    setSnackbarOpen(false);
    setErrorMessage("");

    try {
      const result = await signIn("credentials", {
        email: email.trim().toLowerCase(),
        password,
        redirect: false,
      });

      if (result?.error) {
        setErrorMessage(result.error);
        setSnackbarOpen(true);
        return;
      }

      if (remember) {
        localStorage.setItem("rememberedEmail", email.trim().toLowerCase());
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      const session = await getSession();
      router.push(resolvePostLoginPath(session?.user));
      router.refresh();
    } catch {
      setErrorMessage("Сервертэй холбогдоход алдаа гарлаа.");
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Typography variant="body1" align="center" color="text.secondary" mb={4}>
        Medistock • Эмнэлгийн нөөц, тоног төхөөрөмжийн удирдлага
      </Typography>
      <TextField
        inputRef={emailInputRef}
        fullWidth
        label="И-мэйл хаяг"
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (fieldErrors.email) {
            setFieldErrors((prev) => ({ ...prev, email: undefined }));
          }
        }}
        error={!!fieldErrors.email}
        helperText={fieldErrors.email}
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
        onChange={(e) => {
          setPassword(e.target.value);
          if (fieldErrors.password) {
            setFieldErrors((prev) => ({ ...prev, password: undefined }));
          }
        }}
        error={!!fieldErrors.password}
        helperText={fieldErrors.password}
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
          gap: 1,
          flexWrap: "wrap",
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
          label="И-мэйлийг сануулах"
        />
        <Button
          variant="text"
          size="small"
          onClick={() => router.push("/forgot-password")}
        >
          Нууц үгээ мартсан уу?
        </Button>
      </Box>

      <Button
        type="submit"
        fullWidth
        size="large"
        variant="contained"
        disabled={loading}
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
        {loading ? "Нэвтэрч байна..." : "Нэвтрэх"}
      </Button>

      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        Бүртгэлгүй юу?{" "}
        <Link
          href="/signup"
          style={{ color: "#1976d2", textDecoration: "none" }}
        >
          Бүртгүүлэх
        </Link>
      </Typography>
    </Box>
  );
}
