import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ThankYou from "./pages/ThankYou";

import BookLed from "./pages/BookLed";
import BookBodySculpting from "./pages/BookBodySculpting";
import BodySculpting from "./pages/BodySculpting";
import SkinSpecialistChat from "./components/chat/SkinSpecialistChat";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Homepage renders the LED (Non-Surgical Face & Neck Lift) treatment */}
          <Route path="/" element={<Index />} />
          <Route path="/led" element={<Index />} />
          {/* Body Cavitation (EMS) */}
          <Route path="/ems" element={<BodySculpting />} />
          <Route path="/body-sculpting" element={<Navigate to="/ems" replace />} />

          {/* Booking routes */}
          <Route path="/book" element={<BookLed />} />
          <Route path="/book/led" element={<Navigate to="/book" replace />} />
          <Route path="/book/ems" element={<BookBodySculpting />} />
          <Route path="/book/body-sculpting" element={<Navigate to="/book/ems" replace />} />

          {/* Legacy routes redirect home */}
          <Route path="/instant-lift" element={<Navigate to="/" replace />} />
          <Route path="/led-cryo" element={<Navigate to="/" replace />} />
          <Route path="/book/instant-lift" element={<Navigate to="/book" replace />} />
          <Route path="/book/led-cryo" element={<Navigate to="/book" replace />} />


          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/admin" element={<Admin />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <SkinSpecialistChat />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
