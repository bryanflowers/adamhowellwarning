
-- Newsletter subscribers table for double opt-in
CREATE TABLE public.newsletter_subscribers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  confirmed BOOLEAN NOT NULL DEFAULT false,
  confirmation_token UUID NOT NULL DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  confirmed_at TIMESTAMP WITH TIME ZONE
);

ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Anyone can subscribe (insert)
CREATE POLICY "Anyone can subscribe to newsletter"
ON public.newsletter_subscribers
FOR INSERT
WITH CHECK (confirmed = false);

-- Public can read confirmed count only (no personal data exposed)
CREATE POLICY "No public reads on newsletter"
ON public.newsletter_subscribers
FOR SELECT
USING (false);

-- Anonymous tips table (fully anonymous)
CREATE TABLE public.anonymous_tips (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tip_text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  status TEXT NOT NULL DEFAULT 'pending'
);

ALTER TABLE public.anonymous_tips ENABLE ROW LEVEL SECURITY;

-- Anyone can submit a tip
CREATE POLICY "Anyone can submit anonymous tips"
ON public.anonymous_tips
FOR INSERT
WITH CHECK (status = 'pending');

-- No public reads
CREATE POLICY "No public reads on tips"
ON public.anonymous_tips
FOR SELECT
USING (false);
