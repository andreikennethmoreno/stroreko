// app/(protected)/orders/page.tsx
import React from "react";
import { getOrders } from "@/actions/order.action";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

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
      <h1 className="text-2xl font-bold mb-6">Your Orders</h1>

      {orders.map((order) => (
        <div
          key={order.id}
          className="border rounded-2xl p-4 shadow-sm space-y-4 mb-8"
        >
          <div className="space-y-1 text-sm">
            <div className="font-semibold">
              Order ID: <span className="font-normal">{order.id}</span>
            </div>
            {isAdmin && (
              <div>
                <span className="font-semibold">User Email: </span>
                {order.email}
              </div>
            )}
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead className="w-20">Image</TableHead>
                <TableHead>Product</TableHead>
                <TableHead className="text-center">Quantity</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Subtotal</TableHead>
                <TableHead className="text-right">Download</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.items.map((item) => {
                const { product, quantity, price } = item;
                const subtotal = price * quantity;

                return (
                  <TableRow key={item.id}>
                    {/* Date column */}
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </TableCell>

                    {/* Product image */}
                    <TableCell>
                      <div className="w-16 h-16 rounded-lg overflow-hidden border">
                        <img
                          src={product.imageUrl ?? "/placeholder-product.jpg"}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </TableCell>

                    {/* Product details */}
                    <TableCell>
                      <div className="space-y-1">
                        <p className="font-semibold">{product.name}</p>
                        <p className="text-xs text-muted-foreground">
                          ID: {product.id.slice(0, 8)}...
                        </p>
                      </div>
                    </TableCell>

                    {/* Quantity */}
                    <TableCell className="text-center font-medium">
                      {quantity}
                    </TableCell>

                    {/* Price */}
                    <TableCell className="text-right">
                      ₱{price.toFixed(2)}
                    </TableCell>

                    {/* Subtotal */}
                    <TableCell className="text-right font-semibold">
                      ₱{subtotal.toFixed(2)}
                    </TableCell>

                    {/* Download URL */}
                    <TableCell className="text-right">
                      {product.downloadUrl ? (
                        <a
                          href={product.downloadUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                        >
                          Download
                        </a>
                      ) : (
                        <span className="text-muted-foreground italic">
                          Unavailable
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}

              {/* Order total + status row */}
              <TableRow>
                <TableCell colSpan={4} />
                <TableCell className="text-right font-bold">Total:</TableCell>
                <TableCell className="text-right font-bold">
                  ₱{order.total.toFixed(2)}
                </TableCell>
                <TableCell className="text-right">
                  <Badge variant="secondary" className="text-xs">
                    {order.status}
                  </Badge>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      ))}
    </div>
  );
}
