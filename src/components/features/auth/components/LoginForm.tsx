"use client";

import {
  Alert,
  Button,
  Card,
  Checkbox,
  FormControlLabel,
  Input,
  Snackbar,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useEffect, useRef, useState } from "react";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
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

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 to-gray-700 p-4">
      <Card className="w-full max-w-md space-y-8 bg-gray-800 p-8 shadow-2xl">
        <Typography variant="h4" className="text-center font-bold text-white">
          Нэвтрэх
        </Typography>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Input
              inputRef={emailInputRef}
              placeholder="Имэйл хаяг"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
              disabled={loading}
              className="bg-gray-700 text-white placeholder-gray-400"
              inputProps={{ "aria-label": "Имэйл" }}
              sx={{
                "& .MuiInput-input": { padding: "14px" },
              }}
            />
          </div>

          <div>
            <Input
              placeholder="Нууц үг"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
              disabled={loading}
              className="bg-gray-700 text-white placeholder-gray-400"
              inputProps={{ "aria-label": "Нууц үг" }}
              sx={{
                "& .MuiInput-input": { padding: "14px" },
              }}
            />
          </div>

          <div className="flex items-center justify-between">
            <FormControlLabel
              control={
                <Checkbox
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  disabled={loading}
                  size="small"
                  className="text-blue-400"
                />
              }
              label={
                <Typography variant="body2" className="text-gray-300">
                  Намайг сана
                </Typography>
              }
            />
            <Typography
              variant="body2"
              className="cursor-pointer text-blue-400 transition-colors hover:text-blue-300"
              onClick={() => router.push("/forgot-password")}
            >
              Нууц үг мартсан?
            </Typography>
          </div>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            disabled={loading || !email || !password}
            className="rounded-xl bg-blue-600 font-medium transition-all hover:bg-blue-700 disabled:bg-gray-600"
          >
            {loading ? "Нэвтэрж байна..." : "Нэвтрэх"}
          </Button>
        </form>
      </Card>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          variant="filled"
          sx={{ width: "100%", fontSize: "1rem" }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
