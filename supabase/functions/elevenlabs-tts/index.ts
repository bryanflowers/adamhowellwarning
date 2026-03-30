import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

/** Split text into chunks of ~maxLen chars at sentence boundaries */
function splitIntoChunks(text: string, maxLen = 4500): string[] {
  if (text.length <= maxLen) return [text];

  const chunks: string[] = [];
  let remaining = text;

  while (remaining.length > 0) {
    if (remaining.length <= maxLen) {
      chunks.push(remaining);
      break;
    }

    // Find last sentence boundary within maxLen
    const window = remaining.slice(0, maxLen);
    let splitIdx = -1;
    for (const sep of [". ", "! ", "? "]) {
      const idx = window.lastIndexOf(sep);
      if (idx > splitIdx) splitIdx = idx + sep.length;
    }

    // Fallback to last space
    if (splitIdx <= 0) {
      splitIdx = window.lastIndexOf(" ");
    }
    // Last resort: hard cut
    if (splitIdx <= 0) {
      splitIdx = maxLen;
    }

    chunks.push(remaining.slice(0, splitIdx).trimEnd());
    remaining = remaining.slice(splitIdx).trimStart();
  }

  return chunks;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { articleSlug, articleText, language } = await req.json();

    if (!articleSlug || !articleText) {
      return new Response(
        JSON.stringify({ error: "articleSlug and articleText are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const lang = language || "en";
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Check cache first
    const { data: cached } = await supabase
      .from("article_audio")
      .select("audio_url")
      .eq("article_slug", articleSlug)
      .maybeSingle();

    if (cached?.audio_url) {
      return new Response(
        JSON.stringify({ audioUrl: cached.audio_url, cached: true }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const ELEVENLABS_API_KEY = Deno.env.get("ELEVENLABS_API_KEY");
    if (!ELEVENLABS_API_KEY) {
      throw new Error("ELEVENLABS_API_KEY is not configured");
    }

    const isThai = lang === "th";
    const voiceId = isThai ? "Xb7hH8MSUJpSbSDYk0k2" : "JBFqnCBsd6RMkjVDRZzb";
    const modelId = isThai ? "eleven_v3" : "eleven_turbo_v2_5";

    // Thai: single chunk capped at 4900 chars
    // English: use request stitching for long text
    const fullText = isThai ? articleText.slice(0, 4900) : articleText;
    const chunks = isThai ? [fullText] : splitIntoChunks(fullText, 4500);

    console.log(`TTS request: slug=${articleSlug}, lang=${lang}, text length=${articleText.length}, chunks=${chunks.length}`);

    // Generate audio for each chunk (sequentially for ordering, with stitching context)
    const audioBuffers: ArrayBuffer[] = [];

    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];
      const body: Record<string, unknown> = {
        text: chunk,
        model_id: modelId,
      };

      // Request stitching context for English multi-chunk
      if (!isThai && chunks.length > 1) {
        if (i > 0) {
          body.previous_text = chunks[i - 1].slice(-200);
        }
        if (i < chunks.length - 1) {
          body.next_text = chunks[i + 1].slice(0, 200);
        }
      }

      // Voice settings for English
      if (!isThai) {
        body.voice_settings = {
          stability: 0.6,
          similarity_boost: 0.75,
          style: 0.3,
          use_speaker_boost: true,
        };
      }

      console.log(`Generating chunk ${i + 1}/${chunks.length}, length=${chunk.length}`);

      const ttsResponse = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=mp3_44100_128`,
        {
          method: "POST",
          headers: {
            "xi-api-key": ELEVENLABS_API_KEY,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      if (!ttsResponse.ok) {
        const errText = await ttsResponse.text();
        console.error(`ElevenLabs error on chunk ${i + 1}:`, ttsResponse.status, errText);
        throw new Error(`ElevenLabs API error on chunk ${i + 1}: ${ttsResponse.status}`);
      }

      audioBuffers.push(await ttsResponse.arrayBuffer());
    }

    // Concatenate all MP3 buffers
    const totalLength = audioBuffers.reduce((sum, buf) => sum + buf.byteLength, 0);
    const combined = new Uint8Array(totalLength);
    let offset = 0;
    for (const buf of audioBuffers) {
      combined.set(new Uint8Array(buf), offset);
      offset += buf.byteLength;
    }

    console.log(`Combined audio: ${audioBuffers.length} chunks, ${totalLength} bytes`);

    // Upload to storage
    const fileName = `${articleSlug.replace(/\//g, "_").replace(/^_/, "")}.mp3`;
    const { error: uploadError } = await supabase.storage
      .from("article-audio")
      .upload(fileName, combined.buffer, {
        contentType: "audio/mpeg",
        upsert: true,
      });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      throw new Error("Failed to upload audio file");
    }

    const { data: publicUrl } = supabase.storage
      .from("article-audio")
      .getPublicUrl(fileName);

    const audioUrl = publicUrl.publicUrl;

    // Cache in DB
    await supabase.from("article_audio").upsert(
      { article_slug: articleSlug, audio_url: audioUrl },
      { onConflict: "article_slug" }
    );

    return new Response(
      JSON.stringify({ audioUrl, cached: false }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("elevenlabs-tts error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
