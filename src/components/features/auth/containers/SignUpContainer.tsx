"use client";

import { PersonAddAlt1Rounded } from "@mui/icons-material";
import { Typography } from "@mui/material";
import Link from "next/link";

import AuthBackground from "../components/AuthBackground";
import AuthCard from "../components/AuthCard";
import SignUpForm from "../components/SignUpForm";

export default function SignUpContainer() {
  return (
    <AuthBackground>
      <AuthCard
        title="Бүртгүүлэх"
        icon={<PersonAddAlt1Rounded sx={{ fontSize: 50, color: "white" }} />}
      >
        <SignUpForm />
        <Typography variant="body2" align="center" mt={2}>
          Аль хэдийн бүртгэлтэй юу?{" "}
          <Link
            href="/login"
            style={{ color: "#1976d2", textDecoration: "none" }}
          >
            Нэвтрэх
          </Link>
        </Typography>
      </AuthCard>
    </AuthBackground>
  );
}
