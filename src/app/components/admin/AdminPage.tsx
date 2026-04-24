import { useState } from "react";
import { AdminLayout } from "./AdminLayout";
import { Overview } from "./Overview";
import { ProjectsManager } from "./ProjectsManager";
import { SkillsManager } from "./SkillsManager";
import { ExperienceManager } from "./ExperienceManager";
import { MessagesViewer } from "./MessagesViewer";
import { Analytics } from "./Analytics";
import { ServicesManager } from "./ServicesManager";
import { Settings } from "./Settings";
import { AdminFloatingButton } from "./AdminFloatingButton";
import { useData } from "../../contexts/DataContext";

interface AdminPageProps {
  onLogout: () => void;
}

export function AdminPage({ onLogout }: AdminPageProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const { logout } = useData();

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <Overview />;
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
      case "settings":
        return <Settings />;
      default:
        return <Overview />;
    }
  };

  return (
    <>
      <AdminLayout activeTab={activeTab} onTabChange={setActiveTab}>
        {renderContent()}
      </AdminLayout>
      <AdminFloatingButton />
    </>
  );
}
