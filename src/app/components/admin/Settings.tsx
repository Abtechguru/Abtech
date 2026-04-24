import { motion } from "motion/react";
import { Save, User, Mail, Phone, MapPin, Github, Linkedin, Globe, Lock, Bell, Upload, X, Dribbble } from "lucide-react";
import { useState } from "react";
import { useData } from "../../contexts/DataContext";

export function Settings() {
  const { profileData, setProfileData, isLoading } = useData();
  const [profile, setProfile] = useState(profileData);
  const [profilePhotoPreview, setProfilePhotoPreview] = useState(profileData.profilePhoto || "");

  // Sync local state when profileData finishes loading from Supabase
  useEffect(() => {
    if (!isLoading && profileData) {
      setProfile(profileData);
      setProfilePhotoPreview(profileData.profilePhoto || "");
    }
  }, [profileData, isLoading]);

  const [notifications, setNotifications] = useState({
    emailMessages: true,
    emailWeeklyReport: true,
    emailProjectViews: false,
    pushMessages: true,
    pushWeeklyReport: false
  });

  const [security, setSecurity] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handleProfilePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setProfilePhotoPreview(result);
        setProfile({ ...profile, profilePhoto: result });
      };
      reader.readAsDataURL(file);
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

  const handleSaveNotifications = () => {
    console.log("Saving notifications:", notifications);
    alert("Notification preferences updated!");
  };

  const handleChangePassword = () => {
    if (security.newPassword !== security.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    console.log("Changing password");
    alert("Password changed successfully!");
    setSecurity({ currentPassword: "", newPassword: "", confirmPassword: "" });
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
                  JPG, PNG or GIF (Max 5MB)
                </p>
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

          <button
            onClick={handleSaveProfile}
            disabled={isSaving}
            className="px-6 py-3 bg-[var(--orange)] text-white rounded-xl flex items-center gap-2 hover:shadow-lg hover:shadow-[var(--orange-glow)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Save className="w-5 h-5" />
            )}
            <span>{isSaving ? "Saving..." : "Save Profile"}</span>
          </button>
        </motion.div>

        {/* Notification Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)]"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-[var(--orange-glow)] flex items-center justify-center">
              <Bell className="w-6 h-6 text-[var(--orange)]" />
            </div>
            <h2 className="text-2xl">Notifications</h2>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex items-center justify-between p-4 rounded-xl bg-[var(--secondary)] border border-[var(--border)]">
              <div>
                <h4 className="mb-1">New Messages</h4>
                <p className="text-sm text-[var(--muted-foreground)]">Receive email notifications for new contact messages</p>
              </div>
              <label className="relative inline-block w-12 h-6">
                <input
                  type="checkbox"
                  checked={notifications.emailMessages}
                  onChange={(e) => setNotifications({ ...notifications, emailMessages: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-full h-full bg-[var(--muted)] rounded-full peer-checked:bg-[var(--orange)] transition-all cursor-pointer">
                  <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-6" />
                </div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-[var(--secondary)] border border-[var(--border)]">
              <div>
                <h4 className="mb-1">Weekly Report</h4>
                <p className="text-sm text-[var(--muted-foreground)]">Get a weekly summary of your portfolio analytics</p>
              </div>
              <label className="relative inline-block w-12 h-6">
                <input
                  type="checkbox"
                  checked={notifications.emailWeeklyReport}
                  onChange={(e) => setNotifications({ ...notifications, emailWeeklyReport: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-full h-full bg-[var(--muted)] rounded-full peer-checked:bg-[var(--orange)] transition-all cursor-pointer">
                  <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-6" />
                </div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-[var(--secondary)] border border-[var(--border)]">
              <div>
                <h4 className="mb-1">Project Views</h4>
                <p className="text-sm text-[var(--muted-foreground)]">Notify when projects reach view milestones</p>
              </div>
              <label className="relative inline-block w-12 h-6">
                <input
                  type="checkbox"
                  checked={notifications.emailProjectViews}
                  onChange={(e) => setNotifications({ ...notifications, emailProjectViews: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-full h-full bg-[var(--muted)] rounded-full peer-checked:bg-[var(--orange)] transition-all cursor-pointer">
                  <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-6" />
                </div>
              </label>
            </div>
          </div>

          <button
            onClick={handleSaveNotifications}
            className="px-6 py-3 bg-[var(--orange)] text-white rounded-xl flex items-center gap-2 hover:shadow-lg hover:shadow-[var(--orange-glow)] transition-all"
          >
            <Save className="w-5 h-5" /> Save Preferences
          </button>
        </motion.div>

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
              <label className="block text-sm mb-2">Current Password</label>
              <input
                type="password"
                value={security.currentPassword}
                onChange={(e) => setSecurity({ ...security, currentPassword: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[var(--background)] border border-[var(--border)] focus:border-[var(--orange)] focus:outline-none"
              />
            </div>
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
            className="px-6 py-3 bg-[var(--orange)] text-white rounded-xl flex items-center gap-2 hover:shadow-lg hover:shadow-[var(--orange-glow)] transition-all"
          >
            <Lock className="w-5 h-5" /> Change Password
          </button>
        </motion.div>
      </div>
    </div>
  );
}
