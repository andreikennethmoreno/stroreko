// app/(protected)/orders/page.tsx

import React, { Suspense } from "react";
import { getOrders } from "@/actions/order.action";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Download, Calendar, Package, ShoppingBag } from "lucide-react";
import Spinner from "@/components/Spinner";

export default async function OrdersPage() {
  const { success, orders, isAdmin } = await getOrders();

  if (!success) {
    return (
      <div className="min-h-screen  flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <div className="text-red-500 mb-2">⚠️</div>
            <p className="text-red-600 font-medium">Failed to load orders</p>
            <p className="text-gray-600 text-sm mt-1">Please try again later</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="min-h-screen ">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold  mb-2">Your Orders</h1>
            <p className="">Track and download your digital purchases</p>
          </div>
          <Card className="text-center py-16">
            <CardContent>
              <ShoppingBag className="h-16 w-16 mx-auto te mb-6" />
              <h3 className="text-xl font-semibold  mb-2">No orders yet</h3>
              <p className=" max-w-sm mx-auto">
                Your purchased digital products will appear here once you make
                your first order.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-50 text-green-700 border-green-200";
      case "pending":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "cancelled":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return " text-gray-700 border-gray-200";
    }
  };

  return (
    <Suspense fallback={<Spinner></Spinner>}>

    <div className="min-h-screen ">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold  mb-2">Your Orders</h1>
          <p className="">Track and download your digital purchases</p>
        </div>

        <div className="space-y-6">
          {orders.map((order) => (
            <Card
              key={order.id}
              className="overflow-hidden shadow-sm border-0 "
            >
              <CardHeader className="/80 border-b pb-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-lg flex items-center gap-2 ">
                      <Package className="h-5 w-5 " />
                      Order #{order.id.slice(-8).toUpperCase()}
                    </CardTitle>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1.5 ">
                        <Calendar className="h-4 w-4" />
                        {new Date(order.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>
                      <Badge
                        variant="outline"
                        className={`${getStatusColor(
                          order.status
                        )} font-medium`}
                      >
                        {order.status.charAt(0).toUpperCase() +
                          order.status.slice(1)}
                      </Badge>
                      {isAdmin && (
                        <span className=" text-xs  px-2 py-1 rounded">
                          {order.email}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold ">
                      ${order.total.toFixed(2)}
                    </div>
                    <div className="text-sm ">
                      {order.items.length} item
                      {order.items.length !== 1 ? "s" : ""}
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-0">
                {order.items.map((item, index) => {
                  const { product, quantity, price } = item;
                  const subtotal = price * quantity;

                  return (
                    <div key={item.id}>
                      <div className="p-6">
                        <div className="flex gap-4">
                          <div className="w-20 h-20 rounded-xl overflow-hidden  flex-shrink-0 border">
                            <img
                              src={
                                product.imageUrl || "/placeholder-product.jpg"
                              }
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1 min-w-0">
                                <h3 className="font-semibold  mb-1 text-lg">
                                  {product.name}
                                </h3>
                                {product.description && (
                                  <p className="text-sm  mb-3 line-clamp-2">
                                    {product.description}
                                  </p>
                                )}
                                <div className="flex items-center gap-4 text-sm">
                                  <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium">
                                    {product.category}
                                  </span>
                                  <span className="">
                                    Qty:{" "}
                                    <span className="font-medium ">
                                      {quantity}
                                    </span>
                                  </span>
                                  <span className="">
                                    Price:{" "}
                                    <span className="font-semibold ">
                                      ${price.toFixed(2)}
                                    </span>
                                  </span>
                                  {quantity > 1 && (
                                    <span className="">
                                      Subtotal:{" "}
                                      <span className="font-semibold ">
                                        ${subtotal.toFixed(2)}
                                      </span>
                                    </span>
                                  )}
                                </div>
                              </div>

                              <div className="flex-shrink-0">
                                {product.downloadUrl ? (
                                  <Button
                                    asChild
                                    className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
                                  >
                                    <a
                                      href={product.downloadUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center gap-2"
                                    >
                                      <Download className="h-4 w-4" />
                                      Download
                                    </a>
                                  </Button>
                                ) : (
                                  <Button
                                    disabled
                                    variant="secondary"
                                    className=""
                                  >
                                    <Download className="h-4 w-4 mr-2" />
                                    Unavailable
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {index < order.items.length - 1 && (
                        <Separator className="mx-6" />
                      )}
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      </div>
      </Suspense>
  );
}
