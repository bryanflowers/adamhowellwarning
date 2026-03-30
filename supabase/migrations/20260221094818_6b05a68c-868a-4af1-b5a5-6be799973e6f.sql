
CREATE TABLE public.suno_tasks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  task_id TEXT NOT NULL,
  track_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  genre TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  audio_url TEXT,
  duration NUMERIC,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.suno_tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read on suno_tasks" ON public.suno_tasks FOR SELECT USING (true);
