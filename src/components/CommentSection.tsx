import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { MessageSquare, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Comment {
  id: string;
  author_name: string;
  comment_text: string;
  created_at: string;
}

interface CommentSectionProps {
  articleSlug: string;
}

const CommentSection = ({ articleSlug }: CommentSectionProps) => {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const queryClient = useQueryClient();

  const { data: comments = [], isLoading } = useQuery({
    queryKey: ["comments", articleSlug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("comments")
        .select("id, author_name, comment_text, created_at")
        .eq("article_slug", articleSlug)
        .order("created_at", { ascending: true });
      if (error) throw error;
      return data as Comment[];
    },
  });

  const submitComment = useMutation({
    mutationFn: async () => {
      const trimmedName = name.trim().slice(0, 100);
      const trimmedText = text.trim().slice(0, 2000);
      if (!trimmedName || !trimmedText) throw new Error("Name and comment are required");

      const { error } = await supabase.from("comments").insert({
        article_slug: articleSlug,
        author_name: trimmedName,
        comment_text: trimmedText,
        status: "pending",
      });
      if (error) throw error;
    },
    onSuccess: () => {
      setSubmitted(true);
      setName("");
      setText("");
      setTimeout(() => setSubmitted(false), 5000);
    },
    onError: () => {
      toast.error("Failed to submit comment. Please try again.");
    },
  });

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <section className="mt-16 pt-10 border-t border-border">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-foreground">
        <MessageSquare className="w-6 h-6 text-primary" />
        Comments ({comments.length})
      </h2>

      {/* Existing comments */}
      {isLoading ? (
        <p className="text-muted-foreground text-sm">Loading comments...</p>
      ) : comments.length > 0 ? (
        <div className="space-y-6 mb-10">
          {comments.map((c) => (
            <div key={c.id} className="bg-muted/50 rounded-lg p-5 border border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-sm text-foreground">{c.author_name}</span>
                <span className="text-xs text-muted-foreground">{formatDate(c.created_at)}</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{c.comment_text}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground text-sm mb-10">No comments yet. Be the first to share your thoughts.</p>
      )}

      {/* Submit form */}
      {submitted ? (
        <div className="bg-primary/10 border border-primary/30 rounded-lg p-6 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-primary shrink-0" />
          <p className="text-sm text-foreground">Thank you! Your comment has been submitted for review and will appear once approved.</p>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="font-semibold text-foreground mb-4">Leave a Comment</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="comment-name" className="text-sm font-medium text-foreground mb-1 block">
                Name
              </label>
              <input
                id="comment-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={100}
                placeholder="Your name"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label htmlFor="comment-text" className="text-sm font-medium text-foreground mb-1 block">
                Comment
              </label>
              <textarea
                id="comment-text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                maxLength={2000}
                rows={4}
                placeholder="Share your thoughts..."
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              />
              <p className="text-xs text-muted-foreground mt-1">{text.length}/2000</p>
            </div>
            <Button
              onClick={() => submitComment.mutate()}
              disabled={!name.trim() || !text.trim() || submitComment.isPending}
              className="gap-2"
            >
              <Send className="w-4 h-4" />
              {submitComment.isPending ? "Submitting..." : "Submit Comment"}
            </Button>
            <p className="text-xs text-muted-foreground">All comments are reviewed before publishing.</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default CommentSection;
