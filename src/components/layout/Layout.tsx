import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { NetworkBackground } from "@/components/layout/NetworkBackground";

const BASE_URL = import.meta.env.VITE_URL_CORE;

export function Layout() {
  const location = useLocation();

  useEffect(() => {
    fetch(`${BASE_URL}/analytics/hit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        path: location.pathname,
        referrer: document.referrer || "Direct",
      }),
    }).catch(() => {});
  }, [location.pathname]);

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
