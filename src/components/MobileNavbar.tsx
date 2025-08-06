"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  ClipboardList,
  HomeIcon,
  LogIn,
  LogOut,
  Package,
  Settings,
  ShoppingCart,
  Users,
  Menu,
  X,
  MapPinHouse,
} from "lucide-react";
import ModeToggle from "./ModeTogggle";
import { UserButton } from "@stackframe/stack";
import { useRouter } from "next/navigation";
import AddressViewDialog from "./AddressViewDialog";

interface MobileNavbarProps {
  user: any;
  app: { signIn: string; signOut: string };
  isAdmin: boolean;
}

export default function MobileNavbar({
  user,
  app,
  isAdmin,
}: MobileNavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const commonBtnProps = {
    variant: "ghost" as const,
    className: "flex items-center gap-2 w-full justify-start px-4 py-2 text-sm",
    asChild: true,
    onClick: () => setMenuOpen(false),
  };

    const router = useRouter();


  return (
    <nav className="md:hidden sticky top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center h-16 justify-between">
          <Link
            href="/"
            className="text-xl font-bold font-mono tracking-wider"
            onClick={() => setMenuOpen(false)}
          >
            ✳️ StoreKO
          </Link>

          <button
            aria-label="Toggle menu"
            className="p-2 rounded-md hover:bg-accent"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {menuOpen && (
          <div className="flex flex-col space-y-1 pb-4 border-t pt-2 border-border animate-in fade-in slide-in-from-top-2">
            {user && (
              <div className="px-4 pb-2">
                <div className="flex items-center gap-3">
                  <UserButton
                    extraItems={[
                      {
                        text: "Address",
                        icon: <MapPinHouse size={16} />,
                        onClick: () => router.push("/address"),
                      },
                    ]}
                  />
                  <div className="text-sm">
                    <p className="font-medium">{user.name ?? "User"}</p>
                    <p className="text-muted-foreground text-xs">
                      {user.primaryEmail ?? "—"}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <Button {...commonBtnProps}>
              <Link href="/">
                <HomeIcon className="w-5 h-5" />
                Home
              </Link>
            </Button>

            <Button {...commonBtnProps}>
              <Link href="/products">
                <Package className="w-5 h-5" />
                Products
              </Link>
            </Button>

            <Button {...commonBtnProps}>
              <Link href="/cart">
                <ShoppingCart className="w-5 h-5" />
                Cart
              </Link>
            </Button>

            {isAdmin && (
              <>
                <Button {...commonBtnProps}>
                  <Link href="/admin/myproducts">
                    <Settings className="w-5 h-5" />
                    Manage Products
                  </Link>
                </Button>

                <Button {...commonBtnProps}>
                  <Link href="/admin/users">
                    <Users className="w-5 h-5" />
                    Users
                  </Link>
                </Button>
              </>
            )}

            {user && (
              <>
                <Button {...commonBtnProps}>
                  <Link href="/orders">
                    <ClipboardList className="w-5 h-5" />
                    Orders
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  className="w-full mt-2 mx-4"
                  asChild
                  onClick={() => setMenuOpen(false)}
                ></Button>


                  <AddressViewDialog />
                
              </>
            )}

            {!user && (
              <Button {...commonBtnProps}>
                <Link href={app.signIn}>
                  <LogIn className="w-5 h-5" />
                  Sign In
                </Link>
              </Button>
            )}

            <div className="px-4 pt-2">
              <ModeToggle />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
