-- Add Analytics and metadata to Profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS view_count INT DEFAULT 0;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS meta_title TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS meta_description TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS years_experience TEXT DEFAULT '3+';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS projects_delivered TEXT DEFAULT '50+';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS active_users TEXT DEFAULT '10K+';

-- Add Analytics to Projects
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS view_count INT DEFAULT 0;

-- Create Skills Table
CREATE TABLE IF NOT EXISTS public.skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  category TEXT NOT NULL, -- e.g., 'Frontend', 'Backend'
  name TEXT NOT NULL,
  icon TEXT, -- Lucide icon name
  tools TEXT[],
  display_order INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Create Experience Table
CREATE TABLE IF NOT EXISTS public.experience (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  company TEXT NOT NULL,
  role TEXT NOT NULL,
  period TEXT NOT NULL, -- e.g., '2021 - Present'
  description TEXT,
  logo TEXT,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Create Testimonials Table
CREATE TABLE IF NOT EXISTS public.testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  client_name TEXT NOT NULL,
  client_role TEXT,
  company TEXT,
  feedback TEXT NOT NULL,
  client_image TEXT,
  rating INT DEFAULT 5,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Create Messages Table (Contact Form)
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  to_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Enable RLS
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public can view skills" ON public.skills FOR SELECT USING (true);
CREATE POLICY "Users can manage own skills" ON public.skills FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Public can view experience" ON public.experience FOR SELECT USING (true);
CREATE POLICY "Users can manage own experience" ON public.experience FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Public can view testimonials" ON public.testimonials FOR SELECT USING (true);
CREATE POLICY "Users can manage own testimonials" ON public.testimonials FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Anyone can send a message" ON public.messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can view own messages" ON public.messages FOR SELECT USING (auth.uid() = to_user_id);
CREATE POLICY "Users can delete own messages" ON public.messages FOR DELETE USING (auth.uid() = to_user_id);

-- Function to increment project views
CREATE OR REPLACE FUNCTION public.increment_project_view(project_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE public.projects
  SET view_count = view_count + 1
  WHERE id = project_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to increment profile views
CREATE OR REPLACE FUNCTION public.increment_profile_view(profile_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE public.profiles
  SET view_count = view_count + 1
  WHERE id = profile_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
