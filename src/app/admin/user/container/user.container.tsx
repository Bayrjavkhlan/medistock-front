"use client";

import { useState } from "react";

// import { useUsersQuery } from "@/features/user/graphql/queries.gql.generated";

import { EnumSortOrder, useUsersQuery } from "@/generated/graphql";

import UserListTable from "../components/user.list";
import UserToolbar from "../components/user.toolbox";

export default function AdminUserContainer() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name_asc");

  const { data, loading, error } = useUsersQuery({
    variables: {
      where: {
        roleKey: undefined,
        search: search,
      },
      take: 5,
      skip: 0,
      orderBy: {
        name: EnumSortOrder.ASC,
      },
    },
    onError: (err) => {
      console.error("GraphQL Error:", err);
    },
    errorPolicy: "all",
  });
  console.log("data:\t", error);
  // const { data, loading, error } = useQuery<UsersQuery>(USERS, {
  //   variables: {
  //     where: {
  //       roleKey: null,
  //       search: null,
  //     },
  //     take: 5,
  //     skip: 1,
  //     orderBy: {
  //       name: "asc",
  //     },
  //   },
  //   errorPolicy: "all",
  // });
  // console.log("User error:\t", error);
  // if (error && CombinedGraphQLErrors.is(error)) {
  //   for (const gqlErr of error.errors) {
  //     const code = gqlErr.extensions?.code;
  //     const message = gqlErr.message;

  //     if (code === "ACCESS_DENIED") {
  //       console.error("Access denied:", message);
  //     } else {
  //       console.error(`GraphQL Error [${code}]:`, message);
  //     }
  //   }
  // }

  if (loading) return <div>Уншиж байна...</div>;
  if (error) return <div>{error.message}</div>;

  const users = data?.users?.data ?? [];

  return (
    <>
      <UserToolbar
        search={search}
        onSearchChange={setSearch}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />
      <UserListTable users={users} />
    </>
  );
}
