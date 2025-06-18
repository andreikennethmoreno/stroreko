import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { getProductById } from "@/actions/product.aciton";
import AddToCartButton from "@/components/AddtoCartButton";

type Product = Awaited<ReturnType<typeof getProductById>>;

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  if (!product) {
    return <div>Product data is not available.</div>;
  }

  return (
    <Card className="max-w">
      <div className="flex flex-row">
        <div className="basis-2/4">
          <CardHeader>
            {product.imageUrl && (
              <div className="rounded-lg overflow-hidden">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-auto object-cover"
                />
              </div>
            )}
          </CardHeader>
        </div>
        <div className="basis-2/4 flex flex-col justify-between">
          <CardContent className="mt-8 space-y-3">
            <CardTitle className="text-5xl font-bold">{product.name}</CardTitle>
            <CardTitle className="text-3xl font-bold">
              ${product.price}
            </CardTitle>
            <Badge>{product.category}</Badge>
            <CardDescription>Stock: {product.stock}</CardDescription>
            <CardDescription className="text-white">
              {product.description}
            </CardDescription>

            <AddToCartButton productId={product.id} />
            
          </CardContent>
        </div>
      </div>
    </Card>
  );
}
