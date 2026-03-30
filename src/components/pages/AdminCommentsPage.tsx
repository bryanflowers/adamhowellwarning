"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Shield, Check, X, Trash2, RefreshCw, LogOut, Mail, Archive, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";
import SEOHead from "@/components/SEOHead";
import type { Session } from "@supabase/supabase-js";

interface Comment {
  id: string;
  article_slug: string;
  author_name: string;
  comment_text: string;
  status: string;
  created_at: string;
}

interface VictimContact {
  id: string;
  name: string;
  email: string;
  message: string;
  status: string;
  created_at: string;
}

const AdminComments = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [contacts, setContacts] = useState<VictimContact[]>([]);
  const [loading, setLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [loginPending, setLoginPending] = useState(false);
  const [commentFilter, setCommentFilter] = useState("all");
  const [contactFilter, setContactFilter] = useState("all");
  const hasLoadedRef = useRef(false);
  const loadingRef = useRef(false);

  const loadData = useCallback(async () => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    setLoading(true);
    try {
      const [commentsRes, contactsRes] = await Promise.all([
        supabase.functions.invoke("moderate-comments", { body: { action: "list" } }),
        supabase.functions.invoke("moderate-comments", { body: { action: "list", resource: "victim_contacts" } }),
      ]);
      if (commentsRes.error) throw commentsRes.error;
      if (commentsRes.data?.error) throw new Error(commentsRes.data.error);
      setComments(commentsRes.data.comments || []);

      if (contactsRes.error) throw contactsRes.error;
      if (contactsRes.data?.error) throw new Error(contactsRes.data.error);
      setContacts(contactsRes.data.contacts || []);
    } catch {
      toast.error("Failed to load data.");
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  }, []);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      setAuthLoading(false);
      setLoginPending(false);
      if (newSession && !hasLoadedRef.current) {
        hasLoadedRef.current = true;
        loadData();
      }
      if (!newSession) hasLoadedRef.current = false;
    });

    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s);
      setAuthLoading(false);
      if (s && !hasLoadedRef.current) {
        hasLoadedRef.current = true;
        loadData();
      }
    });

    return () => subscription.unsubscribe();
  }, [loadData]);

  const login = async () => {
    setLoginPending(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) { toast.error("Invalid credentials"); setLoginPending(false); }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setComments([]);
    setContacts([]);
    setSession(null);
  };

  const updateStatus = async (id: string, status: string, resource?: string) => {
    try {
      const { data, error } = await supabase.functions.invoke("moderate-comments", {
        body: { action: "update", commentId: id, status, resource },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      if (resource === "victim_contacts") {
        setContacts((prev) => prev.map((c) => (c.id === id ? { ...c, status } : c)));
      } else {
        setComments((prev) => prev.map((c) => (c.id === id ? { ...c, status } : c)));
      }
      toast.success(`Status updated to ${status}`);
    } catch {
      toast.error("Failed to update status");
    }
  };

  const deleteItem = async (id: string, resource?: string) => {
    try {
      const { data, error } = await supabase.functions.invoke("moderate-comments", {
        body: { action: "delete", commentId: id, resource },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      if (resource === "victim_contacts") {
        setContacts((prev) => prev.filter((c) => c.id !== id));
      } else {
        setComments((prev) => prev.filter((c) => c.id !== id));
      }
      toast.success("Deleted");
    } catch {
      toast.error("Failed to delete");
    }
  };

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" });

  const statusColor = (s: string) => {
    if (s === "approved" || s === "reviewed") return "default" as const;
    if (s === "rejected" || s === "archived") return "destructive" as const;
    return "secondary" as const;
  };

  if (authLoading) {
    return <><SEOHead title="Admin Panel" description="Admin moderation panel" noindex /><div className="min-h-[60vh] flex items-center justify-center"><p className="text-muted-foreground">Loading...</p></div></>;
  }

  if (!session) {
    return (
      <>
        <SEOHead title="Admin Panel" description="Admin moderation panel" noindex />
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="bg-card border rounded-xl p-8 w-full max-w-sm">
            <div className="flex items-center gap-2 mb-6">
              <Shield className="w-6 h-6 text-primary" />
              <h1 className="text-xl font-bold text-foreground">Admin Panel</h1>
            </div>
            <label htmlFor="admin-email" className="text-sm font-medium text-foreground block mb-1">Email</label>
            <input id="admin-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground mb-3 focus:outline-none focus:ring-2 focus:ring-ring" placeholder="admin@example.com" />
            <label htmlFor="admin-pw" className="text-sm font-medium text-foreground block mb-1">Password</label>
            <input id="admin-pw" type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !loginPending && email && password && login()}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground mb-4 focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Enter password" />
            <Button onClick={login} disabled={!email || !password || loginPending} className="w-full">
              {loginPending ? "Signing in..." : "Sign In"}
            </Button>
          </div>
        </div>
      </>
    );
  }

  const filteredComments = commentFilter === "all" ? comments : comments.filter((c) => c.status === commentFilter);
  const filteredContacts = contactFilter === "all" ? contacts : contacts.filter((c) => c.status === contactFilter);

  return (
    <>
      <SEOHead title="Admin Panel" description="Admin moderation panel" noindex />
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">Admin Panel</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={loadData} disabled={loading} className="gap-2">
                <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} /> Refresh
              </Button>
              <Button variant="ghost" size="sm" onClick={logout} className="gap-2">
                <LogOut className="w-4 h-4" /> Sign Out
              </Button>
            </div>
          </div>

          <Tabs defaultValue="comments">
            <TabsList className="mb-6">
              <TabsTrigger value="comments">Comments ({comments.length})</TabsTrigger>
              <TabsTrigger value="victim_reports">Victim Reports ({contacts.length})</TabsTrigger>
            </TabsList>

            {/* Comments Tab */}
            <TabsContent value="comments">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                {[
                  { label: "All", value: "all", count: comments.length },
                  { label: "Pending", value: "pending", count: comments.filter((c) => c.status === "pending").length },
                  { label: "Approved", value: "approved", count: comments.filter((c) => c.status === "approved").length },
                  { label: "Rejected", value: "rejected", count: comments.filter((c) => c.status === "rejected").length },
                ].map((s) => (
                  <button key={s.value} onClick={() => setCommentFilter(s.value)}
                    className={`rounded-lg border p-3 text-left transition-all ${commentFilter === s.value ? "border-primary bg-primary/10" : "border-border bg-card hover:border-primary/40"}`}>
                    <p className="text-2xl font-bold text-foreground">{s.count}</p>
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                  </button>
                ))}
              </div>
              <div className="space-y-3">
                {loading ? (
                  <p className="text-muted-foreground text-sm py-8 text-center">Loading...</p>
                ) : filteredComments.length === 0 ? (
                  <p className="text-muted-foreground text-sm py-8 text-center">No comments in this category.</p>
                ) : filteredComments.map((c) => (
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
                          <Button variant="ghost" size="icon" onClick={() => updateStatus(c.id, "approved")} title="Approve" className="h-8 w-8 text-primary hover:bg-primary/10"><Check className="w-4 h-4" /></Button>
                        )}
                        {c.status !== "rejected" && (
                          <Button variant="ghost" size="icon" onClick={() => updateStatus(c.id, "rejected")} title="Reject" className="h-8 w-8 text-muted-foreground hover:bg-muted"><X className="w-4 h-4" /></Button>
                        )}
                        <Button variant="ghost" size="icon" onClick={() => deleteItem(c.id)} title="Delete" className="h-8 w-8 text-destructive hover:bg-destructive/10"><Trash2 className="w-4 h-4" /></Button>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{c.comment_text}</p>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Victim Reports Tab */}
            <TabsContent value="victim_reports">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                {[
                  { label: "All", value: "all", count: contacts.length },
                  { label: "Pending", value: "pending", count: contacts.filter((c) => c.status === "pending").length },
                  { label: "Reviewed", value: "reviewed", count: contacts.filter((c) => c.status === "reviewed").length },
                  { label: "Archived", value: "archived", count: contacts.filter((c) => c.status === "archived").length },
                ].map((s) => (
                  <button key={s.value} onClick={() => setContactFilter(s.value)}
                    className={`rounded-lg border p-3 text-left transition-all ${contactFilter === s.value ? "border-primary bg-primary/10" : "border-border bg-card hover:border-primary/40"}`}>
                    <p className="text-2xl font-bold text-foreground">{s.count}</p>
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                  </button>
                ))}
              </div>
              <div className="space-y-3">
                {loading ? (
                  <p className="text-muted-foreground text-sm py-8 text-center">Loading...</p>
                ) : filteredContacts.length === 0 ? (
                  <p className="text-muted-foreground text-sm py-8 text-center">No victim reports in this category.</p>
                ) : filteredContacts.map((c) => (
                  <div key={c.id} className="bg-card border rounded-lg p-4">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="font-semibold text-sm text-foreground">{c.name}</span>
                          <Badge variant={statusColor(c.status)} className="text-xs">{c.status}</Badge>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <a href={`mailto:${c.email}`} className="text-primary hover:underline flex items-center gap-1">
                            <Mail className="w-3 h-3" />{c.email}
                          </a>
                          <span>· {formatDate(c.created_at)}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        {c.status !== "reviewed" && (
                          <Button variant="ghost" size="icon" onClick={() => updateStatus(c.id, "reviewed", "victim_contacts")} title="Mark Reviewed" className="h-8 w-8 text-primary hover:bg-primary/10"><Eye className="w-4 h-4" /></Button>
                        )}
                        {c.status !== "archived" && (
                          <Button variant="ghost" size="icon" onClick={() => updateStatus(c.id, "archived", "victim_contacts")} title="Archive" className="h-8 w-8 text-muted-foreground hover:bg-muted"><Archive className="w-4 h-4" /></Button>
                        )}
                        <Button variant="ghost" size="icon" onClick={() => deleteItem(c.id, "victim_contacts")} title="Delete" className="h-8 w-8 text-destructive hover:bg-destructive/10"><Trash2 className="w-4 h-4" /></Button>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">{c.message}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </>
  );
};

export default AdminComments;
