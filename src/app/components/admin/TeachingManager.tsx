import { motion } from "motion/react";
import { GraduationCap, Save, Plus, Trash2, Image as ImageIcon, BookOpen, Link, Star, Laptop, Code } from "lucide-react";
import { useState, useEffect } from "react";
import { useData } from "../../contexts/DataContext";
import { MediaUploader } from "./MediaUploader";

export function TeachingManager() {
  const { profileData, setProfileData, teachingMedia, setTeachingMedia } = useData();
  const [profile, setProfile] = useState(profileData);
  const [currentMedia, setCurrentMedia] = useState(teachingMedia);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setProfile(profileData);
    setCurrentMedia(teachingMedia);
  }, [profileData, teachingMedia]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
        const profileResp = await setProfileData(profile);
        if (profileResp.error) throw profileResp.error;

        const mediaResp = await setTeachingMedia(currentMedia);
        if (mediaResp.error) throw mediaResp.error;

        alert("Teaching profile and media updated successfully!");
    } catch (error: any) {
        console.error("Save error:", error);
        alert("Failed to save changes: " + (error.message || "Unknown error"));
    } finally {
        setIsSaving(false);
    }
  };

  const expertTags = profile.examExpert?.split(",").map(t => t.trim()).filter(Boolean) || [];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-4xl font-black text-[var(--blue-dark)] tracking-tighter uppercase italic">Teaching Career Manager</h1>
          <p className="text-[var(--muted-foreground)] font-bold uppercase tracking-widest text-xs opacity-60">Manage your educator profile & classroom evidence</p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-8 py-4 bg-[var(--blue-dark)] text-white rounded-2xl font-black uppercase tracking-widest hover:bg-[var(--blue-primary)] transition-all flex items-center gap-3 shadow-xl shadow-blue-900/10 disabled:opacity-50"
        >
          {isSaving ? "Saving..." : <><Save className="w-5 h-5" /> Save Changes</>}
        </button>
      </div>

      <div className="grid md:grid-cols-12 gap-8">
        {/* Left Column - Text Info */}
        <div className="md:col-span-12 lg:col-span-7 space-y-8">
            <div className="p-8 rounded-[40px] bg-white border border-[var(--border)] shadow-sm">
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-[var(--blue-primary)]/10 flex items-center justify-center text-[var(--blue-primary)]">
                        <GraduationCap className="w-5 h-5" />
                    </div>
                    <h2 className="text-xl font-bold text-[var(--blue-dark)]">Educator Bio & Philosophy</h2>
                </div>
                <textarea
                  value={profile.tutorDescription}
                  onChange={(e) => setProfile({ ...profile, tutorDescription: e.target.value })}
                  placeholder="Describe your teaching approach..."
                  className="w-full px-6 py-4 rounded-3xl bg-[var(--secondary)]/30 border border-[var(--border)] focus:border-[var(--blue-primary)] focus:outline-none min-h-[300px] text-lg leading-relaxed"
                />
            </div>

            <div className="p-8 rounded-[40px] bg-white border border-[var(--border)] shadow-sm">
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600">
                        <Star className="w-5 h-5" />
                    </div>
                    <h2 className="text-xl font-bold text-[var(--blue-dark)]">Expertise & Links</h2>
                </div>
                <div className="space-y-6">
                    <div>
                        <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[var(--muted-foreground)] mb-3">Tuteria Public Link</label>
                        <div className="flex items-center gap-4 p-4 rounded-2xl bg-[var(--secondary)]/30 border border-[var(--border)]">
                            <Link className="w-5 h-5 text-[var(--muted-foreground)]" />
                            <input
                                type="url"
                                value={profile.tutorLink}
                                onChange={(e) => setProfile({ ...profile, tutorLink: e.target.value })}
                                placeholder="https://tutors.tuteria.com/profile/..."
                                className="flex-1 bg-transparent border-none focus:outline-none font-bold text-[var(--blue-dark)]"
                            />
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[var(--muted-foreground)] mb-3">Exam Focus (Comma separated)</label>
                            <input
                                type="text"
                                value={profile.examExpert}
                                onChange={(e) => setProfile({ ...profile, examExpert: e.target.value })}
                                placeholder="WAEC, JAMB, IT, Web Dev"
                                className="w-full px-6 py-4 rounded-2xl bg-[var(--secondary)]/30 border border-[var(--border)] font-bold"
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[var(--muted-foreground)] mb-3">Teaching Modality</label>
                            <input
                                type="text"
                                value={profile.teachingModality}
                                onChange={(e) => setProfile({ ...profile, teachingModality: e.target.value })}
                                placeholder="Physical / Online"
                                className="w-full px-6 py-4 rounded-2xl bg-[var(--secondary)]/30 border border-[var(--border)] font-bold"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Right Column - Media & Live Preview */}
        <div className="md:col-span-12 lg:col-span-5 space-y-8">
            <div className="p-8 rounded-[40px] bg-[var(--blue-dark)] text-white shadow-2xl">
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white">
                        <ImageIcon className="w-5 h-5" />
                    </div>
                    <h2 className="text-xl font-bold">Classroom Evidence</h2>
                </div>
                <p className="text-xs text-white/50 font-bold uppercase tracking-widest mb-6 leading-relaxed">
                    Upload photos/videos of your tutoring sessions to prove your pedagogical excellence to prospective clients.
                </p>
                <div className="bg-white rounded-3xl p-4">
                    <MediaUploader 
                        onFilesSelected={(files) => setCurrentMedia(files)}
                        existingFiles={currentMedia}
                        maxFiles={12}
                    />
                </div>
            </div>

            <div className="p-8 rounded-[40px] bg-[var(--blue-primary)]/5 border border-[var(--blue-primary)]/10">
                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-[var(--blue-dark)] mb-6">Live Tags Preview</h3>
                <div className="flex flex-wrap gap-2">
                    {expertTags.map(tag => (
                        <span key={tag} className="px-4 py-2 rounded-xl bg-white border border-[var(--border)] text-xs font-black text-[var(--blue-dark)] uppercase tracking-widest">
                            {tag}
                        </span>
                    ))}
                    {expertTags.length === 0 && <span className="opacity-30 italic text-xs">No tags defined</span>}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
