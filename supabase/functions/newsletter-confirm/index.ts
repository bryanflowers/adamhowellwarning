import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { email, action, token } = await req.json();

    if (action === "send") {
      // Get the subscriber's confirmation token
      const { data: subscriber, error: fetchError } = await supabase
        .from("newsletter_subscribers")
        .select("confirmation_token, confirmed")
        .eq("email", email)
        .single();

      if (fetchError || !subscriber) {
        return new Response(JSON.stringify({ error: "Subscriber not found" }), {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      if (subscriber.confirmed) {
        return new Response(JSON.stringify({ message: "Already confirmed" }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Send confirmation email via Resend
      const resendKey = Deno.env.get("RESEND_API_KEY");
      if (!resendKey) {
        console.error("RESEND_API_KEY not configured");
        return new Response(JSON.stringify({ error: "Email service not configured" }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const confirmUrl = `https://adamhowellwarning.com/confirm-newsletter?token=${subscriber.confirmation_token}`;

      const emailRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendKey}`,
        },
        body: JSON.stringify({
          from: "Adam Howell Warning <noreply@adamhowellwarning.com>",
          to: [email],
          subject: "Confirm Your Newsletter Subscription – Adam Howell Warning",
          html: `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:'Segoe UI',Roboto,Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;background:#111;border:1px solid #222;border-radius:8px;overflow:hidden;">
    <div style="background:linear-gradient(135deg,#1a1a2e 0%,#16213e 50%,#0f3460 100%);padding:32px 24px;text-align:center;">
      <h1 style="margin:0;color:#e8550f;font-size:24px;font-weight:800;letter-spacing:-0.5px;">ADAM HOWELL WARNING</h1>
      <p style="margin:8px 0 0;color:#94a3b8;font-size:13px;">Investigative Journalism &bull; Crypto Fraud Exposure</p>
    </div>
    <div style="padding:32px 24px;">
      <h2 style="color:#f1f5f9;margin:0 0 16px;font-size:20px;">Confirm Your Subscription</h2>
      <p style="color:#94a3b8;line-height:1.6;margin:0 0 24px;">Thank you for subscribing. Click the button below to confirm your email and start receiving investigative updates about cryptocurrency fraud, scam exposure, and accountability reporting.</p>
      <div style="text-align:center;margin:32px 0;">
        <a href="${confirmUrl}" style="display:inline-block;background:#e8550f;color:#fff;padding:14px 32px;border-radius:6px;text-decoration:none;font-weight:700;font-size:16px;letter-spacing:0.3px;">Confirm Subscription</a>
      </div>
      <p style="color:#64748b;font-size:13px;line-height:1.5;margin:24px 0 0;">If you didn't request this, simply ignore this email. Your address will not be added to our list.</p>
    </div>
    <div style="background:#0a0a0a;padding:20px 24px;border-top:1px solid #222;text-align:center;">
      <p style="color:#475569;font-size:11px;margin:0;">adamhowellwarning.com &bull; Exposing crypto fraud since 2024</p>
    </div>
  </div>
</body>
</html>`,
        }),
      });

      if (!emailRes.ok) {
        const errText = await emailRes.text();
        console.error("Resend error:", errText);
        return new Response(JSON.stringify({ error: "Failed to send confirmation email" }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      return new Response(JSON.stringify({ message: "Confirmation email sent" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "confirm") {
      if (!token) {
        return new Response(JSON.stringify({ error: "Token required" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const { data, error } = await supabase
        .from("newsletter_subscribers")
        .update({ confirmed: true, confirmed_at: new Date().toISOString() })
        .eq("confirmation_token", token)
        .eq("confirmed", false)
        .select("email")
        .single();

      if (error || !data) {
        return new Response(JSON.stringify({ error: "Invalid or expired token" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      return new Response(JSON.stringify({ message: "Subscription confirmed", email: data.email }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "Invalid action" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Newsletter confirm error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
