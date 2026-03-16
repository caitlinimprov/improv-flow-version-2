import { useState, useEffect } from "react";
import { Plus, Trash2, StickyNote, Pencil } from "lucide-react";

interface Note {
  id: string;
  text: string;
  createdAt: number;
}

const STORAGE_KEY = "impro-notes";

const NotesSection = () => {
  const [notes, setNotes] = useState<Note[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch {
      return [];
    }
  });
  const [draft, setDraft] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    const trimmed = draft.trim();
    if (!trimmed) return;
    setNotes((prev) => [
      { id: crypto.randomUUID(), text: trimmed, createdAt: Date.now() },
      ...prev,
    ]);
    setDraft("");
  };

  const removeNote = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  const formatDate = (ts: number) =>
    new Date(ts).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });

  return (
    <section className="py-24 px-6 bg-retro-grid">
      <div className="container max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-accent font-bold text-sm tracking-widest uppercase mb-3">📝 Your Brain</p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Improv Notebook
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Jot down character ideas, scene notes, things to try, stuff that bombed — whatever helps you grow.
          </p>
        </div>

        {/* Input */}
        <div className="flex gap-3 mb-8">
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                addNote();
              }
            }}
            placeholder="New character idea, scene note, something to remember…"
            className="flex-1 min-h-[52px] max-h-40 resize-y rounded-xl border-2 border-border bg-card-gradient px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 transition-colors font-body"
            rows={1}
          />
          <button
            onClick={addNote}
            disabled={!draft.trim()}
            className="shrink-0 h-[52px] w-[52px] rounded-xl bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/80 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Plus size={22} />
          </button>
        </div>

        {/* Notes list */}
        {notes.length > 0 ? (
          <div className="grid gap-3">
            {notes.map((note) => (
              <div
                key={note.id}
                className="group flex gap-4 items-start p-5 rounded-2xl border-2 border-border bg-card-gradient hover:border-accent/30 transition-all duration-300"
              >
                <Pencil size={16} className="text-accent shrink-0 mt-1 opacity-60" />
                <div className="flex-1 min-w-0">
                  <p className="text-foreground text-sm whitespace-pre-wrap leading-relaxed">{note.text}</p>
                  <p className="text-muted-foreground text-xs mt-2 font-medium">{formatDate(note.createdAt)}</p>
                </div>
                <button
                  onClick={() => removeNote(note.id)}
                  className="shrink-0 text-muted-foreground hover:text-destructive transition-colors opacity-0 group-hover:opacity-100"
                  title="Delete note"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-muted-foreground">
            <StickyNote size={40} className="mx-auto mb-4 opacity-40" />
            <p className="text-lg font-bold">No notes yet!</p>
            <p className="text-sm mt-1">Start capturing your improv thoughts above.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default NotesSection;
