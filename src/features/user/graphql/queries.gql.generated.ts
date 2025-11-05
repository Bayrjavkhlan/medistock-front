import * as Types from "/generated/graphql";

import { GraphQLClient } from "graphql-request";
import { RequestInit } from "graphql-request/dist/types.dom";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
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

function fetcher<TData, TVariables extends { [key: string]: any }>(
  client: GraphQLClient,
  query: string,
  variables?: TVariables,
  requestHeaders?: RequestInit["headers"],
) {
  return async (): Promise<TData> =>
    client.request({
      document: query,
      variables,
      requestHeaders,
    });
}
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
  __typename?: "Address";
  address1?: Maybe<Scalars["String"]["output"]>;
  address2?: Maybe<Scalars["String"]["output"]>;
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  id?: Maybe<Scalars["String"]["output"]>;
  name?: Maybe<Hospital>;
  province?: Maybe<Scalars["String"]["output"]>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type CurrentUserObjectType = {
  __typename?: "CurrentUserObjectType";
  email: Scalars["String"]["output"];
  hospital?: Maybe<Hospital>;
  id: Scalars["ID"]["output"];
  name?: Maybe<Scalars["String"]["output"]>;
  phone?: Maybe<Scalars["String"]["output"]>;
  roleKey?: Maybe<EnumUserRole>;
  roles?: Maybe<Array<Role>>;
};

export enum EnumUserRole {
  Admin = "ADMIN",
  HospitalAdmin = "HOSPITAL_ADMIN",
  Staff = "STAFF",
}

export type Hospital = {
  __typename?: "Hospital";
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
  __typename?: "LoginPayload";
  accessToken: Scalars["String"]["output"];
  accessTokenExpiresAt: Scalars["String"]["output"];
  refreshToken: Scalars["String"]["output"];
  user: CurrentUserObjectType;
};

export type Mutation = {
  __typename?: "Mutation";
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
  __typename?: "Query";
  userDetail?: Maybe<User>;
  users?: Maybe<UserObjectType>;
};

export type QueryUserDetailArgs = {
  id: Scalars["String"]["input"];
};

export type Role = {
  __typename?: "Role";
  id?: Maybe<Scalars["String"]["output"]>;
  key?: Maybe<EnumUserRole>;
  name?: Maybe<Scalars["String"]["output"]>;
};

export type User = {
  __typename?: "User";
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
  __typename?: "UserObjectType";
  count?: Maybe<Scalars["Int"]["output"]>;
  data?: Maybe<Array<User>>;
};

export type UsersWhereInput = {
  roleKey?: InputMaybe<EnumUserRole>;
  search?: InputMaybe<Scalars["String"]["input"]>;
};

export type UsersQueryVariables = Types.Exact<{ [key: string]: never }>;

export type UsersQuery = {
  __typename?: "Query";
  users?: {
    __typename?: "UserObjectType";
    count?: number | null;
    data?: Array<{
      __typename?: "User";
      id?: string | null;
      name?: string | null;
      email?: string | null;
      phone?: string | null;
      hospital?: {
        __typename?: "Hospital";
        id?: string | null;
        name?: string | null;
      } | null;
      roles?: Array<{
        __typename?: "Role";
        id?: string | null;
        key?: Types.EnumUserRole | null;
        name?: string | null;
      } | null> | null;
    }> | null;
  } | null;
};

export type UserDetailQueryVariables = Types.Exact<{
  userDetailId: Types.Scalars["String"]["input"];
}>;

export type UserDetailQuery = {
  __typename?: "Query";
  userDetail?: {
    __typename?: "User";
    id?: string | null;
    email?: string | null;
    name?: string | null;
    phone?: string | null;
    roles?: Array<{
      __typename?: "Role";
      id?: string | null;
      key?: Types.EnumUserRole | null;
      name?: string | null;
    } | null> | null;
    hospital?: {
      __typename?: "Hospital";
      name?: string | null;
      id?: string | null;
    } | null;
  } | null;
};

export const UsersDocument = `
    query Users {
  users {
    data {
      id
      name
      email
      phone
      hospital {
        id
        name
      }
      roles {
        id
        key
        name
      }
    }
    count
  }
}
    `;

export const useUsersQuery = <TData = UsersQuery, TError = unknown>(
  client: GraphQLClient,
  variables?: UsersQueryVariables,
  options?: UseQueryOptions<UsersQuery, TError, TData>,
  headers?: RequestInit["headers"],
) => {
  return useQuery<UsersQuery, TError, TData>(
    variables === undefined ? ["Users"] : ["Users", variables],
    fetcher<UsersQuery, UsersQueryVariables>(
      client,
      UsersDocument,
      variables,
      headers,
    ),
    options,
  );
};

export const UserDetailDocument = `
    query UserDetail($userDetailId: String!) {
  userDetail(id: $userDetailId) {
    id
    email
    name
    phone
    roles {
      id
      key
      name
    }
    hospital {
      name
      id
    }
  }
}
    `;

export const useUserDetailQuery = <TData = UserDetailQuery, TError = unknown>(
  client: GraphQLClient,
  variables: UserDetailQueryVariables,
  options?: UseQueryOptions<UserDetailQuery, TError, TData>,
  headers?: RequestInit["headers"],
) => {
  return useQuery<UserDetailQuery, TError, TData>(
    ["UserDetail", variables],
    fetcher<UserDetailQuery, UserDetailQueryVariables>(
      client,
      UserDetailDocument,
      variables,
      headers,
    ),
    options,
  );
};
