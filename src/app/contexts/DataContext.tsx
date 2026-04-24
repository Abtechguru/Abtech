import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../utils/supabase";
import { Session, User } from "@supabase/supabase-js";

interface MediaFile {
  id?: string;
  type: "image" | "video" | "logo";
  url: string;
  name: string;
  size?: string;
}

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  features: string[];
  tech: string[];
  liveUrl?: string;
  caseStudyUrl?: string;
  media?: MediaFile[];
  logo?: string;
  viewCount: number;
}

interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  features: string[];
}

interface Skill {
  id: string;
  category: string;
  name: string;
  tools: string[];
}

interface Testimonial {
  id: string;
  clientName: string;
  clientRole: string;
  company: string;
  feedback: string;
  clientImage: string;
}

interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
}

interface ProfileData {
  fullName: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  bio: string;
  profilePhoto?: string;
  github: string;
  linkedin: string;
  behance: string;
  website: string;
  viewCount: number;
  yearsExperience: string;
  projectsDelivered: string;
  activeUsers: string;
}

interface DataContextType {
  projects: Project[];
  services: Service[];
  skills: Skill[];
  testimonials: Testimonial[];
  experience: Experience[];
  profileData: ProfileData;
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  addProject: (project: Omit<Project, 'id' | 'viewCount'>) => Promise<{ error: any }>;
  updateProject: (id: string, project: Partial<Project>) => Promise<{ error: any }>;
  deleteProject: (id: string) => Promise<{ error: any }>;
  incrementProjectView: (id: string) => Promise<void>;
  incrementProfileView: () => Promise<void>;
  setProfileData: (data: ProfileData) => Promise<{ error: any }>;
  sendMessage: (msg: { name: string; email: string; subject: string; message: string }) => Promise<{ error: any }>;
  login: (email: string, password: string) => Promise<{ error: any }>;
  logout: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const DEFAULT_PROFILE: ProfileData = {
  fullName: "Lateef Abiodun",
  title: "AI-Powered Fullstack Developer",
  location: "Lagos, Nigeria",
  email: "lateef@example.com",
  phone: "+234 XXX XXX XXXX",
  bio: "Fullstack Engineer & Data Specialist crafting production-grade AI systems, fintech platforms, and scalable web applications.",
  github: "https://github.com/lateefabiodun",
  linkedin: "https://linkedin.com/in/lateefabiodun",
  behance: "https://behance.net/lateefabiodun",
  website: "https://lateefabiodun.dev",
  viewCount: 0,
  yearsExperience: "3+",
  projectsDelivered: "50+",
  activeUsers: "10K+"
};

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjectsState] = useState<Project[]>([]);
  const [services, setServicesState] = useState<Service[]>([]);
  const [skills, setSkillsState] = useState<Skill[]>([]);
  const [testimonials, setTestimonialsState] = useState<Testimonial[]>([]);
  const [experience, setExperienceState] = useState<Experience[]>([]);
  const [profileData, setProfileDataState] = useState<ProfileData>(DEFAULT_PROFILE);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        fetchUserData(session.user.id);
      } else {
        fetchAllData();
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        fetchUserData(session.user.id);
      } else {
        fetchAllData();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchAllData = async () => {
    setIsLoading(true);
    try {
      const [
        { data: profile },
        { data: projectsData },
        { data: servicesData },
        { data: skillsData },
        { data: testData },
        { data: expData }
      ] = await Promise.all([
        supabase.from('profiles').select('*').limit(1).single(),
        supabase.from('projects').select('*, media (*)').order('created_at', { ascending: false }),
        supabase.from('services').select('*').order('display_order', { ascending: true }),
        supabase.from('skills').select('*').order('display_order', { ascending: true }),
        supabase.from('testimonials').select('*').order('created_at', { ascending: false }),
        supabase.from('experience').select('*').order('display_order', { ascending: true })
      ]);

      if (profile) {
        setProfileDataState({
          fullName: profile.full_name || "",
          title: profile.title || "",
          location: profile.location || "",
          email: profile.email || "",
          phone: profile.phone || "",
          bio: profile.bio || "",
          profilePhoto: profile.profile_photo || "",
          github: profile.github || "",
          linkedin: profile.linkedin || "",
          behance: profile.behance || "",
          website: profile.website || "",
          viewCount: profile.view_count || 0,
          yearsExperience: profile.years_experience || "3+",
          projectsDelivered: profile.projects_delivered || "50+",
          activeUsers: profile.active_users || "10K+"
        });
      }

      if (projectsData) {
        setProjectsState(projectsData.map((p: any) => ({
          id: p.id,
          title: p.title,
          category: p.category,
          description: p.description,
          features: p.features || [],
          tech: p.tech || [],
          liveUrl: p.live_url,
          caseStudyUrl: p.case_study_url,
          logo: p.logo,
          viewCount: p.view_count || 0,
          media: p.media?.map((m: any) => ({
            id: m.id, type: m.type, url: m.url, name: m.name, size: m.size
          })) || []
        })));
      }

      if (servicesData) {
        setServicesState(servicesData.map((s: any) => ({
          id: s.id, title: s.title, description: s.description, price: s.price, features: s.features || []
        })));
      }

      if (skillsData) {
        setSkillsState(skillsData.map((s: any) => ({
          id: s.id, category: s.category, name: s.name, tools: s.tools || []
        })));
      }

      if (testData) {
        setTestimonialsState(testData.map((t: any) => ({
          id: t.id, clientName: t.client_name, clientRole: t.client_role, company: t.company, feedback: t.feedback, clientImage: t.client_image
        })));
      }

      if (expData) {
        setExperienceState(expData.map((e: any) => ({
          id: e.id, company: e.company, role: e.role, period: e.period, description: e.description
        })));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserData = async (userId: string) => {
    setIsLoading(true);
    try {
        const [
          { data: profile },
          { data: projectsData },
          { data: servicesData },
          { data: skillsData },
          { data: testData },
          { data: expData }
        ] = await Promise.all([
          supabase.from('profiles').select('*').eq('id', userId).single(),
          supabase.from('projects').select('*, media (*)').eq('user_id', userId).order('created_at', { ascending: false }),
          supabase.from('services').select('*').eq('user_id', userId).order('display_order', { ascending: true }),
          supabase.from('skills').select('*').eq('user_id', userId).order('display_order', { ascending: true }),
          supabase.from('testimonials').select('*').eq('user_id', userId).order('created_at', { ascending: false }),
          supabase.from('experience').select('*').eq('user_id', userId).order('display_order', { ascending: true })
        ]);

        if (profile) {
          setProfileDataState({
            fullName: profile.full_name || "",
            title: profile.title || "",
            location: profile.location || "",
            email: profile.email || "",
            phone: profile.phone || "",
            bio: profile.bio || "",
            profilePhoto: profile.profile_photo || "",
            github: profile.github || "",
            linkedin: profile.linkedin || "",
            behance: profile.behance || "",
            website: profile.website || "",
            viewCount: profile.view_count || 0,
            yearsExperience: profile.years_experience || "3+",
            projectsDelivered: profile.projects_delivered || "50+",
            activeUsers: profile.active_users || "10K+"
          });
        }
  
        if (projectsData) {
          setProjectsState(projectsData.map((p: any) => ({
            id: p.id,
            title: p.title,
            category: p.category,
            description: p.description,
            features: p.features || [],
            tech: p.tech || [],
            liveUrl: p.live_url,
            caseStudyUrl: p.case_study_url,
            logo: p.logo,
            viewCount: p.view_count || 0,
            media: p.media?.map((m: any) => ({
              id: m.id, type: m.type, url: m.url, name: m.name, size: m.size
            })) || []
          })));
        }
  
        if (servicesData) {
          setServicesState(servicesData.map((s: any) => ({
            id: s.id, title: s.title, description: s.description, price: s.price, features: s.features || []
          })));
        }
  
        if (skillsData) {
          setSkillsState(skillsData.map((s: any) => ({
            id: s.id, category: s.category, name: s.name, tools: s.tools || []
          })));
        }
  
        if (testData) {
          setTestimonialsState(testData.map((t: any) => ({
            id: t.id, clientName: t.client_name, clientRole: t.client_role, company: t.company, feedback: t.feedback, clientImage: t.client_image
          })));
        }
  
        if (expData) {
          setExperienceState(expData.map((e: any) => ({
            id: e.id, company: e.company, role: e.role, period: e.period, description: e.description
          })));
        }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addProject = async (project: Omit<Project, 'id' | 'viewCount'>) => {
    if (!session?.user) return { error: "Not authenticated" };
    const { data: projectData, error: projectError } = await supabase
      .from('projects')
      .insert({
        user_id: session.user.id,
        title: project.title,
        category: project.category,
        description: project.description,
        features: project.features,
        tech: project.tech,
        live_url: project.liveUrl,
        case_study_url: project.caseStudyUrl,
        logo: project.logo
      })
      .select()
      .single();

    if (projectError) return { error: projectError };

    if (project.media && project.media.length > 0) {
      const mediaToInsert = project.media.map(m => ({
        project_id: projectData.id,
        type: m.type,
        url: m.url,
        name: m.name,
        size: m.size
      }));
      await supabase.from('media').insert(mediaToInsert);
    }

    // Faster partial refetch: only update projects list
    const { data: newProjects } = await supabase
      .from('projects')
      .select('*, media (*)')
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false });
    
    if (newProjects) {
        setProjectsState(newProjects.map((p: any) => ({
            id: p.id,
            title: p.title,
            category: p.category,
            description: p.description,
            features: p.features || [],
            tech: p.tech || [],
            liveUrl: p.live_url,
            caseStudyUrl: p.case_study_url,
            logo: p.logo,
            viewCount: p.view_count || 0,
            media: p.media?.map((m: any) => ({
              id: m.id, type: m.type, url: m.url, name: m.name, size: m.size
            })) || []
        })));
    }

    return { error: null };
  };

  const updateProject = async (id: string, project: Partial<Project>) => {
    if (!session?.user) return { error: "Not authenticated" };
    const { error: projectError } = await supabase
      .from('projects')
      .update({
        title: project.title,
        category: project.category,
        description: project.description,
        features: project.features,
        tech: project.tech,
        live_url: project.liveUrl,
        case_study_url: project.caseStudyUrl,
        logo: project.logo,
        updated_at: new Date().toISOString()
      })
      .eq('id', id);

    if (projectError) return { error: projectError };

    if (project.media) {
      await supabase.from('media').delete().eq('project_id', id);
      if (project.media.length > 0) {
        const mediaToInsert = project.media.map(m => ({
          project_id: id,
          type: m.type,
          url: m.url,
          name: m.name,
          size: m.size
        }));
        await supabase.from('media').insert(mediaToInsert);
      }
    }

    // Faster partial refetch: only update projects list
    const { data: newProjects } = await supabase
      .from('projects')
      .select('*, media (*)')
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false });
    
    if (newProjects) {
        setProjectsState(newProjects.map((p: any) => ({
            id: p.id,
            title: p.title,
            category: p.category,
            description: p.description,
            features: p.features || [],
            tech: p.tech || [],
            liveUrl: p.live_url,
            caseStudyUrl: p.case_study_url,
            logo: p.logo,
            viewCount: p.view_count || 0,
            media: p.media?.map((m: any) => ({
              id: m.id, type: m.type, url: m.url, name: m.name, size: m.size
            })) || []
        })));
    }

    return { error: null };
  };

  const deleteProject = async (id: string) => {
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (!error) setProjectsState(projects.filter(p => p.id !== id));
    return { error };
  };

  const incrementProjectView = async (id: string) => {
    await supabase.rpc('increment_project_view', { project_id: id });
  };

  const incrementProfileView = async () => {
    const { data: profile } = await supabase.from('profiles').select('id').limit(1).single();
    if (profile) {
      await supabase.rpc('increment_profile_view', { profile_id: profile.id });
    }
  };

  const updateProfileData = async (data: ProfileData) => {
    if (!session?.user) return { error: "Not authenticated" };
    const { error } = await supabase
      .from('profiles')
      .update({
        full_name: data.fullName,
        title: data.title,
        location: data.location,
        email: data.email,
        phone: data.phone,
        bio: data.bio,
        profile_photo: data.profilePhoto,
        github: data.github,
        linkedin: data.linkedin,
        behance: data.behance,
        website: data.website,
        years_experience: data.yearsExperience,
        projects_delivered: data.projectsDelivered,
        active_users: data.activeUsers,
        updated_at: new Date().toISOString()
      })
      .eq('id', session.user.id);

    if (!error) setProfileDataState(data);
    return { error };
  };

  const sendMessage = async (msg: { name: string; email: string; subject: string; message: string }) => {
    const { data: profile } = await supabase.from('profiles').select('id').limit(1).single();
    if (!profile) return { error: "Recipient not found" };
    return await supabase.from('messages').insert({
      to_user_id: profile.id,
      name: msg.name,
      email: msg.email,
      subject: msg.subject,
      message: msg.message
    });
  };

  const login = async (email: string, password: string) => {
    return await supabase.auth.signInWithPassword({ email, password });
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  return (
    <DataContext.Provider value={{
      projects, services, skills, testimonials, experience, profileData,
      isAuthenticated: !!session, isLoading, user: session?.user ?? null,
      addProject, updateProject, deleteProject, incrementProjectView, incrementProfileView,
      setProfileData: updateProfileData, sendMessage, login, logout
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) throw new Error("useData must be used within DataProvider");
  return context;
}
