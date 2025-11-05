/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: { input: any; output: any };
  /** A field whose value conforms to the standard internet email address format as specified in HTML Spec: https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address. */
  EmailAddress: { input: any; output: any };
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any };
};

export type Address = {
  address1?: Maybe<Scalars["String"]["output"]>;
  address2?: Maybe<Scalars["String"]["output"]>;
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  id?: Maybe<Scalars["String"]["output"]>;
  name?: Maybe<Hospital>;
  province?: Maybe<Scalars["String"]["output"]>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type CurrentUserObjectType = {
  email: Scalars["String"]["output"];
  hospital?: Maybe<Hospital>;
  id: Scalars["ID"]["output"];
  name?: Maybe<Scalars["String"]["output"]>;
  phone?: Maybe<Scalars["String"]["output"]>;
  roleKey?: Maybe<EnumUserRole>;
  roles?: Maybe<Array<Role>>;
};

export enum EnumUserRole {
  ADMIN = "ADMIN",
  HOSPITAL_ADMIN = "HOSPITAL_ADMIN",
  STAFF = "STAFF",
}

export type Hospital = {
  address?: Maybe<Address>;
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  email?: Maybe<Scalars["String"]["output"]>;
  id?: Maybe<Scalars["String"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  phoneNumber?: Maybe<Scalars["String"]["output"]>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type LoginInput = {
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

export type LoginPayload = {
  accessToken: Scalars["String"]["output"];
  accessTokenExpiresAt: Scalars["String"]["output"];
  refreshToken: Scalars["String"]["output"];
  user: CurrentUserObjectType;
};

export type Mutation = {
  login?: Maybe<LoginPayload>;
  refreshAccessToken?: Maybe<LoginPayload>;
  userCreate?: Maybe<Scalars["Boolean"]["output"]>;
  userUpdate?: Maybe<Scalars["Boolean"]["output"]>;
};

export type MutationLoginArgs = {
  input: LoginInput;
};

export type MutationRefreshAccessTokenArgs = {
  refreshToken: Scalars["String"]["input"];
};

export type MutationUserCreateArgs = {
  input: UserCreateInput;
};

export type MutationUserUpdateArgs = {
  id: Scalars["String"]["input"];
  input: UserCreateInput;
};

export type Query = {
  userDetail?: Maybe<User>;
  users?: Maybe<UserObjectType>;
};

export type QueryUserDetailArgs = {
  id: Scalars["String"]["input"];
};

export type Role = {
  id?: Maybe<Scalars["String"]["output"]>;
  key?: Maybe<EnumUserRole>;
  name?: Maybe<Scalars["String"]["output"]>;
};

export type User = {
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  email?: Maybe<Scalars["String"]["output"]>;
  hospital?: Maybe<Hospital>;
  id?: Maybe<Scalars["String"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  phone?: Maybe<Scalars["String"]["output"]>;
  roles?: Maybe<Array<Maybe<Role>>>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type UserCreateInput = {
  email: Scalars["String"]["input"];
  hospitalId: Scalars["String"]["input"];
  name: Scalars["String"]["input"];
  phone: Scalars["String"]["input"];
  roleKeys: Array<EnumUserRole>;
};

export type UserObjectType = {
  count?: Maybe<Scalars["Int"]["output"]>;
  data?: Maybe<Array<User>>;
};

export type UsersWhereInput = {
  roleKey?: InputMaybe<EnumUserRole>;
  search?: InputMaybe<Scalars["String"]["input"]>;
};

export type UsersQueryVariables = Exact<{ [key: string]: never }>;

export type UsersQuery = {
  users?: {
    count?: number | null;
    data?: Array<{
      id?: string | null;
      name?: string | null;
      email?: string | null;
      phone?: string | null;
      hospital?: { id?: string | null; name?: string | null } | null;
      roles?: Array<{
        id?: string | null;
        key?: EnumUserRole | null;
        name?: string | null;
      } | null> | null;
    }> | null;
  } | null;
};

export type UserDetailQueryVariables = Exact<{
  userDetailId: Scalars["String"]["input"];
}>;

export type UserDetailQuery = {
  userDetail?: {
    id?: string | null;
    email?: string | null;
    name?: string | null;
    phone?: string | null;
    roles?: Array<{
      id?: string | null;
      key?: EnumUserRole | null;
      name?: string | null;
    } | null> | null;
    hospital?: { name?: string | null; id?: string | null } | null;
  } | null;
};

export const UsersDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Users" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "users" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "data" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      { kind: "Field", name: { kind: "Name", value: "email" } },
                      { kind: "Field", name: { kind: "Name", value: "phone" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "hospital" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "name" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "roles" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "key" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "name" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "count" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UsersQuery, UsersQueryVariables>;
export const UserDetailDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "UserDetail" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "userDetailId" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "userDetail" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "userDetailId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "email" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "phone" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "roles" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "key" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "hospital" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UserDetailQuery, UserDetailQueryVariables>;
