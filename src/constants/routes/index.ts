export type Action = "create" | "read" | "update" | "delete";

export type Subject =
  | "NOT_FOUND"
  | "Auth_Login"
  | "Auth_Forgot"
  | "Auth_NewPassword"
  | "Profile"
  // Admin
  | "Admin_Dashboard"
  | "Admin_Staff"
  | "Admin_Hospital"
  | "Admin_Pharmacy"
  | "Admin_Equipment"
  | "Admin_EquipmentLog"
  // Hospital Admin
  | "Hospital_Dashboard"
  | "Hospital_Staff"
  | "Hospital_Equipment"
  | "Hospital_EquipmentLog"
  // Pharmacy
  | "Pharmacy_Dashboard"
  | "Pharmacy_Equipment"
  | "Pharmacy_EquipmentLog"
  | "Pharmacy_Medicine"
  | "Pharmacy_Staff"
  // User
  | "User_Dashboard"
  | "User_Equipment"
  | "User_EquipmentLog"
  | "User_Hospital"
  | "User_Pharmacy";

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

  Profile: {
    key: "/profile",
    Index: createRoute(
      "Профайл",
      "/profile",
      "Profile", // ← new shared subject
      "read",
      "/",
      true,
    ),
  },

  // === ADMIN ===
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
  Admin_Hospital: {
    key: "/admin/hospitals",
    Index: createRoute(
      "Эмнэлгүүд",
      "/admin/hospital",
      "Admin_Hospital",
      "read",
      "/",
      true,
    ),
    Create: createRoute(
      "Эмнэлэг нэмэх",
      "/admin/hospital/create",
      "Admin_Hospital",
      "create",
      "/",
      true,
    ),
    Detail: createRoute(
      "Дэлгэрэнгүй",
      "/admin/hospital/detail",
      "Admin_Hospital",
      "read",
      "/",
      true,
      (a) => `/admin/hospital/${a?.id}`,
    ),
  },
  Admin_Pharmacy: {
    key: "/admin/pharmacy",
    Index: createRoute(
      "Эмийн сангууд",
      "/admin/pharmacy",
      "Admin_Pharmacy",
      "read",
      "/",
      true,
    ),
    Create: createRoute(
      "Эмийн сан нэмэх",
      "/admin/pharmacy/create",
      "Admin_Pharmacy",
      "create",
      "/",
      true,
    ),
    Detail: createRoute(
      "Дэлгэрэнгүй",
      "/admin/pharmacy/detail",
      "Admin_Pharmacy",
      "read",
      "/",
      true,
      (a) => `/admin/pharmacy/${a?.id}`,
    ),
  },

  // === HOSPITAL ADMIN ===
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

  // === PHARMACY ===
  Pharmacy_Dashboard: {
    key: "/pharmacy/dashboard",
    Index: createRoute(
      "Хяналтын самбар",
      "/pharmacy/dashboard",
      "Pharmacy_Dashboard",
      "read",
      "/",
      true,
    ),
  },
  Pharmacy_Equipment: {
    key: "/pharmacy/equipment",
    Index: createRoute(
      "Тоног төхөөрөмж",
      "/pharmacy/equipment",
      "Pharmacy_Equipment",
      "read",
      "/",
      true,
    ),
    Detail: createRoute(
      "Дэлгэрэнгүй",
      "/pharmacy/equipment/detail",
      "Pharmacy_Equipment",
      "read",
      "/",
      true,
      (a) => `/pharmacy/equipment/${a?.id}`,
    ),
  },
  Pharmacy_EquipmentLog: {
    key: "/pharmacy/equipment/log",
    Index: createRoute(
      "Лог",
      "/pharmacy/equipment/log",
      "Pharmacy_EquipmentLog",
      "read",
      "/",
      true,
    ),
    Create: createRoute(
      "Лог нэмэх",
      "/pharmacy/equipment/log/create",
      "Pharmacy_EquipmentLog",
      "create",
      "/",
      true,
    ),
  },

  Pharmacy_Medicine: {
    key: "/pharmacy/medicine",
    Index: createRoute(
      "Эм",
      "/pharmacy/medicine",
      "Pharmacy_Medicine",
      "read",
      "/",
      true,
    ),
    Detail: createRoute(
      "Дэлгэрэнгүй",
      "/pharmacy/medicine/detail",
      "Pharmacy_Medicine",
      "read",
      "/",
      true,
      (a) => `/pharmacy/medicine/${a?.id}`,
    ),
  },

  Pharmacy_Staff: {
    key: "/pharmacy/staff",
    Index: createRoute(
      "Ажилчид",
      "/pharmacy/staff",
      "Pharmacy_Staff",
      "read",
      "/",
      true,
    ),
  },

  // === USER ===
  User_Dashboard: {
    key: "/user/dashboard",
    Index: createRoute(
      "Хяналтын самбар",
      "/user/dashboard",
      "User_Dashboard",
      "read",
      "/",
      true,
    ),
  },
  User_Equipment: {
    key: "/user/equipment",
    Index: createRoute(
      "Тоног төхөөрөмж",
      "/user/equipment",
      "User_Equipment",
      "read",
      "/",
      true,
    ),
    Detail: createRoute(
      "Дэлгэрэнгүй",
      "/user/equipment/detail",
      "User_Equipment",
      "read",
      "/",
      true,
      (a) => `/user/equipment/${a?.id}`,
    ),
  },
  User_EquipmentLog: {
    key: "/user/equipment/log",
    Index: createRoute(
      "Миний лог",
      "/user/equipment/log",
      "User_EquipmentLog",
      "read",
      "/",
      true,
    ),
    Create: createRoute(
      "Лог нэмэх",
      "/user/equipment/log/create",
      "User_EquipmentLog",
      "create",
      "/",
      true,
    ),
  },

  User_Hospital: {
    key: "/user/hospital",
    Index: createRoute(
      "Эмнэлгүүд",
      "/user/hospital",
      "User_Hospital",
      "read",
      "/",
      true,
    ),
    Detail: createRoute(
      "Дэлгэрэнгүй",
      "/user/hospital/detail",
      "User_Hospital",
      "read",
      "/",
      true,
      (a) => `/user/hospital/${a?.id}`,
    ),
  },
  User_Pharmacy: {
    key: "/user/pharmacy",
    Index: createRoute(
      "Эмийн сангууд",
      "/user/pharmacy",
      "User_Pharmacy",
      "read",
      "/",
      true,
    ),
    Detail: createRoute(
      "Дэлгэрэнгүй",
      "/user/pharmacy/detail",
      "User_Pharmacy",
      "read",
      "/",
      true,
      (a) => `/user/pharmacy/${a?.id}`,
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
