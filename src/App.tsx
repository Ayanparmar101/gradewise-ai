import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import StudentDashboard from "./pages/student/Dashboard";
import StudentAssignments from "./pages/student/Assignments";
import StudentSubmissions from "./pages/student/Submissions";
import StudentGrades from "./pages/student/Grades";
import StudentSettings from "./pages/student/Settings";
import ProfessorDashboard from "./pages/professor/Dashboard";
import AdminDashboard from "./pages/admin/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/features" element={<Features />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about" element={<About />} />
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/assignments" element={<StudentAssignments />} />
          <Route path="/student/submissions" element={<StudentSubmissions />} />
          <Route path="/student/grades" element={<StudentGrades />} />
          <Route path="/student/settings" element={<StudentSettings />} />
          <Route path="/professor/dashboard" element={<ProfessorDashboard />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
