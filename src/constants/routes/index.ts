export type Action = "create" | "read" | "update" | "delete";

export type Subject =
  | "NOT_FOUND"
  | "Auth_Login"
  | "Auth_Forgot"
  | "Auth_NewPassword"
  // Admin
  | "Admin_Profile"
  | "Admin_Dashboard"
  | "Admin_Staff"
  | "Admin_Hospitals"
  | "Admin_Equipment"
  | "Admin_EquipmentLog"
  // Hospital Admin
  | "Hospital_Profile"
  | "Hospital_Dashboard"
  | "Hospital_Staff"
  | "Hospital_Equipment"
  | "Hospital_EquipmentLog"
  // Staff
  | "Staff_Dashboard"
  | "Staff_Equipment"
  | "Staff_EquipmentLog";

type PathArg = { id?: string };

export type Route = {
  title: string;
  path?: (arg?: PathArg) => string;
  route: string;
  action: Action;
  subject: Subject;
  fallback?: string;
  shouldBeAuthenticated: boolean;
};

type ItemType = {
  key: string;
  Index: Route;
  Detail?: Route;
  Create?: Route;
  Update?: Route;
};

export type RouteType = Record<Subject, ItemType>;

const createRoute = (
  title: string,
  route: string,
  subject: Subject,
  action: Action,
  fallback = "/",
  shouldBeAuthenticated = false,
  path?: (arg?: PathArg) => string,
): Route => ({
  title,
  route,
  action,
  subject,
  fallback,
  shouldBeAuthenticated,
  ...(path && { path }),
});

