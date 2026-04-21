"use client";
import { MonitorHeartOutlined } from "@mui/icons-material";
import { useState } from "react";

import AuthBackground from "../components/AuthBackground";
import AuthCard from "../components/AuthCard";
import ForgotPasswordForm from "../components/ForgotPasswordForm";

export default function ForgotPasswordContainer() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  return (
    <AuthBackground
      setSnackbarOpen={setSnackbarOpen}
      snackbarOpen={snackbarOpen}
      errorMessage={errorMessage}
    >
      <AuthCard
        title="Нууц үг сэргээх"
        icon={<MonitorHeartOutlined sx={{ fontSize: 50, color: "white" }} />}
      >
        <ForgotPasswordForm
          setErrorMessage={setErrorMessage}
          setSnackbarOpen={setSnackbarOpen}
        />
      </AuthCard>
    </AuthBackground>
  );
}
