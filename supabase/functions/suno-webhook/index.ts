import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    console.log("Suno callback received:", JSON.stringify(body));

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // The callback contains task_id and data array with generated songs
    const taskId = body.data?.task_id || body.task_id;
    const songs = body.data?.data || body.data || [];

    if (taskId && songs && songs.length > 0) {
      for (const song of songs) {
        const audioUrl = song.audio_url || song.audioUrl;
        const duration = song.duration;
        
        if (audioUrl) {
          await supabase
            .from("suno_tasks")
            .update({
              status: "complete",
              audio_url: audioUrl,
              duration: duration || null,
              updated_at: new Date().toISOString(),
            })
            .eq("task_id", taskId)
            .eq("status", "pending");
        }
      }
    }

    return new Response(JSON.stringify({ status: "received" }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Webhook error:", error.message);
    return new Response(JSON.stringify({ status: "received" }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
