import { createRoot } from "react-dom/client";
import { App } from "@/App";
import { ThemeProvider } from "@/context/ThemeContext";
import { HelmetProvider } from "react-helmet-async";
import "@/index.css";

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </HelmetProvider>,
);
