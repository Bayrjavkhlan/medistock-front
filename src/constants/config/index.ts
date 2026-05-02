const constants = {
  AUTH_TOKEN_KEY: "auth-token",
  REFRESH_TOKEN_KEY: "refresh-token",
};

const LOCAL_GRAPHQL_URL = "http://localhost:4000/api/graphql";

const trimTrailingSlash = (value: string) => value.replace(/\/+$/, "");

const toGraphqlUrl = (value: string) =>
  value.endsWith("/api/graphql")
    ? value
    : `${trimTrailingSlash(value)}/api/graphql`;

const resolveProductionUrl = (value: string | undefined, message: string) => {
  if (value) return toGraphqlUrl(value);
  if (process.env.NODE_ENV === "development") return LOCAL_GRAPHQL_URL;
  throw new Error(message);
};

export const getClientGraphqlUrl = () =>
  resolveProductionUrl(
    process.env.NEXT_PUBLIC_GRAPHQL_URL ?? process.env.NEXT_PUBLIC_BACKEND_URL,
    "NEXT_PUBLIC_GRAPHQL_URL is required in production",
  );

export const getServerGraphqlUrl = () =>
  resolveProductionUrl(
    process.env.GRAPHQL_URL ??
      process.env.NEXT_PUBLIC_GRAPHQL_URL ??
      process.env.NEXT_PUBLIC_BACKEND_URL,
    "GRAPHQL_URL or NEXT_PUBLIC_GRAPHQL_URL is required in production",
  );

export const env = {
  ...constants,
};
