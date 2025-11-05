"use client";

import React from "react";

interface UserToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
}

export default function UserToolbar(
  {
    //   search,
    //   onSearchChange,
    //   sortBy,
    //   onSortChange,
  }: UserToolbarProps,
) {
  return (
    <div className="mb-4 flex flex-row items-center justify-between gap-3">
      {/* 🔍 Search Input */}
      <div>Search</div>

      {/* ↕️ Sort Dropdown */}
      <div>
        <div>Sort</div>
      </div>
    </div>
  );
}
