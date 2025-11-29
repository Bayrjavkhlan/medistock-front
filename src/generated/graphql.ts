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

export type CurrentStaffObjectType = {
  email: Scalars["String"]["output"];
  hospital: Maybe<Hospital>;
  id: Scalars["ID"]["output"];
  name: Maybe<Scalars["String"]["output"]>;
  phone: Maybe<Scalars["String"]["output"]>;
  roleKey: Maybe<EnumStaffRole>;
  roles: Maybe<Array<Role>>;
};

export enum EnumSortOrder {
  ASC = "asc",
  DESC = "desc",
}

export enum EnumStaffRole {
  ADMIN = "ADMIN",
  HOSPITAL_ADMIN = "HOSPITAL_ADMIN",
  STAFF = "STAFF",
}

export type Equipment = {
  assignedTo: Maybe<Staff>;
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
  staffId: Scalars["String"]["input"];
  state: EquipmentState;
};

export type EquipmentLog = {
  createdAt: Maybe<Scalars["DateTime"]["output"]>;
  description: Maybe<Scalars["String"]["output"]>;
  equipment: Maybe<Equipment>;
  id: Maybe<Scalars["String"]["output"]>;
  performedBy: Maybe<Staff>;
  staffId: Maybe<Scalars["String"]["output"]>;
  updatedAt: Maybe<Scalars["DateTime"]["output"]>;
};

export type EquipmentLogCreateInput = {
  description: Scalars["String"]["input"];
  equipmentId: Scalars["String"]["input"];
  staffId: Scalars["String"]["input"];
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
  phone: Maybe<Scalars["String"]["output"]>;
  updatedAt: Maybe<Scalars["DateTime"]["output"]>;
};

