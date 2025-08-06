"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import {
  getShippingAddresses,
  addShippingAddress,
  updateShippingAddress,
  deleteShippingAddress,
} from "@/actions/address.action";
import { MapPinHouse, Plus } from "lucide-react";

type Address = {
  id: string;
  fullName: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone?: string;
  updatedAt: string;
};

type AddressFormData = {
  fullName: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
};

export default function AddressViewDialog() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);

  const [formData, setFormData] = useState<AddressFormData>({
    fullName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  useEffect(() => {
    loadAddresses();
  }, []);

  const loadAddresses = async () => {
    try {
      const data = await getShippingAddresses();
      const transformedAddresses = data.map((addr) => ({
        ...addr,
        address2: addr.address2 || undefined,
        phone: addr.phone || undefined,
        updatedAt: addr.updatedAt.toString(),
      }));
      setAddresses(transformedAddresses);
    } catch (error) {
      console.error("Error loading addresses:", error);
    }
  };

  const handleInputChange = (field: keyof AddressFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleEdit = (address: Address) => {
    setFormData({
      fullName: address.fullName,
      address1: address.address1,
      address2: address.address2 || "",
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      country: address.country,
      phone: address.phone || "",
    });
    setEditingAddressId(address.id);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const dataToSubmit = {
        ...formData,
        address2: formData.address2 || undefined,
        phone: formData.phone || undefined,
      };

      if (editingAddressId) {
        // Update existing address
        await updateShippingAddress(editingAddressId, dataToSubmit);
      } else {
        // Add new address
        await addShippingAddress(dataToSubmit);
      }

      // Reset form and reload addresses
      resetForm();
      await loadAddresses();
    } catch (error) {
      console.error("Error saving address:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (addressId: string) => {
    if (!confirm("Are you sure you want to delete this address?")) return;

    try {
      await deleteShippingAddress(addressId);
      await loadAddresses();
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      fullName: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      phone: "",
    });
    setShowForm(false);
    setEditingAddressId(null);
  };

  const handleAddNew = () => {
    setEditingAddressId(null);
    setShowForm(true);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <MapPinHouse />
          Addresses
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Shipping Addresses</DialogTitle>
          <DialogDescription>
            {showForm
              ? editingAddressId
                ? "Edit your shipping address"
                : "Add a new shipping address"
              : "Select, edit, or add a shipping address before checkout."}
          </DialogDescription>
        </DialogHeader>

        {showForm ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) =>
                    handleInputChange("fullName", e.target.value)
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address1">Address Line 1 *</Label>
              <Input
                id="address1"
                value={formData.address1}
                onChange={(e) => handleInputChange("address1", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address2">Address Line 2</Label>
              <Input
                id="address2"
                value={formData.address2}
                onChange={(e) => handleInputChange("address2", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State *</Label>
                <Input
                  id="state"
                  value={formData.state}
                  onChange={(e) => handleInputChange("state", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zipCode">ZIP Code *</Label>
                <Input
                  id="zipCode"
                  value={formData.zipCode}
                  onChange={(e) => handleInputChange("zipCode", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">Country *</Label>
              <Input
                id="country"
                value={formData.country}
                onChange={(e) => handleInputChange("country", e.target.value)}
                required
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={resetForm}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting
                  ? editingAddressId
                    ? "Updating..."
                    : "Adding..."
                  : editingAddressId
                  ? "Update Address"
                  : "Add Address"}
              </Button>
            </div>
          </form>
        ) : (
          <>
            <div className="space-y-4 max-h-[50vh] overflow-y-auto">
              {addresses.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-8">
                  You don't have any shipping addresses yet.
                </p>
              )}

              {addresses.map((address) => (
                <Card key={address.id} className="relative">
                  <CardContent className="pt-4">
                    <div className="space-y-2">
                      <h3 className="font-medium text-base">
                        {address.fullName}
                      </h3>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p>{address.address1}</p>
                        {address.address2 && <p>{address.address2}</p>}
                        <p>
                          {address.city}, {address.state} {address.zipCode}
                        </p>
                        <p>{address.country}</p>
                        {address.phone && <p>📞 {address.phone}</p>}
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 mt-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(address)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(address.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Only show Add New Address button if no addresses exist */}
            {addresses.length === 0 && (
              <div className="pt-4 border-t mt-4 flex justify-end">
                <Button
                  variant="secondary"
                  onClick={handleAddNew}
                  className="gap-2"
                >
                  <Plus size={16} />
                  Add New Address
                </Button>
              </div>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
