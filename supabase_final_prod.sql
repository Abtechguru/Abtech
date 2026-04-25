-- STEP 1: Enable Storage Extension (if not already)
-- CREATE EXTENSION IF NOT EXISTS "storage";

-- STEP 2: Create the 'media' bucket for project assets
-- You can also do this in the Supabase Dashboard: Storage -> New Bucket -> 'media' (Public)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('media', 'media', true)
ON CONFLICT (id) DO NOTHING;

-- STEP 3: Set up Storage Policies for the 'media' bucket
-- Allow public read access to media
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING ( bucket_id = 'media' );

-- Allow authenticated users to upload to the media bucket
DROP POLICY IF EXISTS "Authenticated Upload" ON storage.objects;
CREATE POLICY "Authenticated Upload" ON storage.objects FOR INSERT WITH CHECK ( bucket_id = 'media' AND auth.role() = 'authenticated' );

-- Allow owners to delete their own media
DROP POLICY IF EXISTS "Owner Delete" ON storage.objects;
CREATE POLICY "Owner Delete" ON storage.objects FOR DELETE USING ( bucket_id = 'media' AND auth.uid() = owner );


-- STEP 4: Database Schema Verification & Cleanup
-- Ensure the 'media' table exists and is linked correctly
CREATE TABLE IF NOT EXISTS public.media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  type TEXT CHECK (type IN ('image', 'video', 'logo')),
  url TEXT NOT NULL,
  name TEXT,
  size TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Enable RLS on media table
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;

-- Allow public read access to media records
DROP POLICY IF EXISTS "Media is viewable by everyone" ON public.media;
CREATE POLICY "Media is viewable by everyone" ON public.media
  FOR SELECT USING (true);

-- Allow authenticated users to manage media records
DROP POLICY IF EXISTS "Users can manage their own project media" ON public.media;
CREATE POLICY "Users can manage their own project media" ON public.media
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.projects
      WHERE projects.id = media.project_id
      AND projects.user_id = auth.uid()
    )
  );

-- OPTIONAL: Add an index for faster joins
CREATE INDEX IF NOT EXISTS idx_media_project_id ON public.media(project_id);

-- STEP 5: Teaching Media Table
CREATE TABLE IF NOT EXISTS public.teaching_media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  type TEXT CHECK (type IN ('image', 'video')),
  url TEXT NOT NULL,
  name TEXT,
  size TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.teaching_media ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Teaching media is viewable by everyone" ON public.teaching_media;
CREATE POLICY "Teaching media is viewable by everyone" ON public.teaching_media
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can manage their own teaching media" ON public.teaching_media;
CREATE POLICY "Users can manage their own teaching media" ON public.teaching_media
  FOR ALL USING (profile_id = auth.uid());

-- ADD WHATSAPP TO PROFILES
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='whatsapp') THEN
    ALTER TABLE public.profiles ADD COLUMN whatsapp TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='calendly_link') THEN
    ALTER TABLE public.profiles ADD COLUMN calendly_link TEXT;
  END IF;
END $$;

-- STEP 6: Profiles RLS Policies
-- Ensure RLS is enabled
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Allow public read access to profiles
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON public.profiles;
CREATE POLICY "Profiles are viewable by everyone" ON public.profiles
  FOR SELECT USING (true);

-- Allow authenticated users to update their own profile
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
