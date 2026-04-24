-- Add Teaching metadata to Profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS tutor_description TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS tutor_link TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS exam_expert TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS teaching_modality TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS curriculum TEXT;

-- Seed Teaching Data (Example for the user based on request)
-- Note: In a real app, the user would enter this via the admin panel.
-- We are just ensuring the schema exists.
