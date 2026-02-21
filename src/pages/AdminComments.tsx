import { useState, useEffect, useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Shield, Check, X, Trash2, RefreshCw, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import Layout from "@/components/Layout";
import type { Session } from "@supabase/supabase-js";

interface Comment {
  id: string;
  article_slug: string;
  author_name: string;
  comment_text: string;
  status: string;
  created_at: string;
}

const AdminComments = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [loginPending, setLoginPending] = useState(false);
  const [filter, setFilter] = useState<string>("all");
  const hasLoadedRef = useRef(false);
  const loadingRef = useRef(false);

  const loadComments = useCallback(async () => {
    // Prevent concurrent loads
    if (loadingRef.current) return;
    loadingRef.current = true;
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("moderate-comments", {
        body: { action: "list" },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setComments(data.comments || []);
    } catch {
      toast.error("Failed to load comments.");
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  }, []);

  useEffect(() => {
    // Set up listener FIRST (before getSession)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      setAuthLoading(false);
      setLoginPending(false);

      // Only load on initial auth or sign-in, not on every token refresh
      if (newSession && !hasLoadedRef.current) {
        hasLoadedRef.current = true;
        loadComments();
      }
      if (!newSession) {
        hasLoadedRef.current = false;
      }
    });

    // Then check existing session
    supabase.auth.getSession().then(({ data: { session: existingSession } }) => {
      setSession(existingSession);
      setAuthLoading(false);
      if (existingSession && !hasLoadedRef.current) {
        hasLoadedRef.current = true;
        loadComments();
      }
    });

    return () => subscription.unsubscribe();
  }, [loadComments]);

  const login = async () => {
    setLoginPending(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      toast.error("Invalid credentials");
      setLoginPending(false);
    }
    // Don't reset loginPending here — onAuthStateChange will handle it on success
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setComments([]);
    setSession(null);
  };

  const updateStatus = async (commentId: string, status: string) => {
    try {
      const { data, error } = await supabase.functions.invoke("moderate-comments", {
        body: { action: "update", commentId, status },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setComments((prev) =>
        prev.map((c) => (c.id === commentId ? { ...c, status } : c))
      );
      toast.success(`Comment ${status}`);
    } catch {
      toast.error("Failed to update comment");
    }
  };

  const deleteComment = async (commentId: string) => {
    try {
      const { data, error } = await supabase.functions.invoke("moderate-comments", {
        body: { action: "delete", commentId },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setComments((prev) => prev.filter((c) => c.id !== commentId));
      toast.success("Comment deleted");
    } catch {
      toast.error("Failed to delete comment");
    }
  };

  const filtered = filter === "all" ? comments : comments.filter((c) => c.status === filter);

  const statusColor = (s: string) => {
    if (s === "approved") return "default" as const;
    if (s === "rejected") return "destructive" as const;
    return "secondary" as const;
  };

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" });

  // Show loading spinner while checking auth
  if (authLoading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </Layout>
    );
  }

  // Show login form — also block if loginPending (waiting for onAuthStateChange)
  if (!session) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="bg-card border rounded-xl p-8 w-full max-w-sm">
            <div className="flex items-center gap-2 mb-6">
              <Shield className="w-6 h-6 text-primary" />
              <h1 className="text-xl font-bold text-foreground">Comment Moderation</h1>
            </div>
            <label htmlFor="admin-email" className="text-sm font-medium text-foreground block mb-1">Email</label>
            <input
              id="admin-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground mb-3 focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="admin@example.com"
            />
            <label htmlFor="admin-pw" className="text-sm font-medium text-foreground block mb-1">Password</label>
            <input
              id="admin-pw"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !loginPending && email && password && login()}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground mb-4 focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Enter password"
            />
            <Button onClick={login} disabled={!email || !password || loginPending} className="w-full">
              {loginPending ? "Signing in..." : "Sign In"}
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">Comment Moderation</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={loadComments} disabled={loading} className="gap-2">
                <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} /> Refresh
              </Button>
              <Button variant="ghost" size="sm" onClick={logout} className="gap-2">
                <LogOut className="w-4 h-4" /> Sign Out
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {[
              { label: "All", value: "all", count: comments.length },
              { label: "Pending", value: "pending", count: comments.filter((c) => c.status === "pending").length },
              { label: "Approved", value: "approved", count: comments.filter((c) => c.status === "approved").length },
              { label: "Rejected", value: "rejected", count: comments.filter((c) => c.status === "rejected").length },
            ].map((s) => (
              <button
                key={s.value}
                onClick={() => setFilter(s.value)}
                className={`rounded-lg border p-3 text-left transition-all ${
                  filter === s.value ? "border-primary bg-primary/10" : "border-border bg-card hover:border-primary/40"
                }`}
              >
                <p className="text-2xl font-bold text-foreground">{s.count}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </button>
            ))}
          </div>

          {/* Comment list */}
          <div className="space-y-3">
            {loading ? (
              <p className="text-muted-foreground text-sm py-8 text-center">Loading comments...</p>
            ) : filtered.length === 0 ? (
              <p className="text-muted-foreground text-sm py-8 text-center">No comments in this category.</p>
            ) : (
              filtered.map((c) => (
                <div key={c.id} className="bg-card border rounded-lg p-4">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="font-semibold text-sm text-foreground">{c.author_name}</span>
                        <Badge variant={statusColor(c.status)} className="text-xs">{c.status}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{c.article_slug} · {formatDate(c.created_at)}</p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      {c.status !== "approved" && (
                        <Button variant="ghost" size="icon" onClick={() => updateStatus(c.id, "approved")} title="Approve" className="h-8 w-8 text-primary hover:bg-primary/10">
                          <Check className="w-4 h-4" />
                        </Button>
                      )}
                      {c.status !== "rejected" && (
                        <Button variant="ghost" size="icon" onClick={() => updateStatus(c.id, "rejected")} title="Reject" className="h-8 w-8 text-muted-foreground hover:bg-muted">
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                      <Button variant="ghost" size="icon" onClick={() => deleteComment(c.id)} title="Delete" className="h-8 w-8 text-destructive hover:bg-destructive/10">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{c.comment_text}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AdminComments;
