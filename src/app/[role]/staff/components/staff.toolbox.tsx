"use client";

import React from "react";

interface StaffToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
}

export default function StaffToolbar(
  {
    //   search,
    //   onSearchChange,
    //   sortBy,
    //   onSortChange,
  }: StaffToolbarProps,
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
