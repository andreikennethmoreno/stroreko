import { stackServerApp } from "@/stack";
import React from "react";

async function AdminUsersPage() {
  // Get all users (only available to admins with proper access)
  const users = await stackServerApp.listUsers();

  return (
    <div className="max-w-5xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">All Users</h1>
      <ul className="space-y-4">
        {users.map((user) => (
          <li
            key={user.id}
            className="border p-4 rounded-md shadow-sm bg-white dark:bg-zinc-900"
          >
            <p>
              <strong>ID:</strong> {user.id}
            </p>
            <p>
              <strong>Email:</strong> {user.primaryEmail}
            </p>
            <p>
              <strong>Display Name:</strong> {user.displayName}
            </p>
            <p>
              <strong>Signed Up:</strong>{" "}
              {new Date(user.signedUpAt).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminUsersPage;
