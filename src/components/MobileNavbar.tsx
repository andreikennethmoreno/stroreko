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
} from "lucide-react";
import ModeToggle from "./ModeTogggle";
import { UserButton } from "@stackframe/stack";

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
    className: "flex items-center gap-2 w-full justify-start",
    asChild: true,
    onClick: () => setMenuOpen(false), // close menu on click link
  };

  return (
    <nav className="md:hidden sticky top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center h-16 justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-bold font-mono tracking-wider"
            onClick={() => setMenuOpen(false)}
          >
            ✳️ StoreKO
          </Link>

          {/* Hamburger button */}
          <button
            aria-label="Toggle menu"
            className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="flex flex-col space-y-2 pb-4 border-t border-gray-200 dark:border-gray-700">
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

            {user ? (
              <>
                <Button {...commonBtnProps}>
                  <Link href="/orders">
                    <ClipboardList className="w-5 h-5" />
                    Orders
                  </Link>
                </Button>

                <ModeToggle />

                <Button
                  variant="outline"
                  className="w-full"
                  asChild
                  onClick={() => setMenuOpen(false)}
                >
                  <Link href={app.signOut} className="flex items-center gap-2">
                    <LogOut className="w-5 h-5" />
                    Sign Out
                  </Link>
                </Button>

                <div className="px-2">
                  <UserButton />
                </div>
              </>
            ) : (
              <>
                <Button {...commonBtnProps}>
                  <Link href={app.signIn}>
                    <LogIn className="w-5 h-5" />
                    Sign In
                  </Link>
                </Button>

                <ModeToggle />
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
