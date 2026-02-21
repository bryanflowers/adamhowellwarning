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
    const apiKey = Deno.env.get("SUNO_API_KEY");
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "SUNO_API_KEY not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { action, prompt, genre, title, trackNumber, taskId } = await req.json();

    // Action: "check" — get task status from DB
    if (action === "check") {
      const { data, error } = await supabase
        .from("suno_tasks")
        .select("*")
        .order("track_number");
      
      return new Response(JSON.stringify({ tasks: data, error }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Action: "poll" — check a specific task via API
    if (action === "poll" && taskId) {
      const response = await fetch(`https://apibox.erweima.ai/api/v1/generate/record-info?taskId=${taskId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${apiKey}` },
      });
      const data = await response.json();
      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Action: "generate" (default)
    if (!prompt) {
      return new Response(JSON.stringify({ error: "prompt is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Construct callback URL
    const callbackUrl = `${supabaseUrl}/functions/v1/suno-webhook`;

    const response = await fetch("https://apibox.erweima.ai/api/v1/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        prompt,
        style: genre || "pop",
        title: title || "Untitled",
        customMode: true,
        instrumental: false,
        model: "V4",
        callBackUrl: callbackUrl,
      }),
    });

    const data = await response.json();

    // Store task in DB
    if (data.code === 200 && data.data) {
      const sunoTaskId = data.data.taskId || data.data;
      await supabase.from("suno_tasks").insert({
        task_id: String(sunoTaskId),
        track_number: trackNumber || 0,
        title: title || "Untitled",
        genre: genre || "pop",
        status: "pending",
      });
    }

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
