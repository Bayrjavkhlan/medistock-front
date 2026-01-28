/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
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
  __typename?: "Address";
  address1?: Maybe<Scalars["String"]["output"]>;
  address2?: Maybe<Scalars["String"]["output"]>;
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  id?: Maybe<Scalars["String"]["output"]>;
  name?: Maybe<Hospital>;
  province?: Maybe<Scalars["String"]["output"]>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type AddressCreateInput = {
  address1: Scalars["String"]["input"];
  address2?: InputMaybe<Scalars["String"]["input"]>;
  province: Scalars["String"]["input"];
};

export type CurrentStaffObjectType = {
  __typename?: "CurrentStaffObjectType";
  email: Scalars["String"]["output"];
  hospital?: Maybe<Hospital>;
  id: Scalars["ID"]["output"];
  name?: Maybe<Scalars["String"]["output"]>;
  phone?: Maybe<Scalars["String"]["output"]>;
  roleKey?: Maybe<EnumStaffRole>;
  roles?: Maybe<Array<Role>>;
};

export enum EnumSortOrder {
  Asc = "asc",
  Desc = "desc",
}

export enum EnumStaffRole {
  Admin = "ADMIN",
  HospitalAdmin = "HOSPITAL_ADMIN",
  Staff = "STAFF",
}

