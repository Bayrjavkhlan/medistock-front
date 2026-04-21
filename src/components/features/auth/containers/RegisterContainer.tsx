"use client";

import { MonitorHeartOutlined } from "@mui/icons-material";
import { useState } from "react";

import AuthBackground from "../components/AuthBackground";
import AuthCard from "../components/AuthCard";
import RegisterForm from "../components/RegisterForm";

export default function RegisterContainer() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <AuthBackground
      setSnackbarOpen={setSnackbarOpen}
      snackbarOpen={snackbarOpen}
      errorMessage={errorMessage}
    >
      <AuthCard
        title="Бүртгүүлэх"
        icon={<MonitorHeartOutlined sx={{ fontSize: 50, color: "white" }} />}
      >
        <RegisterForm
          setSnackbarOpen={setSnackbarOpen}
          setErrorMessage={setErrorMessage}
        />
      </AuthCard>
    </AuthBackground>
  );
}
