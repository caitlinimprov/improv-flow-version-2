import { useState, useEffect } from "react";
import { Plus, Trash2, Pencil } from "lucide-react";

interface Note {
  id: string;
  text: string;
  createdAt: number;
}

const STORAGE_KEY = "bunny-bunny-notes";

const NotesSection = () => {
  const [notes, setNotes] = useState<Note[]>(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); }
    catch { return []; }
  });
  const [draft, setDraft] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    const trimmed = draft.trim();
    if (!trimmed) return;
    setNotes(prev => [{ id: crypto.randomUUID(), text: trimmed, createdAt: Date.now() }, ...prev]);
    setDraft("");
  };

  const removeNote = (id: string) => setNotes(prev => prev.filter(n => n.id !== id));

  const formatDate = (ts: number) =>
    new Date(ts).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });

  return (
    <section className="py-20 px-6 border-t-2 border-foreground/20">
      <div className="container max-w-3xl mx-auto">
        <div className="mb-10">
          <p className="font-mono-editorial text-xs tracking-widest uppercase mb-2 text-primary">— your brain —</p>
          <h2 className="font-display text-6xl md:text-8xl text-foreground leading-none mb-4">NOTES</h2>
          <p className="font-mono-editorial text-sm text-foreground/60 max-w-lg">
            Character ideas. Scene notes. Things to try. Stuff that bombed. Whatever helps you grow.
          </p>
        </div>

        <div className="flex gap-3 mb-8">
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); addNote(); } }}
            placeholder="new idea, scene note, something to remember..."
            className="flex-1 min-h-[52px] max-h-40 resize-y border-2 border-foreground/20 bg-transparent px-4 py-3 font-mono-editorial text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-primary transition-colors"
            rows={1}
          />
          <button
            onClick={addNote}
            disabled={!draft.trim()}
            className="shrink-0 h-[52px] w-[52px] border-2 border-primary bg-transparent text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <Plus size={20} />
          </button>
        </div>

        {notes.length > 0 ? (
          <div className="grid gap-3">
            {notes.map((note) => (
              <div
                key={note.id}
                className="group flex gap-4 items-start p-5 border-2 border-foreground/20 hover:border-primary/40 transition-all duration-300"
              >
                <Pencil size={14} className="text-primary shrink-0 mt-1 opacity-50" />
                <div className="flex-1 min-w-0">
                  <p className="font-mono-editorial text-sm text-foreground whitespace-pre-wrap leading-relaxed">{note.text}</p>
                  <p className="font-mono-editorial text-xs text-foreground/30 mt-2">{formatDate(note.createdAt)}</p>
                </div>
                <button
                  onClick={() => removeNote(note.id)}
                  className="shrink-0 text-foreground/20 hover:text-primary transition-colors opacity-0 group-hover:opacity-100"
                  title="delete note"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-16 border-2 border-foreground/10 text-center">
            <p className="font-display text-4xl text-foreground/20 mb-2">NOTHING YET</p>
            <p className="font-mono-editorial text-xs text-foreground/30">start capturing your improv thoughts above.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default NotesSection;
