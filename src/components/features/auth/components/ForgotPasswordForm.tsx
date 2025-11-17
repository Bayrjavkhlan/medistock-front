"use client";

import { Button, Card, Input, Typography } from "@mui/material";
import { useEffect, useRef } from "react";

export default function ForgotPasswordForm() {
  const emailInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    emailInputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Нууц үг сэргээх дарсан");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 to-gray-700 p-4">
      <Card className="w-full max-w-md space-y-8 bg-gray-800 p-8 shadow-2xl">
        <Typography variant="h4" className="text-center font-bold text-white">
          Нууц үг сэргээх
        </Typography>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Input
              inputRef={emailInputRef}
              placeholder="Имэйл хаяг"
              type="email"
              fullWidth
              required
              className="bg-gray-700 text-white placeholder-gray-400"
              inputProps={{ "aria-label": "Имэйл" }}
              sx={{
                "& .MuiInput-input": {
                  padding: "14px",
                },
              }}
            />
          </div>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            className="rounded-xl bg-blue-600 font-medium transition-all hover:bg-blue-700"
          >
            Нууц үг сэргээх
          </Button>

          <div className="text-center">
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
