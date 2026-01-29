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
  "\n  mutation Login($input: LoginInput!) {\n    login(input: $input) {\n      user {\n        id\n        name\n        email\n        phone\n        isPlatformAdmin\n        memberships {\n          role\n          organization {\n            id\n            name\n            type\n          }\n        }\n      }\n      accessToken\n      refreshToken\n      accessTokenExpiresAt\n    }\n  }\n": typeof types.LoginDocument;
  "\n  mutation RefreshAccessToken($refreshToken: String!) {\n    refreshAccessToken(refreshToken: $refreshToken) {\n      user {\n        id\n        name\n        email\n        phone\n        isPlatformAdmin\n        memberships {\n          role\n          organization {\n            id\n            name\n            type\n          }\n        }\n      }\n      accessToken\n      refreshToken\n      accessTokenExpiresAt\n    }\n  }\n": typeof types.RefreshAccessTokenDocument;
  "\n  mutation SelectOrganization($orgId: String!) {\n    selectOrganization(orgId: $orgId) {\n      role\n      organization {\n        id\n        name\n        type\n      }\n    }\n  }\n": typeof types.SelectOrganizationDocument;
  "\n  query Me {\n    me {\n      activeOrganization {\n        role\n        organization {\n          id\n          name\n          type\n        }\n      }\n      user {\n        id\n        name\n        email\n        phone\n        isPlatformAdmin\n        memberships {\n          role\n          organization {\n            id\n            name\n            type\n          }\n        }\n      }\n    }\n  }\n": typeof types.MeDocument;
  "\n  query CurrentUser {\n    currentUser {\n      id\n      name\n      email\n      phone\n      isPlatformAdmin\n      memberships {\n        role\n        organization {\n          id\n          name\n          type\n        }\n      }\n    }\n  }\n": typeof types.CurrentUserDocument;
  "\n  mutation EquipmentCreate($input: EquipmentCreateInput!) {\n    equipmentCreate(input: $input)\n  }\n": typeof types.EquipmentCreateDocument;
  "\n  mutation EquipmentUpdate(\n    $equipmentUpdateId: String!\n    $input: EquipmentCreateInput!\n  ) {\n    equipmentUpdate(id: $equipmentUpdateId, input: $input)\n  }\n": typeof types.EquipmentUpdateDocument;
  "\n  query Equipments($take: Int!, $skip: Int!, $where: EquipmentsWhereInput) {\n    equipments(take: $take, skip: $skip, where: $where) {\n      data {\n        id\n        name\n        serialNo\n        assignedTo {\n          id\n          name\n          email\n          phone\n        }\n        state\n        category\n        hospital {\n          id\n          name\n          email\n        }\n      }\n      count\n    }\n  }\n": typeof types.EquipmentsDocument;
  "\n  query EquipmentDetail($equipmentDetailId: String!) {\n    equipmentDetail(id: $equipmentDetailId) {\n      id\n      name\n      serialNo\n      state\n      assignedTo {\n        id\n        name\n        email\n      }\n      hospital {\n        id\n        name\n      }\n    }\n  }\n": typeof types.EquipmentDetailDocument;
  "\n  mutation HospitalCreate($input: HospitalCreateInput!) {\n    hospitalCreate(input: $input)\n  }\n": typeof types.HospitalCreateDocument;
  "\n  mutation HospitalUpdate(\n    $hospitalUpdateId: String!\n    $input: HospitalCreateInput!\n  ) {\n    hospitalUpdate(id: $hospitalUpdateId, input: $input)\n  }\n": typeof types.HospitalUpdateDocument;
  "\n  query Hospitals($take: Int!, $skip: Int!, $where: HospitalsWhereInput) {\n    hospitals(take: $take, skip: $skip, where: $where) {\n      count\n      data {\n        id\n        name\n        email\n        phone\n        address {\n          address1\n          address2\n          id\n          province\n        }\n      }\n    }\n  }\n": typeof types.HospitalsDocument;
  "\n  query HospitalDetail($hospitalDetailId: String!) {\n    hospitalDetail(id: $hospitalDetailId) {\n      id\n      name\n      email\n      phone\n      address {\n        id\n        address1\n        address2\n        province\n      }\n    }\n  }\n": typeof types.HospitalDetailDocument;
  "\n  query HospitalOption {\n    hospitalOption {\n      id\n      name\n    }\n  }\n": typeof types.HospitalOptionDocument;
  "\n  mutation UserCreate($input: UserCreateInput!) {\n    userCreate(input: $input)\n  }\n": typeof types.UserCreateDocument;
  "\n  mutation UserUpdate($userUpdateId: String!, $input: UserUpdateInput!) {\n    userUpdate(id: $userUpdateId, input: $input)\n  }\n": typeof types.UserUpdateDocument;
  "\n  mutation MembershipUpdate($membershipUpdateId: String!, $input: MembershipUpdateInput!) {\n    membershipUpdate(id: $membershipUpdateId, input: $input)\n  }\n": typeof types.MembershipUpdateDocument;
  "\n  query Memberships($take: Int!, $skip: Int!) {\n    memberships(take: $take, skip: $skip) {\n      data {\n        id\n        role\n        user {\n          id\n          name\n          email\n          phone\n        }\n        organization {\n          id\n          name\n          type\n        }\n      }\n      count\n    }\n  }\n": typeof types.MembershipsDocument;
  "\n  query UserDetail($userDetailId: String!) {\n    userDetail(id: $userDetailId) {\n      id\n      name\n      email\n      phone\n      isPlatformAdmin\n    }\n  }\n": typeof types.UserDetailDocument;
};
const documents: Documents = {
  "\n  mutation Login($input: LoginInput!) {\n    login(input: $input) {\n      user {\n        id\n        name\n        email\n        phone\n        isPlatformAdmin\n        memberships {\n          role\n          organization {\n            id\n            name\n            type\n          }\n        }\n      }\n      accessToken\n      refreshToken\n      accessTokenExpiresAt\n    }\n  }\n":
    types.LoginDocument,
  "\n  mutation RefreshAccessToken($refreshToken: String!) {\n    refreshAccessToken(refreshToken: $refreshToken) {\n      user {\n        id\n        name\n        email\n        phone\n        isPlatformAdmin\n        memberships {\n          role\n          organization {\n            id\n            name\n            type\n          }\n        }\n      }\n      accessToken\n      refreshToken\n      accessTokenExpiresAt\n    }\n  }\n":
    types.RefreshAccessTokenDocument,
  "\n  mutation SelectOrganization($orgId: String!) {\n    selectOrganization(orgId: $orgId) {\n      role\n      organization {\n        id\n        name\n        type\n      }\n    }\n  }\n":
    types.SelectOrganizationDocument,
  "\n  query Me {\n    me {\n      activeOrganization {\n        role\n        organization {\n          id\n          name\n          type\n        }\n      }\n      user {\n        id\n        name\n        email\n        phone\n        isPlatformAdmin\n        memberships {\n          role\n          organization {\n            id\n            name\n            type\n          }\n        }\n      }\n    }\n  }\n":
    types.MeDocument,
  "\n  query CurrentUser {\n    currentUser {\n      id\n      name\n      email\n      phone\n      isPlatformAdmin\n      memberships {\n        role\n        organization {\n          id\n          name\n          type\n        }\n      }\n    }\n  }\n":
    types.CurrentUserDocument,
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
  "\n  mutation UserCreate($input: UserCreateInput!) {\n    userCreate(input: $input)\n  }\n":
    types.UserCreateDocument,
  "\n  mutation UserUpdate($userUpdateId: String!, $input: UserUpdateInput!) {\n    userUpdate(id: $userUpdateId, input: $input)\n  }\n":
    types.UserUpdateDocument,
  "\n  mutation MembershipUpdate($membershipUpdateId: String!, $input: MembershipUpdateInput!) {\n    membershipUpdate(id: $membershipUpdateId, input: $input)\n  }\n":
    types.MembershipUpdateDocument,
  "\n  query Memberships($take: Int!, $skip: Int!) {\n    memberships(take: $take, skip: $skip) {\n      data {\n        id\n        role\n        user {\n          id\n          name\n          email\n          phone\n        }\n        organization {\n          id\n          name\n          type\n        }\n      }\n      count\n    }\n  }\n":
    types.MembershipsDocument,
  "\n  query UserDetail($userDetailId: String!) {\n    userDetail(id: $userDetailId) {\n      id\n      name\n      email\n      phone\n      isPlatformAdmin\n    }\n  }\n":
    types.UserDetailDocument,
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
  source: "\n  mutation Login($input: LoginInput!) {\n    login(input: $input) {\n      user {\n        id\n        name\n        email\n        phone\n        isPlatformAdmin\n        memberships {\n          role\n          organization {\n            id\n            name\n            type\n          }\n        }\n      }\n      accessToken\n      refreshToken\n      accessTokenExpiresAt\n    }\n  }\n",
): (typeof documents)["\n  mutation Login($input: LoginInput!) {\n    login(input: $input) {\n      user {\n        id\n        name\n        email\n        phone\n        isPlatformAdmin\n        memberships {\n          role\n          organization {\n            id\n            name\n            type\n          }\n        }\n      }\n      accessToken\n      refreshToken\n      accessTokenExpiresAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation RefreshAccessToken($refreshToken: String!) {\n    refreshAccessToken(refreshToken: $refreshToken) {\n      user {\n        id\n        name\n        email\n        phone\n        isPlatformAdmin\n        memberships {\n          role\n          organization {\n            id\n            name\n            type\n          }\n        }\n      }\n      accessToken\n      refreshToken\n      accessTokenExpiresAt\n    }\n  }\n",
): (typeof documents)["\n  mutation RefreshAccessToken($refreshToken: String!) {\n    refreshAccessToken(refreshToken: $refreshToken) {\n      user {\n        id\n        name\n        email\n        phone\n        isPlatformAdmin\n        memberships {\n          role\n          organization {\n            id\n            name\n            type\n          }\n        }\n      }\n      accessToken\n      refreshToken\n      accessTokenExpiresAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation SelectOrganization($orgId: String!) {\n    selectOrganization(orgId: $orgId) {\n      role\n      organization {\n        id\n        name\n        type\n      }\n    }\n  }\n",
): (typeof documents)["\n  mutation SelectOrganization($orgId: String!) {\n    selectOrganization(orgId: $orgId) {\n      role\n      organization {\n        id\n        name\n        type\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query Me {\n    me {\n      activeOrganization {\n        role\n        organization {\n          id\n          name\n          type\n        }\n      }\n      user {\n        id\n        name\n        email\n        phone\n        isPlatformAdmin\n        memberships {\n          role\n          organization {\n            id\n            name\n            type\n          }\n        }\n      }\n    }\n  }\n",
): (typeof documents)["\n  query Me {\n    me {\n      activeOrganization {\n        role\n        organization {\n          id\n          name\n          type\n        }\n      }\n      user {\n        id\n        name\n        email\n        phone\n        isPlatformAdmin\n        memberships {\n          role\n          organization {\n            id\n            name\n            type\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query CurrentUser {\n    currentUser {\n      id\n      name\n      email\n      phone\n      isPlatformAdmin\n      memberships {\n        role\n        organization {\n          id\n          name\n          type\n        }\n      }\n    }\n  }\n",
): (typeof documents)["\n  query CurrentUser {\n    currentUser {\n      id\n      name\n      email\n      phone\n      isPlatformAdmin\n      memberships {\n        role\n        organization {\n          id\n          name\n          type\n        }\n      }\n    }\n  }\n"];
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
  source: "\n  mutation UserCreate($input: UserCreateInput!) {\n    userCreate(input: $input)\n  }\n",
): (typeof documents)["\n  mutation UserCreate($input: UserCreateInput!) {\n    userCreate(input: $input)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation UserUpdate($userUpdateId: String!, $input: UserUpdateInput!) {\n    userUpdate(id: $userUpdateId, input: $input)\n  }\n",
): (typeof documents)["\n  mutation UserUpdate($userUpdateId: String!, $input: UserUpdateInput!) {\n    userUpdate(id: $userUpdateId, input: $input)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation MembershipUpdate($membershipUpdateId: String!, $input: MembershipUpdateInput!) {\n    membershipUpdate(id: $membershipUpdateId, input: $input)\n  }\n",
): (typeof documents)["\n  mutation MembershipUpdate($membershipUpdateId: String!, $input: MembershipUpdateInput!) {\n    membershipUpdate(id: $membershipUpdateId, input: $input)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query Memberships($take: Int!, $skip: Int!) {\n    memberships(take: $take, skip: $skip) {\n      data {\n        id\n        role\n        user {\n          id\n          name\n          email\n          phone\n        }\n        organization {\n          id\n          name\n          type\n        }\n      }\n      count\n    }\n  }\n",
): (typeof documents)["\n  query Memberships($take: Int!, $skip: Int!) {\n    memberships(take: $take, skip: $skip) {\n      data {\n        id\n        role\n        user {\n          id\n          name\n          email\n          phone\n        }\n        organization {\n          id\n          name\n          type\n        }\n      }\n      count\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query UserDetail($userDetailId: String!) {\n    userDetail(id: $userDetailId) {\n      id\n      name\n      email\n      phone\n      isPlatformAdmin\n    }\n  }\n",
): (typeof documents)["\n  query UserDetail($userDetailId: String!) {\n    userDetail(id: $userDetailId) {\n      id\n      name\n      email\n      phone\n      isPlatformAdmin\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
