// dummyData.ts
export const headerData = {
  title: "My Dashboard",
  logoUrl: "https://via.placeholder.com/40",
};

export const sidebarItems = [
  {
    text: "Dashboard",
    path: "/dashboard",
    roles: ["admin", "storeOwner", "user"],
  },
  { text: "Orders", path: "/orders", roles: ["storeOwner"] },
  { text: "Manage Users", path: "/users", roles: ["admin"] },
  { text: "Shop", path: "/shop", roles: ["user"] },
];
