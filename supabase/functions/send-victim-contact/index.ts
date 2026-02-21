import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    let body: Record<string, unknown>;
    try {
      body = await req.json();
    } catch {
      return new Response(JSON.stringify({ error: "Invalid request body" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const name = typeof body.name === "string" ? body.name.trim().slice(0, 100) : "";
    const email = typeof body.email === "string" ? body.email.trim().slice(0, 255) : "";
    const message = typeof body.message === "string" ? body.message.trim().slice(0, 5000) : "";

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: "All fields are required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!EMAIL_REGEX.test(email)) {
      return new Response(JSON.stringify({ error: "Invalid email address" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Store in database (service role bypasses RLS for insert)
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const dbPromise = supabase
      .from("victim_contacts")
      .insert({ name, email, message })
      .then(({ error: dbErr }) => {
        if (dbErr) console.error("DB insert error:", dbErr.message);
        return !dbErr;
      });

    // Send email via Resend
    const resendKey = Deno.env.get("RESEND_API_KEY");
    let emailSent = false;

    if (resendKey) {
      const escapedName = escapeHtml(name);
      const escapedEmail = escapeHtml(email);
      const escapedMessage = escapeHtml(message).replace(/\n/g, "<br>");

      const htmlBody = `
        <h2>New Victim Contact Submission</h2>
        <p><strong>Name:</strong> ${escapedName}</p>
        <p><strong>Email:</strong> ${escapedEmail}</p>
        <hr>
        <p><strong>Message:</strong></p>
        <p>${escapedMessage}</p>
        <hr>
        <p style="color:#888;font-size:12px;">Submitted at ${new Date().toISOString()}</p>
      `;

      try {
        const resendRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Victim Contact <onboarding@resend.dev>",
            to: ["b@bazookaemail.com"],
            reply_to: email,
            subject: `Victim Report from ${name}`,
            html: htmlBody,
          }),
        });

        if (resendRes.ok) {
          await resendRes.json();
          emailSent = true;
        } else {
          const errText = await resendRes.text();
          console.error("Resend API error:", resendRes.status, errText);
        }
      } catch (emailErr) {
        console.error("Email send error:", emailErr);
      }
    } else {
      console.error("RESEND_API_KEY not configured");
    }

    const dbSaved = await dbPromise;

    if (!dbSaved && !emailSent) {
      return new Response(JSON.stringify({ error: "Failed to process submission" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Unexpected error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