export type Equipment = {
  __typename?: "Equipment";
  assignedTo?: Maybe<Staff>;
  category?: Maybe<Scalars["String"]["output"]>;
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  hospital?: Maybe<Hospital>;
  id?: Maybe<Scalars["String"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  serialNo?: Maybe<Scalars["String"]["output"]>;
  state?: Maybe<Scalars["String"]["output"]>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export enum EquipmentCategory {
  Defibrillator = "DEFIBRILLATOR",
  DialysisMachine = "DIALYSIS_MACHINE",
  ImagingCt = "IMAGING_CT",
  ImagingMri = "IMAGING_MRI",
  ImagingUltrasound = "IMAGING_ULTRASOUND",
  ImagingXRay = "IMAGING_X_RAY",
  InfusionPump = "INFUSION_PUMP",
  LabEquipment = "LAB_EQUIPMENT",
  Other = "OTHER",
  PatientMonitor = "PATIENT_MONITOR",
  SurgicalInstrument = "SURGICAL_INSTRUMENT",
  Ventilator = "VENTILATOR",
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
  __typename?: "EquipmentLog";
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  description?: Maybe<Scalars["String"]["output"]>;
  equipment?: Maybe<Equipment>;
  id?: Maybe<Scalars["String"]["output"]>;
  performedBy?: Maybe<Staff>;
  staffId?: Maybe<Scalars["String"]["output"]>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
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
  __typename?: "EquipmentLogs";
  count: Scalars["Int"]["output"];
  data?: Maybe<Array<EquipmentLog>>;
};

export type EquipmentLogsWhereInput = {
  search?: InputMaybe<Scalars["String"]["input"]>;
};

export enum EquipmentState {
  Assigned = "ASSIGNED",
  Available = "AVAILABLE",
  InMaintenance = "IN_MAINTENANCE",
  OutOfOrder = "OUT_OF_ORDER",
  Retired = "RETIRED",
}

export type Equipments = {
  __typename?: "Equipments";
  count: Scalars["Int"]["output"];
  data?: Maybe<Array<Equipment>>;
};

export type EquipmentsWhereInput = {
  search?: InputMaybe<Scalars["String"]["input"]>;
};

export type Hospital = {
  __typename?: "Hospital";
  address?: Maybe<Address>;
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  email?: Maybe<Scalars["String"]["output"]>;
  id?: Maybe<Scalars["String"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  phone?: Maybe<Scalars["String"]["output"]>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type HospitalCreateInput = {
  address: AddressCreateInput;
  email: Scalars["EmailAddress"]["input"];
  name: Scalars["String"]["input"];
  phone: Scalars["String"]["input"];
};

export type HospitalOption = {
  __typename?: "HospitalOption";
  id?: Maybe<Scalars["String"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
};

export type Hospitals = {
  __typename?: "Hospitals";
  count: Scalars["Int"]["output"];
  data?: Maybe<Array<Hospital>>;
};

export type HospitalsWhereInput = {
  address?: InputMaybe<Scalars["String"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
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
  staff: CurrentStaffObjectType;
};

export type Mutation = {
  __typename?: "Mutation";
  equipmentCreate?: Maybe<Scalars["Boolean"]["output"]>;
  equipmentLogCreate?: Maybe<Scalars["Boolean"]["output"]>;
  equipmentLogUpdate?: Maybe<Scalars["Boolean"]["output"]>;
  equipmentUpdate?: Maybe<Scalars["Boolean"]["output"]>;
  hospitalCreate?: Maybe<Scalars["Boolean"]["output"]>;
  hospitalUpdate?: Maybe<Scalars["Boolean"]["output"]>;
  login?: Maybe<LoginPayload>;
  refreshAccessToken?: Maybe<LoginPayload>;
  staffCreate?: Maybe<Scalars["Boolean"]["output"]>;
  staffUpdate?: Maybe<Scalars["Boolean"]["output"]>;
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
  __typename?: "Query";
  currentStaff?: Maybe<CurrentStaffObjectType>;
  equipmentDetail?: Maybe<Equipment>;
  equipmentLogDetail?: Maybe<EquipmentLog>;
  equipmentLogs?: Maybe<EquipmentLogs>;
  equipments?: Maybe<Equipments>;
  hospitalDetail?: Maybe<Hospital>;
  hospitalOption: Array<HospitalOption>;
  hospitals?: Maybe<Hospitals>;
  staffDetail?: Maybe<Staff>;
  staffs?: Maybe<StaffObjectType>;
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
  where?: InputMaybe<EquipmentLogsWhereInput>;
};

export type QueryEquipmentsArgs = {
  skip: Scalars["Int"]["input"];
  take: Scalars["Int"]["input"];
  where?: InputMaybe<EquipmentsWhereInput>;
};

export type QueryHospitalDetailArgs = {
  id: Scalars["String"]["input"];
};

export type QueryHospitalsArgs = {
  skip: Scalars["Int"]["input"];
  take: Scalars["Int"]["input"];
  where?: InputMaybe<HospitalsWhereInput>;
};

export type QueryStaffDetailArgs = {
  id: Scalars["String"]["input"];
};

export type QueryStaffsArgs = {
  orderBy?: InputMaybe<StaffsOrderByInput>;
  skip: Scalars["Int"]["input"];
  take: Scalars["Int"]["input"];
  where?: InputMaybe<StaffsWhereInput>;
};

export type Role = {
  __typename?: "Role";
  id?: Maybe<Scalars["String"]["output"]>;
  key?: Maybe<EnumStaffRole>;
  name?: Maybe<Scalars["String"]["output"]>;
};

export type Staff = {
  __typename?: "Staff";
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  email?: Maybe<Scalars["String"]["output"]>;
  hospital?: Maybe<Hospital>;
  id?: Maybe<Scalars["String"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  phone?: Maybe<Scalars["String"]["output"]>;
  roles?: Maybe<Array<Maybe<Role>>>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type StaffCreateInput = {
  email: Scalars["String"]["input"];
  hospitalId: Scalars["String"]["input"];
  name: Scalars["String"]["input"];
  phone: Scalars["String"]["input"];
  roleKeys: Array<EnumStaffRole>;
};

export type StaffObjectType = {
  __typename?: "StaffObjectType";
  count: Scalars["Int"]["output"];
  data?: Maybe<Array<Staff>>;
};

export type StaffsOrderByInput = {
  email?: InputMaybe<EnumSortOrder>;
  name?: InputMaybe<EnumSortOrder>;
};

export type StaffsWhereInput = {
  roleKey?: InputMaybe<EnumStaffRole>;
  search?: InputMaybe<Scalars["String"]["input"]>;
};

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;

export type LoginMutation = {
  __typename?: "Mutation";
  login?: {
    __typename?: "LoginPayload";
    accessToken: string;
    refreshToken: string;
    accessTokenExpiresAt: string;
    staff: {
      __typename?: "CurrentStaffObjectType";
      id: string;
      name?: string | null;
      email: string;
      phone?: string | null;
      roleKey?: EnumStaffRole | null;
      hospital?: { __typename?: "Hospital"; name?: string | null } | null;
    };
  } | null;
};

export type RefreshAccessTokenMutationVariables = Exact<{
  refreshToken: Scalars["String"]["input"];
}>;

export type RefreshAccessTokenMutation = {
  __typename?: "Mutation";
  refreshAccessToken?: {
    __typename?: "LoginPayload";
    accessToken: string;
    refreshToken: string;
    accessTokenExpiresAt: string;
    staff: {
      __typename?: "CurrentStaffObjectType";
      id: string;
      name?: string | null;
      email: string;
      phone?: string | null;
      roleKey?: EnumStaffRole | null;
      hospital?: { __typename?: "Hospital"; name?: string | null } | null;
    };
  } | null;
};

export type CurrentStaffQueryVariables = Exact<{ [key: string]: never }>;

export type CurrentStaffQuery = {
  __typename?: "Query";
  currentStaff?: {
    __typename?: "CurrentStaffObjectType";
    id: string;
    name?: string | null;
    email: string;
    phone?: string | null;
    roleKey?: EnumStaffRole | null;
    roles?: Array<{
      __typename?: "Role";
      key?: EnumStaffRole | null;
      id?: string | null;
    }> | null;
    hospital?: {
      __typename?: "Hospital";
      id?: string | null;
      name?: string | null;
      email?: string | null;
    } | null;
  } | null;
};

export type EquipmentCreateMutationVariables = Exact<{
  input: EquipmentCreateInput;
}>;

export type EquipmentCreateMutation = {
  __typename?: "Mutation";
  equipmentCreate?: boolean | null;
};

export type EquipmentUpdateMutationVariables = Exact<{
  equipmentUpdateId: Scalars["String"]["input"];
  input: EquipmentCreateInput;
}>;

export type EquipmentUpdateMutation = {
  __typename?: "Mutation";
  equipmentUpdate?: boolean | null;
};

export type EquipmentsQueryVariables = Exact<{
  take: Scalars["Int"]["input"];
  skip: Scalars["Int"]["input"];
  where?: InputMaybe<EquipmentsWhereInput>;
}>;

export type EquipmentsQuery = {
  __typename?: "Query";
  equipments?: {
    __typename?: "Equipments";
    count: number;
    data?: Array<{
      __typename?: "Equipment";
      id?: string | null;
      name?: string | null;
      serialNo?: string | null;
      state?: string | null;
      category?: string | null;
      assignedTo?: {
        __typename?: "Staff";
        id?: string | null;
        name?: string | null;
        email?: string | null;
        phone?: string | null;
      } | null;
      hospital?: {
        __typename?: "Hospital";
        id?: string | null;
        name?: string | null;
        email?: string | null;
      } | null;
    }> | null;
  } | null;
};

export type EquipmentDetailQueryVariables = Exact<{
  equipmentDetailId: Scalars["String"]["input"];
}>;

export type EquipmentDetailQuery = {
  __typename?: "Query";
  equipmentDetail?: {
    __typename?: "Equipment";
    id?: string | null;
    name?: string | null;
    serialNo?: string | null;
    state?: string | null;
    assignedTo?: {
      __typename?: "Staff";
      id?: string | null;
      name?: string | null;
      email?: string | null;
    } | null;
    hospital?: {
      __typename?: "Hospital";
      id?: string | null;
      name?: string | null;
    } | null;
  } | null;
};

export type HospitalCreateMutationVariables = Exact<{
  input: HospitalCreateInput;
}>;

export type HospitalCreateMutation = {
  __typename?: "Mutation";
  hospitalCreate?: boolean | null;
};

export type HospitalUpdateMutationVariables = Exact<{
  hospitalUpdateId: Scalars["String"]["input"];
  input: HospitalCreateInput;
}>;

export type HospitalUpdateMutation = {
  __typename?: "Mutation";
  hospitalUpdate?: boolean | null;
};

export type HospitalsQueryVariables = Exact<{
  take: Scalars["Int"]["input"];
  skip: Scalars["Int"]["input"];
  where?: InputMaybe<HospitalsWhereInput>;
}>;

export type HospitalsQuery = {
  __typename?: "Query";
  hospitals?: {
    __typename?: "Hospitals";
    count: number;
    data?: Array<{
      __typename?: "Hospital";
      id?: string | null;
      name?: string | null;
      email?: string | null;
      phone?: string | null;
      address?: {
        __typename?: "Address";
        address1?: string | null;
        address2?: string | null;
        id?: string | null;
        province?: string | null;
      } | null;
    }> | null;
  } | null;
};

export type HospitalDetailQueryVariables = Exact<{
  hospitalDetailId: Scalars["String"]["input"];
}>;

export type HospitalDetailQuery = {
  __typename?: "Query";
  hospitalDetail?: {
    __typename?: "Hospital";
    id?: string | null;
    name?: string | null;
    email?: string | null;
    phone?: string | null;
    address?: {
      __typename?: "Address";
      id?: string | null;
      address1?: string | null;
      address2?: string | null;
      province?: string | null;
    } | null;
  } | null;
};

export type HospitalOptionQueryVariables = Exact<{ [key: string]: never }>;

export type HospitalOptionQuery = {
  __typename?: "Query";
  hospitalOption: Array<{
    __typename?: "HospitalOption";
    id?: string | null;
    name?: string | null;
  }>;
};

export type StaffCreateMutationVariables = Exact<{
  input: StaffCreateInput;
}>;

export type StaffCreateMutation = {
  __typename?: "Mutation";
  staffCreate?: boolean | null;
};

export type StaffUpdateMutationVariables = Exact<{
  staffUpdateId: Scalars["String"]["input"];
  input: StaffCreateInput;
}>;

export type StaffUpdateMutation = {
  __typename?: "Mutation";
  staffUpdate?: boolean | null;
};

export type StaffsQueryVariables = Exact<{
  where?: InputMaybe<StaffsWhereInput>;
  take: Scalars["Int"]["input"];
  skip: Scalars["Int"]["input"];
  orderBy?: InputMaybe<StaffsOrderByInput>;
}>;

export type StaffsQuery = {
  __typename?: "Query";
  staffs?: {
    __typename?: "StaffObjectType";
    count: number;
    data?: Array<{
      __typename?: "Staff";
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
        key?: EnumStaffRole | null;
      } | null> | null;
    }> | null;
  } | null;
};

export type StaffDetailQueryVariables = Exact<{
  staffDetailId: Scalars["String"]["input"];
}>;

export type StaffDetailQuery = {
  __typename?: "Query";
  staffDetail?: {
    __typename?: "Staff";
    id?: string | null;
    email?: string | null;
    name?: string | null;
    phone?: string | null;
    roles?: Array<{
      __typename?: "Role";
      id?: string | null;
      key?: EnumStaffRole | null;
      name?: string | null;
    } | null> | null;
    hospital?: {
      __typename?: "Hospital";
      name?: string | null;
      id?: string | null;
    } | null;
  } | null;
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
} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
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
} as unknown as DocumentNode<
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
} as unknown as DocumentNode<CurrentStaffQuery, CurrentStaffQueryVariables>;
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
} as unknown as DocumentNode<
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
} as unknown as DocumentNode<
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
} as unknown as DocumentNode<EquipmentsQuery, EquipmentsQueryVariables>;
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
} as unknown as DocumentNode<
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
} as unknown as DocumentNode<
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
} as unknown as DocumentNode<
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
} as unknown as DocumentNode<HospitalsQuery, HospitalsQueryVariables>;
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
} as unknown as DocumentNode<HospitalDetailQuery, HospitalDetailQueryVariables>;
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
} as unknown as DocumentNode<HospitalOptionQuery, HospitalOptionQueryVariables>;
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
} as unknown as DocumentNode<StaffCreateMutation, StaffCreateMutationVariables>;
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
} as unknown as DocumentNode<StaffUpdateMutation, StaffUpdateMutationVariables>;
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
} as unknown as DocumentNode<StaffsQuery, StaffsQueryVariables>;
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
} as unknown as DocumentNode<StaffDetailQuery, StaffDetailQueryVariables>;
