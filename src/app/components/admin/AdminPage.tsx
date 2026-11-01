import { useState } from "react";
import { AdminLayout } from "./AdminLayout";
import { Overview } from "./Overview";
import { ProjectsManager } from "./ProjectsManager";
import { SkillsManager } from "./SkillsManager";
import { ExperienceManager } from "./ExperienceManager";
import { MessagesViewer } from "./MessagesViewer";
import { Analytics } from "./Analytics";
import { ServicesManager } from "./ServicesManager";
import { TeachingManager } from "./TeachingManager";
import { Settings } from "./Settings";

interface AdminPageProps {
  onLogout: () => void;
}

export function AdminPage({ onLogout }: AdminPageProps) {
  const [activeTab, setActiveTab] = useState("overview");

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <Overview onNavigate={setActiveTab} />;
      case "projects":
        return <ProjectsManager />;
      case "pricing":
        return <ServicesManager />;
      case "skills":
        return <SkillsManager />;
      case "experience":
        return <ExperienceManager />;
      case "messages":
        return <MessagesViewer />;
      case "analytics":
        return <Analytics />;
      case "teaching":
        return <TeachingManager />;
      case "settings":
        return <Settings />;
      default:
        return <Overview />;
    }
  };

  return (
    <>
      <AdminLayout activeTab={activeTab} onTabChange={setActiveTab} onLogout={onLogout}>
        {renderContent()}
      </AdminLayout>
    </>
  );
}
