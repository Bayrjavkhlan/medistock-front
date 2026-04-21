"use client";

import VerifiedUserRoundedIcon from "@mui/icons-material/VerifiedUserRounded";
import { Typography } from "@mui/material";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

import AuthBackground from "@/components/features/auth/components/AuthBackground";
import AuthCard from "@/components/features/auth/components/AuthCard";
import VerifyOtpForm from "@/components/features/auth/components/VerifyOtpForm";

function VerifyOtpContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  useEffect(() => {
    if (!email) {
      router.replace("/signup");
    }
  }, [email, router]);

  if (!email) return null;

  return (
    <AuthBackground>
      <AuthCard
        title="И-мэйл баталгаажуулалт"
        subtitle={`${email} хаяг руу илгээсэн 6 оронтой кодыг оруулна уу.`}
        icon={<VerifiedUserRoundedIcon sx={{ fontSize: 50, color: "white" }} />}
      >
        <VerifyOtpForm email={email} />
        <Typography variant="body2" align="center" mt={2}>
          Хаяг буруу оруулсан бол{" "}
          <Link
            href="/signup"
            style={{ color: "#1976d2", textDecoration: "none" }}
          >
            дахин бүртгүүлэх
          </Link>
        </Typography>
      </AuthCard>
    </AuthBackground>
  );
}

export default function VerifyOtpPage() {
  return (
    <Suspense fallback={null}>
      <VerifyOtpContent />
    </Suspense>
  );
}
