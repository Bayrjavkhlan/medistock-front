const constants = {
  AUTH_TOKEN_KEY: "auth-token",
  REFRESH_TOKEN_KEY: "refresh-token",
};

export const env = {
  ...constants,
  // BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000",
  BACKEND_URL: "medistock-api-production.up.railway.app",
};
