"use client";

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
} from "lucide-react";
import { UserButton } from "@stackframe/stack";
import ModeToggle from "./ModeTogggle";

type Props = {
  user: any;
  app: {
    signIn: string;
    signOut: string;
  };
  isAdmin: boolean;
};

export default function DesktopNavbar({ user, app, isAdmin }: Props) {
  return (
    <div className="hidden md:flex items-center h-16 justify-between max-w-7xl mx-auto px-4">
      {/* Logo */}
      <div className="flex items-center">
        <Link href="/" className="text-xl font-bold font-mono tracking-wider">
          ✳️ StoreKO
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex items-center space-x-4">
        <Button variant="ghost" className="flex items-center gap-2" asChild>
          <Link href="/">
            <HomeIcon className="w-4 h-4" />
            <span className="hidden lg:inline">Home</span>
          </Link>
        </Button>

        <Button variant="ghost" className="flex items-center gap-2" asChild>
          <Link href="/products">
            <Package className="w-4 h-4" />
            <span className="hidden lg:inline">Products</span>
          </Link>
        </Button>

        <Button variant="ghost" className="flex items-center gap-2" asChild>
          <Link href="/cart">
            <ShoppingCart className="w-4 h-4" />
            <span className="hidden lg:inline">Cart</span>
          </Link>
        </Button>

        {isAdmin && (
          <>
            <Button variant="ghost" className="flex items-center gap-2" asChild>
              <Link href="/admin/myproducts">
                <Settings className="w-4 h-4" />
                <span className="hidden lg:inline">Manage Products</span>
              </Link>
            </Button>
            <Button variant="ghost" className="flex items-center gap-2" asChild>
              <Link href="/admin/users">
                <Users className="w-4 h-4" />
                <span className="hidden lg:inline">Users</span>
              </Link>
            </Button>
          </>
        )}

        {user ? (
          <>
            <Button variant="ghost" className="flex items-center gap-2" asChild>
              <Link href="/orders">
                <ClipboardList className="w-4 h-4" />
                <span className="hidden lg:inline">Orders</span>
              </Link>
            </Button>
            <ModeToggle />
            <Button
              variant="outline"
              className="flex items-center gap-2"
              asChild
            >
              <Link href={app.signOut}>
                <LogOut className="w-4 h-4" />
                <span className="hidden lg:inline">Sign Out</span>
              </Link>
            </Button>
            <UserButton />
          </>
        ) : (
          <>
            <Button variant="ghost" className="flex items-center gap-2" asChild>
              <Link href={app.signIn}>
                <LogIn className="w-4 h-4" />
                <span className="hidden lg:inline">Sign In</span>
              </Link>
            </Button>
            <ModeToggle />
          </>
        )}
      </div>
    </div>
  );
}