export const Routes: RouteType = {
  NOT_FOUND: {
    key: "/not-found",
    Index: createRoute("404", "/not-found", "NOT_FOUND", "read"),
  },
  Auth_Login: {
    key: "/login",
    Index: createRoute("Нэвтрэх", "/login", "Auth_Login", "read"),
  },
  Auth_Forgot: {
    key: "/forgot-password",
    Index: createRoute(
      "Нууц үг сэргээх",
      "/forgot-password",
      "Auth_Forgot",
      "read",
      "/login",
    ),
  },
  Auth_NewPassword: {
    key: "/new-password",
    Index: createRoute(
      "Шинэ нууц үг",
      "/new-password",
      "Auth_NewPassword",
      "read",
      "/login",
      true,
    ),
  },

  // === ADMIN ===
  Admin_Profile: {
    key: "/admin/profile",
    Index: createRoute(
      "Профайл",
      "/admin/profile",
      "Admin_Profile",
      "read",
      "/",
      true,
    ),
  },
  Admin_Dashboard: {
    key: "/admin/dashboard",
    Index: createRoute(
      "Хяналтын самбар",
      "/admin/dashboard",
      "Admin_Dashboard",
      "read",
      "/",
      true,
    ),
  },
  Admin_Staff: {
    key: "/admin/staff",
    Index: createRoute(
      "Ажилчид",
      "/admin/staff",
      "Admin_Staff",
      "read",
      "/",
      true,
    ),
    Create: createRoute(
      "Ажилчин нэмэх",
      "/admin/staff/create",
      "Admin_Staff",
      "create",
      "/",
      true,
    ),
    Detail: createRoute(
      "Дэлгэрэнгүй",
      "/admin/staff/detail",
      "Admin_Staff",
      "read",
      "/",
      true,
      (a) => `/admin/staff/${a?.id}`,
    ),
    Update: createRoute(
      "Засах",
      "/admin/staff/edit",
      "Admin_Staff",
      "update",
      "/",
      true,
      (a) => `/admin/staff/update/${a?.id}`,
    ),
  },
  Admin_Hospitals: {
    key: "/admin/hospitals",
    Index: createRoute(
      "Эмнэлгүүд",
      "/admin/hospitals",
      "Admin_Hospitals",
      "read",
      "/",
      true,
    ),
    Create: createRoute(
      "Эмнэлэг нэмэх",
      "/admin/hospitals/create",
      "Admin_Hospitals",
      "create",
      "/",
      true,
    ),
    Detail: createRoute(
      "Дэлгэрэнгүй",
      "/admin/hospitals/detail",
      "Admin_Hospitals",
      "read",
      "/",
      true,
      (a) => `/admin/hospitals/${a?.id}`,
    ),
  },

  // === HOSPITAL ADMIN ===
  Hospital_Profile: {
    key: "/hospital/profile",
    Index: createRoute(
      "Профайл",
      "/hospital/profile",
      "Hospital_Profile",
      "read",
      "/",
      true,
    ),
  },
  Hospital_Dashboard: {
    key: "/hospital/dashboard",
    Index: createRoute(
      "Хяналтын самбар",
      "/hospital/dashboard",
      "Hospital_Dashboard",
      "read",
      "/",
      true,
    ),
  },
  Hospital_Staff: {
    key: "/hospital/staff",
    Index: createRoute(
      "Ажилчид",
      "/hospital/staff",
      "Hospital_Staff",
      "read",
      "/",
      true,
    ),
    Create: createRoute(
      "Ажилчин нэмэх",
      "/hospital/staff/create",
      "Hospital_Staff",
      "create",
      "/",
      true,
    ),
    Detail: createRoute(
      "Дэлгэрэнгүй",
      "/hospital/staff/detail",
      "Hospital_Staff",
      "read",
      "/",
      true,
      (a) => `/hospital/staff/${a?.id}`,
    ),
  },
  Hospital_Equipment: {
    key: "/hospital/equipment",
    Index: createRoute(
      "Тоног төхөөрөмж",
      "/hospital/equipment",
      "Hospital_Equipment",
      "read",
      "/",
      true,
    ),
    Create: createRoute(
      "Тоног нэмэх",
      "/hospital/equipment/create",
      "Hospital_Equipment",
      "create",
      "/",
      true,
    ),
    Detail: createRoute(
      "Дэлгэрэнгүй",
      "/hospital/equipment/detail",
      "Hospital_Equipment",
      "read",
      "/",
      true,
      (a) => `/hospital/equipment/${a?.id}`,
    ),
  },
  Hospital_EquipmentLog: {
    key: "/hospital/equipment/log",
    Index: createRoute(
      "Лог",
      "/hospital/equipment/log",
      "Hospital_EquipmentLog",
      "read",
      "/",
      true,
    ),
    Create: createRoute(
      "Лог нэмэх",
      "/hospital/equipment/log/create",
      "Hospital_EquipmentLog",
      "create",
      "/",
      true,
    ),
  },

  // === STAFF ===
  Staff_Dashboard: {
    key: "/staff/dashboard",
    Index: createRoute(
      "Хяналтын самбар",
      "/staff/dashboard",
      "Staff_Dashboard",
      "read",
      "/",
      true,
    ),
  },
  Staff_Equipment: {
    key: "/staff/equipment",
    Index: createRoute(
      "Тоног төхөөрөмж",
      "/staff/equipment",
      "Staff_Equipment",
      "read",
      "/",
      true,
    ),
    Detail: createRoute(
      "Дэлгэрэнгүй",
      "/staff/equipment/detail",
      "Staff_Equipment",
      "read",
      "/",
      true,
      (a) => `/staff/equipment/${a?.id}`,
    ),
  },
  Staff_EquipmentLog: {
    key: "/staff/equipment/log",
    Index: createRoute(
      "Миний лог",
      "/staff/equipment/log",
      "Staff_EquipmentLog",
      "read",
      "/",
      true,
    ),
    Create: createRoute(
      "Лог нэмэх",
      "/staff/equipment/log/create",
      "Staff_EquipmentLog",
      "create",
      "/",
      true,
    ),
  },
  Admin_Equipment: {
    key: "/admin/equipment",
    Index: createRoute(
      "Тоног төхөөрөмж",
      "/admin/equipment",
      "Admin_Equipment",
      "read",
      "/",
      true,
    ),
    Create: createRoute(
      "Нэмэх",
      "/admin/equipment/create",
      "Admin_Equipment",
      "create",
      "/",
      true,
    ),
    Detail: createRoute(
      "Дэлгэрэнгүй",
      "/admin/equipment/detail",
      "Admin_Equipment",
      "read",
      "/",
      true,
      (a) => `/admin/equipment/${a?.id}`,
    ),
    Update: createRoute(
      "Засах",
      "/admin/equipment/update",
      "Admin_Equipment",
      "update",
      "/",
      true,
      (a) => `/admin/equipment/update/${a?.id}`,
    ),
  },

  Admin_EquipmentLog: {
    key: "/admin/equipment/log",
    Index: createRoute(
      "Лог",
      "/admin/equipment/log",
      "Admin_EquipmentLog",
      "read",
      "/",
      true,
    ),
    Create: createRoute(
      "Лог нэмэх",
      "/admin/equipment/log/create",
      "Admin_EquipmentLog",
      "create",
      "/",
      true,
    ),
  },
};
