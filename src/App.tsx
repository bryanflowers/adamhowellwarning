import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import UnmaskingAdamHowell from "./pages/UnmaskingAdamHowell";
import SuperDogeRugPull from "./pages/SuperDogeRugPull";
import InvestigativeReport from "./pages/InvestigativeReport";
import SuperDogeScamUpdate from "./pages/SuperDogeScamUpdate";
import KeithShingletonDavidEdwards from "./pages/KeithShingletonDavidEdwards";
import ArchitectOfDeception from "./pages/ArchitectOfDeception";
import ExposingSuperdogeRugPull from "./pages/ExposingSuperdogeRugPull";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/unmasking-adam-howell" element={<UnmaskingAdamHowell />} />
          <Route path="/superdoge-rug-pull" element={<SuperDogeRugPull />} />
          <Route path="/investigative-report" element={<InvestigativeReport />} />
          <Route path="/superdoge-scam-update" element={<SuperDogeScamUpdate />} />
          <Route path="/keith-shingleton-david-edwards" element={<KeithShingletonDavidEdwards />} />
          <Route path="/architect-of-deception" element={<ArchitectOfDeception />} />
          <Route path="/exposing-the-superdoge-rug-pull-adam-howells-latest-crypto-scheme-and-the-millions-potentially-siphoned" element={<ExposingSuperdogeRugPull />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
