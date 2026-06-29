import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { NetworkBackground } from "@/components/layout/NetworkBackground";

export function Layout() {
  useEffect(() => {
    const hasVisited = sessionStorage.getItem("portfolio_session_view");

    if (!hasVisited) {
      fetch(`${import.meta.env.VITE_URL_CORE}/analytics/hit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          path: window.location.pathname,
          referrer: document.referrer || "Direct",
        }),
      })
        .then(() => sessionStorage.setItem("portfolio_session_view", "true"))
        .catch((err) => console.error("Tracker error:", err));
    }
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col ">
      <NetworkBackground />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
