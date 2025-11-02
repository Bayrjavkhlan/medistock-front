"use client";
import { ApolloClient, ApolloLink, InMemoryCache } from "@apollo/client";
import { ApolloProvider as ApolloClientProvider } from "@apollo/client/react";
import type { ReactNode } from "react";
import { useMemo } from "react";

import { authLink, errorLink, httpLink } from "./links";

interface ApolloWrapperProps {
  children: ReactNode;
}

const makeClient = () =>
  new ApolloClient({
    cache: new InMemoryCache(),
    link: ApolloLink.from([errorLink, authLink.concat(httpLink)]),
    ssrMode: typeof window === "undefined",
  });

export const ApolloWrapper: React.FC<ApolloWrapperProps> = ({ children }) => {
  const client = useMemo(() => makeClient(), []);
  return (
    <ApolloClientProvider client={client}>{children}</ApolloClientProvider>
  );
};
