import { Suspense } from "react";

import { UsersTable } from "./_components/users-table";
import { UsersSearch } from "./_components/users-search";

export default function UsersPage() {
  return (
    <div className="container py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Users</h1>
      </div>
      
      <div className="space-y-4">
        <UsersSearch />
        <Suspense fallback={<div>Loading...</div>}>
          <UsersTable />
        </Suspense>
      </div>
    </div>
  );
} 