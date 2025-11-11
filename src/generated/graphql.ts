import { DocumentNode } from "graphql";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | undefined;
export type InputMaybe<T> = T | undefined;
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
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  DateTime: { input: any; output: any };
  EmailAddress: { input: any; output: any };
  JSON: { input: any; output: any };
};

export type Address = {
  address1: Maybe<Scalars["String"]["output"]>;
  address2: Maybe<Scalars["String"]["output"]>;
  createdAt: Maybe<Scalars["DateTime"]["output"]>;
  id: Maybe<Scalars["String"]["output"]>;
  name: Maybe<Hospital>;
  province: Maybe<Scalars["String"]["output"]>;
  updatedAt: Maybe<Scalars["DateTime"]["output"]>;
};

export type CurrentUserObjectType = {
  email: Scalars["String"]["output"];
  hospital: Maybe<Hospital>;
  id: Scalars["ID"]["output"];
  name: Maybe<Scalars["String"]["output"]>;
  phone: Maybe<Scalars["String"]["output"]>;
  roleKey: Maybe<EnumUserRole>;
  roles: Maybe<Array<Role>>;
};

export enum EnumSortOrder {
  ASC = "asc",
  DESC = "desc",
}

export enum EnumUserRole {
  ADMIN = "ADMIN",
  HOSPITAL_ADMIN = "HOSPITAL_ADMIN",
  STAFF = "STAFF",
}

export type Hospital = {
  address: Maybe<Address>;
  createdAt: Maybe<Scalars["DateTime"]["output"]>;
  email: Maybe<Scalars["String"]["output"]>;
  id: Maybe<Scalars["String"]["output"]>;
  name: Maybe<Scalars["String"]["output"]>;
  phoneNumber: Maybe<Scalars["String"]["output"]>;
  updatedAt: Maybe<Scalars["DateTime"]["output"]>;
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
  login: Maybe<LoginPayload>;
  refreshAccessToken: Maybe<LoginPayload>;
  userCreate: Maybe<Scalars["Boolean"]["output"]>;
  userUpdate: Maybe<Scalars["Boolean"]["output"]>;
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
  currentUser: Maybe<CurrentUserObjectType>;
  userDetail: Maybe<User>;
  users: Maybe<UserObjectType>;
};

export type QueryUserDetailArgs = {
  id: Scalars["String"]["input"];
};

export type QueryUsersArgs = {
  orderBy: InputMaybe<UsersOrderByInput>;
  skip: Scalars["Int"]["input"];
  take: Scalars["Int"]["input"];
  where: InputMaybe<UsersWhereInput>;
};

export type Role = {
  id: Maybe<Scalars["String"]["output"]>;
  key: Maybe<EnumUserRole>;
  name: Maybe<Scalars["String"]["output"]>;
};

export type User = {
  createdAt: Maybe<Scalars["DateTime"]["output"]>;
  email: Maybe<Scalars["String"]["output"]>;
  hospital: Maybe<Hospital>;
  id: Maybe<Scalars["String"]["output"]>;
  name: Maybe<Scalars["String"]["output"]>;
  phone: Maybe<Scalars["String"]["output"]>;
  roles: Maybe<Array<Maybe<Role>>>;
  updatedAt: Maybe<Scalars["DateTime"]["output"]>;
};

export type UserCreateInput = {
  email: Scalars["String"]["input"];
  hospitalId: Scalars["String"]["input"];
  name: Scalars["String"]["input"];
  phone: Scalars["String"]["input"];
  roleKeys: Array<EnumUserRole>;
};

export type UserObjectType = {
  count: Maybe<Scalars["Int"]["output"]>;
  data: Maybe<Array<User>>;
};

export type UsersOrderByInput = {
  name: InputMaybe<EnumSortOrder>;
};

export type UsersWhereInput = {
  roleKey: InputMaybe<EnumUserRole>;
  search: InputMaybe<Scalars["String"]["input"]>;
};

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;

export type LoginMutation = {
  login:
    | {
        accessToken: string;
        refreshToken: string;
        accessTokenExpiresAt: string;
        user: {
          id: string;
          name: string | undefined;
          email: string;
          phone: string | undefined;
          roleKey: EnumUserRole | undefined;
          hospital: { name: string | undefined } | undefined;
        };
      }
    | undefined;
};

