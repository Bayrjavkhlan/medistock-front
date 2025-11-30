"use client";

import { useContext } from "react";

import { ThemeToggleContext } from "@/lib/materialUI";

export const useThemeMode = () => useContext(ThemeToggleContext);
