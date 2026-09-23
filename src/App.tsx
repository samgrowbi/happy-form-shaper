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
import FacialCryotherapy from "./pages/FacialCryotherapy";
import BookFacialCryotherapy from "./pages/BookFacialCryotherapy";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import LedPage from "./pages/LedPage";
import BookLedPage from "./pages/BookLedPage";
import LedV1Page from "./pages/LedV1Page";
import BookLedV1Page from "./pages/BookLedV1Page";




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
          <Route path="/led" element={<LedPage />} />
          <Route path="/bookled" element={<BookLedPage />} />
          <Route path="/ledv1" element={<LedV1Page />} />
          <Route path="/bookledv1" element={<BookLedV1Page />} />


          {/* Body Cavitation (EMS) */}
          <Route path="/ems" element={<BodySculpting />} />
          <Route path="/body-sculpting" element={<Navigate to="/ems" replace />} />
          {/* Facial Cryotherapy */}
          <Route path="/facial-cryotherapy" element={<FacialCryotherapy />} />


          {/* Booking routes */}
          <Route path="/book" element={<BookLed />} />
          <Route path="/book/led" element={<Navigate to="/book" replace />} />
          <Route path="/book/ems" element={<BookBodySculpting />} />
          <Route path="/book/body-sculpting" element={<Navigate to="/book/ems" replace />} />
          <Route path="/book/facial-cryotherapy" element={<BookFacialCryotherapy />} />

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
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
