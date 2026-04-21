"use client";

import { useMutation } from "@apollo/client/react";
import {
  Lock,
  Mail,
  Person,
  Phone,
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
import { useRouter } from "next/navigation";
import { useState } from "react";

import { REGISTER } from "@/features/auth/graphql/mutation.gql";

type RegisterFormProps = {
  setSnackbarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
};

export default function RegisterForm({
  setSnackbarOpen,
  setErrorMessage,
}: RegisterFormProps) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [register, registerState] = useMutation(REGISTER);

  const loading = registerState.loading;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSnackbarOpen(false);
    setErrorMessage("");

    try {
      await register({
        variables: {
          input: {
            name: form.name,
            email: form.email,
            phone: form.phone || undefined,
            password: form.password,
          },
        },
      });
      router.push("/login?registered=1");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Registration failed";
      setErrorMessage(message);
      setSnackbarOpen(true);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Typography variant="body1" align="center" color="text.secondary" mb={4}>
        Create your Medistock account
      </Typography>

      <TextField
        fullWidth
        label="Нэр"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
        disabled={loading}
        sx={{ mb: 2 }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Person />
              </InputAdornment>
            ),
          },
        }}
      />

      <TextField
        fullWidth
        label="И-мэйл хаяг"
        type="email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
        disabled={loading}
        sx={{ mb: 2 }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Mail />
              </InputAdornment>
            ),
          },
        }}
      />

      <TextField
        fullWidth
        label="Утас"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
        disabled={loading}
        sx={{ mb: 2 }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Phone />
              </InputAdornment>
            ),
          },
        }}
      />

      <TextField
        fullWidth
        label="Нууц үг"
        type={showPassword ? "text" : "password"}
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        required
        disabled={loading}
        sx={{ mb: 3 }}
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
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        size="large"
        disabled={loading || !form.name || !form.email || !form.password}
        sx={{ py: 1.8, borderRadius: 3, fontWeight: 600 }}
      >
        {loading ? "Бүртгэж байна..." : "Бүртгүүлэх"}
      </Button>

      <Button
        fullWidth
        onClick={() => router.push("/login")}
        sx={{ mt: 1, borderRadius: 3 }}
      >
        Нэвтрэх хуудас руу буцах
      </Button>
    </Box>
  );
}
