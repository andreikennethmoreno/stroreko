import Link from "next/link";
import { Button } from "./ui/button";
import { HomeIcon, LogIn, LogOut, Package, ShoppingCart } from "lucide-react";
import ModeToggle from "./ModeTogggle";
import { stackServerApp } from "@/stack";
import { UserButton } from "@stackframe/stack";

async function Navbar() {
  const user = await stackServerApp.getUser();
  const app = stackServerApp.urls;

  return (
    <nav className="sticky top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center h-16 justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className="text-xl font-bold font-mono tracking-wider"
            >
              📦 Productory
            </Link>
          </div>

          {/* Navbar Items */}
          <div className="hidden md:flex items-center space-x-4">
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

            <Button variant="ghost" className="flex items-center gap-2" asChild>
              <Link href="/">
                <HomeIcon className="w-4 h-4" />
                <span className="hidden lg:inline">Home</span>
              </Link>
            </Button>

            <ModeToggle />

            {user ? (
              <>
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
              <Button
                variant="ghost"
                className="flex items-center gap-2"
                asChild
              >
                <Link href={app.signIn}>
                  <LogIn className="w-4 h-4" />
                  <span className="hidden lg:inline">Sign In</span>
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
