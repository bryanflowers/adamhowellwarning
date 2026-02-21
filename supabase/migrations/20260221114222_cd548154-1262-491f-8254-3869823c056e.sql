
-- Create table for caching article translations
CREATE TABLE public.article_translations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  article_slug TEXT NOT NULL,
  language TEXT NOT NULL,
  translated_html TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (article_slug, language)
);

-- Enable RLS
ALTER TABLE public.article_translations ENABLE ROW LEVEL SECURITY;

-- Public can read translations
CREATE POLICY "Anyone can read article translations"
  ON public.article_translations
  FOR SELECT
  USING (true);
