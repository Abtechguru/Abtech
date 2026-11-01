import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, Check, Clock3, Inbox, Mail, RefreshCcw, Search, Trash2 } from "lucide-react";
import { useData } from "../../contexts/DataContext";
import { supabase } from "../../utils/supabase";

type InboxFilter = "all" | "unread";

export function MessagesViewer() {
  const { user, messages, isLoading, dataError, refreshMessages, markMessageRead, deleteMessage } = useData();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<InboxFilter>("all");
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const unread = messages.filter(message => !message.isRead).length;
  const filtered = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();
    return messages.filter(message => {
      if (filter === "unread" && message.isRead) return false;
      if (!query) return true;
      return [message.name, message.email, message.subject, message.message].some(field =>
        (field || "").toLocaleLowerCase().includes(query));
    });
  }, [messages, filter, search]);
  const selected = messages.find(message => message.id === selectedId);

  useEffect(() => {
    if (!user?.id) return;
    const subscription = supabase
      .channel("portfolio-inbox-" + user.id)
      .on("postgres_changes", {
        event: "*",
        schema: "public",
        table: "messages",
        filter: "to_user_id=eq." + user.id
      }, () => { void refreshMessages(); })
      .subscribe();

    // Manual Refresh remains available if database replication is disabled.
    return () => { void supabase.removeChannel(subscription); };
  }, [user?.id]);

  async function reload() {
    setBusy(true);
    setNotice(null);
    try {
      const { error } = await refreshMessages();
      if (error) setNotice("Unable to refresh inbox: " + (error.message || "Please try again."));
    } catch {
      setNotice("The inbox could not be refreshed. Check your connection.");
    } finally { setBusy(false); }
  }

  async function openMessage(id: string, isRead: boolean) {
    setSelectedId(id);
    setNotice(null);
    if (isRead) return;
    try {
      const { error } = await markMessageRead(id);
      if (error) setNotice("Unable to mark message as read: " + (error.message || "Please try again."));
    } catch {
      setNotice("Could not update the message. Please try again.");
    }
  }

  async function remove(id: string) {
    if (!window.confirm("Permanently delete this inquiry? This action cannot be undone.")) return;
    setBusy(true);
    setNotice(null);
    try {
      const { error } = await deleteMessage(id);
      if (error) setNotice("Unable to delete message: " + (error.message || "Please try again."));
      else if (selectedId === id) setSelectedId(null);
    } catch {
      setNotice("The message could not be deleted. Please try again.");
    } finally { setBusy(false); }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase tracking-[.17em] font-black text-[var(--orange)]">COMMUNICATIONS / INBOX</span>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-[var(--blue-dark)] mt-3">Conversations that matter.</h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-2">Contact inquiries from your connected portfolio database.</p>
        </div>
        <button type="button" disabled={busy || isLoading} onClick={reload} className="inline-flex items-center gap-2 border border-[var(--border)] rounded-lg px-4 py-3 bg-white text-sm font-bold hover:border-[var(--orange)] disabled:opacity-50">
          <RefreshCcw size={16} className={busy ? "animate-spin" : ""} /> Refresh inbox
        </button>
      </div>
      {dataError && <p role="alert" className="rounded-lg bg-amber-50 text-amber-900 border border-amber-200 p-3 text-sm">{dataError}</p>}
      {notice && <p className="rounded-lg bg-red-50 text-red-800 border border-red-200 p-3 text-sm" role="alert">{notice}</p>}
      <div className="grid lg:grid-cols-[minmax(280px,.85fr)_minmax(0,1.15fr)] gap-5 items-start">
        <section className="bg-white border border-[var(--border)] rounded-xl overflow-hidden">
          <div className="p-5 border-b border-[var(--border)] space-y-4">
            <div className="relative">
              <Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]" />
              <input aria-label="Search inbox" type="search" value={search} onChange={event => setSearch(event.target.value)}
                placeholder="Search name, email or subject" className="w-full pl-10 pr-4 py-3 border border-[var(--border)] bg-[var(--secondary)] rounded-lg text-sm outline-none focus:border-[var(--orange)]" />
            </div>
            <div className="flex gap-2" role="group" aria-label="Filter inbox">
              <button type="button" aria-pressed={filter === "all"} onClick={() => setFilter("all")}
                className={"rounded-md px-4 py-2 text-xs font-bold " + (filter === "all" ? "bg-[var(--orange)] text-white" : "bg-[var(--secondary)] text-[var(--muted-foreground)]")}>
                All ({messages.length})
              </button>
              <button type="button" aria-pressed={filter === "unread"} onClick={() => setFilter("unread")}
                className={"rounded-md px-4 py-2 text-xs font-bold " + (filter === "unread" ? "bg-[var(--orange)] text-white" : "bg-[var(--secondary)] text-[var(--muted-foreground)]")}>
                Unread ({unread})
              </button>
            </div>
          </div>
          <div className="max-h-[680px] overflow-y-auto">
            {isLoading ? <p role="status" className="p-8 text-sm text-center text-[var(--muted-foreground)]">Loading messages…</p> :
            filtered.length === 0 ? <div className="p-10 text-center text-[var(--muted-foreground)]">
              <Inbox size={34} className="mx-auto mb-3 text-[var(--orange)]" />
              <p className="text-sm font-bold text-[var(--blue-dark)]">{messages.length ? "No messages match these filters" : "Your inbox is clear"}</p>
              <p className="text-xs mt-2">{messages.length ? "Adjust your search or filter." : "New inquiries will appear when visitors submit the contact form."}</p>
            </div> : filtered.map(message => (
              <button key={message.id} type="button" onClick={() => { void openMessage(message.id, message.isRead); }}
                aria-pressed={selectedId === message.id}
                className={"w-full text-left border-b border-[var(--border)] p-5 transition-colors hover:bg-orange-50 " +
                  (selectedId === message.id ? "bg-[#fff2e9] border-l-4 border-l-[var(--orange)]" : "")}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center min-w-0 gap-2">
                    {!message.isRead && <span className="h-2 w-2 shrink-0 rounded-full bg-[var(--orange)]" aria-label="Unread" />}
                    <h3 className="font-bold text-sm text-[var(--blue-dark)] truncate">{message.name}</h3>
                  </div>
                  <span className="text-[10px] text-[var(--muted-foreground)] whitespace-nowrap">{new Date(message.createdAt).toLocaleDateString()}</span>
                </div>
                <p className="text-sm font-medium mt-2 text-[var(--blue-dark)] truncate">{message.subject || "No subject"}</p>
                <p className="text-xs mt-2 text-[var(--muted-foreground)] line-clamp-2">{message.message}</p>
              </button>))}
          </div>
        </section>

        <section className="bg-white border border-[var(--border)] rounded-xl overflow-hidden min-h-[420px]" aria-label="Selected inquiry">
          {!selected ? <div className="flex flex-col items-center justify-center text-center p-14 min-h-[420px]">
            <Mail size={39} className="text-[var(--orange)] mb-5" strokeWidth={1.5} />
            <h2 className="text-xl font-bold text-[var(--blue-dark)]">Choose a conversation</h2>
            <p className="text-sm text-[var(--muted-foreground)] mt-2 max-w-sm">Select an inquiry to read the full message and reply using your email client.</p>
          </div> : <div>
            <div className="flex flex-wrap gap-4 justify-between items-center border-b border-[var(--border)] p-5">
              <div><span className="text-[10px] uppercase tracking-[.14em] text-[var(--orange)] font-bold">INCOMING MESSAGE</span><h2 className="text-xl font-bold mt-2 text-[var(--blue-dark)]">{selected.subject || "No subject"}</h2></div>
              <button type="button" aria-label="Delete selected message" disabled={busy} onClick={() => { void remove(selected.id); }}
                className="p-3 bg-red-50 text-red-700 border border-red-200 rounded-lg hover:bg-red-100"><Trash2 size={18} /></button>
            </div>
            <div className="p-6 md:p-8 space-y-7">
              <div className="flex flex-wrap justify-between gap-4">
                <div><h3 className="font-bold text-[var(--blue-dark)]">{selected.name}</h3><a href={"mailto:" + selected.email} className="text-sm text-[var(--orange)] hover:underline break-all">{selected.email}</a></div>
                <div className="text-xs text-[var(--muted-foreground)] flex items-center gap-2"><Clock3 size={15} />{new Date(selected.createdAt).toLocaleString()}</div>
              </div>
              <p className="text-sm leading-relaxed text-[var(--blue-dark)] whitespace-pre-wrap break-words">{selected.message}</p>
              <div className="pt-6 border-t border-[var(--border)] flex flex-wrap gap-4 items-center justify-between">
                <a href={"mailto:" + selected.email + "?subject=" + encodeURIComponent("Re: " + (selected.subject || "Your inquiry"))}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[var(--orange)] text-white font-bold text-sm hover:opacity-90">
                  <Mail size={16} /> Reply by email <ArrowUpRight size={16} />
                </a>
                {selected.isRead && <span className="flex items-center gap-2 text-xs text-green-700"><Check size={16} /> Read</span>}
              </div>
            </div>
          </div>}
        </section>
      </div>
      <p className="text-xs text-[var(--muted-foreground)]">New messages can appear automatically when Supabase Realtime replication is enabled; use Refresh inbox if updates are not arriving.</p>
    </div>
  );
}
