// codegen.ts
import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:8000/api/graphql",
  documents: ["src/**/*.gql.ts", "src/**/*.graphql"], // ← ALL FILES FOREVER

  generates: {
    "src/generated/graphql.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        skipTypename: true,
        withHooks: true,
        reactApolloVersion: 3,
        dedupeOperationSuffix: true,
        documentMode: "documentNode",

        // THIS PREVENTS DUPLICATES FOREVER
        // Even if you accidentally name two queries "UserDetail"
        // It will generate: UserDetailDocument, UserDetailDocument2 → no crash
        // avoidOptionals: false,
        maybeValue: "T | undefined",
        namingConvention: {
          typeNames: "change-case-all#pascalCase",
          enumValues: "change-case-all#upperCase",
        },
        avoidOptionals: {
          field: true,
          inputValue: true,
          object: true,
          defaultValue: true,
        },
        scalars: {
          Int: "number",
          String: "string",
          Boolean: "boolean",
          Float: "number",
          ID: "string",
        },
      },
    },
  },

  hooks: {
    afterAllFileWrite: ["prettier --write"],
  },
};

export default config;
