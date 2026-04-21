"use client";
import { ApolloProvider as ApolloClientProvider } from "@apollo/client/react";
import type { ReactNode } from "react";

import { getApolloClient } from "./ApolloClient";

interface ApolloWrapperProps {
  children: ReactNode;
}

export const ApolloWrapper: React.FC<ApolloWrapperProps> = ({ children }) => {
  const client = getApolloClient();
  return (
    <ApolloClientProvider client={client}>{children}</ApolloClientProvider>
  );
};
