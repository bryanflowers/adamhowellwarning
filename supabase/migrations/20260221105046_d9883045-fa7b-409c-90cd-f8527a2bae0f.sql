
-- Storage bucket for cached article audio files
INSERT INTO storage.buckets (id, name, public) VALUES ('article-audio', 'article-audio', true);

-- Allow public read access to article audio
CREATE POLICY "Public can read article audio"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'article-audio');

-- Allow service role to upload (edge function uses service role)
CREATE POLICY "Service role can upload article audio"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'article-audio');

-- Table to track generated audio per article slug
CREATE TABLE public.article_audio (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  article_slug TEXT NOT NULL UNIQUE,
  audio_url TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.article_audio ENABLE ROW LEVEL SECURITY;

-- Anyone can read cached audio URLs
CREATE POLICY "Anyone can read article audio"
  ON public.article_audio FOR SELECT
  TO anon, authenticated
  USING (true);
