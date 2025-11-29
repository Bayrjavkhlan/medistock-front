export const STAFF_SORT_FIELDS = ["name", "email", "roleOrder"] as const;
export type StaffSortField = (typeof STAFF_SORT_FIELDS)[number];
