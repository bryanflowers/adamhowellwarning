
-- Fix Bug 2: Restrict comments INSERT to only allow status='pending'
DROP POLICY IF EXISTS "Anyone can submit comments" ON public.comments;
CREATE POLICY "Anyone can submit comments"
ON public.comments
FOR INSERT
WITH CHECK (status = 'pending');

-- Fix Bug 3: Restrict victim_contacts INSERT to only allow status='pending'
DROP POLICY IF EXISTS "Anyone can submit victim contacts" ON public.victim_contacts;
CREATE POLICY "Anyone can submit victim contacts"
ON public.victim_contacts
FOR INSERT
WITH CHECK (status = 'pending');
