"use client"

import { useSearchParams } from "next/navigation";
import { useQueryState } from "nuqs";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function UsersSearch() {
  const searchParams = useSearchParams();

  const [search, setSearch] = useQueryState("search", {
    defaultValue: searchParams.get("search") ?? "",
  });

  return (
    <div className="w-full max-w-sm relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search users..."
        className="w-full pl-9"
        defaultValue={search}
        onChange={(e) => setSearch(e.target.value || null)}
      />
    </div>
  );
} 