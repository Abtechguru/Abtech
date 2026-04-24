import { motion } from "motion/react";
import { Mail, Trash2, Eye, Clock, User, Reply, Archive, Send, X } from "lucide-react";
import { useState } from "react";

interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: string;
  read: boolean;
  archived: boolean;
  replied?: boolean;
  replyText?: string;
  replyTimestamp?: string;
}

export function MessagesViewer() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      message: "Hi Lateef, I'm interested in collaborating on a fintech project. I'd love to discuss your experience with payment integrations and how we might work together.",
      timestamp: "2026-04-24T10:30:00",
      read: false,
      archived: false
    },
    {
      id: "2",
      name: "Sarah Smith",
      email: "sarah@techcorp.com",
      message: "Your AI engineering work is impressive! We're looking for someone with RAG pipeline experience for our startup. Would you be open to a conversation?",
      timestamp: "2026-04-23T14:15:00",
      read: true,
      archived: false
    },
    {
      id: "3",
      name: "Mike Johnson",
      email: "mike@startup.io",
      message: "Saw your Somietech Connect project. We're building something similar and would love to pick your brain about scaling fintech infrastructure.",
      timestamp: "2026-04-22T09:45:00",
      read: true,
      archived: false
    },
    {
      id: "4",
      name: "Emily Chen",
      email: "emily@agency.com",
      message: "We have a client who needs a fullstack developer with your exact skill set. Are you available for contract work?",
      timestamp: "2026-04-21T16:20:00",
      read: false,
      archived: false
    }
  ]);

  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [filter, setFilter] = useState<"all" | "unread" | "archived">("all");
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyText, setReplyText] = useState("");

  const handleMarkAsRead = (id: string) => {
    setMessages(messages.map(m => m.id === id ? { ...m, read: true } : m));
  };

  const handleArchive = (id: string) => {
    setMessages(messages.map(m => m.id === id ? { ...m, archived: true } : m));
    setSelectedMessage(null);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this message?")) {
      setMessages(messages.filter(m => m.id !== id));
      setSelectedMessage(null);
    }
  };

  const handleSelectMessage = (message: Message) => {
    setSelectedMessage(message);
    setShowReplyBox(false);
    setReplyText("");
    if (!message.read) {
      handleMarkAsRead(message.id);
    }
  };

  const handleSendReply = () => {
    if (!selectedMessage || !replyText.trim()) return;

    setMessages(messages.map(m =>
      m.id === selectedMessage.id
        ? {
            ...m,
            replied: true,
            replyText: replyText,
            replyTimestamp: new Date().toISOString()
          }
        : m
    ));

    setSelectedMessage({
      ...selectedMessage,
      replied: true,
      replyText: replyText,
      replyTimestamp: new Date().toISOString()
    });

    console.log("Sending reply to:", selectedMessage.email, "Message:", replyText);
    alert(`Reply sent to ${selectedMessage.email}`);
    setShowReplyBox(false);
    setReplyText("");
  };

  const filteredMessages = messages.filter(m => {
    if (filter === "unread") return !m.read && !m.archived;
    if (filter === "archived") return m.archived;
    return !m.archived;
  });

  const unreadCount = messages.filter(m => !m.read && !m.archived).length;

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins} mins ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    return `${diffDays} days ago`;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl mb-2">Contact Messages</h1>
          <p className="text-[var(--muted-foreground)]">
            {unreadCount} unread message{unreadCount !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-xl transition-all ${
              filter === "all"
                ? "bg-[var(--orange)] text-white"
                : "bg-[var(--secondary)] hover:bg-[var(--muted)]"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("unread")}
            className={`px-4 py-2 rounded-xl transition-all ${
              filter === "unread"
                ? "bg-[var(--orange)] text-white"
                : "bg-[var(--secondary)] hover:bg-[var(--muted)]"
            }`}
          >
            Unread ({unreadCount})
          </button>
          <button
            onClick={() => setFilter("archived")}
            className={`px-4 py-2 rounded-xl transition-all ${
              filter === "archived"
                ? "bg-[var(--orange)] text-white"
                : "bg-[var(--secondary)] hover:bg-[var(--muted)]"
            }`}
          >
            Archived
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Messages List */}
        <div className="lg:col-span-1 space-y-3 max-h-[700px] overflow-y-auto">
          {filteredMessages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => handleSelectMessage(message)}
              className={`p-4 rounded-xl cursor-pointer transition-all ${
                selectedMessage?.id === message.id
                  ? "bg-[var(--orange-glow)] border-2 border-[var(--orange)]"
                  : message.read
                  ? "bg-[var(--card)] border border-[var(--border)] hover:border-[var(--orange)]"
                  : "bg-[var(--card)] border-2 border-[var(--orange)]/40 hover:border-[var(--orange)]"
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[var(--orange-glow)] flex items-center justify-center">
                    <User className="w-4 h-4 text-[var(--orange)]" />
                  </div>
                  <div>
                    <h4 className="text-sm">{message.name}</h4>
                    <p className="text-xs text-[var(--muted-foreground)]">{message.email}</p>
                  </div>
                </div>
                {!message.read && (
                  <div className="w-2 h-2 rounded-full bg-[var(--orange)]" />
                )}
              </div>
              <p className="text-sm text-[var(--muted-foreground)] line-clamp-2 mb-2">
                {message.message}
              </p>
              <div className="flex items-center gap-1 text-xs text-[var(--muted-foreground)]">
                <Clock className="w-3 h-3" />
                {formatTimestamp(message.timestamp)}
              </div>
            </motion.div>
          ))}

          {filteredMessages.length === 0 && (
            <div className="text-center py-12 text-[var(--muted-foreground)]">
              <Mail className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p>No messages found</p>
            </div>
          )}
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-2">
          {selectedMessage ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)]"
            >
              <div className="flex items-start justify-between mb-6 pb-6 border-b border-[var(--border)]">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[var(--orange-glow)] flex items-center justify-center">
                    <User className="w-6 h-6 text-[var(--orange)]" />
                  </div>
                  <div>
                    <h3 className="text-xl mb-1">{selectedMessage.name}</h3>
                    <p className="text-sm text-[var(--muted-foreground)] mb-2">{selectedMessage.email}</p>
                    <div className="flex items-center gap-2 text-xs text-[var(--muted-foreground)]">
                      <Clock className="w-3 h-3" />
                      {new Date(selectedMessage.timestamp).toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleArchive(selectedMessage.id)}
                    className="w-10 h-10 rounded-lg bg-[var(--secondary)] flex items-center justify-center hover:bg-[var(--muted)] transition-all"
                    title="Archive"
                  >
                    <Archive className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(selectedMessage.id)}
                    className="w-10 h-10 rounded-lg bg-red-500/10 text-red-500 flex items-center justify-center hover:bg-red-500/20 transition-all"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-sm text-[var(--muted-foreground)] mb-3">Message</h4>
                <p className="text-[var(--foreground)] leading-relaxed whitespace-pre-wrap">
                  {selectedMessage.message}
                </p>
              </div>

              {/* Previous Reply */}
              {selectedMessage.replied && selectedMessage.replyText && (
                <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Reply className="w-4 h-4 text-green-500" />
                    <h4 className="text-sm text-green-500">Your Reply</h4>
                    <span className="text-xs text-[var(--muted-foreground)] ml-auto">
                      {selectedMessage.replyTimestamp && formatTimestamp(selectedMessage.replyTimestamp)}
                    </span>
                  </div>
                  <p className="text-sm text-[var(--foreground)] leading-relaxed">
                    {selectedMessage.replyText}
                  </p>
                </div>
              )}

              {/* Reply Box */}
              {showReplyBox && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mb-6 p-4 rounded-xl bg-[var(--secondary)] border border-[var(--border)]"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm">Write Your Reply</h4>
                    <button
                      onClick={() => {
                        setShowReplyBox(false);
                        setReplyText("");
                      }}
                      className="text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder={`Reply to ${selectedMessage.name}...`}
                    className="w-full px-4 py-3 rounded-xl bg-[var(--background)] border border-[var(--border)] focus:border-[var(--orange)] focus:outline-none min-h-32 mb-3"
                  />
                  <button
                    onClick={handleSendReply}
                    disabled={!replyText.trim()}
                    className="w-full px-6 py-3 bg-[var(--orange)] text-white rounded-xl flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[var(--orange-glow)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4" /> Send Reply
                  </button>
                </motion.div>
              )}

              <div className="flex gap-3">
                {!showReplyBox && (
                  <button
                    onClick={() => setShowReplyBox(true)}
                    className="flex-1 px-6 py-3 bg-[var(--orange)] text-white rounded-xl flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[var(--orange-glow)] transition-all"
                  >
                    <Reply className="w-4 h-4" /> Reply to Client
                  </button>
                )}
                <a
                  href={`mailto:${selectedMessage.email}`}
                  className="px-6 py-3 bg-[var(--secondary)] rounded-xl flex items-center justify-center gap-2 hover:bg-[var(--muted)] transition-all"
                >
                  <Mail className="w-4 h-4" /> Open in Mail
                </a>
              </div>
            </motion.div>
          ) : (
            <div className="h-full flex items-center justify-center p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)]">
              <div className="text-center text-[var(--muted-foreground)]">
                <Mail className="w-16 h-16 mx-auto mb-4 opacity-30" />
                <p>Select a message to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
