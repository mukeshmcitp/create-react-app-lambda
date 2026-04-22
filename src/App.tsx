import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/useAuth";
import { CartProvider } from "@/hooks/useCart";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import StudentLogin from "./pages/StudentLogin.tsx";
import CorporateLogin from "./pages/CorporateLogin.tsx";
import LMSDashboard from "./pages/LMSDashboard.tsx";
import CorporateDashboard from "./pages/CorporateDashboard.tsx";
import AdminPanel from "./pages/AdminPanel.tsx";
import CloudTraining from "./pages/CloudTraining.tsx";
import DevOpsTraining from "./pages/DevOpsTraining.tsx";
import TrainingRoadmap from "./pages/TrainingRoadmap.tsx";
import RealTimeProjects from "./pages/RealTimeProjects.tsx";
import ResetPassword from "./pages/ResetPassword.tsx";
import Profile from "./pages/Profile.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/student-login" element={<StudentLogin />} />
            <Route path="/corporate-login" element={<CorporateLogin />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route
              path="/lms"
              element={
                <ProtectedRoute>
                  <LMSDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route path="/corporate-dashboard" element={<CorporateDashboard />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/training/cloud" element={<CloudTraining />} />
            <Route path="/training/devops" element={<DevOpsTraining />} />
            <Route path="/training/roadmap" element={<TrainingRoadmap />} />
            <Route path="/training/projects" element={<RealTimeProjects />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
