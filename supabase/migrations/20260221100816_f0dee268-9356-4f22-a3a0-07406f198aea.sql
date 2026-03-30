
-- Comments table
CREATE TABLE public.comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  article_slug TEXT NOT NULL,
  author_name TEXT NOT NULL,
  comment_text TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

-- Anyone can read approved comments
CREATE POLICY "Anyone can read approved comments"
ON public.comments
FOR SELECT
USING (status = 'approved');

-- Anyone can insert comments (they start as pending)
CREATE POLICY "Anyone can submit comments"
ON public.comments
FOR INSERT
WITH CHECK (true);

-- Admin moderation table (password-protected via edge function)
-- We'll use an edge function for admin operations
