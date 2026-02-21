import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import SEOHead from "@/components/SEOHead";
import Layout from "@/components/Layout";
import { useLanguage } from "@/hooks/useLanguage";

const NotFound = () => {
  const location = useLocation();
  const { lang, localPath } = useLanguage();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <div className="flex min-h-[60vh] items-center justify-center">
        <SEOHead title="Page Not Found" description="The page you're looking for doesn't exist." noindex />
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold">404</h1>
          <p className="mb-4 text-xl text-muted-foreground">
            {lang === "th" ? "ไม่พบหน้าที่คุณต้องการ" : "Oops! Page not found"}
          </p>
          <Link to={localPath("/")} className="text-primary underline hover:text-primary/90">
            {lang === "th" ? "กลับหน้าหลัก" : "Return to Home"}
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
