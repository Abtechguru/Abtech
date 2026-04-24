import { motion, AnimatePresence } from "motion/react";
import { Mail, Trash2, Search, Filter, MoreVertical, CheckCircle, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "../../utils/supabase";

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export function MessagesViewer() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setIsLoading(true);
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      const { data } = await supabase
        .from('messages')
        .select('*')
        .eq('to_user_id', session.user.id)
        .order('created_at', { ascending: false });
      if (data) setMessages(data);
    }
    setIsLoading(false);
  };

  const markAsRead = async (id: string) => {
    await supabase.from('messages').update({ is_read: true }).eq('id', id);
    setMessages(messages.map(m => m.id === id ? { ...m, is_read: true } : m));
  };

  const deleteMessage = async (id: string) => {
    if (confirm("Delete this message?")) {
      await supabase.from('messages').delete().eq('id', id);
      setMessages(messages.filter(m => m.id !== id));
      if (selectedMessage?.id === id) setSelectedMessage(null);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="mb-8">
        <h1 className="text-3xl mb-2 font-bold">Contact Messages</h1>
        <p className="text-[var(--muted-foreground)]">Manage incoming inquiries from your portfolio</p>
      </div>

      <div className="flex-1 grid lg:grid-cols-5 gap-6 min-h-[600px]">
        {/* Message List */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-[var(--border)] overflow-hidden flex flex-col">
          <div className="p-4 border-b border-[var(--border)]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]" />
              <input
                type="text"
                placeholder="Search messages..."
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-[var(--secondary)] border-none text-sm focus:ring-2 focus:ring-[var(--blue-primary)]/20 outline-none"
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {isLoading ? (
              <div className="p-8 text-center text-[var(--muted-foreground)]">Loading messages...</div>
            ) : messages.length === 0 ? (
              <div className="p-8 text-center text-[var(--muted-foreground)]">No messages yet.</div>
            ) : (
                messages.map((m) => (
                    <button
                        key={m.id}
                        onClick={() => {
                            setSelectedMessage(m);
                            markAsRead(m.id);
                        }}
                        className={`w-full p-4 text-left border-b border-[var(--border)] hover:bg-[var(--secondary)] transition-all relative ${selectedMessage?.id === m.id ? 'bg-[var(--secondary)]' : ''}`}
                    >
                        {!m.is_read && (
                            <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-[var(--blue-primary)]" />
                        )}
                        <div className="flex justify-between items-start mb-1">
                            <h4 className={`font-bold transition-colors ${!m.is_read ? 'text-[var(--blue-dark)]' : 'text-[var(--muted-foreground)]'}`}>{m.name}</h4>
                            <span className="text-[10px] text-[var(--muted-foreground)] font-bold">{new Date(m.created_at).toLocaleDateString()}</span>
                        </div>
                        <p className="text-sm font-bold text-[var(--blue-dark)] mb-1 truncate">{m.subject}</p>
                        <p className="text-xs text-[var(--muted-foreground)] line-clamp-1">{m.message}</p>
                    </button>
                ))
            )}
          </div>
        </div>

        {/* Message Content */}
        <div className="lg:col-span-3 bg-white rounded-3xl border border-[var(--border)] overflow-hidden shadow-sm flex flex-col">
          <AnimatePresence mode="wait">
            {selectedMessage ? (
              <motion.div
                key={selectedMessage.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col h-full"
              >
                <div className="p-6 border-b border-[var(--border)] flex items-center justify-between bg-[var(--secondary)]/30">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[var(--blue-primary)] text-white flex items-center justify-center font-black text-xl">
                      {selectedMessage.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-[var(--blue-dark)]">{selectedMessage.name}</h3>
                      <p className="text-sm text-[var(--blue-primary)] font-bold">{selectedMessage.email}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button 
                        onClick={() => deleteMessage(selectedMessage.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-all"
                    >
                        <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                
                <div className="flex-1 p-8 overflow-y-auto">
                    <div className="flex items-center gap-2 text-xs font-black text-[var(--muted-foreground)] uppercase tracking-widest mb-4">
                        <Clock className="w-4 h-4" /> Received on {new Date(selectedMessage.created_at).toLocaleString()}
                    </div>
                    <h2 className="text-2xl font-black text-[var(--blue-dark)] mb-8">{selectedMessage.subject}</h2>
                    <div className="prose prose-blue max-w-none text-lg text-[var(--foreground)] leading-relaxed whitespace-pre-wrap bg-[var(--secondary)]/20 p-8 rounded-[32px] border border-[var(--border)]">
                        {selectedMessage.message}
                    </div>
                </div>

                <div className="p-6 border-t border-[var(--border)]">
                    <a
                        href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                        className="w-full py-4 bg-[var(--blue-dark)] text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-[var(--blue-primary)] transition-all shadow-lg"
                    >
                        <Mail className="w-5 h-5" />
                        Reply by Email
                    </a>
                </div>
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-[var(--muted-foreground)] p-12 text-center">
                <div className="w-20 h-20 rounded-full bg-[var(--secondary)] flex items-center justify-center mb-6">
                    <Mail className="w-10 h-10 opacity-20" />
                </div>
                <h3 className="text-xl font-bold mb-2">Select a Message</h3>
                <p>Choose an inquiry from the list to view its contents and reply.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
