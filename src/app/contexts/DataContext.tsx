import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../utils/supabase";
import { Session, User } from "@supabase/supabase-js";

interface MediaFile {
  id: string;
  type: "image" | "video" | "logo";
  url: string;
  name: string;
  size: string;
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
}

interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  features: string[];
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
}

interface DataContextType {
  projects: Project[];
  services: Service[];
  profileData: ProfileData;
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  addProject: (project: Omit<Project, 'id'>) => Promise<{ error: any }>;
  updateProject: (id: string, project: Partial<Project>) => Promise<{ error: any }>;
  deleteProject: (id: string) => Promise<{ error: any }>;
  addService: (service: Omit<Service, 'id'>) => Promise<{ error: any }>;
  updateService: (id: string, service: Partial<Service>) => Promise<{ error: any }>;
  deleteService: (id: string) => Promise<{ error: any }>;
  setProfileData: (data: ProfileData) => Promise<{ error: any }>;
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
  website: "https://lateefabiodun.dev"
};

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjectsState] = useState<Project[]>([]);
  const [services, setServicesState] = useState<Service[]>([]);
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
        setProjectsState([]);
        setServicesState([]);
        setProfileDataState(DEFAULT_PROFILE);
        fetchAllData();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchAllData = async () => {
    setIsLoading(true);
    try {
      const { data: profile } = await supabase.from('profiles').select('*').limit(1).single();
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
        });
      }

      const { data: projectsData } = await supabase.from('projects').select('*, media (*)').order('created_at', { ascending: false });
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
          media: p.media?.map((m: any) => ({
            id: m.id, type: m.type, url: m.url, name: m.name, size: m.size
          })) || []
        })));
      }

      const { data: servicesData } = await supabase.from('services').select('*').order('display_order', { ascending: true });
      if (servicesData) {
        setServicesState(servicesData.map((s: any) => ({
          id: s.id,
          title: s.title,
          description: s.description,
          price: s.price,
          features: s.features || []
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
      const { data: profile } = await supabase.from('profiles').select('*').eq('id', userId).single();
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
        });
      }

      const { data: projectsData } = await supabase.from('projects').select('*, media (*)').eq('user_id', userId).order('created_at', { ascending: false });
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
          media: p.media?.map((m: any) => ({
            id: m.id, type: m.type, url: m.url, name: m.name, size: m.size
          })) || []
        })));
      }

      const { data: servicesData } = await supabase.from('services').select('*').eq('user_id', userId).order('display_order', { ascending: true });
      if (servicesData) {
        setServicesState(servicesData.map((s: any) => ({
          id: s.id,
          title: s.title,
          description: s.description,
          price: s.price,
          features: s.features || []
        })));
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addProject = async (project: Omit<Project, 'id'>) => {
    const { data, error } = await supabase.from('projects').insert({ user_id: session?.user.id, ...project, live_url: project.liveUrl, case_study_url: project.caseStudyUrl }).select().single();
    if (!error && data) {
      setProjectsState([{ ...project, id: data.id, media: [] }, ...projects]);
    }
    return { error };
  };

  const updateProject = async (id: string, project: Partial<Project>) => {
    const { error } = await supabase.from('projects').update({ ...project, live_url: project.liveUrl, case_study_url: project.caseStudyUrl, updated_at: new Date().toISOString() }).eq('id', id);
    if (!error) {
      setProjectsState(projects.map(p => p.id === id ? { ...p, ...project } : p));
    }
    return { error };
  };

  const deleteProject = async (id: string) => {
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (!error) {
      setProjectsState(projects.filter(p => p.id !== id));
    }
    return { error };
  };

  const addService = async (service: Omit<Service, 'id'>) => {
    const { data, error } = await supabase.from('services').insert({ user_id: session?.user.id, ...service }).select().single();
    if (!error && data) {
      setServicesState([...services, { ...service, id: data.id }]);
    }
    return { error };
  };

  const updateService = async (id: string, service: Partial<Service>) => {
    const { error } = await supabase.from('services').update({ ...service }).eq('id', id);
    if (!error) {
      setServicesState(services.map(s => s.id === id ? { ...s, ...service } : s));
    }
    return { error };
  };

  const deleteService = async (id: string) => {
    const { error } = await supabase.from('services').delete().eq('id', id);
    if (!error) {
      setServicesState(services.filter(s => s.id !== id));
    }
    return { error };
  };

  const updateProfileData = async (data: ProfileData) => {
    const { error } = await supabase.from('profiles').update({ ...data, full_name: data.fullName, profile_photo: data.profilePhoto, updated_at: new Date().toISOString() }).eq('id', session?.user.id);
    if (!error) {
      setProfileDataState(data);
    }
    return { error };
  };

  const login = async (email: string, password: string) => {
    return await supabase.auth.signInWithPassword({ email, password });
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  return (
    <DataContext.Provider value={{ projects, services, profileData, isAuthenticated: !!session, isLoading, user: session?.user ?? null, addProject, updateProject, deleteProject, addService, updateService, deleteService, setProfileData: updateProfileData, login, logout }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) throw new Error("useData must be used within DataProvider");
  return context;
}
