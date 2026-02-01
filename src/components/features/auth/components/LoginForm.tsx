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
import { useRouter } from "next/navigation";
import { getSession, signIn } from "next-auth/react";
import { useEffect, useRef, useState } from "react";

import { useThemeMode } from "@/hooks/useThemeMode";

type LoginFormProps = {
  setSnackbarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
};

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
        const session = await getSession();
        const memberships = session?.user?.memberships ?? [];
        const activeMembership = memberships[0] ?? null;
        const orgType = activeMembership?.organization?.type ?? null;
        const orgRole = activeMembership?.role ?? null;
        const nextRoute = session?.user?.isPlatformAdmin
          ? "/admin/dashboard"
          : !activeMembership
            ? "/user/dashboard"
            : orgType === "PHARMACY"
              ? orgRole === "STAFF"
                ? "/pharmacy/medicine"
                : "/pharmacy/dashboard"
              : orgRole === "STAFF"
                ? "/hospital/equipment"
                : "/hospital/dashboard";
        router.push(nextRoute);
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
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Typography variant="body1" align="center" color="text.secondary" mb={4}>
        Medistock • Тоног төхөөрөмжийн менежмент
      </Typography>
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
  );
}
