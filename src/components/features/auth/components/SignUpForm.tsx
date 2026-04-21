"use client";

import { useMutation } from "@apollo/client/react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  IconButton,
  InputAdornment,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { SIGN_UP } from "@/features/auth/graphql/mutation.gql";
import type {
  SignUpMutation,
  SignUpMutationVariables,
} from "@/generated/graphql";
import { getApolloErrorMessage } from "@/utils/getApolloErrorMessage";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;

export default function SignUpForm() {
  const router = useRouter();
  const [signUp, { loading }] = useMutation<
    SignUpMutation,
    SignUpMutationVariables
  >(SIGN_UP);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const passwordHint = useMemo(
    () =>
      "Нууц үг дор хаяж 8 тэмдэгттэй, 1 том үсэг, 1 жижиг үсэг, 1 тоо агуулсан байх ёстой.",
    [],
  );

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validate = () => {
    const nextErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      nextErrors.name = "Нэрээ оруулна уу.";
    }

    if (!formData.email.trim()) {
      nextErrors.email = "И-мэйл хаягаа оруулна уу.";
    } else if (!emailRegex.test(formData.email.trim())) {
      nextErrors.email = "И-мэйл хаягийн формат буруу байна.";
    }

    if (!formData.password) {
      nextErrors.password = "Нууц үгээ оруулна уу.";
    } else if (!passwordRegex.test(formData.password)) {
      nextErrors.password = passwordHint;
    }

    if (!formData.confirmPassword) {
      nextErrors.confirmPassword = "Нууц үгээ давтаж оруулна уу.";
    } else if (formData.password !== formData.confirmPassword) {
      nextErrors.confirmPassword = "Нууц үг хоорондоо таарахгүй байна.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const { data } = await signUp({
        variables: {
          input: {
            name: formData.name.trim(),
            email: formData.email.trim().toLowerCase(),
            password: formData.password,
          },
        },
      });

      if (data?.signUp) {
        setSnackbar({
          open: true,
          message: data.signUp.message,
          severity: "success",
        });

        setTimeout(() => {
          router.push(
            `/verify-otp?email=${encodeURIComponent(
              formData.email.trim().toLowerCase(),
            )}`,
          );
        }, 1200);
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: getApolloErrorMessage(error, "Бүртгүүлэх үед алдаа гарлаа."),
        severity: "error",
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: "100%" }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="name"
        label="Нэр"
        name="name"
        autoComplete="name"
        autoFocus
        value={formData.name}
        onChange={(e) => handleChange("name", e.target.value)}
        error={!!errors.name}
        helperText={errors.name}
        disabled={loading}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: 4,
            bgcolor: "rgba(255,255,255,0.6)",
            backdropFilter: "blur(10px)",
          },
        }}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="И-мэйл хаяг"
        name="email"
        autoComplete="email"
        type="email"
        value={formData.email}
        onChange={(e) => handleChange("email", e.target.value)}
        error={!!errors.email}
        helperText={errors.email}
        disabled={loading}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: 4,
            bgcolor: "rgba(255,255,255,0.6)",
            backdropFilter: "blur(10px)",
          },
        }}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Нууц үг"
        type={showPassword ? "text" : "password"}
        id="password"
        autoComplete="new-password"
        value={formData.password}
        onChange={(e) => handleChange("password", e.target.value)}
        error={!!errors.password}
        helperText={errors.password}
        disabled={loading}
        slotProps={{
          input: {
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
          "& .MuiOutlinedInput-root": {
            borderRadius: 4,
            bgcolor: "rgba(255,255,255,0.6)",
            backdropFilter: "blur(10px)",
          },
        }}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="confirmPassword"
        label="Нууц үг давтах"
        type={showConfirmPassword ? "text" : "password"}
        id="confirmPassword"
        autoComplete="new-password"
        value={formData.confirmPassword}
        onChange={(e) => handleChange("confirmPassword", e.target.value)}
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword}
        disabled={loading}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: 4,
            bgcolor: "rgba(255,255,255,0.6)",
            backdropFilter: "blur(10px)",
          },
        }}
      />
      <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 2 }}>
        {passwordHint}
      </Typography>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={loading}
        sx={{
          mt: 3,
          mb: 2,
          borderRadius: 4,
          py: 1.5,
          fontSize: "1rem",
        }}
      >
        {loading ? "Бүртгэж байна..." : "Бүртгүүлэх"}
      </Button>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
