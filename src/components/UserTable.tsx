"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface User {
  id: string;
  primaryEmail: string | null;
  displayName: string | null;
  signedUpAt: Date;
}

export default function ClientUserTable({ users }: { users: User[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>User ID</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Display Name</TableHead>
          <TableHead>Signed Up</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.id.slice(0, 10)}...</TableCell>
            <TableCell>{user.primaryEmail}</TableCell>
            <TableCell>{user.displayName}</TableCell>
            <TableCell>{new Date(user.signedUpAt).toLocaleString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
