export const USER_SORT_FIELDS = ["name", "email", "roleOrder"] as const;
export type UserSortField = (typeof USER_SORT_FIELDS)[number];