export type RefreshAccessTokenMutationVariables = Exact<{
  refreshToken: Scalars["String"]["input"];
}>;

export type RefreshAccessTokenMutation = {
  refreshAccessToken:
    | {
        accessToken: string;
        refreshToken: string;
        accessTokenExpiresAt: string;
        user: {
          id: string;
          name: string | undefined;
          email: string;
          phone: string | undefined;
          roleKey: EnumUserRole | undefined;
          hospital: { name: string | undefined } | undefined;
        };
      }
    | undefined;
};

export type CurrentUserQueryVariables = Exact<{ [key: string]: never }>;

export type CurrentUserQuery = {
  currentUser:
    | {
        id: string;
        name: string | undefined;
        email: string;
        phone: string | undefined;
        roleKey: EnumUserRole | undefined;
        roles:
          | Array<{ key: EnumUserRole | undefined; id: string | undefined }>
          | undefined;
        hospital:
          | {
              id: string | undefined;
              name: string | undefined;
              email: string | undefined;
            }
          | undefined;
      }
    | undefined;
};

export type UsersQueryVariables = Exact<{
  where: InputMaybe<UsersWhereInput>;
  take: Scalars["Int"]["input"];
  skip: Scalars["Int"]["input"];
  orderBy: InputMaybe<UsersOrderByInput>;
}>;

export type UsersQuery = {
  users:
    | {
        count: number | undefined;
        data:
          | Array<{
              id: string | undefined;
              name: string | undefined;
              email: string | undefined;
              phone: string | undefined;
              hospital:
                | { id: string | undefined; name: string | undefined }
                | undefined;
              roles:
                | Array<{ key: EnumUserRole | undefined } | undefined>
                | undefined;
            }>
          | undefined;
      }
    | undefined;
};

export type UserDetailQueryVariables = Exact<{
  userDetailId: Scalars["String"]["input"];
}>;

export type UserDetailQuery = {
  userDetail:
    | {
        id: string | undefined;
        email: string | undefined;
        name: string | undefined;
        phone: string | undefined;
        roles:
          | Array<
              | {
                  id: string | undefined;
                  key: EnumUserRole | undefined;
                  name: string | undefined;
                }
              | undefined
            >
          | undefined;
        hospital:
          | { name: string | undefined; id: string | undefined }
          | undefined;
      }
    | undefined;
};

