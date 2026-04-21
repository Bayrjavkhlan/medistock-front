"use client";

import { useMutation } from "@apollo/client/react";
import {
  Alert,
  Box,
  Button,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { RESEND_OTP, VERIFY_OTP } from "@/features/auth/graphql/mutation.gql";
import type {
  VerifyOtpMutation,
  VerifyOtpMutationVariables,
} from "@/generated/graphql";
import { getApolloErrorMessage } from "@/utils/getApolloErrorMessage";

interface VerifyOtpFormProps {
  email: string;
}

const RESEND_COOLDOWN_SECONDS = 60;

type ResendOtpMutationResult = {
  resendOtp: {
    message: string;
  };
};

type ResendOtpMutationVariables = {
  input: {
    email: string;
  };
};

export default function VerifyOtpForm({ email }: VerifyOtpFormProps) {
  const router = useRouter();
  const [verifyOtp, { loading }] = useMutation<
    VerifyOtpMutation,
    VerifyOtpMutationVariables
  >(VERIFY_OTP);
  const [resendOtp, { loading: resendLoading }] = useMutation<
    ResendOtpMutationResult,
    ResendOtpMutationVariables
  >(RESEND_OTP);

  const [otp, setOtp] = useState("");
  const [cooldown, setCooldown] = useState(RESEND_COOLDOWN_SECONDS);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  useEffect(() => {
    if (cooldown <= 0) return;

    const timer = window.setTimeout(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [cooldown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (otp.length !== 6) {
      setSnackbar({
        open: true,
        message: "6 оронтой кодоо бүрэн оруулна уу.",
        severity: "error",
      });
      return;
    }

    try {
      const { data } = await verifyOtp({
        variables: {
          input: {
            email,
            otp,
          },
        },
      });

      if (data?.verifyOtp) {
        setSnackbar({
          open: true,
          message: data.verifyOtp.message,
          severity: "success",
        });
        setTimeout(() => {
          router.push("/login");
        }, 1200);
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: getApolloErrorMessage(
          error,
          "Код баталгаажуулах үед алдаа гарлаа.",
        ),
        severity: "error",
      });
    }
  };

  const handleResend = async () => {
    try {
      const { data } = await resendOtp({
        variables: {
          input: { email },
        },
      });

      setCooldown(RESEND_COOLDOWN_SECONDS);
      setSnackbar({
        open: true,
        message: data?.resendOtp?.message ?? "Кодыг дахин илгээлээ.",
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: getApolloErrorMessage(
          error,
          "Код дахин илгээх үед алдаа гарлаа.",
        ),
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
        id="otp"
        label="Баталгаажуулах код"
        name="otp"
        autoComplete="one-time-code"
        autoFocus
        value={otp}
        onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
        disabled={loading}
        inputProps={{ maxLength: 6 }}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: 4,
            bgcolor: "rgba(255,255,255,0.6)",
            backdropFilter: "blur(10px)",
            textAlign: "center",
            fontSize: "1.5rem",
            letterSpacing: "0.5rem",
          },
        }}
      />
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mt: 1, mb: 2, textAlign: "center" }}
      >
        Код 10 минутын дотор хүчинтэй. Хэрэв буруу олон удаа оруулбал шинэ код
        авах шаардлагатай.
      </Typography>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={loading || otp.length !== 6}
        sx={{
          mt: 3,
          mb: 1.5,
          borderRadius: 4,
          py: 1.5,
          fontSize: "1rem",
        }}
      >
        {loading ? "Баталгаажуулж байна..." : "Баталгаажуулах"}
      </Button>
      <Button
        fullWidth
        variant="text"
        disabled={resendLoading || cooldown > 0}
        onClick={handleResend}
        sx={{ textTransform: "none" }}
      >
        {resendLoading
          ? "Дахин илгээж байна..."
          : cooldown > 0
            ? `${cooldown} сек дараа дахин илгээнэ`
            : "Код дахин илгээх"}
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
