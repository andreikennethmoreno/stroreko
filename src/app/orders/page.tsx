// app/(protected)/orders/page.tsx

import React from "react";
import { getOrders } from "@/actions/order.action";

export default async function OrdersPage() {
  const { success, orders, isAdmin } = await getOrders();

  if (!success) {
    return <div className="p-4 text-red-500">Failed to load orders.</div>;
  }

  if (!orders || orders.length === 0) {
    return <div className="p-4">No orders found.</div>;
  }


  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Orders</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="border rounded-2xl p-4 shadow-md">
            {/* Show user email if admin */}
            {isAdmin && (
              <div className="mb-2">
                <span className="font-semibold">User Email:</span> {order.email}
              </div>
            )}

            <div className="flex justify-between mb-2">
              <span className="font-semibold">Order ID:</span> {order.id}
            </div>
            <div className="text-sm mb-2">
              {new Date(order.createdAt).toLocaleString()}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Total:</span> $
              {order.total.toFixed(2)}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Status:</span> {order.status}
            </div>

            <div className="mt-4">
              <span className="font-semibold">Items:</span>
              <ul className="list-disc pl-6">
                {order.items.map((item) => (
                  <li key={item.id}>
                    {item.product.name} x {item.quantity} — $
                    {item.price.toFixed(2)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
