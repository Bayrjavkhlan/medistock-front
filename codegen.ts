// codegen.ts
import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:8000/api/graphql",
  documents: ["src/features/**/*.gql.ts"],
  generates: {
    "src/generated/": {
      preset: "client",
      presetConfig: { fragmentMasking: false },
      config: {
        skipTypename: true,
        documentMode: "documentNode",
        namingConvention: {
          typeNames: "change-case-all#pascalCase",
          enumValues: "change-case-all#upperCase",
        },
      },
    },
  },
  hooks: { afterAllFileWrite: ["prettier --write"] },
};

export default config;
