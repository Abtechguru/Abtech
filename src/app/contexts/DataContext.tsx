import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../utils/supabase";
import { Session, User } from "@supabase/supabase-js";

export interface MediaFile {
  id: string;
  type: "image" | "video" | "logo";
  url: string;
  name: string;
  size: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  features: string[];
  tech: string[];
  liveUrl?: string;
  caseStudyUrl?: string;
  media: MediaFile[];
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
  whatsapp?: string;
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
  tutorDescription?: string;
  tutorLink?: string;
  examExpert?: string;
  teachingModality?: string;
  curriculum?: string;
  calendlyLink?: string;
}

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

interface DataContextType {
  projects: Project[];
  services: Service[];
  skills: Skill[];
  testimonials: Testimonial[];
  experience: Experience[];
  profileData: ProfileData;
  teachingMedia: MediaFile[];
  messages: Message[];
  isAuthenticated: boolean;
  isLoading: boolean;
  authLoading: boolean;
  dataError: string | null;
  user: User | null;
  addProject: (project: Omit<Project, 'id' | 'viewCount'>) => Promise<{ error: any }>;
  updateProject: (id: string, project: Partial<Project>) => Promise<{ error: any }>;
  deleteProject: (id: string) => Promise<{ error: any }>;
  addService: (service: Omit<Service, 'id'>) => Promise<{ error: any }>;
  updateService: (id: string, service: Partial<Service>) => Promise<{ error: any }>;
  deleteService: (id: string) => Promise<{ error: any }>;
  incrementProjectView: (id: string) => Promise<void>;
  incrementProfileView: () => Promise<void>;
  markMessageRead: (id: string) => Promise<{ error: any }>;
  deleteMessage: (id: string) => Promise<{ error: any }>;
  refreshMessages: () => Promise<{ error: any }>;
  setProfileData: (data: ProfileData) => Promise<{ error: any }>;
  setTeachingMedia: (media: MediaFile[]) => Promise<{ error: any }>;
  sendMessage: (msg: { name: string; email: string; subject: string; message: string }) => Promise<{ error: any }>;
  login: (email: string, password: string) => Promise<{ error: any }>;
  logout: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// A public UUID, not a credential. It identifies the one portfolio owner.
const configuredOwnerId = (import.meta.env.VITE_PORTFOLIO_OWNER_ID || "").trim().toLowerCase();
const PORTFOLIO_OWNER_ID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(configuredOwnerId)
  ? configuredOwnerId : "";
const isOwnerSession = (value: Session | null): value is Session =>
  Boolean(PORTFOLIO_OWNER_ID && value?.user?.id?.toLowerCase() === PORTFOLIO_OWNER_ID);


const DEFAULT_PROFILE: ProfileData = {
  fullName: "Lateef Abiodun",
  title: "AI-Powered Fullstack Developer & Expert Educator",
  location: "Lagos, Nigeria",
  email: "careernig24@gmail.com",
  phone: "07041514615",
  whatsapp: "2347041514615",
  bio: "Fullstack Engineer & Math Specialist crafting production-grade AI systems and empowering the next generation of engineers.",
  github: "https://github.com/Abtechguru",
  linkedin: "",
  behance: "",
  website: "",
  viewCount: 0,
  yearsExperience: "",
  projectsDelivered: "",
  activeUsers: "",
  tutorDescription: "I am an accomplished mathematics, physics, and further mathematics teacher. With a rich background in education, I have cultivated a dynamic teaching approach that not only imparts knowledge but also sparks curiosity and critical thinking.\n\nMy qualifications include National Diploma in Agriculture and Bio Environmental Engineering and Degree in Electrical and electronics engineering, equipping me with the theoretical foundation and practical skills to deliver high-quality education.",
  tutorLink: "https://tutors.tuteria.com/profile/lateefafeez28",
  examExpert: "WAEC, JAMB, NECO, JUPEB, BECE, Cambridge Checkpoint",
  teachingModality: "Physical lessons only",
  curriculum: "Nigerian & British Curriculum",
  calendlyLink: "https://calendly.com/lateefabiodun"
};

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjectsState] = useState<Project[]>([]);
  const [services, setServicesState] = useState<Service[]>([]);
  const [skills, setSkillsState] = useState<Skill[]>([]);
  const [testimonials, setTestimonialsState] = useState<Testimonial[]>([]);
  const [experience, setExperienceState] = useState<Experience[]>([]);
  const [messages, setMessagesState] = useState<Message[]>([]);
  const [teachingMedia, setTeachingMediaState] = useState<MediaFile[]>([]);
  const [profileData, setProfileDataState] = useState<ProfileData>(DEFAULT_PROFILE);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(true);
  const [dataError, setDataError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    let requestVersion = 0;

    const loadSession = async (candidate: Session | null) => {
      const version = ++requestVersion;
      let verified: Session | null = null;
      if (isOwnerSession(candidate)) {
        // getSession() may be backed by mutable local storage. Validate with the
        // Supabase Auth service before granting access to the content studio.
        try {
          const { data, error } = await supabase.auth.getUser();
          if (!error && data.user?.id?.toLowerCase() === PORTFOLIO_OWNER_ID) verified = candidate;
        } catch (error) {
          console.error("Unable to verify owner identity", error);
        }
      }
      if (!active || version !== requestVersion) return;
      setSession(verified);
      setAuthLoading(false);
      if (verified) await fetchUserData(verified.user.id);
      else await fetchAllData();
    };

    void supabase.auth.getSession().then(({ data, error }) => {
      if (error) console.error("Unable to restore portfolio session", error);
      void loadSession(error ? null : data.session);
    }).catch(error => {
      console.error("Portfolio session recovery failed", error);
      void loadSession(null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, nextSession) => {
      if (event === "INITIAL_SESSION") return; // already read above
      // Avoid invoking another Supabase auth request while the auth callback
      // is executing. The auth client may still be processing its internal lock.
      window.setTimeout(() => { if (active) void loadSession(nextSession); }, 0);
    });

    return () => {
      active = false;
      requestVersion++;
      subscription.unsubscribe();
    };
  }, []);

  const fetchAllData = async () => {
    setMessagesState([]);
    setIsLoading(true);
    setDataError(null);
    if (!PORTFOLIO_OWNER_ID) {
      // Fail closed rather than selecting an arbitrary account when the owner is unknown.
      setDataError("The portfolio owner has not been configured.");
      setIsLoading(false);
      return;
    }
    try {
      const [
        { data: profile, error: profileError },
        { data: projectsData, error: projectsDataError },
        { data: servicesData, error: servicesDataError },
        { data: skillsData, error: skillsDataError },
        { data: testData, error: testDataError },
        { data: expData, error: expDataError },
        { data: teachingMediaData, error: teachingMediaDataError }
      ] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', PORTFOLIO_OWNER_ID).single(),
        supabase.from('projects').select('*, media (*)').eq('user_id', PORTFOLIO_OWNER_ID).order('created_at', { ascending: false }),
        supabase.from('services').select('*').eq('user_id', PORTFOLIO_OWNER_ID).order('display_order', { ascending: true }),
        supabase.from('skills').select('*').eq('user_id', PORTFOLIO_OWNER_ID).order('display_order', { ascending: true }),
        supabase.from('testimonials').select('*').eq('user_id', PORTFOLIO_OWNER_ID).order('created_at', { ascending: false }),
        supabase.from('experience').select('*').eq('user_id', PORTFOLIO_OWNER_ID).order('display_order', { ascending: true }),
        supabase.from('teaching_media').select('*').eq('profile_id', PORTFOLIO_OWNER_ID).order('created_at', { ascending: false })
      ]);
      const failedQueries = [profileError, projectsDataError, servicesDataError, skillsDataError, testDataError, expDataError, teachingMediaDataError].filter(Boolean);
      if (failedQueries.length) setDataError("Some portfolio information could not be loaded. Review the database connection and permissions.");

      if (profile) {
        setProfileDataState({
          fullName: profile.full_name || "",
          title: profile.title || "",
          location: profile.location || "",
          email: profile.email || "",
          phone: profile.phone || "",
          whatsapp: profile.whatsapp || "",
          bio: profile.bio || "",
          profilePhoto: profile.profile_photo || "",
          github: profile.github || "",
          linkedin: profile.linkedin || "",
          behance: profile.behance || "",
          website: profile.website || "",
          viewCount: profile.view_count || 0,
          yearsExperience: profile.years_experience || "",
          projectsDelivered: profile.projects_delivered || "",
          activeUsers: profile.active_users || "",
          tutorDescription: profile.tutor_description || "",
          tutorLink: profile.tutor_link || "",
          examExpert: profile.exam_expert || "",
          teachingModality: profile.teaching_modality || "",
          curriculum: profile.curriculum || "",
          calendlyLink: profile.calendly_link || ""
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

      if (teachingMediaData) {
        setTeachingMediaState(teachingMediaData.map((m: any) => ({
          id: m.id, type: m.type, url: m.url, name: m.name, size: m.size
        })));
      }
    } catch (error) {
      setDataError("Portfolio information could not be loaded. Please check the connection.");
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserData = async (userId: string) => {
    setIsLoading(true);
    setDataError(null);
    try {
        const [
          { data: profile, error: profileError },
          { data: projectsData, error: projectsDataError },
          { data: servicesData, error: servicesDataError },
          { data: skillsData, error: skillsDataError },
          { data: testData, error: testDataError },
          { data: expData, error: expDataError },
          { data: messagesData, error: messagesDataError },
          { data: teachingMediaData, error: teachingMediaDataError }
        ] = await Promise.all([
          supabase.from('profiles').select('*').eq('id', userId).single(),
          supabase.from('projects').select('*, media (*)').eq('user_id', userId).order('created_at', { ascending: false }),
          supabase.from('services').select('*').eq('user_id', userId).order('display_order', { ascending: true }),
          supabase.from('skills').select('*').eq('user_id', userId).order('display_order', { ascending: true }),
          supabase.from('testimonials').select('*').eq('user_id', userId).order('created_at', { ascending: false }),
          supabase.from('experience').select('*').eq('user_id', userId).order('display_order', { ascending: true }),
          supabase.from('messages').select('*').eq('to_user_id', userId).order('created_at', { ascending: false }),
          supabase.from('teaching_media').select('*').eq('profile_id', userId).order('created_at', { ascending: false })
        ]);
      const failedQueries = [profileError, projectsDataError, servicesDataError, skillsDataError, testDataError, expDataError, messagesDataError, teachingMediaDataError].filter(Boolean);
      if (failedQueries.length) setDataError("Some portfolio information could not be loaded. Review the database connection and permissions.");

        if (messagesData) {
            setMessagesState(messagesData.map((m: any) => ({
                id: m.id, name: m.name, email: m.email, subject: m.subject, message: m.message, isRead: m.is_read, createdAt: m.created_at
            })));
        }

        if (profile) {
          setProfileDataState({
            fullName: profile.full_name || "",
            title: profile.title || "",
            location: profile.location || "",
            email: profile.email || "",
            phone: profile.phone || "",
            whatsapp: profile.whatsapp || "",
            bio: profile.bio || "",
            profilePhoto: profile.profile_photo || "",
            github: profile.github || "",
            linkedin: profile.linkedin || "",
            behance: profile.behance || "",
            website: profile.website || "",
            viewCount: profile.view_count || 0,
            yearsExperience: profile.years_experience || "",
            projectsDelivered: profile.projects_delivered || "",
            activeUsers: profile.active_users || "",
            tutorDescription: profile.tutor_description || "",
            tutorLink: profile.tutor_link || "",
            examExpert: profile.exam_expert || "",
            teachingModality: profile.teaching_modality || "",
            curriculum: profile.curriculum || "",
            calendlyLink: profile.calendly_link || ""
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
        if (teachingMediaData) {
          setTeachingMediaState(teachingMediaData.map((media: any) => ({
            id: media.id, type: media.type, url: media.url, name: media.name, size: media.size
          })));
        }
    } catch (error) {
      setDataError("Portfolio information could not be loaded. Please check the connection.");
      console.error("Error fetching user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addProject = async (project: Omit<Project, 'id' | 'viewCount'>) => {
    if (!isOwnerSession(session)) return { error: new Error("Only the portfolio owner may edit content.") };
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
      const { error: mediaError } = await supabase.from('media').insert(mediaToInsert);
      if (mediaError) {
        await supabase.from('projects').delete().eq('id', projectData.id).eq('user_id', PORTFOLIO_OWNER_ID);
        return { error: mediaError };
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

  const updateProject = async (id: string, project: Partial<Project>) => {
    if (!isOwnerSession(session)) return { error: new Error("Only the portfolio owner may edit content.") };
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
      .eq('id', id).eq('user_id', PORTFOLIO_OWNER_ID);

    if (projectError) return { error: projectError };

    if (project.media) {
      const { data: existingMedia, error: readError } = await supabase
        .from("media").select("id,url").eq("project_id", id);
      if (readError) return { error: readError };
      const existing = existingMedia || [];
      const wanted = new Set(project.media.map(file => file.url));
      const oldUrls = new Set(existing.map(item => item.url));
      const toAdd = project.media.filter(file => !oldUrls.has(file.url));
      const toDelete = existing.filter(item => !wanted.has(item.url)).map(item => item.id);

      // Insert replacements before deleting existing attachments. A failed insert
      // never destroys an existing media gallery.
      if (toAdd.length) {
        const { error: insertError } = await supabase.from("media").insert(toAdd.map(file => ({
          project_id: id, type: file.type, url: file.url, name: file.name, size: file.size
        })));
        if (insertError) return { error: insertError };
      }
      if (toDelete.length) {
        const { error: deleteError } = await supabase.from("media").delete().in("id", toDelete).eq("project_id", id);
        if (deleteError) return { error: deleteError };
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
    if (!isOwnerSession(session)) return { error: new Error("Not authorized.") };
    const { error } = await supabase.from('projects').delete().eq('id', id).eq('user_id', PORTFOLIO_OWNER_ID);
    if (!error) setProjectsState(projects.filter(p => p.id !== id));
    return { error };
  };
  const addService = async (service: Omit<Service, 'id'>) => {
    if (!isOwnerSession(session)) return { error: new Error("Only the portfolio owner may edit content.") };
    const { error } = await supabase.from('services').insert({
      user_id: session.user.id,
      title: service.title,
      description: service.description,
      price: service.price,
      features: service.features || []
    });
    if (!error) {
        const { data } = await supabase.from('services').select('*').eq('user_id', session.user.id).order('display_order', { ascending: true });
        if (data) setServicesState(data.map((s: any) => ({
            id: s.id, title: s.title, description: s.description, price: s.price, features: s.features || []
        })));
    }
    return { error };
  };

  const updateService = async (id: string, service: Partial<Service>) => {
    if (!isOwnerSession(session)) return { error: new Error("Not authorized.") };
    const { error } = await supabase.from('services').update({
      title: service.title,
      description: service.description,
      price: service.price,
      features: service.features
    }).eq('id', id).eq('user_id', PORTFOLIO_OWNER_ID);
    if (!error) {
        setServicesState(services.map(s => s.id === id ? { ...s, ...service } : s));
    }
    return { error };
  };

  const deleteService = async (id: string) => {
    if (!isOwnerSession(session)) return { error: new Error("Not authorized.") };
    const { error } = await supabase.from('services').delete().eq('id', id).eq('user_id', PORTFOLIO_OWNER_ID);
    if (!error) setServicesState(services.filter(s => s.id !== id));
    return { error };
  };

  const incrementProjectView = async (id: string) => {
    await supabase.rpc('increment_project_view', { project_id: id });
  };

  const incrementProfileView = async () => {
    if (!PORTFOLIO_OWNER_ID) return;
    await supabase.rpc('increment_profile_view', { profile_id: PORTFOLIO_OWNER_ID });
  };

  const refreshMessages = async (): Promise<{ error: any }> => {
    if (!isOwnerSession(session)) return { error: new Error("Only the portfolio owner can access messages.") };
    const { data, error } = await supabase.from("messages").select("*")
      .eq("to_user_id", PORTFOLIO_OWNER_ID).order("created_at", { ascending: false });
    if (!error && data) {
      setMessagesState(data.map((message: any) => ({
        id: message.id, name: message.name, email: message.email,
        subject: message.subject, message: message.message,
        isRead: message.is_read, createdAt: message.created_at
      })));
    }
    return { error };
  };

  const markMessageRead = async (id: string): Promise<{ error: any }> => {
    if (!isOwnerSession(session)) return { error: new Error("Not authorized.") };
    const { error } = await supabase.from("messages").update({ is_read: true })
      .eq("id", id).eq("to_user_id", PORTFOLIO_OWNER_ID);
    if (!error) setMessagesState(current => current.map(message => message.id === id ? { ...message, isRead: true } : message));
    return { error };
  };

  const deleteMessage = async (id: string): Promise<{ error: any }> => {
    if (!isOwnerSession(session)) return { error: new Error("Not authorized.") };
    const { error } = await supabase.from("messages").delete()
      .eq("id", id).eq("to_user_id", PORTFOLIO_OWNER_ID);
    if (!error) setMessagesState(current => current.filter(message => message.id !== id));
    return { error };
  };

  const updateProfileData = async (data: ProfileData) => {
    if (!isOwnerSession(session)) return { error: new Error("Only the portfolio owner may edit content.") };
    const { error } = await supabase
      .from('profiles')
      .update({
        full_name: data.fullName,
        title: data.title,
        location: data.location,
        email: data.email,
        phone: data.phone,
        whatsapp: data.whatsapp,
        bio: data.bio,
        profile_photo: data.profilePhoto,
        github: data.github,
        linkedin: data.linkedin,
        behance: data.behance,
        website: data.website,
        years_experience: data.yearsExperience,
        projects_delivered: data.projectsDelivered,
        active_users: data.activeUsers,
        tutor_description: data.tutorDescription,
        tutor_link: data.tutorLink,
        exam_expert: data.examExpert,
        teaching_modality: data.teachingModality,
        curriculum: data.curriculum,
        calendly_link: data.calendlyLink,
        updated_at: new Date().toISOString()
      })
      .eq('id', session.user.id);

    if (!error) setProfileDataState(data);
    return { error };
  };

  const setTeachingMedia = async (media: MediaFile[]) => {
    if (!isOwnerSession(session)) return { error: new Error("Only the portfolio owner may manage teaching media.") };
    const { data: stored, error: readError } = await supabase.from("teaching_media")
      .select("id,url").eq("profile_id", PORTFOLIO_OWNER_ID);
    if (readError) return { error: readError };
    const existing = stored || [];
    const wantedUrls = new Set(media.map(item => item.url));
    const existingUrls = new Set(existing.map(item => item.url));
    const additions = media.filter(item => !existingUrls.has(item.url));
    const removedIds = existing.filter(item => !wantedUrls.has(item.url)).map(item => item.id);
    if (additions.length) {
      const { error: insertError } = await supabase.from("teaching_media").insert(additions.map(item => ({
        profile_id: PORTFOLIO_OWNER_ID,
        type: item.type === "logo" ? "image" : item.type,
        url: item.url, name: item.name, size: item.size
      })));
      if (insertError) return { error: insertError };
    }
    if (removedIds.length) {
      const { error: deleteError } = await supabase.from("teaching_media")
        .delete().in("id", removedIds).eq("profile_id", PORTFOLIO_OWNER_ID);
      if (deleteError) return { error: deleteError };
    }
    setTeachingMediaState(media);
    return { error: null };
  };

  const sendMessage = async (msg: { name: string; email: string; subject: string; message: string }) => {
    if (!PORTFOLIO_OWNER_ID) return { error: new Error("The portfolio inbox is not configured for this deployment.") };
    return await supabase.from('messages').insert({
      to_user_id: PORTFOLIO_OWNER_ID,
      name: msg.name,
      email: msg.email,
      subject: msg.subject,
      message: msg.message
    });
  };

  const login = async (email: string, password: string) => {
    if (!PORTFOLIO_OWNER_ID) {
      return { error: new Error("Portfolio owner access has not been configured.") };
    }
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error };
    if (!isOwnerSession(data.session)) {
      await supabase.auth.signOut();
      return { error: new Error("This account is not authorized to manage the portfolio.") };
    }
    return { error: null };
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setSession(null);
    setMessagesState([]);
  };

  return (
    <DataContext.Provider value={{
      projects, services, skills, testimonials, experience, profileData, messages, teachingMedia,
      isAuthenticated: isOwnerSession(session), isLoading, authLoading, dataError, user: isOwnerSession(session) ? session?.user ?? null : null,
      addProject, updateProject, deleteProject,
      addService, updateService, deleteService,
      incrementProjectView, incrementProfileView,
      markMessageRead, deleteMessage, refreshMessages,
      setProfileData: updateProfileData, setTeachingMedia, sendMessage, login, logout
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
