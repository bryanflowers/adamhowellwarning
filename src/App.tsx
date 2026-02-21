import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "./components/ScrollToTop";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import UnmaskingAdamHowell from "./pages/UnmaskingAdamHowell";
import SuperDogeRugPull from "./pages/SuperDogeRugPull";
import InvestigativeReport from "./pages/InvestigativeReport";
import SuperDogeScamUpdate from "./pages/SuperDogeScamUpdate";
import KeithShingletonDavidEdwards from "./pages/KeithShingletonDavidEdwards";
import ArchitectOfDeception from "./pages/ArchitectOfDeception";
import ExposingSuperdogeRugPull from "./pages/ExposingSuperdogeRugPull";
import InvestigativeUpdateSuperdoge from "./pages/InvestigativeUpdateSuperdoge";
import InvestigativeReportUncovering from "./pages/InvestigativeReportUncovering";
import Articles from "./pages/Articles";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Music from "./pages/Music";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/unmasking-adam-howell" element={<UnmaskingAdamHowell />} />
          <Route path="/superdoge-rug-pull" element={<SuperDogeRugPull />} />
          <Route path="/investigative-report" element={<InvestigativeReport />} />
          <Route path="/superdoge-scam-update" element={<SuperDogeScamUpdate />} />
          <Route path="/keith-shingleton-david-edwards" element={<KeithShingletonDavidEdwards />} />
          <Route path="/the-architect-of-deception-and-adam-howells-web-of-accomplices" element={<ArchitectOfDeception />} />
          <Route path="/exposing-the-superdoge-rug-pull-adam-howells-latest-crypto-scheme-and-the-millions-potentially-siphoned" element={<ExposingSuperdogeRugPull />} />
          <Route path="/investigative-update-exposing-the-superdoge-scam-adam-howells-anonymous-pitch-vanished-promises-and-inner-circle-ties" element={<InvestigativeUpdateSuperdoge />} />
          <Route path="/investigative-report-uncovering-the-trail-of-adam-howells-ventures-in-crypto-and-beyond" element={<InvestigativeReportUncovering />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/music" element={<Music />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
