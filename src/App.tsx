import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import DashboardLayout from "./components/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";
import ClassesPage from "./pages/dashboard/ClassesPage";
import ElevesPage from "./pages/dashboard/ElevesPage";
import NotesPage from "./pages/dashboard/NotesPage";
import BulletinsPage from "./pages/dashboard/BulletinsPage";
import ParentPage from "./pages/ParentPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="space-y-4">
      <h1 className="font-heading text-2xl font-bold text-foreground">{title}</h1>
      <p className="text-muted-foreground">Cette page sera bientôt disponible.</p>
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/parent" element={<ParentPage />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="classes" element={<ClassesPage />} />
            <Route path="eleves" element={<ElevesPage />} />
            <Route path="notes" element={<NotesPage />} />
            <Route path="bulletins" element={<BulletinsPage />} />
            <Route path="matieres" element={<PlaceholderPage title="Matières" />} />
            <Route path="professeurs" element={<PlaceholderPage title="Professeurs" />} />
            <Route path="parametres" element={<PlaceholderPage title="Paramètres" />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
