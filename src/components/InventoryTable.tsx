"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Filter,
  Plus,
  Edit3,
  Trash2,
  Eye,
  Package,
  TrendingUp,
  DollarSign,
  Calendar,
  MoreHorizontal,
  Grid3X3,
  List,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CreateDialog from "./CreateDialog";
import EditDialog from "./EditDialog";
import DeleteDialog from "./DeleteDialog";
import { getProducts } from "@/actions/product.aciton";

type Products = Awaited<ReturnType<typeof getProducts>>;

interface InventoryTableProps {
  products: Products;
}

export default function InventoryTable({ products }: InventoryTableProps) {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");

  // Get unique categories for filter dropdown
  const categories = Array.from(
    new Set(products?.userProducts?.map((product) => product.category) || [])
  );

  // Filter and sort products
  const filteredProducts = products?.userProducts
    ?.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    ?.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "name":
          return a.name.localeCompare(b.name);
        case "newest":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case "oldest":
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        default:
          return 0;
      }
    });

  // Calculate stats
  const totalProducts = products?.userProducts?.length || 0;
  const totalValue =
    products?.userProducts?.reduce((sum, product) => sum + product.price, 0) ||
    0;
  const avgPrice = totalProducts > 0 ? totalValue / totalProducts : 0;

  const handleProductClick = (product: any) => {
    const slugifiedName = product.name.toLowerCase().replace(/\s+/g, "-");
    const slug = `${product.id}--${slugifiedName}`;
    const productUrl = `/products/${slug}`;
    router.push(productUrl);
  };

  const formatDate = (date: string | Date) => {
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold ">Product Dashboard</h1>
              <p className=" mt-1">Manage your digital product inventory</p>
            </div>
            <CreateDialog />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-0 shadow-sm ">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium ">Total Products</p>
                  <p className="text-3xl font-bold ">{totalProducts}</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <Package className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm ">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium ">Total Value</p>
                  <p className="text-3xl font-bold ">
                    ${totalValue.toLocaleString()}
                  </p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm ">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium ">Average Price</p>
                  <p className="text-3xl font-bold ">
                    ${avgPrice.toLocaleString()}
                  </p>
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Controls */}
        <Card className="border-0 shadow-sm  mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              {/* Search and Filters */}
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search products..."
                    className="pl-10  focus:border-blue-500 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                {/* Category Filter */}
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger className="w-full sm:w-48 ">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Sort */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full sm:w-48 ">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="name">Name (A-Z)</SelectItem>
                    <SelectItem value="price-low">
                      Price (Low to High)
                    </SelectItem>
                    <SelectItem value="price-high">
                      Price (High to Low)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* View Toggle */}
              <div className="flex items-center gap-2  rounded-lg p-1">
                <Button
                  variant={viewMode === "table" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("table")}
                  className="h-8 w-8 p-0"
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="h-8 w-8 p-0"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Products Display */}
        {filteredProducts && filteredProducts.length > 0 ? (
          viewMode === "table" ? (
            // Table View
            <Card className="border-0 shadow-sm ">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="">
                      <TableHead className="font-semibold ">Product</TableHead>
                      <TableHead className="font-semibold ">Category</TableHead>
                      <TableHead className="font-semibold ">Price</TableHead>
                      <TableHead className="font-semibold ">Created</TableHead>
                      <TableHead className="font-semibold ">
                        DownloadUrl
                      </TableHead>
                      <TableHead className="font-semibold  text-right">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProducts.map((product) => (
                      <TableRow
                        key={product.id}
                        className=" cursor-pointer transition-colors"
                        onClick={() => handleProductClick(product)}
                      >
                        <TableCell className="py-4">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg overflow-hidden  flex-shrink-0">
                              <img
                                src={
                                  product.imageUrl ||
                                  "https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg"
                                }
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="font-semibold  truncate">
                                {product.name}
                              </p>
                              <p className="text-sm text-gray-500 truncate">
                                ID: {product.id.slice(0, 8)}...
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className=" border-0">
                            {product.category}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-semibold ">
                          ${product.price.toLocaleString()}
                        </TableCell>
                        <TableCell className="">
                          {formatDate(product.createdAt)}
                        </TableCell>
                        <TableCell className="text-xs text-blue-700 break-all whitespace-normal max-w-xs">
                          {product.downloadUrl || "No URL"}
                        </TableCell>{" "}
                        <TableCell className="text-right">
                          <div
                            className="flex items-center justify-end gap-2"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleProductClick(product)}
                              className="h-8 w-8 p-0  "
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <EditDialog product={product} />
                            <DeleteDialog product={product} />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          ) : (
            // Grid View
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <Card
                  key={product.id}
                  className="group cursor-pointer border-0 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 "
                  onClick={() => handleProductClick(product)}
                >
                  <CardContent className="p-0">
                    {/* Product Image */}
                    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-t-xl ">
                      <img
                        src={
                          product.imageUrl ||
                          "https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg"
                        }
                        alt={product.name}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Category Badge */}
                      <Badge
                        variant="secondary"
                        className="absolute top-3 left-3 /90 text-gray-700 border-0"
                      >
                        {product.category}
                      </Badge>

                      {/* Actions Menu */}
                      <div
                        className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="secondary"
                              size="sm"
                              className="h-8 w-8 p-0 /90 hover:"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleProductClick(product)}
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              View Product
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit3 className="mr-2 h-4 w-4" />
                              Edit Product
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Product
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-6">
                      <div className="space-y-3">
                        <div>
                          <h3 className="font-semibold text-lg  group-hover:text-blue-600 transition-colors line-clamp-2">
                            {product.name}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">
                            ID: {product.id.slice(0, 8)}...
                          </p>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="text-2xl font-bold ">
                            ${product.price.toLocaleString()}
                          </div>
                        </div>

                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="h-4 w-4 mr-1" />
                          {formatDate(product.createdAt)}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div
                        className="mt-6 flex gap-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <EditDialog product={product} />
                        <DeleteDialog product={product} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )
        ) : (
          // Empty State
          <Card className="border-0 shadow-sm ">
            <CardContent className="text-center py-16">
              <div className=" rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Package className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold  mb-2">No products found</h3>
              <p className="text-gray-500 mb-6">
                Try adjusting your search or filter criteria, or create your
                first product.
              </p>
              <div className="flex gap-4 justify-center">
                <Button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                  }}
                  variant="outline"
                >
                  Clear filters
                </Button>
                <CreateDialog />
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
