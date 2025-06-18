"use server";

import { stackServerApp } from "@/stack";
import MobileNavbar from "./MobileNavbar";
import DesktopNavbar from "./DesktopNavbar";

async function Navbar() {
  const user = await stackServerApp.getUser();
  const app = stackServerApp.urls;

  const isAdmin =
    user &&
    user.id === process.env.ADMIN_ID &&
    user.primaryEmail === process.env.ADMIN_EMAIL;

  const safeUser = user
    ? {
        id: user.id,
        displayName: user.displayName,
        primaryEmail: user.primaryEmail,
        profileImageUrl: user.profileImageUrl,
      }
    : null;

  const safeApp = {
    signIn: app.signIn,
    signOut: app.signOut,
  };

  return (
    <nav className="sticky top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <DesktopNavbar user={safeUser} app={safeApp} isAdmin={!!isAdmin} />
      <MobileNavbar user={safeUser} app={safeApp} isAdmin={!!isAdmin} />
    </nav>
  );
}

export default Navbar;
