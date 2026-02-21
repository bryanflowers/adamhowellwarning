

# Store Victim Contact Submissions with Admin Moderation and Email

## Overview

Currently, victim contact submissions only send an email via Resend. This plan adds database storage so every submission is persisted, reviewable, and manageable from the existing admin panel -- while still sending the email notification.

---

## What Changes

### 1. New Database Table: `victim_contacts`

A migration will create a table to store all submissions:

```text
victim_contacts
  id           uuid (PK, auto-generated)
  name         text (not null)
  email        text (not null)
  message      text (not null)
  status       text (default 'pending') -- pending / reviewed / archived
  created_at   timestamptz (default now())
```

RLS policies:
- **INSERT**: Allow anyone (public submissions, no auth required)
- **SELECT / UPDATE / DELETE**: No public access (all admin operations go through the edge function with service role)

### 2. Update Edge Function: `send-victim-contact`

After validating input and before sending the Resend email, the function will **insert the submission into the `victim_contacts` table** using the service role client. The email is still sent to `b@bazookaemail.com` as before. If the DB insert fails, the function will still attempt the email (and vice versa) so neither blocks the other.

### 3. Update Edge Function: `moderate-comments`

Expand this function to also handle victim contact moderation actions. It will accept a `resource` field (`"comments"` or `"victim_contacts"`) to determine which table to operate on. The same auth pattern (JWT verification) protects these actions. Supported actions for victim contacts:
- **list**: Fetch all victim contacts ordered by date
- **update**: Change status (pending / reviewed / archived)
- **delete**: Remove a submission

### 4. Update Admin Page: `AdminComments.tsx`

Add a **tab switcher** (Comments | Victim Reports) at the top of the admin panel. When "Victim Reports" is selected, the page shows submissions from `victim_contacts` with:
- Filter stats: All / Pending / Reviewed / Archived
- Each card shows name, email (clickable mailto link), date, status badge, and message
- Action buttons: Mark Reviewed, Archive, Delete
- Same login flow already in place

---

## Technical Details

### Database Migration SQL

```sql
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
```

No public SELECT policy -- admin reads go through the edge function with service role key.

### Edge Function Changes

**`send-victim-contact/index.ts`**: Add a Supabase service role client insert before the Resend call. Both operations run independently so a failure in one does not block the other.

**`moderate-comments/index.ts`**: Add a `resource` parameter. When `resource === "victim_contacts"`, operate on that table instead of `comments`. Default to `"comments"` for backward compatibility.

### Admin UI Changes

**`AdminComments.tsx`**: Add Tabs component (from existing shadcn/ui) to toggle between Comments and Victim Reports. The victim reports tab reuses the same card layout pattern but displays name, email, message, and uses the status values `pending / reviewed / archived`.

### Files Modified

| File | Change |
|------|--------|
| `supabase/migrations/` | New migration for `victim_contacts` table |
| `supabase/functions/send-victim-contact/index.ts` | Add DB insert alongside email |
| `supabase/functions/moderate-comments/index.ts` | Add `resource` parameter for victim contacts |
| `src/pages/AdminComments.tsx` | Add tabbed view for victim reports |
| `src/integrations/supabase/types.ts` | Auto-updated after migration |

