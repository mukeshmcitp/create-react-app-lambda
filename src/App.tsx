import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/student-login" element={<StudentLogin />} />
          <Route path="/corporate-login" element={<CorporateLogin />} />
          <Route path="/lms" element={<LMSDashboard />} />
          <Route path="/corporate-dashboard" element={<CorporateDashboard />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/training/cloud" element={<CloudTraining />} />
          <Route path="/training/devops" element={<DevOpsTraining />} />
          <Route path="/training/roadmap" element={<TrainingRoadmap />} />
          <Route path="/training/projects" element={<RealTimeProjects />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
