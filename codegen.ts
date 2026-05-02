import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "../medistock-api/src/graphql/generated/schema.graphql",
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
