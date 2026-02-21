CREATE TABLE public.victim_contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.victim_contacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit victim contacts"
  ON public.victim_contacts
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);