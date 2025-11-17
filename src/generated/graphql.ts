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

export type AddressCreateInput = {
  address1: Scalars["String"]["input"];
  address2: InputMaybe<Scalars["String"]["input"]>;
  province: Scalars["String"]["input"];
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

export type Equipment = {
  assignedTo: Maybe<User>;
  category: Maybe<Scalars["String"]["output"]>;
  createdAt: Maybe<Scalars["DateTime"]["output"]>;
  hospital: Maybe<Hospital>;
  id: Maybe<Scalars["String"]["output"]>;
  name: Maybe<Scalars["String"]["output"]>;
  serialNo: Maybe<Scalars["String"]["output"]>;
  state: Maybe<Scalars["String"]["output"]>;
  updatedAt: Maybe<Scalars["DateTime"]["output"]>;
};

export enum EquipmentCategory {
  DEFIBRILLATOR = "DEFIBRILLATOR",
  DIALYSIS_MACHINE = "DIALYSIS_MACHINE",
  IMAGING_CT = "IMAGING_CT",
  IMAGING_MRI = "IMAGING_MRI",
  IMAGING_ULTRASOUND = "IMAGING_ULTRASOUND",
  IMAGING_X_RAY = "IMAGING_X_RAY",
  INFUSION_PUMP = "INFUSION_PUMP",
  LAB_EQUIPMENT = "LAB_EQUIPMENT",
  OTHER = "OTHER",
  PATIENT_MONITOR = "PATIENT_MONITOR",
  SURGICAL_INSTRUMENT = "SURGICAL_INSTRUMENT",
  VENTILATOR = "VENTILATOR",
}

export type EquipmentCreateInput = {
  category: EquipmentCategory;
  hospitalId: Scalars["String"]["input"];
  name: Scalars["String"]["input"];
  serialNo: Scalars["String"]["input"];
  state: EquipmentState;
  userId: Scalars["String"]["input"];
};

export type EquipmentLog = {
  createdAt: Maybe<Scalars["DateTime"]["output"]>;
  description: Maybe<Scalars["String"]["output"]>;
  equipment: Maybe<Equipment>;
  id: Maybe<Scalars["String"]["output"]>;
  performedBy: Maybe<User>;
  updatedAt: Maybe<Scalars["DateTime"]["output"]>;
  userId: Maybe<Scalars["String"]["output"]>;
};

export type EquipmentLogCreateInput = {
  description: Scalars["String"]["input"];
  equipmentId: Scalars["String"]["input"];
  userId: Scalars["String"]["input"];
};

export type EquipmentLogUpdateInput = {
  description: Scalars["String"]["input"];
};

export type EquipmentLogs = {
  count: Scalars["Int"]["output"];
  data: Maybe<Array<EquipmentLog>>;
};

export type EquipmentLogsWhereInput = {
  search: InputMaybe<Scalars["String"]["input"]>;
};

export enum EquipmentState {
  ASSIGNED = "ASSIGNED",
  AVAILABLE = "AVAILABLE",
  IN_MAINTENANCE = "IN_MAINTENANCE",
  OUT_OF_ORDER = "OUT_OF_ORDER",
  RETIRED = "RETIRED",
}

export type Equipments = {
  count: Scalars["Int"]["output"];
  data: Maybe<Array<Equipment>>;
};

export type EquipmentsWhereInput = {
  search: InputMaybe<Scalars["String"]["input"]>;
};

export type Hospital = {
  address: Maybe<Address>;
  createdAt: Maybe<Scalars["DateTime"]["output"]>;
  email: Maybe<Scalars["String"]["output"]>;
  id: Maybe<Scalars["String"]["output"]>;
  name: Maybe<Scalars["String"]["output"]>;
  phoneNumber: Maybe<Scalars["String"]["output"]>;
  updatedAt: Maybe<Scalars["DateTime"]["output"]>;
};

export type HospitalCreateInput = {
  address: AddressCreateInput;
  email: Scalars["EmailAddress"]["input"];
  name: Scalars["String"]["input"];
  phoneNumber: Scalars["String"]["input"];
};

export type HospitalOption = {
  id: Maybe<Scalars["String"]["output"]>;
  name: Maybe<Scalars["String"]["output"]>;
};

export type Hospitals = {
  count: Scalars["Int"]["output"];
  data: Maybe<Array<Hospital>>;
};

export type HospitalsWhereInput = {
  address: InputMaybe<Scalars["String"]["input"]>;
  search: InputMaybe<Scalars["String"]["input"]>;
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
  equipmentCreate: Maybe<Scalars["Boolean"]["output"]>;
  equipmentLogCreate: Maybe<Scalars["Boolean"]["output"]>;
  equipmentLogUpdate: Maybe<Scalars["Boolean"]["output"]>;
  equipmentUpdate: Maybe<Scalars["Boolean"]["output"]>;
  hospitalCreate: Maybe<Scalars["Boolean"]["output"]>;
  hospitalUpdate: Maybe<Scalars["Boolean"]["output"]>;
  login: Maybe<LoginPayload>;
  refreshAccessToken: Maybe<LoginPayload>;
  userCreate: Maybe<Scalars["Boolean"]["output"]>;
  userUpdate: Maybe<Scalars["Boolean"]["output"]>;
};

export type MutationEquipmentCreateArgs = {
  input: EquipmentCreateInput;
};

export type MutationEquipmentLogCreateArgs = {
  input: EquipmentLogCreateInput;
};

export type MutationEquipmentLogUpdateArgs = {
  id: Scalars["String"]["input"];
  input: EquipmentLogUpdateInput;
};

export type MutationEquipmentUpdateArgs = {
  id: Scalars["String"]["input"];
  input: EquipmentCreateInput;
};

export type MutationHospitalCreateArgs = {
  input: HospitalCreateInput;
};

export type MutationHospitalUpdateArgs = {
  id: Scalars["String"]["input"];
  input: HospitalCreateInput;
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
  equipmentDetail: Maybe<Equipment>;
  equipmentLogDetail: Maybe<EquipmentLog>;
  equipmentLogs: Maybe<EquipmentLogs>;
  equipments: Maybe<Equipments>;
  hospitalDetail: Maybe<Hospital>;
  hospitalOption: Array<HospitalOption>;
  hospitals: Maybe<Hospitals>;
  userDetail: Maybe<User>;
  users: Maybe<UserObjectType>;
};

export type QueryEquipmentDetailArgs = {
  id: Scalars["String"]["input"];
};

export type QueryEquipmentLogDetailArgs = {
  id: Scalars["String"]["input"];
};

export type QueryEquipmentLogsArgs = {
  skip: Scalars["Int"]["input"];
  take: Scalars["Int"]["input"];
  where: InputMaybe<EquipmentLogsWhereInput>;
};

export type QueryEquipmentsArgs = {
  skip: Scalars["Int"]["input"];
  take: Scalars["Int"]["input"];
  where: InputMaybe<EquipmentsWhereInput>;
};

export type QueryHospitalDetailArgs = {
  id: Scalars["String"]["input"];
};

export type QueryHospitalsArgs = {
  skip: Scalars["Int"]["input"];
  take: Scalars["Int"]["input"];
  where: InputMaybe<HospitalsWhereInput>;
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
  count: Scalars["Int"]["output"];
  data: Maybe<Array<User>>;
};

export type UsersOrderByInput = {
  email: InputMaybe<EnumSortOrder>;
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

export type EquipmentCreateMutationVariables = Exact<{
  input: EquipmentCreateInput;
}>;

export type EquipmentCreateMutation = { equipmentCreate: boolean | undefined };

export type EquipmentUpdateMutationVariables = Exact<{
  equipmentUpdateId: Scalars["String"]["input"];
  input: EquipmentCreateInput;
}>;

export type EquipmentUpdateMutation = { equipmentUpdate: boolean | undefined };

export type EquipmentsQueryVariables = Exact<{
  take: Scalars["Int"]["input"];
  skip: Scalars["Int"]["input"];
  where: InputMaybe<EquipmentsWhereInput>;
}>;

export type EquipmentsQuery = {
  equipments:
    | {
        count: number;
        data:
          | Array<{
              id: string | undefined;
              name: string | undefined;
              serialNo: string | undefined;
              state: string | undefined;
              category: string | undefined;
              assignedTo:
                | {
                    id: string | undefined;
                    name: string | undefined;
                    email: string | undefined;
                    phone: string | undefined;
                  }
                | undefined;
              hospital:
                | {
                    id: string | undefined;
                    name: string | undefined;
                    email: string | undefined;
                  }
                | undefined;
            }>
          | undefined;
      }
    | undefined;
};

export type EquipmentDetailQueryVariables = Exact<{
  equipmentDetailId: Scalars["String"]["input"];
}>;

export type EquipmentDetailQuery = {
  equipmentDetail:
    | {
        id: string | undefined;
        name: string | undefined;
        serialNo: string | undefined;
        state: string | undefined;
        assignedTo:
          | {
              id: string | undefined;
              name: string | undefined;
              email: string | undefined;
            }
          | undefined;
        hospital:
          | { id: string | undefined; name: string | undefined }
          | undefined;
      }
    | undefined;
};

export type HospitalCreateMutationVariables = Exact<{
  input: HospitalCreateInput;
}>;

export type HospitalCreateMutation = { hospitalCreate: boolean | undefined };

export type HospitalUpdateMutationVariables = Exact<{
  hospitalUpdateId: Scalars["String"]["input"];
  input: HospitalCreateInput;
}>;

export type HospitalUpdateMutation = { hospitalUpdate: boolean | undefined };

export type HospitalsQueryVariables = Exact<{
  take: Scalars["Int"]["input"];
  skip: Scalars["Int"]["input"];
  where: InputMaybe<HospitalsWhereInput>;
}>;

export type HospitalsQuery = {
  hospitals:
    | {
        count: number;
        data:
          | Array<{
              id: string | undefined;
              name: string | undefined;
              email: string | undefined;
              phoneNumber: string | undefined;
              address:
                | {
                    address1: string | undefined;
                    address2: string | undefined;
                    id: string | undefined;
                    province: string | undefined;
                  }
                | undefined;
            }>
          | undefined;
      }
    | undefined;
};

export type HospitalDetailQueryVariables = Exact<{
  hospitalDetailId: Scalars["String"]["input"];
}>;

export type HospitalDetailQuery = {
  hospitalDetail:
    | {
        id: string | undefined;
        name: string | undefined;
        email: string | undefined;
        phoneNumber: string | undefined;
        address:
          | {
              id: string | undefined;
              address1: string | undefined;
              address2: string | undefined;
              province: string | undefined;
            }
          | undefined;
      }
    | undefined;
};

export type HospitalOptionQueryVariables = Exact<{ [key: string]: never }>;

export type HospitalOptionQuery = {
  hospitalOption: Array<{ id: string | undefined; name: string | undefined }>;
};

export type UserCreateMutationVariables = Exact<{
  input: UserCreateInput;
}>;

export type UserCreateMutation = { userCreate: boolean | undefined };

export type UserUpdateMutationVariables = Exact<{
  userUpdateId: Scalars["String"]["input"];
  input: UserCreateInput;
}>;

export type UserUpdateMutation = { userUpdate: boolean | undefined };

export type UsersQueryVariables = Exact<{
  where: InputMaybe<UsersWhereInput>;
  take: Scalars["Int"]["input"];
  skip: Scalars["Int"]["input"];
  orderBy: InputMaybe<UsersOrderByInput>;
}>;

export type UsersQuery = {
  users:
    | {
        count: number;
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
export const EquipmentCreateDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "EquipmentCreate" },
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
              name: { kind: "Name", value: "EquipmentCreateInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "equipmentCreate" },
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
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode;
export type EquipmentCreateMutationFn = Apollo.MutationFunction<
  EquipmentCreateMutation,
  EquipmentCreateMutationVariables
>;

/**
 * __useEquipmentCreateMutation__
 *
 * To run a mutation, you first call `useEquipmentCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEquipmentCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [equipmentCreateMutation, { data, loading, error }] = useEquipmentCreateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEquipmentCreateMutation(
  baseOptions?: Apollo.MutationHookOptions<
    EquipmentCreateMutation,
    EquipmentCreateMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    EquipmentCreateMutation,
    EquipmentCreateMutationVariables
  >(EquipmentCreateDocument, options);
}
export type EquipmentCreateMutationHookResult = ReturnType<
  typeof useEquipmentCreateMutation
>;
export type EquipmentCreateMutationResult =
  Apollo.MutationResult<EquipmentCreateMutation>;
export type EquipmentCreateMutationOptions = Apollo.BaseMutationOptions<
  EquipmentCreateMutation,
  EquipmentCreateMutationVariables
>;
export const EquipmentUpdateDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "EquipmentUpdate" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "equipmentUpdateId" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
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
              name: { kind: "Name", value: "EquipmentCreateInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "equipmentUpdate" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "equipmentUpdateId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode;
export type EquipmentUpdateMutationFn = Apollo.MutationFunction<
  EquipmentUpdateMutation,
  EquipmentUpdateMutationVariables
>;

/**
 * __useEquipmentUpdateMutation__
 *
 * To run a mutation, you first call `useEquipmentUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEquipmentUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [equipmentUpdateMutation, { data, loading, error }] = useEquipmentUpdateMutation({
 *   variables: {
 *      equipmentUpdateId: // value for 'equipmentUpdateId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEquipmentUpdateMutation(
  baseOptions?: Apollo.MutationHookOptions<
    EquipmentUpdateMutation,
    EquipmentUpdateMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    EquipmentUpdateMutation,
    EquipmentUpdateMutationVariables
  >(EquipmentUpdateDocument, options);
}
export type EquipmentUpdateMutationHookResult = ReturnType<
  typeof useEquipmentUpdateMutation
>;
export type EquipmentUpdateMutationResult =
  Apollo.MutationResult<EquipmentUpdateMutation>;
export type EquipmentUpdateMutationOptions = Apollo.BaseMutationOptions<
  EquipmentUpdateMutation,
  EquipmentUpdateMutationVariables
>;
export const EquipmentsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Equipments" },
      variableDefinitions: [
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
            name: { kind: "Name", value: "where" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "EquipmentsWhereInput" },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "equipments" },
            arguments: [
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
                name: { kind: "Name", value: "where" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "where" },
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
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "serialNo" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "assignedTo" },
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
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "email" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "phone" },
                            },
                          ],
                        },
                      },
                      { kind: "Field", name: { kind: "Name", value: "state" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "category" },
                      },
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
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "email" },
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
 * __useEquipmentsQuery__
 *
 * To run a query within a React component, call `useEquipmentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useEquipmentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEquipmentsQuery({
 *   variables: {
 *      take: // value for 'take'
 *      skip: // value for 'skip'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useEquipmentsQuery(
  baseOptions: Apollo.QueryHookOptions<
    EquipmentsQuery,
    EquipmentsQueryVariables
  > &
    (
      | { variables: EquipmentsQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<EquipmentsQuery, EquipmentsQueryVariables>(
    EquipmentsDocument,
    options,
  );
}
export function useEquipmentsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    EquipmentsQuery,
    EquipmentsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<EquipmentsQuery, EquipmentsQueryVariables>(
    EquipmentsDocument,
    options,
  );
}
export function useEquipmentsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        EquipmentsQuery,
        EquipmentsQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<EquipmentsQuery, EquipmentsQueryVariables>(
    EquipmentsDocument,
    options,
  );
}
export type EquipmentsQueryHookResult = ReturnType<typeof useEquipmentsQuery>;
export type EquipmentsLazyQueryHookResult = ReturnType<
  typeof useEquipmentsLazyQuery
>;
export type EquipmentsSuspenseQueryHookResult = ReturnType<
  typeof useEquipmentsSuspenseQuery
>;
export type EquipmentsQueryResult = Apollo.QueryResult<
  EquipmentsQuery,
  EquipmentsQueryVariables
>;
export const EquipmentDetailDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "EquipmentDetail" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "equipmentDetailId" },
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
            name: { kind: "Name", value: "equipmentDetail" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "equipmentDetailId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "serialNo" } },
                { kind: "Field", name: { kind: "Name", value: "state" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "assignedTo" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      { kind: "Field", name: { kind: "Name", value: "email" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "hospital" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
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
 * __useEquipmentDetailQuery__
 *
 * To run a query within a React component, call `useEquipmentDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useEquipmentDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEquipmentDetailQuery({
 *   variables: {
 *      equipmentDetailId: // value for 'equipmentDetailId'
 *   },
 * });
 */
export function useEquipmentDetailQuery(
  baseOptions: Apollo.QueryHookOptions<
    EquipmentDetailQuery,
    EquipmentDetailQueryVariables
  > &
    (
      | { variables: EquipmentDetailQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<EquipmentDetailQuery, EquipmentDetailQueryVariables>(
    EquipmentDetailDocument,
    options,
  );
}
export function useEquipmentDetailLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    EquipmentDetailQuery,
    EquipmentDetailQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    EquipmentDetailQuery,
    EquipmentDetailQueryVariables
  >(EquipmentDetailDocument, options);
}
export function useEquipmentDetailSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        EquipmentDetailQuery,
        EquipmentDetailQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    EquipmentDetailQuery,
    EquipmentDetailQueryVariables
  >(EquipmentDetailDocument, options);
}
export type EquipmentDetailQueryHookResult = ReturnType<
  typeof useEquipmentDetailQuery
>;
export type EquipmentDetailLazyQueryHookResult = ReturnType<
  typeof useEquipmentDetailLazyQuery
>;
export type EquipmentDetailSuspenseQueryHookResult = ReturnType<
  typeof useEquipmentDetailSuspenseQuery
>;
export type EquipmentDetailQueryResult = Apollo.QueryResult<
  EquipmentDetailQuery,
  EquipmentDetailQueryVariables
>;
export const HospitalCreateDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "HospitalCreate" },
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
              name: { kind: "Name", value: "HospitalCreateInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "hospitalCreate" },
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
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode;
export type HospitalCreateMutationFn = Apollo.MutationFunction<
  HospitalCreateMutation,
  HospitalCreateMutationVariables
>;

/**
 * __useHospitalCreateMutation__
 *
 * To run a mutation, you first call `useHospitalCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useHospitalCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [hospitalCreateMutation, { data, loading, error }] = useHospitalCreateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useHospitalCreateMutation(
  baseOptions?: Apollo.MutationHookOptions<
    HospitalCreateMutation,
    HospitalCreateMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    HospitalCreateMutation,
    HospitalCreateMutationVariables
  >(HospitalCreateDocument, options);
}
export type HospitalCreateMutationHookResult = ReturnType<
  typeof useHospitalCreateMutation
>;
export type HospitalCreateMutationResult =
  Apollo.MutationResult<HospitalCreateMutation>;
export type HospitalCreateMutationOptions = Apollo.BaseMutationOptions<
  HospitalCreateMutation,
  HospitalCreateMutationVariables
>;
export const HospitalUpdateDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "HospitalUpdate" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "hospitalUpdateId" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
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
              name: { kind: "Name", value: "HospitalCreateInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "hospitalUpdate" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "hospitalUpdateId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode;
export type HospitalUpdateMutationFn = Apollo.MutationFunction<
  HospitalUpdateMutation,
  HospitalUpdateMutationVariables
>;

/**
 * __useHospitalUpdateMutation__
 *
 * To run a mutation, you first call `useHospitalUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useHospitalUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [hospitalUpdateMutation, { data, loading, error }] = useHospitalUpdateMutation({
 *   variables: {
 *      hospitalUpdateId: // value for 'hospitalUpdateId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useHospitalUpdateMutation(
  baseOptions?: Apollo.MutationHookOptions<
    HospitalUpdateMutation,
    HospitalUpdateMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    HospitalUpdateMutation,
    HospitalUpdateMutationVariables
  >(HospitalUpdateDocument, options);
}
export type HospitalUpdateMutationHookResult = ReturnType<
  typeof useHospitalUpdateMutation
>;
export type HospitalUpdateMutationResult =
  Apollo.MutationResult<HospitalUpdateMutation>;
export type HospitalUpdateMutationOptions = Apollo.BaseMutationOptions<
  HospitalUpdateMutation,
  HospitalUpdateMutationVariables
>;
export const HospitalsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Hospitals" },
      variableDefinitions: [
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
            name: { kind: "Name", value: "where" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "HospitalsWhereInput" },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "hospitals" },
            arguments: [
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
                name: { kind: "Name", value: "where" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "where" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "count" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "data" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      { kind: "Field", name: { kind: "Name", value: "email" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "phoneNumber" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "address" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "address1" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "address2" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "province" },
                            },
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
      },
    },
  ],
} as unknown as DocumentNode;

/**
 * __useHospitalsQuery__
 *
 * To run a query within a React component, call `useHospitalsQuery` and pass it any options that fit your needs.
 * When your component renders, `useHospitalsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHospitalsQuery({
 *   variables: {
 *      take: // value for 'take'
 *      skip: // value for 'skip'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useHospitalsQuery(
  baseOptions: Apollo.QueryHookOptions<
    HospitalsQuery,
    HospitalsQueryVariables
  > &
    (
      | { variables: HospitalsQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<HospitalsQuery, HospitalsQueryVariables>(
    HospitalsDocument,
    options,
  );
}
export function useHospitalsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    HospitalsQuery,
    HospitalsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<HospitalsQuery, HospitalsQueryVariables>(
    HospitalsDocument,
    options,
  );
}
export function useHospitalsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<HospitalsQuery, HospitalsQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<HospitalsQuery, HospitalsQueryVariables>(
    HospitalsDocument,
    options,
  );
}
export type HospitalsQueryHookResult = ReturnType<typeof useHospitalsQuery>;
export type HospitalsLazyQueryHookResult = ReturnType<
  typeof useHospitalsLazyQuery
>;
export type HospitalsSuspenseQueryHookResult = ReturnType<
  typeof useHospitalsSuspenseQuery
>;
export type HospitalsQueryResult = Apollo.QueryResult<
  HospitalsQuery,
  HospitalsQueryVariables
>;
export const HospitalDetailDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "HospitalDetail" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "hospitalDetailId" },
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
            name: { kind: "Name", value: "hospitalDetail" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "hospitalDetailId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "email" } },
                { kind: "Field", name: { kind: "Name", value: "phoneNumber" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "address" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "address1" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "address2" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "province" },
                      },
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
 * __useHospitalDetailQuery__
 *
 * To run a query within a React component, call `useHospitalDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useHospitalDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHospitalDetailQuery({
 *   variables: {
 *      hospitalDetailId: // value for 'hospitalDetailId'
 *   },
 * });
 */
export function useHospitalDetailQuery(
  baseOptions: Apollo.QueryHookOptions<
    HospitalDetailQuery,
    HospitalDetailQueryVariables
  > &
    (
      | { variables: HospitalDetailQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<HospitalDetailQuery, HospitalDetailQueryVariables>(
    HospitalDetailDocument,
    options,
  );
}
export function useHospitalDetailLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    HospitalDetailQuery,
    HospitalDetailQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<HospitalDetailQuery, HospitalDetailQueryVariables>(
    HospitalDetailDocument,
    options,
  );
}
export function useHospitalDetailSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        HospitalDetailQuery,
        HospitalDetailQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    HospitalDetailQuery,
    HospitalDetailQueryVariables
  >(HospitalDetailDocument, options);
}
export type HospitalDetailQueryHookResult = ReturnType<
  typeof useHospitalDetailQuery
>;
export type HospitalDetailLazyQueryHookResult = ReturnType<
  typeof useHospitalDetailLazyQuery
>;
export type HospitalDetailSuspenseQueryHookResult = ReturnType<
  typeof useHospitalDetailSuspenseQuery
>;
export type HospitalDetailQueryResult = Apollo.QueryResult<
  HospitalDetailQuery,
  HospitalDetailQueryVariables
>;
export const HospitalOptionDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "HospitalOption" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "hospitalOption" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode;

/**
 * __useHospitalOptionQuery__
 *
 * To run a query within a React component, call `useHospitalOptionQuery` and pass it any options that fit your needs.
 * When your component renders, `useHospitalOptionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHospitalOptionQuery({
 *   variables: {
 *   },
 * });
 */
export function useHospitalOptionQuery(
  baseOptions?: Apollo.QueryHookOptions<
    HospitalOptionQuery,
    HospitalOptionQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<HospitalOptionQuery, HospitalOptionQueryVariables>(
    HospitalOptionDocument,
    options,
  );
}
export function useHospitalOptionLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    HospitalOptionQuery,
    HospitalOptionQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<HospitalOptionQuery, HospitalOptionQueryVariables>(
    HospitalOptionDocument,
    options,
  );
}
export function useHospitalOptionSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        HospitalOptionQuery,
        HospitalOptionQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    HospitalOptionQuery,
    HospitalOptionQueryVariables
  >(HospitalOptionDocument, options);
}
export type HospitalOptionQueryHookResult = ReturnType<
  typeof useHospitalOptionQuery
>;
export type HospitalOptionLazyQueryHookResult = ReturnType<
  typeof useHospitalOptionLazyQuery
>;
export type HospitalOptionSuspenseQueryHookResult = ReturnType<
  typeof useHospitalOptionSuspenseQuery
>;
export type HospitalOptionQueryResult = Apollo.QueryResult<
  HospitalOptionQuery,
  HospitalOptionQueryVariables
>;
export const UserCreateDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UserCreate" },
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
              name: { kind: "Name", value: "UserCreateInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "userCreate" },
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
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode;
export type UserCreateMutationFn = Apollo.MutationFunction<
  UserCreateMutation,
  UserCreateMutationVariables
>;

/**
 * __useUserCreateMutation__
 *
 * To run a mutation, you first call `useUserCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userCreateMutation, { data, loading, error }] = useUserCreateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUserCreateMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UserCreateMutation,
    UserCreateMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UserCreateMutation, UserCreateMutationVariables>(
    UserCreateDocument,
    options,
  );
}
export type UserCreateMutationHookResult = ReturnType<
  typeof useUserCreateMutation
>;
export type UserCreateMutationResult =
  Apollo.MutationResult<UserCreateMutation>;
export type UserCreateMutationOptions = Apollo.BaseMutationOptions<
  UserCreateMutation,
  UserCreateMutationVariables
>;
export const UserUpdateDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UserUpdate" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "userUpdateId" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
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
              name: { kind: "Name", value: "UserCreateInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "userUpdate" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "userUpdateId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode;
export type UserUpdateMutationFn = Apollo.MutationFunction<
  UserUpdateMutation,
  UserUpdateMutationVariables
>;

/**
 * __useUserUpdateMutation__
 *
 * To run a mutation, you first call `useUserUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userUpdateMutation, { data, loading, error }] = useUserUpdateMutation({
 *   variables: {
 *      userUpdateId: // value for 'userUpdateId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUserUpdateMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UserUpdateMutation,
    UserUpdateMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UserUpdateMutation, UserUpdateMutationVariables>(
    UserUpdateDocument,
    options,
  );
}
export type UserUpdateMutationHookResult = ReturnType<
  typeof useUserUpdateMutation
>;
export type UserUpdateMutationResult =
  Apollo.MutationResult<UserUpdateMutation>;
export type UserUpdateMutationOptions = Apollo.BaseMutationOptions<
  UserUpdateMutation,
  UserUpdateMutationVariables
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
