import { useState, useEffect } from "react";
import { X, Send, ShieldAlert, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const VictimContactSlideIn = () => {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    const alreadyDismissed = sessionStorage.getItem("victim-cta-dismissed");
    if (alreadyDismissed) {
      setDismissed(true);
      return;
    }
    const timer = setTimeout(() => setVisible(true), 8000);
    return () => clearTimeout(timer);
  }, [dismissed]);

  const handleDismiss = () => {
    setVisible(false);
    setDismissed(true);
    sessionStorage.setItem("victim-cta-dismissed", "1");
  };

  const handleSubmit = async () => {
    const trimmedName = name.trim().slice(0, 100);
    const trimmedEmail = email.trim().slice(0, 255);
    const trimmedMessage = message.trim().slice(0, 5000);
    if (!trimmedName || !trimmedEmail || !trimmedMessage) return;

    setSending(true);
    try {
      const { data, error } = await supabase.functions.invoke("send-victim-contact", {
        body: { name: trimmedName, email: trimmedEmail, message: trimmedMessage },
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      setSubmitted(true);
      setName("");
      setEmail("");
      setMessage("");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to send message";
      toast.error(msg);
    } finally {
      setSending(false);
    }
  };

  if (dismissed && !formOpen) return null;

  return (
    <>
      {/* Slide-in CTA */}
      <div
        className={`fixed bottom-24 left-4 z-40 max-w-sm w-[calc(100%-2rem)] sm:w-auto transition-all duration-500 ease-out ${
          visible && !formOpen && !dismissed
            ? "translate-x-0 opacity-100"
            : "-translate-x-[120%] opacity-0 pointer-events-none"
        }`}
      >
        <div className="bg-card border border-primary/30 rounded-xl shadow-xl p-5 relative">
          <button
            onClick={handleDismiss}
            className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="flex items-start gap-3 mb-3">
            <ShieldAlert className="w-6 h-6 text-primary shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-foreground text-sm leading-tight">
                Were You Affected?
              </h3>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                If you or someone you know lost money to Adam Howell's schemes, your story matters. Reach out confidentially — together we can build a stronger case.
              </p>
            </div>
          </div>
          <Button
            size="sm"
            onClick={() => {
              setFormOpen(true);
              setVisible(false);
            }}
            className="w-full gap-2"
          >
            <Send className="w-4 h-4" />
            Share Your Experience
          </Button>
        </div>
      </div>

      {/* Full contact form modal */}
      {formOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-card border rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-scale-in">
            <div className="p-6">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-6 h-6 text-primary" />
                  <h2 className="text-lg font-bold text-foreground">Confidential Contact</h2>
                </div>
                <button
                  onClick={() => {
                    setFormOpen(false);
                    handleDismiss();
                  }}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {submitted ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-bold text-foreground mb-2">Thank You</h3>
                  <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                    Your message has been received. We take every submission seriously and will review it promptly. Your courage helps protect others.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-6"
                    onClick={() => {
                      setFormOpen(false);
                      handleDismiss();
                    }}
                  >
                    Close
                  </Button>
                </div>
              ) : (
                <>
                  <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                    All submissions are treated with strict confidentiality. Your identity will never be shared without explicit consent. Provide as much detail as you're comfortable sharing.
                  </p>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="victim-name" className="text-sm font-medium text-foreground block mb-1">
                        Name <span className="text-muted-foreground">(or alias)</span>
                      </label>
                      <input
                        id="victim-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        maxLength={100}
                        placeholder="How should we address you?"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                    <div>
                      <label htmlFor="victim-email" className="text-sm font-medium text-foreground block mb-1">
                        Email
                      </label>
                      <input
                        id="victim-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        maxLength={255}
                        placeholder="your@email.com"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                    <div>
                      <label htmlFor="victim-message" className="text-sm font-medium text-foreground block mb-1">
                        Your Experience
                      </label>
                      <textarea
                        id="victim-message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        maxLength={5000}
                        rows={5}
                        placeholder="What happened? When did it occur? Any details about amounts, projects, or individuals involved..."
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                      />
                      <p className="text-xs text-muted-foreground mt-1">{message.length}/5000</p>
                    </div>
                    <Button
                      onClick={handleSubmit}
                      disabled={!name.trim() || !email.trim() || !message.trim() || sending}
                      className="w-full gap-2"
                    >
                      <Send className="w-4 h-4" />
                      {sending ? "Sending..." : "Send Confidentially"}
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">
                      🔒 Your information is encrypted and handled with care.
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VictimContactSlideIn;