export const LoginDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "Login" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "LoginInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "login" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "user" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      { kind: "Field", name: { kind: "Name", value: "email" } },
                      { kind: "Field", name: { kind: "Name", value: "phone" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "roleKey" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "hospital" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
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
                { kind: "Field", name: { kind: "Name", value: "accessToken" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "refreshToken" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "accessTokenExpiresAt" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode;
export type LoginMutationFn = Apollo.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    options,
  );
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>;
export const RefreshAccessTokenDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "RefreshAccessToken" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "refreshToken" },
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
            name: { kind: "Name", value: "refreshAccessToken" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "refreshToken" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "refreshToken" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "user" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      { kind: "Field", name: { kind: "Name", value: "email" } },
                      { kind: "Field", name: { kind: "Name", value: "phone" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "roleKey" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "hospital" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
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
                { kind: "Field", name: { kind: "Name", value: "accessToken" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "refreshToken" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "accessTokenExpiresAt" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode;
export type RefreshAccessTokenMutationFn = Apollo.MutationFunction<
  RefreshAccessTokenMutation,
  RefreshAccessTokenMutationVariables
>;

/**
 * __useRefreshAccessTokenMutation__
 *
 * To run a mutation, you first call `useRefreshAccessTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshAccessTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshAccessTokenMutation, { data, loading, error }] = useRefreshAccessTokenMutation({
 *   variables: {
 *      refreshToken: // value for 'refreshToken'
 *   },
 * });
 */
export function useRefreshAccessTokenMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RefreshAccessTokenMutation,
    RefreshAccessTokenMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    RefreshAccessTokenMutation,
    RefreshAccessTokenMutationVariables
  >(RefreshAccessTokenDocument, options);
}
export type RefreshAccessTokenMutationHookResult = ReturnType<
  typeof useRefreshAccessTokenMutation
>;
export type RefreshAccessTokenMutationResult =
  Apollo.MutationResult<RefreshAccessTokenMutation>;
export type RefreshAccessTokenMutationOptions = Apollo.BaseMutationOptions<
  RefreshAccessTokenMutation,
  RefreshAccessTokenMutationVariables
>;
export const CurrentUserDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "CurrentUser" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "currentUser" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "email" } },
                { kind: "Field", name: { kind: "Name", value: "phone" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "roles" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "key" } },
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "roleKey" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "hospital" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      { kind: "Field", name: { kind: "Name", value: "email" } },
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
} as unknown as DocumentNode;

/**
 * __useCurrentUserQuery__
 *
 * To run a query within a React component, call `useCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserQuery(
  baseOptions?: Apollo.QueryHookOptions<
    CurrentUserQuery,
    CurrentUserQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(
    CurrentUserDocument,
    options,
  );
}
export function useCurrentUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    CurrentUserQuery,
    CurrentUserQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<CurrentUserQuery, CurrentUserQueryVariables>(
    CurrentUserDocument,
    options,
  );
}
export function useCurrentUserSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        CurrentUserQuery,
        CurrentUserQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<CurrentUserQuery, CurrentUserQueryVariables>(
    CurrentUserDocument,
    options,
  );
}
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>;
export type CurrentUserLazyQueryHookResult = ReturnType<
  typeof useCurrentUserLazyQuery
>;
export type CurrentUserSuspenseQueryHookResult = ReturnType<
  typeof useCurrentUserSuspenseQuery
>;
export type CurrentUserQueryResult = Apollo.QueryResult<
  CurrentUserQuery,
  CurrentUserQueryVariables
>;
export const UsersDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Users" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "where" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "UsersWhereInput" },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "take" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "skip" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "orderBy" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "UsersOrderByInput" },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "users" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "where" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "where" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "take" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "take" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "skip" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "skip" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "orderBy" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "orderBy" },
                },
              },
            ],
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
                              name: { kind: "Name", value: "key" },
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
} as unknown as DocumentNode;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *      where: // value for 'where'
 *      take: // value for 'take'
 *      skip: // value for 'skip'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useUsersQuery(
  baseOptions: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables> &
    ({ variables: UsersQueryVariables; skip?: boolean } | { skip: boolean }),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UsersQuery, UsersQueryVariables>(
    UsersDocument,
    options,
  );
}
export function useUsersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(
    UsersDocument,
    options,
  );
}
export function useUsersSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<UsersQuery, UsersQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<UsersQuery, UsersQueryVariables>(
    UsersDocument,
    options,
  );
}
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersSuspenseQueryHookResult = ReturnType<
  typeof useUsersSuspenseQuery
>;
export type UsersQueryResult = Apollo.QueryResult<
  UsersQuery,
  UsersQueryVariables
>;
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
} as unknown as DocumentNode;

/**
 * __useUserDetailQuery__
 *
 * To run a query within a React component, call `useUserDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserDetailQuery({
 *   variables: {
 *      userDetailId: // value for 'userDetailId'
 *   },
 * });
 */
export function useUserDetailQuery(
  baseOptions: Apollo.QueryHookOptions<
    UserDetailQuery,
    UserDetailQueryVariables
  > &
    (
      | { variables: UserDetailQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UserDetailQuery, UserDetailQueryVariables>(
    UserDetailDocument,
    options,
  );
}
export function useUserDetailLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    UserDetailQuery,
    UserDetailQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UserDetailQuery, UserDetailQueryVariables>(
    UserDetailDocument,
    options,
  );
}
export function useUserDetailSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        UserDetailQuery,
        UserDetailQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<UserDetailQuery, UserDetailQueryVariables>(
    UserDetailDocument,
    options,
  );
}
export type UserDetailQueryHookResult = ReturnType<typeof useUserDetailQuery>;
export type UserDetailLazyQueryHookResult = ReturnType<
  typeof useUserDetailLazyQuery
>;
export type UserDetailSuspenseQueryHookResult = ReturnType<
  typeof useUserDetailSuspenseQuery
>;
export type UserDetailQueryResult = Apollo.QueryResult<
  UserDetailQuery,
  UserDetailQueryVariables
>;
