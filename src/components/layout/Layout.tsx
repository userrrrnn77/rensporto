import { Outlet } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { NetworkBackground } from "@/components/layout/NetworkBackground";

export function Layout() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <NetworkBackground />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
