"use client";
import { Lock } from "@mui/icons-material";
import { useState } from "react";

import AuthBackground from "../components/AuthBackground";
import AuthCard from "../components/AuthCard";
import NewPasswordForm from "../components/NewPasswordForm";

export default function NewPasswordContainer() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  return (
    <AuthBackground
      setSnackbarOpen={setSnackbarOpen}
      snackbarOpen={snackbarOpen}
      errorMessage={errorMessage}
    >
      <AuthCard
        title="Нууц үг шинэчлэх"
        icon={<Lock sx={{ fontSize: 50, color: "white" }} />}
      >
        <NewPasswordForm
          setErrorMessage={setErrorMessage}
          setSnackbarOpen={setSnackbarOpen}
        />
      </AuthCard>
    </AuthBackground>
  );
}
