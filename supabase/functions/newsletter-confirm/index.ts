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

      const confirmUrl = `https://web-rescu.lovable.app/confirm-newsletter?token=${subscriber.confirmation_token}`;

      const emailRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendKey}`,
        },
        body: JSON.stringify({
          from: "Adam Howell Warning <noreply@web-rescu.lovable.app>",
          to: [email],
          subject: "Confirm Your Newsletter Subscription",
          html: `
            <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto; padding: 24px;">
              <h2 style="color: #1a1a1a;">Confirm Your Subscription</h2>
              <p style="color: #555;">Click the button below to confirm your newsletter subscription and receive investigative updates.</p>
              <a href="${confirmUrl}" style="display: inline-block; background: #e8550f; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold; margin: 16px 0;">Confirm Subscription</a>
              <p style="color: #888; font-size: 12px; margin-top: 24px;">If you didn't subscribe, you can safely ignore this email.</p>
            </div>
          `,
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
