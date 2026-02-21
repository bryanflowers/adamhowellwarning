import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useSearchParams } from "react-router-dom";

const ConfirmNewsletter = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      return;
    }

    const confirm = async () => {
      try {
        const { data, error } = await supabase.functions.invoke("newsletter-confirm", {
          body: { action: "confirm", token },
        });
        if (error || data?.error) {
          setStatus("error");
        } else {
          setStatus("success");
          setEmail(data.email || "");
        }
      } catch {
        setStatus("error");
      }
    };

    confirm();
  }, [token]);

  return (
    <Layout>
      <SEOHead title="Confirm Newsletter Subscription" description="Confirm your newsletter subscription." noindex />
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 max-w-md text-center">
          {status === "loading" && (
            <>
              <Loader2 className="w-12 h-12 text-primary mx-auto mb-4 animate-spin" />
              <h1 className="text-2xl font-bold text-foreground mb-2">Confirming...</h1>
              <p className="text-muted-foreground">Please wait while we confirm your subscription.</p>
            </>
          )}
          {status === "success" && (
            <>
              <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-foreground mb-2">Subscription Confirmed!</h1>
              <p className="text-muted-foreground">
                {email ? `${email} has been confirmed.` : "Your subscription is now active."} You'll receive investigative updates and scam alerts.
              </p>
            </>
          )}
          {status === "error" && (
            <>
              <XCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-foreground mb-2">Confirmation Failed</h1>
              <p className="text-muted-foreground">
                This link may have expired or already been used. Please try subscribing again.
              </p>
            </>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default ConfirmNewsletter;
