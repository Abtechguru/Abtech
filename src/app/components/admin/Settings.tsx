import { motion } from "motion/react";
import { Save, User, Mail, Phone, MapPin, Github, Linkedin, Globe, Lock, Bell, Upload, X, Dribbble, MessageCircle, Calendar } from "lucide-react";
import { useState, useEffect } from "react";
import { useData } from "../../contexts/DataContext";
import { supabase } from "../../utils/supabase";
import { MediaUploader } from "./MediaUploader";

export function Settings() {
  const { profileData, setProfileData, teachingMedia, setTeachingMedia, isLoading, user } = useData();
  const [profile, setProfile] = useState(profileData);
  const [profilePhotoPreview, setProfilePhotoPreview] = useState(profileData.profilePhoto || "");
  const [isPhotoUploading, setIsPhotoUploading] = useState(false);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [currentTeachingMedia, setCurrentTeachingMedia] = useState(teachingMedia);

  // Sync local state when profileData finishes loading from Supabase
  useEffect(() => {
    if (!isLoading && profileData) {
      setProfile(profileData);
      setProfilePhotoPreview(profileData.profilePhoto || "");
      setCurrentTeachingMedia(teachingMedia);
    }
  }, [profileData, teachingMedia, isLoading]);

  const [security, setSecurity] = useState({ newPassword: "", confirmPassword: "" });
  const [passwordBusy, setPasswordBusy] = useState(false);
  const [passwordNotice, setPasswordNotice] = useState<{ ok: boolean; message: string } | null>(null);

  const handleProfilePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    const file = input.files?.[0];
    input.value = "";
    if (!file) return;
    setPhotoError(null);
    if (!user) {
      setPhotoError("Your editor session has expired. Please sign in again.");
      return;
    }
    const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowed.includes(file.type) || file.size > 5 * 1024 * 1024) {
      setPhotoError("Select a JPEG, PNG, WebP or GIF under 5 MB.");
      return;
    }
    setIsPhotoUploading(true);
    try {
      const ext = file.name.split(".").at(-1)?.toLowerCase() || "jpg";
      const path = "profile-media/" + user.id + "/" + crypto.randomUUID() + "." + ext;
      const { error: uploadError } = await supabase.storage.from("media").upload(path, file, {
        contentType: file.type,
        cacheControl: "3600",
        upsert: false
      });
      if (uploadError) throw uploadError;
      const { data } = supabase.storage.from("media").getPublicUrl(path);
      if (!data.publicUrl) throw new Error("Storage did not provide a usable photo URL.");
      setProfilePhotoPreview(data.publicUrl);
      setProfile(previous => ({ ...previous, profilePhoto: data.publicUrl }));
    } catch (error) {
      setPhotoError(error instanceof Error ? error.message : "Photo upload failed. Please try again.");
    } finally {
      setIsPhotoUploading(false);
    }
  };

  const removeProfilePhoto = () => {
    setProfilePhotoPreview("");
    setProfile({ ...profile, profilePhoto: "" });
  };

  const [isSaving, setIsSaving] = useState(false);

  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      const { error } = await setProfileData(profile);
      if (error) {
        alert("Error updating profile: " + (error.message || error));
      } else {
        alert("Profile updated successfully!");
      }
    } catch (err) {
      alert("An unexpected error occurred.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleChangePassword = async () => {
    setPasswordNotice(null);
    if (security.newPassword.length < 12) {
      setPasswordNotice({ ok: false, message: "Use at least 12 characters in your new password." });
      return;
    }
    if (security.newPassword !== security.confirmPassword) {
      setPasswordNotice({ ok: false, message: "The two passwords do not match." });
      return;
    }
    setPasswordBusy(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: security.newPassword });
      if (error) {
        setPasswordNotice({ ok: false, message: error.message || "Password change was unsuccessful. Try again." });
      } else {
        setPasswordNotice({ ok: true, message: "Your account password was updated successfully." });
        setSecurity({ newPassword: "", confirmPassword: "" });
      }
    } catch {
      setPasswordNotice({ ok: false, message: "The authentication service is unavailable. Please try again." });
    } finally {
      setPasswordBusy(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Settings</h1>
        <p className="text-[var(--muted-foreground)]">Manage your portfolio settings and preferences</p>
      </div>

      <div className="space-y-6">
        {/* Profile Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)]"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-[var(--orange-glow)] flex items-center justify-center">
              <User className="w-6 h-6 text-[var(--orange)]" />
            </div>
            <h2 className="text-2xl">Profile Information</h2>
          </div>

          {/* Profile Photo Upload */}
          <div className="mb-6">
            <label className="block text-sm mb-3">Profile Photo</label>
            <div className="flex items-center gap-6">
              <div className="relative">
                {profilePhotoPreview ? (
                  <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-[var(--border)]">
                    <img src={profilePhotoPreview} alt="Profile" className="w-full h-full object-cover" />
                    <button
                      onClick={removeProfilePhoto}
                      className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-all"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="w-32 h-32 rounded-full bg-[var(--secondary)] border-4 border-[var(--border)] flex items-center justify-center">
                    <User className="w-16 h-16 text-[var(--muted-foreground)]" />
                  </div>
                )}
              </div>
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePhotoUpload}
                  disabled={isPhotoUploading}
                  className="hidden"
                  id="profile-photo-upload"
                />
                <label
                  htmlFor="profile-photo-upload"
                  className="px-6 py-3 bg-[var(--secondary)] rounded-xl flex items-center gap-2 hover:bg-[var(--muted)] transition-all cursor-pointer inline-flex"
                >
                  <Upload className="w-5 h-5" />
                  <span>Upload Photo</span>
                </label>
                <p className="text-sm text-[var(--muted-foreground)] mt-2">
                  JPEG, PNG, WebP or GIF (Max 5 MB). Photos are uploaded to storage, not embedded in your profile.
                </p>
                {isPhotoUploading && <p role="status" className="text-sm mt-2 text-[var(--orange)]">Uploading photo…</p>}
                {photoError && <p role="alert" className="text-sm mt-2 text-red-700">{photoError}</p>}
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm mb-2">Full Name</label>
              <input
                type="text"
                value={profile.fullName}
                onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[var(--background)] border border-[var(--border)] focus:border-[var(--orange)] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm mb-2">Professional Title</label>
              <input
                type="text"
                value={profile.title}
                onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[var(--background)] border border-[var(--border)] focus:border-[var(--orange)] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--muted-foreground)]" />
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-[var(--background)] border border-[var(--border)] focus:border-[var(--orange)] focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm mb-2">Phone</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--muted-foreground)]" />
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-[var(--background)] border border-[var(--border)] focus:border-[var(--orange)] focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm mb-2">WhatsApp Number (Direct)</label>
              <div className="relative">
                <MessageCircle className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--muted-foreground)]" />
                <input
                  type="text"
                  value={profile.whatsapp}
                  onChange={(e) => setProfile({ ...profile, whatsapp: e.target.value })}
                  placeholder="e.g. +2348105230379"
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-[var(--background)] border border-[var(--border)] focus:border-[var(--orange)] focus:outline-none"
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm mb-2">Calendly Booking Link</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--muted-foreground)]" />
                <input
                  type="url"
                  value={profile.calendlyLink}
                  onChange={(e) => setProfile({ ...profile, calendlyLink: e.target.value })}
                  placeholder="https://calendly.com/your-profile"
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-[var(--background)] border border-[var(--border)] focus:border-[var(--orange)] focus:outline-none"
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm mb-2">Location</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--muted-foreground)]" />
                <input
                  type="text"
                  value={profile.location}
                  onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-[var(--background)] border border-[var(--border)] focus:border-[var(--orange)] focus:outline-none"
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm mb-2">Bio</label>
              <textarea
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[var(--background)] border border-[var(--border)] focus:border-[var(--orange)] focus:outline-none min-h-24"
              />
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg mb-4">Social Links</h3>
            <div className="space-y-3">
              <div className="relative">
                <Github className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--muted-foreground)]" />
                <input
                  type="url"
                  value={profile.github}
                  onChange={(e) => setProfile({ ...profile, github: e.target.value })}
                  placeholder="GitHub URL"
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-[var(--background)] border border-[var(--border)] focus:border-[var(--orange)] focus:outline-none"
                />
              </div>
              <div className="relative">
                <Linkedin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--muted-foreground)]" />
                <input
                  type="url"
                  value={profile.linkedin}
                  onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
                  placeholder="LinkedIn URL"
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-[var(--background)] border border-[var(--border)] focus:border-[var(--orange)] focus:outline-none"
                />
              </div>
              <div className="relative">
                <Dribbble className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--muted-foreground)]" />
                <input
                  type="url"
                  value={profile.behance}
                  onChange={(e) => setProfile({ ...profile, behance: e.target.value })}
                  placeholder="Behance URL"
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-[var(--background)] border border-[var(--border)] focus:border-[var(--orange)] focus:outline-none"
                />
              </div>
              <div className="relative">
                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--muted-foreground)]" />
                <input
                  type="url"
                  value={profile.website}
                  onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                  placeholder="Personal Website"
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-[var(--background)] border border-[var(--border)] focus:border-[var(--orange)] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Teaching Section */}
          <div className="mb-6 p-6 rounded-2xl bg-[var(--blue-primary)]/5 border border-[var(--blue-primary)]/10">
            <h3 className="text-xl font-bold mb-6 text-[var(--blue-dark)]">Teaching Career Integration</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-2">Tutor Description</label>
                <textarea
                  value={profile.tutorDescription}
                  onChange={(e) => setProfile({ ...profile, tutorDescription: e.target.value })}
                  placeholder="Describe your teaching philosophy and expertise..."
                  className="w-full px-4 py-3 rounded-xl bg-white border border-[var(--border)] focus:border-[var(--blue-primary)] focus:outline-none min-h-[150px]"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-bold mb-2">Tuteria Profile Link</label>
                    <input
                        type="url"
                        value={profile.tutorLink}
                        onChange={(e) => setProfile({ ...profile, tutorLink: e.target.value })}
                        placeholder="https://tutors.tuteria.com/profile/..."
                        className="w-full px-4 py-3 rounded-xl bg-white border border-[var(--border)] focus:border-[var(--blue-primary)] focus:outline-none"
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold mb-2">Exam Preparation Expert</label>
                    <input
                        type="text"
                        value={profile.examExpert}
                        onChange={(e) => setProfile({ ...profile, examExpert: e.target.value })}
                        placeholder="e.g. WAEC, JAMB, Cambridge Checkpoint"
                        className="w-full px-4 py-3 rounded-xl bg-white border border-[var(--border)] focus:border-[var(--blue-primary)] focus:outline-none"
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold mb-2">Teaching Modality</label>
                    <input
                        type="text"
                        value={profile.teachingModality}
                        onChange={(e) => setProfile({ ...profile, teachingModality: e.target.value })}
                        placeholder="e.g. Physical lessons only"
                        className="w-full px-4 py-3 rounded-xl bg-white border border-[var(--border)] focus:border-[var(--blue-primary)] focus:outline-none"
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold mb-2">Curriculum Focus</label>
                    <input
                        type="text"
                        value={profile.curriculum}
                        onChange={(e) => setProfile({ ...profile, curriculum: e.target.value })}
                        placeholder="e.g. Nigerian & British Curriculum"
                        className="w-full px-4 py-3 rounded-xl bg-white border border-[var(--border)] focus:border-[var(--blue-primary)] focus:outline-none"
                    />
                </div>
              </div>
              
              <div className="pt-6 border-t border-[var(--blue-primary)]/10">
                <label className="block text-sm font-bold mb-4 uppercase tracking-widest text-[var(--blue-dark)]">Teaching Session Media (Photos/Videos)</label>
                <MediaUploader 
                  onFilesSelected={(files) => setCurrentTeachingMedia(files)}
                  existingFiles={currentTeachingMedia}
                  maxFiles={12}
                />
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button
                onClick={handleSaveProfile}
                disabled={isSaving || isPhotoUploading}
                className="px-6 py-3 bg-[var(--blue-dark)] text-white rounded-xl flex items-center gap-2 hover:shadow-lg hover:shadow-blue-900/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isSaving ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                <Save className="w-5 h-5" />
                )}
                <span>{isSaving ? "Saving Profile..." : "Save Teaching & Profile Info"}</span>
            </button>
            
            <button
                onClick={async () => {
                    setIsSaving(true);
                    try {
                      const { error } = await setTeachingMedia(currentTeachingMedia);
                      if (error) alert("Unable to sync teaching media: " + (error.message || "Please try again."));
                      else alert("Teaching media saved successfully.");
                    } catch {
                      alert("Unable to sync teaching media. Please try again.");
                    } finally {
                      setIsSaving(false);
                    }
                }}
                disabled={isSaving}
                className="px-6 py-3 bg-white border border-[var(--blue-dark)] text-[var(--blue-dark)] rounded-xl flex items-center gap-2 hover:bg-[var(--secondary)] transition-all disabled:opacity-50"
            >
                <Upload className="w-5 h-5" />
                <span>Sync Session Media</span>
            </button>
          </div>
        </motion.div>

        {/* Notification delivery is not configured; avoid presenting inactive controls as functional. */}
        <section className="p-6 rounded-2xl bg-white border border-[var(--border)]" aria-label="Notification status">
          <div className="flex gap-4 items-start">
            <Bell className="w-6 h-6 text-[var(--orange)] shrink-0" />
            <div>
              <h2 className="text-xl font-bold">Notifications</h2>
              <p className="text-sm text-[var(--muted-foreground)] mt-2">
                Email and push notification delivery has not been configured. Incoming contact messages are available under Inquiries.
              </p>
            </div>
          </div>
        </section>

        {/* Security Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)]"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-[var(--orange-glow)] flex items-center justify-center">
              <Lock className="w-6 h-6 text-[var(--orange)]" />
            </div>
            <h2 className="text-2xl">Security</h2>
          </div>

          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm mb-2">New Password</label>
              <input
                type="password"
                value={security.newPassword}
                onChange={(e) => setSecurity({ ...security, newPassword: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[var(--background)] border border-[var(--border)] focus:border-[var(--orange)] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm mb-2">Confirm New Password</label>
              <input
                type="password"
                value={security.confirmPassword}
                onChange={(e) => setSecurity({ ...security, confirmPassword: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[var(--background)] border border-[var(--border)] focus:border-[var(--orange)] focus:outline-none"
              />
            </div>
          </div>

          <button
            onClick={handleChangePassword}
            disabled={passwordBusy}
            className="px-6 py-3 bg-[var(--orange)] text-white rounded-xl flex items-center gap-2 hover:shadow-lg hover:shadow-[var(--orange-glow)] transition-all"
          >
            <Lock className="w-5 h-5" /> {passwordBusy ? "Updating password…" : "Change Password"}
          </button>
          <p role="status" aria-live="polite" className={"mt-4 text-sm " + (passwordNotice?.ok ? "text-green-700" : "text-red-700")}>{passwordNotice?.message}</p>
        </motion.div>
      </div>
    </div>
  );
}
