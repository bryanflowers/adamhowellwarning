import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { slug: rawSlug, html, targetLang } = await req.json();

    if (!rawSlug || !html || !targetLang) {
      return new Response(
        JSON.stringify({ error: "Missing slug, html, or targetLang" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Normalize slug — strip /th prefix, ensure leading slash
    let slug = rawSlug;
    if (slug.startsWith("/th/")) slug = slug.slice(3);
    else if (slug === "/th") slug = "/";
    if (!slug.startsWith("/")) slug = "/" + slug;

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    // Check cache first
    const { data: cached } = await supabase
      .from("article_translations")
      .select("translated_html")
      .eq("article_slug", slug)
      .eq("language", targetLang)
      .maybeSingle();

    if (cached?.translated_html) {
      return new Response(
        JSON.stringify({ translated_html: cached.translated_html, cached: true }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Translate via Lovable AI
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(
        JSON.stringify({ error: "LOVABLE_API_KEY not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const langName = targetLang === "th" ? "Thai" : targetLang;

    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: `You are a professional translator. Translate the following HTML article content from English to ${langName}. 

CRITICAL RULES:
- Preserve ALL HTML tags, attributes, classes, and structure exactly as-is
- Only translate the visible text content between HTML tags
- Do NOT translate: proper names (people, companies, tokens like "SuperDoge"), URLs, email addresses, wallet addresses, transaction hashes, dates in their original format
- Keep all <img>, <a href>, <figure>, <figcaption> tags intact with original attributes
- Maintain the same paragraph structure and heading hierarchy
- Use formal/professional Thai register appropriate for investigative journalism
- Return ONLY the translated HTML, no explanations or markdown wrapping`,
          },
          {
            role: "user",
            content: html,
          },
        ],
        max_tokens: 32000,
      }),
    });

    if (!aiResponse.ok) {
      const errText = await aiResponse.text();
      console.error("AI gateway error:", aiResponse.status, errText);

      if (aiResponse.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limited, please try again later" }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (aiResponse.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted" }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ error: "Translation failed" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const aiData = await aiResponse.json();
    const translatedHtml = aiData.choices?.[0]?.message?.content || "";

    if (!translatedHtml) {
      return new Response(
        JSON.stringify({ error: "Empty translation returned" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Cache the result
    await supabase.from("article_translations").insert({
      article_slug: slug,
      language: targetLang,
      translated_html: translatedHtml,
    });

    return new Response(
      JSON.stringify({ translated_html: translatedHtml, cached: false }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("translate-article error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
