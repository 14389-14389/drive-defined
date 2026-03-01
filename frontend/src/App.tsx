import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminProvider } from "./context/AdminContext";
import { NotificationProvider } from "./context/NotificationContext";
import { CurrencyProvider } from "./context/CurrencyContext";

// Client Pages
import Index from "./pages/Index";
import Inventory from "./pages/Inventory";
import VehicleDetail from "./pages/VehicleDetail";
import About from "./pages/About";
import Finance from "./pages/Finance";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

// Admin Pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminVehicles from "./pages/admin/AdminVehicles";
import AdminAddVehicle from "./pages/admin/AdminAddVehicle";
import AdminEditVehicle from "./pages/admin/AdminEditVehicle";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminLayout from "./components/admin/AdminLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <NotificationProvider>
        <CurrencyProvider>  {/* Make sure this wraps everything */}
          <Toaster />
          <Sonner richColors position="top-right" />
          <AdminProvider>
            <BrowserRouter>
              <Routes>
                {/* Client Routes */}
                <Route path="/" element={<Index />} />
                <Route path="/inventory" element={<Inventory />} />
                <Route path="/vehicle/:id" element={<VehicleDetail />} />
                <Route path="/about" element={<About />} />
                <Route path="/finance" element={<Finance />} />
                <Route path="/contact" element={<Contact />} />
                
                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="vehicles" element={<AdminVehicles />} />
                  <Route path="vehicles/add" element={<AdminAddVehicle />} />
                  <Route path="vehicles/edit/:id" element={<AdminEditVehicle />} />
                  <Route path="users" element={<AdminUsers />} />
                  <Route path="settings" element={<AdminSettings />} />
                </Route>
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </AdminProvider>
        </CurrencyProvider>  {/* Close CurrencyProvider */}
      </NotificationProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
