import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ScrollToTop } from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";

// Lazy-loaded route components
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const UnmaskingAdamHowell = lazy(() => import("./pages/UnmaskingAdamHowell"));
const KeithShingletonDavidEdwards = lazy(() => import("./pages/KeithShingletonDavidEdwards"));
const ArchitectOfDeception = lazy(() => import("./pages/ArchitectOfDeception"));
const ExposingSuperdogeRugPull = lazy(() => import("./pages/ExposingSuperdogeRugPull"));
const InvestigativeUpdateSuperdoge = lazy(() => import("./pages/InvestigativeUpdateSuperdoge"));
const InvestigativeReportUncovering = lazy(() => import("./pages/InvestigativeReportUncovering"));
const Articles = lazy(() => import("./pages/Articles"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Music = lazy(() => import("./pages/Music"));
const RedFlagQuiz = lazy(() => import("./pages/RedFlagQuiz"));
const ScamBingo = lazy(() => import("./pages/ScamBingo"));
const AdminComments = lazy(() => import("./pages/AdminComments"));
const Disclaimer = lazy(() => import("./pages/Disclaimer"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const About = lazy(() => import("./pages/About"));
const Timeline = lazy(() => import("./pages/Timeline"));
const Glossary = lazy(() => import("./pages/Glossary"));
const ConfirmNewsletter = lazy(() => import("./pages/ConfirmNewsletter"));
const OdyseeSmearMachine = lazy(() => import("./pages/OdyseeSmearMachine"));

const queryClient = new QueryClient();

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
  </div>
);

// All app routes — rendered once for / and once for /th
const AppRoutes = () => (
  <>
    <Route index element={<Index />} />
      <Route path="unmasking-adam-howell-the-serial-scammer-extortionist-and-crypto-fraudster-a-warning-to-investors" element={<UnmaskingAdamHowell />} />
      <Route path="unmasking-adam-howell" element={<Navigate to="unmasking-adam-howell-the-serial-scammer-extortionist-and-crypto-fraudster-a-warning-to-investors" replace />} />
    <Route path="superdoge-rug-pull" element={<Navigate to="exposing-the-superdoge-rug-pull-adam-howells-latest-crypto-scheme-and-the-millions-potentially-siphoned" replace />} />
    <Route path="investigative-report" element={<Navigate to="investigative-report-uncovering-the-trail-of-adam-howells-ventures-in-crypto-and-beyond" replace />} />
    <Route path="superdoge-scam-update" element={<Navigate to="investigative-update-exposing-the-superdoge-scam-adam-howells-anonymous-pitch-vanished-promises-and-inner-circle-ties" replace />} />
    <Route path="keith-shingleton-david-edwards" element={<KeithShingletonDavidEdwards />} />
    <Route path="the-architect-of-deception-and-adam-howells-web-of-accomplices" element={<ArchitectOfDeception />} />
    <Route path="exposing-the-superdoge-rug-pull-adam-howells-latest-crypto-scheme-and-the-millions-potentially-siphoned" element={<ExposingSuperdogeRugPull />} />
    <Route path="investigative-update-exposing-the-superdoge-scam-adam-howells-anonymous-pitch-vanished-promises-and-inner-circle-ties" element={<InvestigativeUpdateSuperdoge />} />
    <Route path="investigative-report-uncovering-the-trail-of-adam-howells-ventures-in-crypto-and-beyond" element={<InvestigativeReportUncovering />} />
    <Route path="articles" element={<Articles />} />
    <Route path="blog" element={<Blog />} />
    <Route path="blog/:slug" element={<BlogPost />} />
    <Route path="music" element={<Music />} />
    <Route path="quiz" element={<RedFlagQuiz />} />
    <Route path="bingo" element={<ScamBingo />} />
    <Route path="admin/comments" element={<AdminComments />} />
    <Route path="disclaimer" element={<Disclaimer />} />
    <Route path="privacy" element={<PrivacyPolicy />} />
    <Route path="about" element={<About />} />
    <Route path="timeline" element={<Timeline />} />
    <Route path="glossary" element={<Glossary />} />
    <Route path="confirm-newsletter" element={<ConfirmNewsletter />} />
    <Route path="adam-howells-odysee-smear-machine-extortion-defamation-keith-shingleton-andrew-drummond-connection" element={<OdyseeSmearMachine />} />
    <Route path="odysee-smear-machine" element={<Navigate to="adam-howells-odysee-smear-machine-extortion-defamation-keith-shingleton-andrew-drummond-connection" replace />} />
  </>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <ErrorBoundary>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* English routes */}
              <Route path="/">{AppRoutes()}</Route>
              {/* Thai routes */}
              <Route path="/th">{AppRoutes()}</Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
