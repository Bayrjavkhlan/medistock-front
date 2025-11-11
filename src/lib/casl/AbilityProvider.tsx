"use client";

import { useSession } from "next-auth/react";
import { createContext } from "react";

import type { AppAbility } from "./index";
import { defineAbilityFor } from "./index";

export const AbilityContext = createContext<AppAbility>(undefined!);

export function AbilityProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const ability = defineAbilityFor(session);

  return (
    <AbilityContext.Provider value={ability}>
      {children}
    </AbilityContext.Provider>
  );
}
