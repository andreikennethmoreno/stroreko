import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { EditIcon } from "lucide-react";
import { Combobox } from "./ui/combo-box";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useState } from "react";
import { Textarea } from "./ui/textarea";
import toast from "react-hot-toast";
import ImageUpload from "./ImageUpload";
import { editProduct, getProductById } from "@/actions/product.aciton";

type Product = NonNullable<Awaited<ReturnType<typeof getProductById>>>;

interface EditDialogProps {
  product: Product;
}

export default function EditDialog({ product }: EditDialogProps) {
  const [formData, setFormData] = useState(() => ({
    name: product.name.trim(),
    description: (product.description || "").trim(),
    downloadUrl: product.downloadUrl || "",
    price: product.price,
    category: product.category.trim(),
    userId: product.userId.trim(),
    imageUrl: product.imageUrl || "",
  }));

  const handleChange = (field: string, value: string | number) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const updatedProduct = await editProduct(product.id, formData);
      console.log("Product edited: ", updatedProduct);
      toast.success("Product edited successfully");
    } catch (error) {
      console.error("Error editing product", error);
      toast.error("Failed to edit product");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="secondary"
          className="ml-auto flex items-center gap-2"
          asChild
        >
          <span>
            <EditIcon className="w-4 h-4" />
            Edit Product
          </span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Edit Product</AlertDialogTitle>
          <AlertDialogDescription>
            Update the details of this product in your inventory.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Combobox
                value={formData.category}
                onChange={(val) => handleChange("category", val)}
              />
            </div>
          </div>

          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Type product description here."
            rows={5}
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="downloadUrl">Download URL</Label>
              <Input
                id="downloadUrl"
                type="url"
                placeholder="https://example.com/your-file.zip"
                value={formData.downloadUrl}
                onChange={(e) => handleChange("downloadUrl", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                placeholder="Enter price"
                value={formData.price}
                onChange={(e) => handleChange("price", Number(e.target.value))}
              />
            </div>
          </div>

          {/* Image Upload */}
          <div className="py-5">
            <ImageUpload
              endpoint="postImage"
              value={formData.imageUrl}
              onChange={(url) => handleChange("imageUrl", url)}
            />
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction type="submit">Submit</AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
