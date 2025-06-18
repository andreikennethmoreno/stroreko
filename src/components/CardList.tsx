"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Grid3X3, List, ShoppingCart } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import AddToCartButton from "./AddtoCartButton";
import { getProducts } from "@/actions/product.aciton";

type Products = Awaited<ReturnType<typeof getProducts>>;

interface CardListProps {
  products: Products;
}

export default function CardList({ products }: CardListProps) {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<string>("name");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

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
        default:
          return 0;
      }
    });

  const handleProductClick = (product: any) => {
    const slugifiedName = product.name.toLowerCase().replace(/\s+/g, "-");
    const slug = `${product.id}--${slugifiedName}`;
    const productUrl = `/products/${slug}`;
    router.push(productUrl);
  };

  return (
    <div className="min-h-screen ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold  mb-2">All Products</h1>
          <p className="">
            Discover our collection of {filteredProducts?.length ?? 0} digital
            products
          </p>
        </div>

        {/* Filters and Controls */}
        <div className=" rounded-2xl shadow-sm border p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2  h-4 w-4" />
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
                  <SelectItem value="name">Name (A-Z)</SelectItem>
                  <SelectItem value="price-low">Price (Low to High)</SelectItem>
                  <SelectItem value="price-high">
                    Price (High to Low)
                  </SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-2  rounded-lg p-1">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="h-8 w-8 p-0"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="h-8 w-8 p-0"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Products Grid/List */}
        {filteredProducts && filteredProducts.length > 0 ? (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                : "space-y-4"
            }
          >
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                className={`group cursor-pointer border-[1px] shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1  ${
                  viewMode === "list" ? "flex flex-row overflow-hidden" : ""
                }`}
                onClick={() => handleProductClick(product)}
              >
                <CardContent
                  className={`p-0 ${
                    viewMode === "list" ? "flex flex-row w-full" : ""
                  }`}
                >
                  {/* Product Image */}
                  <div
                    className={`relative overflow-hidden ${
                      viewMode === "list"
                        ? "w-64 h-40 flex-shrink-0" // Wider than tall for list view
                        : "aspect-[16/9] w-full" // Landscape ratio for grid view
                    } bg-gray-100 rounded-t-xl ${
                      viewMode === "list" ? "rounded-l-xl rounded-tr-none" : ""
                    }`}
                  >
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
                      className="absolute top-3 left-3 b border-0"
                    >
                      {product.category}
                    </Badge>
                  </div>

                  {/* Product Info */}
                  <div
                    className={`p-6 ${
                      viewMode === "list"
                        ? "flex-1 flex flex-col justify-between"
                        : ""
                    }`}
                  >
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-semibold text-lg  group-hover:text-blue-600 transition-colors line-clamp-2">
                          {product.name}
                        </h3>
                        {product.description && (
                          <p className="text-sm  mt-1 line-clamp-2">
                            {product.description}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold ">
                          ${product.price.toLocaleString()}
                        </div>
                      </div>
                    </div>

                    {/* Add to Cart Button */}
                    <div className={`${viewMode === "list" ? "mt-4" : "mt-6"}`}>
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="w-full"
                      >
                        <AddToCartButton productId={product.id} />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          // Empty State
          <div className="text-center py-16">
            <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <ShoppingCart className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No products found
            </h3>
            <p className="text-gray-500 mb-6">
              Try adjusting your search or filter criteria
            </p>
            <Button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
              }}
              variant="outline"
            >
              Clear filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
