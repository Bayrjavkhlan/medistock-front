"use client";

import { useContext } from "react";

import { AbilityContext } from "./AbilityProvider";

export const useAbility = () => useContext(AbilityContext);
