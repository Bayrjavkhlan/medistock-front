/* eslint-disable */
import * as types from "./graphql";
import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
  "\n  mutation Login($input: LoginInput!) {\n    login(input: $input) {\n      staff {\n        id\n        name\n        email\n        phone\n        roleKey\n        hospital {\n          name\n        }\n      }\n      accessToken\n      refreshToken\n      accessTokenExpiresAt\n    }\n  }\n": typeof types.LoginDocument;
  "\n  mutation RefreshAccessToken($refreshToken: String!) {\n    refreshAccessToken(refreshToken: $refreshToken) {\n      staff {\n        id\n        name\n        email\n        phone\n        roleKey\n        hospital {\n          name\n        }\n      }\n      accessToken\n      refreshToken\n      accessTokenExpiresAt\n    }\n  }\n": typeof types.RefreshAccessTokenDocument;
  "\n  query CurrentStaff {\n    currentStaff {\n      id\n      name\n      email\n      phone\n      roles {\n        key\n        id\n      }\n      roleKey\n      hospital {\n        id\n        name\n        email\n      }\n    }\n  }\n": typeof types.CurrentStaffDocument;
  "\n  mutation EquipmentCreate($input: EquipmentCreateInput!) {\n    equipmentCreate(input: $input)\n  }\n": typeof types.EquipmentCreateDocument;
  "\n  mutation EquipmentUpdate(\n    $equipmentUpdateId: String!\n    $input: EquipmentCreateInput!\n  ) {\n    equipmentUpdate(id: $equipmentUpdateId, input: $input)\n  }\n": typeof types.EquipmentUpdateDocument;
  "\n  query Equipments($take: Int!, $skip: Int!, $where: EquipmentsWhereInput) {\n    equipments(take: $take, skip: $skip, where: $where) {\n      data {\n        id\n        name\n        serialNo\n        assignedTo {\n          id\n          name\n          email\n          phone\n        }\n        state\n        category\n        hospital {\n          id\n          name\n          email\n        }\n      }\n      count\n    }\n  }\n": typeof types.EquipmentsDocument;
  "\n  query EquipmentDetail($equipmentDetailId: String!) {\n    equipmentDetail(id: $equipmentDetailId) {\n      id\n      name\n      serialNo\n      state\n      assignedTo {\n        id\n        name\n        email\n      }\n      hospital {\n        id\n        name\n      }\n    }\n  }\n": typeof types.EquipmentDetailDocument;
  "\n  mutation HospitalCreate($input: HospitalCreateInput!) {\n    hospitalCreate(input: $input)\n  }\n": typeof types.HospitalCreateDocument;
  "\n  mutation HospitalUpdate(\n    $hospitalUpdateId: String!\n    $input: HospitalCreateInput!\n  ) {\n    hospitalUpdate(id: $hospitalUpdateId, input: $input)\n  }\n": typeof types.HospitalUpdateDocument;
  "\n  query Hospitals($take: Int!, $skip: Int!, $where: HospitalsWhereInput) {\n    hospitals(take: $take, skip: $skip, where: $where) {\n      count\n      data {\n        id\n        name\n        email\n        phone\n        address {\n          address1\n          address2\n          id\n          province\n        }\n      }\n    }\n  }\n": typeof types.HospitalsDocument;
  "\n  query HospitalDetail($hospitalDetailId: String!) {\n    hospitalDetail(id: $hospitalDetailId) {\n      id\n      name\n      email\n      phone\n      address {\n        id\n        address1\n        address2\n        province\n      }\n    }\n  }\n": typeof types.HospitalDetailDocument;
  "\n  query HospitalOption {\n    hospitalOption {\n      id\n      name\n    }\n  }\n": typeof types.HospitalOptionDocument;
  "\n  mutation staffCreate($input: StaffCreateInput!) {\n    staffCreate(input: $input)\n  }\n": typeof types.StaffCreateDocument;
  "\n  mutation StaffUpdate($staffUpdateId: String!, $input: StaffCreateInput!) {\n    staffUpdate(id: $staffUpdateId, input: $input)\n  }\n": typeof types.StaffUpdateDocument;
  "\n  query Staffs(\n    $where: StaffsWhereInput\n    $take: Int!\n    $skip: Int!\n    $orderBy: StaffsOrderByInput\n  ) {\n    staffs(where: $where, take: $take, skip: $skip, orderBy: $orderBy) {\n      data {\n        id\n        name\n        email\n        phone\n        hospital {\n          id\n          name\n        }\n        roles {\n          key\n        }\n      }\n      count\n    }\n  }\n": typeof types.StaffsDocument;
  "\n  query StaffDetail($staffDetailId: String!) {\n    staffDetail(id: $staffDetailId) {\n      id\n      email\n      name\n      phone\n      roles {\n        id\n        key\n        name\n      }\n      hospital {\n        name\n        id\n      }\n    }\n  }\n": typeof types.StaffDetailDocument;
};
const documents: Documents = {
  "\n  mutation Login($input: LoginInput!) {\n    login(input: $input) {\n      staff {\n        id\n        name\n        email\n        phone\n        roleKey\n        hospital {\n          name\n        }\n      }\n      accessToken\n      refreshToken\n      accessTokenExpiresAt\n    }\n  }\n":
    types.LoginDocument,
  "\n  mutation RefreshAccessToken($refreshToken: String!) {\n    refreshAccessToken(refreshToken: $refreshToken) {\n      staff {\n        id\n        name\n        email\n        phone\n        roleKey\n        hospital {\n          name\n        }\n      }\n      accessToken\n      refreshToken\n      accessTokenExpiresAt\n    }\n  }\n":
    types.RefreshAccessTokenDocument,
  "\n  query CurrentStaff {\n    currentStaff {\n      id\n      name\n      email\n      phone\n      roles {\n        key\n        id\n      }\n      roleKey\n      hospital {\n        id\n        name\n        email\n      }\n    }\n  }\n":
    types.CurrentStaffDocument,
  "\n  mutation EquipmentCreate($input: EquipmentCreateInput!) {\n    equipmentCreate(input: $input)\n  }\n":
    types.EquipmentCreateDocument,
  "\n  mutation EquipmentUpdate(\n    $equipmentUpdateId: String!\n    $input: EquipmentCreateInput!\n  ) {\n    equipmentUpdate(id: $equipmentUpdateId, input: $input)\n  }\n":
    types.EquipmentUpdateDocument,
  "\n  query Equipments($take: Int!, $skip: Int!, $where: EquipmentsWhereInput) {\n    equipments(take: $take, skip: $skip, where: $where) {\n      data {\n        id\n        name\n        serialNo\n        assignedTo {\n          id\n          name\n          email\n          phone\n        }\n        state\n        category\n        hospital {\n          id\n          name\n          email\n        }\n      }\n      count\n    }\n  }\n":
    types.EquipmentsDocument,
  "\n  query EquipmentDetail($equipmentDetailId: String!) {\n    equipmentDetail(id: $equipmentDetailId) {\n      id\n      name\n      serialNo\n      state\n      assignedTo {\n        id\n        name\n        email\n      }\n      hospital {\n        id\n        name\n      }\n    }\n  }\n":
    types.EquipmentDetailDocument,
  "\n  mutation HospitalCreate($input: HospitalCreateInput!) {\n    hospitalCreate(input: $input)\n  }\n":
    types.HospitalCreateDocument,
  "\n  mutation HospitalUpdate(\n    $hospitalUpdateId: String!\n    $input: HospitalCreateInput!\n  ) {\n    hospitalUpdate(id: $hospitalUpdateId, input: $input)\n  }\n":
    types.HospitalUpdateDocument,
  "\n  query Hospitals($take: Int!, $skip: Int!, $where: HospitalsWhereInput) {\n    hospitals(take: $take, skip: $skip, where: $where) {\n      count\n      data {\n        id\n        name\n        email\n        phone\n        address {\n          address1\n          address2\n          id\n          province\n        }\n      }\n    }\n  }\n":
    types.HospitalsDocument,
  "\n  query HospitalDetail($hospitalDetailId: String!) {\n    hospitalDetail(id: $hospitalDetailId) {\n      id\n      name\n      email\n      phone\n      address {\n        id\n        address1\n        address2\n        province\n      }\n    }\n  }\n":
    types.HospitalDetailDocument,
  "\n  query HospitalOption {\n    hospitalOption {\n      id\n      name\n    }\n  }\n":
    types.HospitalOptionDocument,
  "\n  mutation staffCreate($input: StaffCreateInput!) {\n    staffCreate(input: $input)\n  }\n":
    types.StaffCreateDocument,
  "\n  mutation StaffUpdate($staffUpdateId: String!, $input: StaffCreateInput!) {\n    staffUpdate(id: $staffUpdateId, input: $input)\n  }\n":
    types.StaffUpdateDocument,
  "\n  query Staffs(\n    $where: StaffsWhereInput\n    $take: Int!\n    $skip: Int!\n    $orderBy: StaffsOrderByInput\n  ) {\n    staffs(where: $where, take: $take, skip: $skip, orderBy: $orderBy) {\n      data {\n        id\n        name\n        email\n        phone\n        hospital {\n          id\n          name\n        }\n        roles {\n          key\n        }\n      }\n      count\n    }\n  }\n":
    types.StaffsDocument,
  "\n  query StaffDetail($staffDetailId: String!) {\n    staffDetail(id: $staffDetailId) {\n      id\n      email\n      name\n      phone\n      roles {\n        id\n        key\n        name\n      }\n      hospital {\n        name\n        id\n      }\n    }\n  }\n":
    types.StaffDetailDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation Login($input: LoginInput!) {\n    login(input: $input) {\n      staff {\n        id\n        name\n        email\n        phone\n        roleKey\n        hospital {\n          name\n        }\n      }\n      accessToken\n      refreshToken\n      accessTokenExpiresAt\n    }\n  }\n",
): (typeof documents)["\n  mutation Login($input: LoginInput!) {\n    login(input: $input) {\n      staff {\n        id\n        name\n        email\n        phone\n        roleKey\n        hospital {\n          name\n        }\n      }\n      accessToken\n      refreshToken\n      accessTokenExpiresAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation RefreshAccessToken($refreshToken: String!) {\n    refreshAccessToken(refreshToken: $refreshToken) {\n      staff {\n        id\n        name\n        email\n        phone\n        roleKey\n        hospital {\n          name\n        }\n      }\n      accessToken\n      refreshToken\n      accessTokenExpiresAt\n    }\n  }\n",
): (typeof documents)["\n  mutation RefreshAccessToken($refreshToken: String!) {\n    refreshAccessToken(refreshToken: $refreshToken) {\n      staff {\n        id\n        name\n        email\n        phone\n        roleKey\n        hospital {\n          name\n        }\n      }\n      accessToken\n      refreshToken\n      accessTokenExpiresAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query CurrentStaff {\n    currentStaff {\n      id\n      name\n      email\n      phone\n      roles {\n        key\n        id\n      }\n      roleKey\n      hospital {\n        id\n        name\n        email\n      }\n    }\n  }\n",
): (typeof documents)["\n  query CurrentStaff {\n    currentStaff {\n      id\n      name\n      email\n      phone\n      roles {\n        key\n        id\n      }\n      roleKey\n      hospital {\n        id\n        name\n        email\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation EquipmentCreate($input: EquipmentCreateInput!) {\n    equipmentCreate(input: $input)\n  }\n",
): (typeof documents)["\n  mutation EquipmentCreate($input: EquipmentCreateInput!) {\n    equipmentCreate(input: $input)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation EquipmentUpdate(\n    $equipmentUpdateId: String!\n    $input: EquipmentCreateInput!\n  ) {\n    equipmentUpdate(id: $equipmentUpdateId, input: $input)\n  }\n",
): (typeof documents)["\n  mutation EquipmentUpdate(\n    $equipmentUpdateId: String!\n    $input: EquipmentCreateInput!\n  ) {\n    equipmentUpdate(id: $equipmentUpdateId, input: $input)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query Equipments($take: Int!, $skip: Int!, $where: EquipmentsWhereInput) {\n    equipments(take: $take, skip: $skip, where: $where) {\n      data {\n        id\n        name\n        serialNo\n        assignedTo {\n          id\n          name\n          email\n          phone\n        }\n        state\n        category\n        hospital {\n          id\n          name\n          email\n        }\n      }\n      count\n    }\n  }\n",
): (typeof documents)["\n  query Equipments($take: Int!, $skip: Int!, $where: EquipmentsWhereInput) {\n    equipments(take: $take, skip: $skip, where: $where) {\n      data {\n        id\n        name\n        serialNo\n        assignedTo {\n          id\n          name\n          email\n          phone\n        }\n        state\n        category\n        hospital {\n          id\n          name\n          email\n        }\n      }\n      count\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query EquipmentDetail($equipmentDetailId: String!) {\n    equipmentDetail(id: $equipmentDetailId) {\n      id\n      name\n      serialNo\n      state\n      assignedTo {\n        id\n        name\n        email\n      }\n      hospital {\n        id\n        name\n      }\n    }\n  }\n",
): (typeof documents)["\n  query EquipmentDetail($equipmentDetailId: String!) {\n    equipmentDetail(id: $equipmentDetailId) {\n      id\n      name\n      serialNo\n      state\n      assignedTo {\n        id\n        name\n        email\n      }\n      hospital {\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation HospitalCreate($input: HospitalCreateInput!) {\n    hospitalCreate(input: $input)\n  }\n",
): (typeof documents)["\n  mutation HospitalCreate($input: HospitalCreateInput!) {\n    hospitalCreate(input: $input)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation HospitalUpdate(\n    $hospitalUpdateId: String!\n    $input: HospitalCreateInput!\n  ) {\n    hospitalUpdate(id: $hospitalUpdateId, input: $input)\n  }\n",
): (typeof documents)["\n  mutation HospitalUpdate(\n    $hospitalUpdateId: String!\n    $input: HospitalCreateInput!\n  ) {\n    hospitalUpdate(id: $hospitalUpdateId, input: $input)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query Hospitals($take: Int!, $skip: Int!, $where: HospitalsWhereInput) {\n    hospitals(take: $take, skip: $skip, where: $where) {\n      count\n      data {\n        id\n        name\n        email\n        phone\n        address {\n          address1\n          address2\n          id\n          province\n        }\n      }\n    }\n  }\n",
): (typeof documents)["\n  query Hospitals($take: Int!, $skip: Int!, $where: HospitalsWhereInput) {\n    hospitals(take: $take, skip: $skip, where: $where) {\n      count\n      data {\n        id\n        name\n        email\n        phone\n        address {\n          address1\n          address2\n          id\n          province\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query HospitalDetail($hospitalDetailId: String!) {\n    hospitalDetail(id: $hospitalDetailId) {\n      id\n      name\n      email\n      phone\n      address {\n        id\n        address1\n        address2\n        province\n      }\n    }\n  }\n",
): (typeof documents)["\n  query HospitalDetail($hospitalDetailId: String!) {\n    hospitalDetail(id: $hospitalDetailId) {\n      id\n      name\n      email\n      phone\n      address {\n        id\n        address1\n        address2\n        province\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query HospitalOption {\n    hospitalOption {\n      id\n      name\n    }\n  }\n",
): (typeof documents)["\n  query HospitalOption {\n    hospitalOption {\n      id\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation staffCreate($input: StaffCreateInput!) {\n    staffCreate(input: $input)\n  }\n",
): (typeof documents)["\n  mutation staffCreate($input: StaffCreateInput!) {\n    staffCreate(input: $input)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation StaffUpdate($staffUpdateId: String!, $input: StaffCreateInput!) {\n    staffUpdate(id: $staffUpdateId, input: $input)\n  }\n",
): (typeof documents)["\n  mutation StaffUpdate($staffUpdateId: String!, $input: StaffCreateInput!) {\n    staffUpdate(id: $staffUpdateId, input: $input)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query Staffs(\n    $where: StaffsWhereInput\n    $take: Int!\n    $skip: Int!\n    $orderBy: StaffsOrderByInput\n  ) {\n    staffs(where: $where, take: $take, skip: $skip, orderBy: $orderBy) {\n      data {\n        id\n        name\n        email\n        phone\n        hospital {\n          id\n          name\n        }\n        roles {\n          key\n        }\n      }\n      count\n    }\n  }\n",
): (typeof documents)["\n  query Staffs(\n    $where: StaffsWhereInput\n    $take: Int!\n    $skip: Int!\n    $orderBy: StaffsOrderByInput\n  ) {\n    staffs(where: $where, take: $take, skip: $skip, orderBy: $orderBy) {\n      data {\n        id\n        name\n        email\n        phone\n        hospital {\n          id\n          name\n        }\n        roles {\n          key\n        }\n      }\n      count\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query StaffDetail($staffDetailId: String!) {\n    staffDetail(id: $staffDetailId) {\n      id\n      email\n      name\n      phone\n      roles {\n        id\n        key\n        name\n      }\n      hospital {\n        name\n        id\n      }\n    }\n  }\n",
): (typeof documents)["\n  query StaffDetail($staffDetailId: String!) {\n    staffDetail(id: $staffDetailId) {\n      id\n      email\n      name\n      phone\n      roles {\n        id\n        key\n        name\n      }\n      hospital {\n        name\n        id\n      }\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
