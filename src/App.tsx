import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Home } from "@/pages/Home";
import { About } from "@/pages/About";
import { Projects } from "@/pages/Projects";
import { ProjectDetail } from "@/pages/ProjectsDetail";
import { Contact } from "@/pages/Contact";
import { useTheme } from "./context/ThemeContext";
import { Toaster } from "sonner";
import { NotFound } from "./pages/NotFound";

export function App() {
  const { theme } = useTheme();

  return (
    <BrowserRouter>
      <Toaster position="top-right" theme={theme} />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/:slug" element={<ProjectDetail />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