export type HospitalCreateInput = {
  address: AddressCreateInput;
  email: Scalars["EmailAddress"]["input"];
  name: Scalars["String"]["input"];
  phone: Scalars["String"]["input"];
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
  staff: CurrentStaffObjectType;
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
  staffCreate: Maybe<Scalars["Boolean"]["output"]>;
  staffUpdate: Maybe<Scalars["Boolean"]["output"]>;
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

export type MutationStaffCreateArgs = {
  input: StaffCreateInput;
};

export type MutationStaffUpdateArgs = {
  id: Scalars["String"]["input"];
  input: StaffCreateInput;
};

export type Query = {
  currentStaff: Maybe<CurrentStaffObjectType>;
  equipmentDetail: Maybe<Equipment>;
  equipmentLogDetail: Maybe<EquipmentLog>;
  equipmentLogs: Maybe<EquipmentLogs>;
  equipments: Maybe<Equipments>;
  hospitalDetail: Maybe<Hospital>;
  hospitalOption: Array<HospitalOption>;
  hospitals: Maybe<Hospitals>;
  staffDetail: Maybe<Staff>;
  staffs: Maybe<StaffObjectType>;
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

export type QueryStaffDetailArgs = {
  id: Scalars["String"]["input"];
};

export type QueryStaffsArgs = {
  orderBy: InputMaybe<StaffsOrderByInput>;
  skip: Scalars["Int"]["input"];
  take: Scalars["Int"]["input"];
  where: InputMaybe<StaffsWhereInput>;
};

export type Role = {
  id: Maybe<Scalars["String"]["output"]>;
  key: Maybe<EnumStaffRole>;
  name: Maybe<Scalars["String"]["output"]>;
};

export type Staff = {
  createdAt: Maybe<Scalars["DateTime"]["output"]>;
  email: Maybe<Scalars["String"]["output"]>;
  hospital: Maybe<Hospital>;
  id: Maybe<Scalars["String"]["output"]>;
  name: Maybe<Scalars["String"]["output"]>;
  phone: Maybe<Scalars["String"]["output"]>;
  roles: Maybe<Array<Maybe<Role>>>;
  updatedAt: Maybe<Scalars["DateTime"]["output"]>;
};

export type StaffCreateInput = {
  email: Scalars["String"]["input"];
  hospitalId: Scalars["String"]["input"];
  name: Scalars["String"]["input"];
  phone: Scalars["String"]["input"];
  roleKeys: Array<EnumStaffRole>;
};

export type StaffObjectType = {
  count: Scalars["Int"]["output"];
  data: Maybe<Array<Staff>>;
};

export type StaffsOrderByInput = {
  email: InputMaybe<EnumSortOrder>;
  name: InputMaybe<EnumSortOrder>;
};

export type StaffsWhereInput = {
  roleKey: InputMaybe<EnumStaffRole>;
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
        staff: {
          id: string;
          name: string | undefined;
          email: string;
          phone: string | undefined;
          roleKey: EnumStaffRole | undefined;
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
        staff: {
          id: string;
          name: string | undefined;
          email: string;
          phone: string | undefined;
          roleKey: EnumStaffRole | undefined;
          hospital: { name: string | undefined } | undefined;
        };
      }
    | undefined;
};

export type CurrentStaffQueryVariables = Exact<{ [key: string]: never }>;

export type CurrentStaffQuery = {
  currentStaff:
    | {
        id: string;
        name: string | undefined;
        email: string;
        phone: string | undefined;
        roleKey: EnumStaffRole | undefined;
        roles:
          | Array<{ key: EnumStaffRole | undefined; id: string | undefined }>
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
              phone: string | undefined;
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
        phone: string | undefined;
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

export type StaffCreateMutationVariables = Exact<{
  input: StaffCreateInput;
}>;

export type StaffCreateMutation = { staffCreate: boolean | undefined };

export type StaffUpdateMutationVariables = Exact<{
  staffUpdateId: Scalars["String"]["input"];
  input: StaffCreateInput;
}>;

export type StaffUpdateMutation = { staffUpdate: boolean | undefined };

export type StaffsQueryVariables = Exact<{
  where: InputMaybe<StaffsWhereInput>;
  take: Scalars["Int"]["input"];
  skip: Scalars["Int"]["input"];
  orderBy: InputMaybe<StaffsOrderByInput>;
}>;

export type StaffsQuery = {
  staffs:
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
                | Array<{ key: EnumStaffRole | undefined } | undefined>
                | undefined;
            }>
          | undefined;
      }
    | undefined;
};

export type StaffDetailQueryVariables = Exact<{
  staffDetailId: Scalars["String"]["input"];
}>;

export type StaffDetailQuery = {
  staffDetail:
    | {
        id: string | undefined;
        email: string | undefined;
        name: string | undefined;
        phone: string | undefined;
        roles:
          | Array<
              | {
                  id: string | undefined;
                  key: EnumStaffRole | undefined;
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
                  name: { kind: "Name", value: "staff" },
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
                  name: { kind: "Name", value: "staff" },
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
export const CurrentStaffDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "CurrentStaff" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "currentStaff" },
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
 * __useCurrentStaffQuery__
 *
 * To run a query within a React component, call `useCurrentStaffQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentStaffQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentStaffQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentStaffQuery(
  baseOptions?: Apollo.QueryHookOptions<
    CurrentStaffQuery,
    CurrentStaffQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<CurrentStaffQuery, CurrentStaffQueryVariables>(
    CurrentStaffDocument,
    options,
  );
}
export function useCurrentStaffLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    CurrentStaffQuery,
    CurrentStaffQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<CurrentStaffQuery, CurrentStaffQueryVariables>(
    CurrentStaffDocument,
    options,
  );
}
export function useCurrentStaffSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        CurrentStaffQuery,
        CurrentStaffQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<CurrentStaffQuery, CurrentStaffQueryVariables>(
    CurrentStaffDocument,
    options,
  );
}
export type CurrentStaffQueryHookResult = ReturnType<
  typeof useCurrentStaffQuery
>;
export type CurrentStaffLazyQueryHookResult = ReturnType<
  typeof useCurrentStaffLazyQuery
>;
export type CurrentStaffSuspenseQueryHookResult = ReturnType<
  typeof useCurrentStaffSuspenseQuery
>;
export type CurrentStaffQueryResult = Apollo.QueryResult<
  CurrentStaffQuery,
  CurrentStaffQueryVariables
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
                      { kind: "Field", name: { kind: "Name", value: "phone" } },
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
                { kind: "Field", name: { kind: "Name", value: "phone" } },
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
export const StaffCreateDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "staffCreate" },
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
              name: { kind: "Name", value: "StaffCreateInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "staffCreate" },
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
export type StaffCreateMutationFn = Apollo.MutationFunction<
  StaffCreateMutation,
  StaffCreateMutationVariables
>;

/**
 * __useStaffCreateMutation__
 *
 * To run a mutation, you first call `useStaffCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStaffCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [staffCreateMutation, { data, loading, error }] = useStaffCreateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useStaffCreateMutation(
  baseOptions?: Apollo.MutationHookOptions<
    StaffCreateMutation,
    StaffCreateMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<StaffCreateMutation, StaffCreateMutationVariables>(
    StaffCreateDocument,
    options,
  );
}
export type StaffCreateMutationHookResult = ReturnType<
  typeof useStaffCreateMutation
>;
export type StaffCreateMutationResult =
  Apollo.MutationResult<StaffCreateMutation>;
export type StaffCreateMutationOptions = Apollo.BaseMutationOptions<
  StaffCreateMutation,
  StaffCreateMutationVariables
>;
export const StaffUpdateDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "StaffUpdate" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "staffUpdateId" },
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
              name: { kind: "Name", value: "StaffCreateInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "staffUpdate" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "staffUpdateId" },
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
export type StaffUpdateMutationFn = Apollo.MutationFunction<
  StaffUpdateMutation,
  StaffUpdateMutationVariables
>;

/**
 * __useStaffUpdateMutation__
 *
 * To run a mutation, you first call `useStaffUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStaffUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [staffUpdateMutation, { data, loading, error }] = useStaffUpdateMutation({
 *   variables: {
 *      staffUpdateId: // value for 'staffUpdateId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useStaffUpdateMutation(
  baseOptions?: Apollo.MutationHookOptions<
    StaffUpdateMutation,
    StaffUpdateMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<StaffUpdateMutation, StaffUpdateMutationVariables>(
    StaffUpdateDocument,
    options,
  );
}
export type StaffUpdateMutationHookResult = ReturnType<
  typeof useStaffUpdateMutation
>;
export type StaffUpdateMutationResult =
  Apollo.MutationResult<StaffUpdateMutation>;
export type StaffUpdateMutationOptions = Apollo.BaseMutationOptions<
  StaffUpdateMutation,
  StaffUpdateMutationVariables
>;
export const StaffsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Staffs" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "where" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "StaffsWhereInput" },
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
            name: { kind: "Name", value: "StaffsOrderByInput" },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "staffs" },
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
 * __useStaffsQuery__
 *
 * To run a query within a React component, call `useStaffsQuery` and pass it any options that fit your needs.
 * When your component renders, `useStaffsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStaffsQuery({
 *   variables: {
 *      where: // value for 'where'
 *      take: // value for 'take'
 *      skip: // value for 'skip'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useStaffsQuery(
  baseOptions: Apollo.QueryHookOptions<StaffsQuery, StaffsQueryVariables> &
    ({ variables: StaffsQueryVariables; skip?: boolean } | { skip: boolean }),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<StaffsQuery, StaffsQueryVariables>(
    StaffsDocument,
    options,
  );
}
export function useStaffsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<StaffsQuery, StaffsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<StaffsQuery, StaffsQueryVariables>(
    StaffsDocument,
    options,
  );
}
export function useStaffsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<StaffsQuery, StaffsQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<StaffsQuery, StaffsQueryVariables>(
    StaffsDocument,
    options,
  );
}
export type StaffsQueryHookResult = ReturnType<typeof useStaffsQuery>;
export type StaffsLazyQueryHookResult = ReturnType<typeof useStaffsLazyQuery>;
export type StaffsSuspenseQueryHookResult = ReturnType<
  typeof useStaffsSuspenseQuery
>;
export type StaffsQueryResult = Apollo.QueryResult<
  StaffsQuery,
  StaffsQueryVariables
>;
export const StaffDetailDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "StaffDetail" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "staffDetailId" },
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
            name: { kind: "Name", value: "staffDetail" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "staffDetailId" },
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
 * __useStaffDetailQuery__
 *
 * To run a query within a React component, call `useStaffDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useStaffDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStaffDetailQuery({
 *   variables: {
 *      staffDetailId: // value for 'staffDetailId'
 *   },
 * });
 */
export function useStaffDetailQuery(
  baseOptions: Apollo.QueryHookOptions<
    StaffDetailQuery,
    StaffDetailQueryVariables
  > &
    (
      | { variables: StaffDetailQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<StaffDetailQuery, StaffDetailQueryVariables>(
    StaffDetailDocument,
    options,
  );
}
export function useStaffDetailLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    StaffDetailQuery,
    StaffDetailQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<StaffDetailQuery, StaffDetailQueryVariables>(
    StaffDetailDocument,
    options,
  );
}
export function useStaffDetailSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        StaffDetailQuery,
        StaffDetailQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<StaffDetailQuery, StaffDetailQueryVariables>(
    StaffDetailDocument,
    options,
  );
}
export type StaffDetailQueryHookResult = ReturnType<typeof useStaffDetailQuery>;
export type StaffDetailLazyQueryHookResult = ReturnType<
  typeof useStaffDetailLazyQuery
>;
export type StaffDetailSuspenseQueryHookResult = ReturnType<
  typeof useStaffDetailSuspenseQuery
>;
export type StaffDetailQueryResult = Apollo.QueryResult<
  StaffDetailQuery,
  StaffDetailQueryVariables
>;
