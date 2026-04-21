import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  // schema: "http://localhost:4000/api/graphql",
  schema: "http://medicon-api-production.up.railway.app/api/graphql",
  documents: ["src/**/*.gql.ts", "src/**/*.graphql"],

  generates: {
    "src/generated/": {
      preset: "client",
      plugins: [],
      presetConfig: {
        gqlTagName: "gql",
      },
      config: {
        useTypeImports: true,
      },
    },
  },
};

export default config;
