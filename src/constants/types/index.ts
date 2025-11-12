// types/sort.ts
export const USER_SORT_FIELDS = ["name", "email", "phone"] as const;
export type UserSortField = (typeof USER_SORT_FIELDS)[number];
