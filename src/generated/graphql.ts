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
  province?: Maybe<Scalars["String"]["output"]>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type AddressCreateInput = {
  address1: Scalars["String"]["input"];
  address2?: InputMaybe<Scalars["String"]["input"]>;
  province: Scalars["String"]["input"];
};

export type AuthUser = {
  __typename?: "AuthUser";
  email?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["String"]["output"];
  isPlatformAdmin: Scalars["Boolean"]["output"];
  memberships: Array<UserMembership>;
  name?: Maybe<Scalars["String"]["output"]>;
  phone?: Maybe<Scalars["String"]["output"]>;
};

export type Booking = {
  __typename?: "Booking";
  bookingTime?: Maybe<Scalars["DateTime"]["output"]>;
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  department?: Maybe<Scalars["String"]["output"]>;
  doctorName?: Maybe<Scalars["String"]["output"]>;
  hospital?: Maybe<Hospital>;
  id?: Maybe<Scalars["String"]["output"]>;
  patientName?: Maybe<Scalars["String"]["output"]>;
  patientPhone?: Maybe<Scalars["String"]["output"]>;
  status?: Maybe<Scalars["String"]["output"]>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type BookingCreateInput = {
  bookingTime: Scalars["DateTime"]["input"];
  department: Scalars["String"]["input"];
  doctorName?: InputMaybe<Scalars["String"]["input"]>;
  hospitalId: Scalars["String"]["input"];
  patientName: Scalars["String"]["input"];
  patientPhone: Scalars["String"]["input"];
  status: BookingStatus;
};

export enum BookingStatus {
  Cancelled = "CANCELLED",
  Completed = "COMPLETED",
  Confirmed = "CONFIRMED",
  Pending = "PENDING",
}

export type Bookings = {
  __typename?: "Bookings";
  count: Scalars["Int"]["output"];
  data?: Maybe<Array<Booking>>;
};

export type BookingsWhereInput = {
  hospitalId?: InputMaybe<Scalars["String"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  status?: InputMaybe<BookingStatus>;
};

export type Drug = {
  __typename?: "Drug";
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  description?: Maybe<Scalars["String"]["output"]>;
  dosageForm?: Maybe<Scalars["String"]["output"]>;
  genericName?: Maybe<Scalars["String"]["output"]>;
  id?: Maybe<Scalars["String"]["output"]>;
  manufacturer?: Maybe<Scalars["String"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  strength?: Maybe<Scalars["String"]["output"]>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type DrugCreateInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  dosageForm?: InputMaybe<Scalars["String"]["input"]>;
  genericName?: InputMaybe<Scalars["String"]["input"]>;
  manufacturer?: InputMaybe<Scalars["String"]["input"]>;
  name: Scalars["String"]["input"];
  strength?: InputMaybe<Scalars["String"]["input"]>;
};

export type Drugs = {
  __typename?: "Drugs";
  count: Scalars["Int"]["output"];
  data?: Maybe<Array<Drug>>;
};

export type DrugsWhereInput = {
  search?: InputMaybe<Scalars["String"]["input"]>;
};

export enum EnumSortOrder {
  Asc = "asc",
  Desc = "desc",
}

export type Equipment = {
  __typename?: "Equipment";
  assignedTo?: Maybe<User>;
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
  assignedToId?: InputMaybe<Scalars["String"]["input"]>;
  category: EquipmentCategory;
  hospitalId: Scalars["String"]["input"];
  name: Scalars["String"]["input"];
  serialNo: Scalars["String"]["input"];
  state: EquipmentState;
};

export type EquipmentLog = {
  __typename?: "EquipmentLog";
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  description?: Maybe<Scalars["String"]["output"]>;
  equipment?: Maybe<Equipment>;
  id?: Maybe<Scalars["String"]["output"]>;
  performedBy?: Maybe<User>;
};

export type EquipmentLogCreateInput = {
  description: Scalars["String"]["input"];
  equipmentId: Scalars["String"]["input"];
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
  user: AuthUser;
};

export type MePayload = {
  __typename?: "MePayload";
  activeOrganization?: Maybe<UserMembership>;
  user: AuthUser;
};

export type Membership = {
  __typename?: "Membership";
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  id?: Maybe<Scalars["String"]["output"]>;
  organization: OrganizationSummary;
  role: OrganizationRole;
  user: User;
};

export type MembershipCreateInput = {
  role: OrganizationRole;
  userId: Scalars["String"]["input"];
};

export type MembershipUpdateInput = {
  role: OrganizationRole;
};

export type Memberships = {
  __typename?: "Memberships";
  count: Scalars["Int"]["output"];
  data?: Maybe<Array<Membership>>;
};

export type Mutation = {
  __typename?: "Mutation";
  bookingCreate?: Maybe<Scalars["Boolean"]["output"]>;
  bookingDelete?: Maybe<Scalars["Boolean"]["output"]>;
  bookingUpdate?: Maybe<Scalars["Boolean"]["output"]>;
  drugCreate?: Maybe<Scalars["Boolean"]["output"]>;
  drugDelete?: Maybe<Scalars["Boolean"]["output"]>;
  drugUpdate?: Maybe<Scalars["Boolean"]["output"]>;
  equipmentCreate?: Maybe<Scalars["Boolean"]["output"]>;
  equipmentDelete?: Maybe<Scalars["Boolean"]["output"]>;
  equipmentLogCreate?: Maybe<Scalars["Boolean"]["output"]>;
  equipmentLogDelete?: Maybe<Scalars["Boolean"]["output"]>;
  equipmentLogUpdate?: Maybe<Scalars["Boolean"]["output"]>;
  equipmentUpdate?: Maybe<Scalars["Boolean"]["output"]>;
  hospitalCreate?: Maybe<Scalars["Boolean"]["output"]>;
  hospitalDelete?: Maybe<Scalars["Boolean"]["output"]>;
  hospitalUpdate?: Maybe<Scalars["Boolean"]["output"]>;
  login?: Maybe<LoginPayload>;
  membershipCreate?: Maybe<Scalars["Boolean"]["output"]>;
  membershipDelete?: Maybe<Scalars["Boolean"]["output"]>;
  membershipUpdate?: Maybe<Scalars["Boolean"]["output"]>;
  pharmacyCreate?: Maybe<Scalars["Boolean"]["output"]>;
  pharmacyDelete?: Maybe<Scalars["Boolean"]["output"]>;
  pharmacyUpdate?: Maybe<Scalars["Boolean"]["output"]>;
  refreshAccessToken?: Maybe<LoginPayload>;
  selectOrganization?: Maybe<UserMembership>;
  userCreate?: Maybe<Scalars["Boolean"]["output"]>;
  userDelete?: Maybe<Scalars["Boolean"]["output"]>;
  userUpdate?: Maybe<Scalars["Boolean"]["output"]>;
};

export type MutationBookingCreateArgs = {
  input: BookingCreateInput;
};

export type MutationBookingDeleteArgs = {
  id: Scalars["String"]["input"];
};

export type MutationBookingUpdateArgs = {
  id: Scalars["String"]["input"];
  input: BookingCreateInput;
};

export type MutationDrugCreateArgs = {
  input: DrugCreateInput;
};

export type MutationDrugDeleteArgs = {
  id: Scalars["String"]["input"];
};

export type MutationDrugUpdateArgs = {
  id: Scalars["String"]["input"];
  input: DrugCreateInput;
};

export type MutationEquipmentCreateArgs = {
  input: EquipmentCreateInput;
};

export type MutationEquipmentDeleteArgs = {
  id: Scalars["String"]["input"];
};

export type MutationEquipmentLogCreateArgs = {
  input: EquipmentLogCreateInput;
};

export type MutationEquipmentLogDeleteArgs = {
  id: Scalars["String"]["input"];
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

export type MutationHospitalDeleteArgs = {
  id: Scalars["String"]["input"];
};

export type MutationHospitalUpdateArgs = {
  id: Scalars["String"]["input"];
  input: HospitalCreateInput;
};

export type MutationLoginArgs = {
  input: LoginInput;
};

export type MutationMembershipCreateArgs = {
  input: MembershipCreateInput;
};

export type MutationMembershipDeleteArgs = {
  id: Scalars["String"]["input"];
};

export type MutationMembershipUpdateArgs = {
  id: Scalars["String"]["input"];
  input: MembershipUpdateInput;
};

export type MutationPharmacyCreateArgs = {
  input: PharmacyCreateInput;
};

export type MutationPharmacyDeleteArgs = {
  id: Scalars["String"]["input"];
};

export type MutationPharmacyUpdateArgs = {
  id: Scalars["String"]["input"];
  input: PharmacyCreateInput;
};

export type MutationRefreshAccessTokenArgs = {
  refreshToken: Scalars["String"]["input"];
};

export type MutationSelectOrganizationArgs = {
  orgId: Scalars["String"]["input"];
};

export type MutationUserCreateArgs = {
  input: UserCreateInput;
};

export type MutationUserDeleteArgs = {
  id: Scalars["String"]["input"];
};

export type MutationUserUpdateArgs = {
  id: Scalars["String"]["input"];
  input: UserUpdateInput;
};

export enum OrganizationRole {
  Manager = "MANAGER",
  Owner = "OWNER",
  Staff = "STAFF",
}

export type OrganizationSummary = {
  __typename?: "OrganizationSummary";
  id: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
  type: OrganizationType;
};

export enum OrganizationType {
  Hospital = "HOSPITAL",
  Pharmacy = "PHARMACY",
}

export type PharmaciesWhereInput = {
  search?: InputMaybe<Scalars["String"]["input"]>;
};

export type Pharmacy = {
  __typename?: "Pharmacy";
  address?: Maybe<Address>;
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  email?: Maybe<Scalars["String"]["output"]>;
  id?: Maybe<Scalars["String"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  phone?: Maybe<Scalars["String"]["output"]>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type PharmacyCreateInput = {
  address: AddressCreateInput;
  email: Scalars["EmailAddress"]["input"];
  name: Scalars["String"]["input"];
  phone: Scalars["String"]["input"];
};

export type PharmacyOption = {
  __typename?: "PharmacyOption";
  id?: Maybe<Scalars["String"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
};

export type Pharmacys = {
  __typename?: "Pharmacys";
  count: Scalars["Int"]["output"];
  data?: Maybe<Array<Pharmacy>>;
};

export type Query = {
  __typename?: "Query";
  bookingDetail?: Maybe<Booking>;
  bookings?: Maybe<Bookings>;
  currentUser?: Maybe<AuthUser>;
  drugDetail?: Maybe<Drug>;
  drugs?: Maybe<Drugs>;
  equipmentDetail?: Maybe<Equipment>;
  equipmentLogDetail?: Maybe<EquipmentLog>;
  equipmentLogs?: Maybe<EquipmentLogs>;
  equipments?: Maybe<Equipments>;
  hospitalDetail?: Maybe<Hospital>;
  hospitalOption: Array<HospitalOption>;
  hospitals?: Maybe<Hospitals>;
  me?: Maybe<MePayload>;
  memberships?: Maybe<Memberships>;
  pharmacies?: Maybe<Pharmacys>;
  pharmacyDetail?: Maybe<Pharmacy>;
  pharmacyOption: Array<PharmacyOption>;
  userDetail?: Maybe<User>;
  users?: Maybe<Users>;
};

export type QueryBookingDetailArgs = {
  id: Scalars["String"]["input"];
};

export type QueryBookingsArgs = {
  skip: Scalars["Int"]["input"];
  take: Scalars["Int"]["input"];
  where?: InputMaybe<BookingsWhereInput>;
};

export type QueryDrugDetailArgs = {
  id: Scalars["String"]["input"];
};

export type QueryDrugsArgs = {
  skip: Scalars["Int"]["input"];
  take: Scalars["Int"]["input"];
  where?: InputMaybe<DrugsWhereInput>;
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

export type QueryMembershipsArgs = {
  skip: Scalars["Int"]["input"];
  take: Scalars["Int"]["input"];
};

export type QueryPharmaciesArgs = {
  skip: Scalars["Int"]["input"];
  take: Scalars["Int"]["input"];
  where?: InputMaybe<PharmaciesWhereInput>;
};

export type QueryPharmacyDetailArgs = {
  id: Scalars["String"]["input"];
};

export type QueryUserDetailArgs = {
  id: Scalars["String"]["input"];
};

export type QueryUsersArgs = {
  skip: Scalars["Int"]["input"];
  take: Scalars["Int"]["input"];
  where?: InputMaybe<UsersWhereInput>;
};

export type User = {
  __typename?: "User";
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  email?: Maybe<Scalars["String"]["output"]>;
  id?: Maybe<Scalars["String"]["output"]>;
  isPlatformAdmin?: Maybe<Scalars["Boolean"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  phone?: Maybe<Scalars["String"]["output"]>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type UserCreateInput = {
  email: Scalars["String"]["input"];
  isPlatformAdmin?: InputMaybe<Scalars["Boolean"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  organizationId?: InputMaybe<Scalars["String"]["input"]>;
  password: Scalars["String"]["input"];
  phone?: InputMaybe<Scalars["String"]["input"]>;
  role?: InputMaybe<OrganizationRole>;
};

export type UserMembership = {
  __typename?: "UserMembership";
  organization: OrganizationSummary;
  role: OrganizationRole;
};

export type UserUpdateInput = {
  email?: InputMaybe<Scalars["String"]["input"]>;
  isPlatformAdmin?: InputMaybe<Scalars["Boolean"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  organizationId?: InputMaybe<Scalars["String"]["input"]>;
  password?: InputMaybe<Scalars["String"]["input"]>;
  phone?: InputMaybe<Scalars["String"]["input"]>;
  role?: InputMaybe<OrganizationRole>;
};

export type Users = {
  __typename?: "Users";
  count: Scalars["Int"]["output"];
  data?: Maybe<Array<User>>;
};

export type UsersWhereInput = {
  organizationId?: InputMaybe<Scalars["String"]["input"]>;
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
    user: {
      __typename?: "AuthUser";
      id: string;
      name?: string | null;
      email?: string | null;
      phone?: string | null;
      isPlatformAdmin: boolean;
      memberships: Array<{
        __typename?: "UserMembership";
        role: OrganizationRole;
        organization: {
          __typename?: "OrganizationSummary";
          id: string;
          name: string;
          type: OrganizationType;
        };
      }>;
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
    user: {
      __typename?: "AuthUser";
      id: string;
      name?: string | null;
      email?: string | null;
      phone?: string | null;
      isPlatformAdmin: boolean;
      memberships: Array<{
        __typename?: "UserMembership";
        role: OrganizationRole;
        organization: {
          __typename?: "OrganizationSummary";
          id: string;
          name: string;
          type: OrganizationType;
        };
      }>;
    };
  } | null;
};

export type SelectOrganizationMutationVariables = Exact<{
  orgId: Scalars["String"]["input"];
}>;

export type SelectOrganizationMutation = {
  __typename?: "Mutation";
  selectOrganization?: {
    __typename?: "UserMembership";
    role: OrganizationRole;
    organization: {
      __typename?: "OrganizationSummary";
      id: string;
      name: string;
      type: OrganizationType;
    };
  } | null;
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename?: "Query";
  me?: {
    __typename?: "MePayload";
    activeOrganization?: {
      __typename?: "UserMembership";
      role: OrganizationRole;
      organization: {
        __typename?: "OrganizationSummary";
        id: string;
        name: string;
        type: OrganizationType;
      };
    } | null;
    user: {
      __typename?: "AuthUser";
      id: string;
      name?: string | null;
      email?: string | null;
      phone?: string | null;
      isPlatformAdmin: boolean;
      memberships: Array<{
        __typename?: "UserMembership";
        role: OrganizationRole;
        organization: {
          __typename?: "OrganizationSummary";
          id: string;
          name: string;
          type: OrganizationType;
        };
      }>;
    };
  } | null;
};

export type CurrentUserQueryVariables = Exact<{ [key: string]: never }>;

export type CurrentUserQuery = {
  __typename?: "Query";
  currentUser?: {
    __typename?: "AuthUser";
    id: string;
    name?: string | null;
    email?: string | null;
    phone?: string | null;
    isPlatformAdmin: boolean;
    memberships: Array<{
      __typename?: "UserMembership";
      role: OrganizationRole;
      organization: {
        __typename?: "OrganizationSummary";
        id: string;
        name: string;
        type: OrganizationType;
      };
    }>;
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
        __typename?: "User";
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
      __typename?: "User";
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

export type UserCreateMutationVariables = Exact<{
  input: UserCreateInput;
}>;

export type UserCreateMutation = {
  __typename?: "Mutation";
  userCreate?: boolean | null;
};

export type UserUpdateMutationVariables = Exact<{
  userUpdateId: Scalars["String"]["input"];
  input: UserUpdateInput;
}>;

export type UserUpdateMutation = {
  __typename?: "Mutation";
  userUpdate?: boolean | null;
};

export type MembershipUpdateMutationVariables = Exact<{
  membershipUpdateId: Scalars["String"]["input"];
  input: MembershipUpdateInput;
}>;

export type MembershipUpdateMutation = {
  __typename?: "Mutation";
  membershipUpdate?: boolean | null;
};

export type MembershipsQueryVariables = Exact<{
  take: Scalars["Int"]["input"];
  skip: Scalars["Int"]["input"];
}>;

export type MembershipsQuery = {
  __typename?: "Query";
  memberships?: {
    __typename?: "Memberships";
    count: number;
    data?: Array<{
      __typename?: "Membership";
      id?: string | null;
      role: OrganizationRole;
      user: {
        __typename?: "User";
        id?: string | null;
        name?: string | null;
        email?: string | null;
        phone?: string | null;
      };
      organization: {
        __typename?: "OrganizationSummary";
        id: string;
        name: string;
        type: OrganizationType;
      };
    }> | null;
  } | null;
};

export type UserDetailQueryVariables = Exact<{
  userDetailId: Scalars["String"]["input"];
}>;

export type UserDetailQuery = {
  __typename?: "Query";
  userDetail?: {
    __typename?: "User";
    id?: string | null;
    name?: string | null;
    email?: string | null;
    phone?: string | null;
    isPlatformAdmin?: boolean | null;
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
                        name: { kind: "Name", value: "isPlatformAdmin" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "memberships" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "role" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "organization" },
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
                                    name: { kind: "Name", value: "type" },
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
                        name: { kind: "Name", value: "isPlatformAdmin" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "memberships" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "role" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "organization" },
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
                                    name: { kind: "Name", value: "type" },
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
export const SelectOrganizationDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "SelectOrganization" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "orgId" },
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
            name: { kind: "Name", value: "selectOrganization" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "orgId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "orgId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "role" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "organization" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      { kind: "Field", name: { kind: "Name", value: "type" } },
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
  SelectOrganizationMutation,
  SelectOrganizationMutationVariables
>;
export const MeDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Me" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "me" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "activeOrganization" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "role" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "organization" },
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
                              name: { kind: "Name", value: "type" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
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
                        name: { kind: "Name", value: "isPlatformAdmin" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "memberships" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "role" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "organization" },
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
                                    name: { kind: "Name", value: "type" },
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
      },
    },
  ],
} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
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
                  name: { kind: "Name", value: "isPlatformAdmin" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "memberships" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "role" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "organization" },
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
                              name: { kind: "Name", value: "type" },
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
} as unknown as DocumentNode<CurrentUserQuery, CurrentUserQueryVariables>;
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
} as unknown as DocumentNode<UserCreateMutation, UserCreateMutationVariables>;
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
              name: { kind: "Name", value: "UserUpdateInput" },
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
} as unknown as DocumentNode<UserUpdateMutation, UserUpdateMutationVariables>;
export const MembershipUpdateDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "MembershipUpdate" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "membershipUpdateId" },
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
              name: { kind: "Name", value: "MembershipUpdateInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "membershipUpdate" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "membershipUpdateId" },
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
  MembershipUpdateMutation,
  MembershipUpdateMutationVariables
>;
export const MembershipsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Memberships" },
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
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "memberships" },
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
                      { kind: "Field", name: { kind: "Name", value: "role" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "user" },
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
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "organization" },
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
                              name: { kind: "Name", value: "type" },
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
} as unknown as DocumentNode<MembershipsQuery, MembershipsQueryVariables>;
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
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "email" } },
                { kind: "Field", name: { kind: "Name", value: "phone" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "isPlatformAdmin" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UserDetailQuery, UserDetailQueryVariables>;
