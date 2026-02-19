"use client";

import { useState, useEffect, useCallback } from "react";
import { useQueryState } from "nuqs";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pagination } from "@/components/ui/pagination";

import { IUser } from "@/types/interfaces/user/IUser";
import { getUsersAction } from "../_actions/get-users.action";

export function UsersTable() {
  const [search] = useQueryState("search");
  const [page] = useQueryState("page", { defaultValue: "1" });

  const [users, setUsers] = useState<IUser[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  const fetchUsers = useCallback(async () => {
    const result = await getUsersAction({
      search: search ?? "",
      page: parseInt(page),
    });
    setUsers(result.data?.users ?? []);
    setTotalPages(result.data?.totalPages ?? 1);
  }, [search, page]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchUsers();
    }, 300);

    return () => clearTimeout(timer);
  }, [fetchUsers]);

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Created At</TableHead>
            </TableRow>
          </TableHeader>
          
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  {new Date(user.createdAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Pagination totalPages={totalPages} />
    </div>
  );
} 