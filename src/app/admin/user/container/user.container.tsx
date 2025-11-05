"use client";

import { useQuery } from "@apollo/client/react";
import { useState } from "react";

import { USERS } from "@/features/user/graphql/queries.gql";
import type { UsersQuery } from "@/generated/graphql";

import UserListTable from "../components/user.list";
import UserToolbar from "../components/user.toolbox";

export default function AdminUserContainer() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name_asc");

  const { data, loading, error } = useQuery<UsersQuery>(USERS, {
    variables: {
      search,
      sortBy,
    },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading users</div>;

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
