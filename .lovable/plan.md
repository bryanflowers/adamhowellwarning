
# Connect Resend.com for Victim Contact Emails

## Overview
Replace the current localStorage-based submission in the victim contact form with a backend function that sends an email via Resend.com to **b@bazookaemail.com** every time a victim submits the form.

## What You'll Need
- A **Resend API key** from [resend.com/api-keys](https://resend.com/api-keys) (free tier supports 100 emails/day)
- A verified sender domain or use Resend's default `onboarding@resend.dev` for testing

## Steps

### 1. Add the Resend API Key as a secret
- You'll be prompted to paste your Resend API key (starts with `re_...`). This is stored securely and only accessible by backend functions.

### 2. Create the `send-victim-contact` backend function
A new edge function that:
- Accepts `name`, `email`, and `message` from the form (no auth required -- public submissions)
- Validates all fields server-side (length limits, email format via regex)
- Calls the Resend API (`POST https://api.resend.com/emails`) to send a formatted email to `b@bazookaemail.com`
- Returns success/error JSON with proper CORS headers

### 3. Update the victim contact form
Modify `VictimContactSlideIn.tsx` to:
- Call the new backend function via `supabase.functions.invoke("send-victim-contact", { body: { name, email, message } })` instead of writing to localStorage
- Show an error toast if the submission fails
- Keep the existing success state on success

### 4. Register the function in config
Add `[functions.send-victim-contact]` with `verify_jwt = false` to `supabase/config.toml`.

---

## Technical Details

**Edge function (`supabase/functions/send-victim-contact/index.ts`)**:
- CORS headers matching other functions in the project
- Server-side validation: name (max 100), email (max 255, regex check), message (max 5000)
- Sends via Resend REST API with `RESEND_API_KEY` secret
- Email "from" uses `onboarding@resend.dev` (Resend default -- can be changed once a domain is verified)
- Email "reply-to" is set to the victim's email for easy follow-up
- HTML-formatted email body with the submission details

**Frontend changes**:
- Remove localStorage logic
- Add `supabase.functions.invoke` call with error handling
- Add `sonner` toast for error feedback

**No database table needed** -- emails go straight to your inbox. If you later want to store submissions for record-keeping, a table can be added separately.
