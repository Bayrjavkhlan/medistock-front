"use client";

import { Button, Card, Input, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";

export default function NewPasswordForm() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const passwordInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    passwordInputRef.current?.focus();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) return;
    if (newPassword !== confirmPassword) {
      alert("Нууц үгнүүд хоорондоо таарахгүй байна.");
      return;
    }

    setLoading(true);
    console.log("Шинэ нууц үг хадгалах:", newPassword);

    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 to-gray-700 p-4">
      <Card className="w-full max-w-md space-y-8 bg-gray-800 p-8 shadow-2xl">
        <Typography variant="h4" className="text-center font-bold text-white">
          Нууц үг шинэчлэх
        </Typography>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Input
              inputRef={passwordInputRef}
              placeholder="Шинэ нууц үг"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              fullWidth
              required
              disabled={loading}
              className="bg-gray-700 text-white placeholder-gray-400"
              inputProps={{ "aria-label": "Шинэ нууц үг" }}
              sx={{
                "& .MuiInput-input": { padding: "14px" },
              }}
            />
          </div>

          <div>
            <Input
              placeholder="Нууц үг дахин оруулах"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              fullWidth
              required
              disabled={loading}
              className="bg-gray-700 text-white placeholder-gray-400"
              inputProps={{ "aria-label": "Нууц үг дахин оруулах" }}
              sx={{
                "& .MuiInput-input": { padding: "14px" },
              }}
            />
          </div>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            disabled={loading || !newPassword || !confirmPassword}
            className="rounded-xl bg-blue-600 font-medium transition-all hover:bg-blue-700 disabled:bg-gray-600"
          >
            {loading ? "Хадгалж байна..." : "Нууц үг солих"}
          </Button>

          <div className="pt-4 text-center">
            <Typography
              variant="body2"
              className="cursor-pointer text-blue-400 transition-colors hover:text-blue-300"
              onClick={() => (window.location.href = "/login")}
            >
              ← Нэвтрэх цонхруу буцах
            </Typography>
          </div>
        </form>
      </Card>
    </div>
  );
}
