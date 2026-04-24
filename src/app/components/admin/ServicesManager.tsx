import { motion } from "motion/react";
import { Plus, Edit, Trash2, Save, X } from "lucide-react";
import { useState } from "react";
import { useData } from "../../contexts/DataContext";

export function ServicesManager() {
  const { services, addService, updateService, deleteService } = useData();
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [newService, setNewService] = useState<any>({
    title: "",
    description: "",
    price: "₦",
    features: []
  });

  const handleEdit = (service: any) => {
    setIsEditing(service.id);
    setEditForm(service);
  };

  const handleSave = async (id: string) => {
    setIsSaving(true);
    await updateService(id, editForm);
    setIsEditing(null);
    setIsSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this service?")) {
      await deleteService(id);
    }
  };

  const handleAdd = async () => {
    setIsSaving(true);
    await addService(newService);
    setShowAddForm(false);
    setNewService({ title: "", description: "", price: "₦", features: [] });
    setIsSaving(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl mb-2">Pricing & Services</h1>
          <p className="text-[var(--muted-foreground)]">Manage your service packages and Naira (₦) pricing</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="px-6 py-3 bg-[var(--blue-primary)] text-white rounded-xl flex items-center gap-2"
        >
          <Plus className="w-5 h-5" /> Add Service
        </button>
      </div>

      {showAddForm && (
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6 p-6 rounded-2xl bg-[var(--card)] border-2 border-[var(--blue-primary)]">
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Service Title"
              value={newService.title}
              onChange={(e) => setNewService({ ...newService, title: e.target.value })}
              className="px-4 py-3 rounded-xl bg-[var(--background)] border border-[var(--border)]"
            />
            <input
              type="text"
              placeholder="Price (e.g. ₦500,000)"
              value={newService.price}
              onChange={(e) => setNewService({ ...newService, price: e.target.value })}
              className="px-4 py-3 rounded-xl bg-[var(--background)] border border-[var(--border)]"
            />
            <textarea
              placeholder="Description"
              value={newService.description}
              onChange={(e) => setNewService({ ...newService, description: e.target.value })}
              className="md:col-span-2 px-4 py-3 rounded-xl bg-[var(--background)] border border-[var(--border)] min-h-24"
            />
          </div>
          <button onClick={handleAdd} disabled={isSaving} className="px-6 py-3 bg-[var(--blue-primary)] text-white rounded-xl flex items-center gap-2">
            {isSaving ? "Saving..." : "Save Service"}
          </button>
        </motion.div>
      )}

      <div className="space-y-4">
        {services.map((service) => (
          <div key={service.id} className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)]">
            {isEditing === service.id ? (
              <div className="space-y-4">
                <input
                  type="text"
                  value={editForm.title}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[var(--background)] border border-[var(--border)]"
                />
                <input
                  type="text"
                  value={editForm.price}
                  onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[var(--background)] border border-[var(--border)]"
                />
                <div className="flex gap-2">
                  <button onClick={() => handleSave(service.id)} className="px-4 py-2 bg-[var(--blue-primary)] text-white rounded-xl flex items-center gap-2">
                    <Save className="w-4 h-4" /> Save
                  </button>
                  <button onClick={() => setIsEditing(null)} className="px-4 py-2 bg-[var(--secondary)] rounded-xl">Cancel</button>
                </div>
              </div>
            ) : (
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold">{service.title}</h3>
                  <div className="text-2xl font-bold text-[var(--blue-primary)] mb-2">{service.price}</div>
                  <p className="text-[var(--muted-foreground)]">{service.description}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(service)} className="p-2 rounded-lg bg-[var(--secondary)]"><Edit className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(service.id)} className="p-2 rounded-lg bg-red-500/10 text-red-500"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
