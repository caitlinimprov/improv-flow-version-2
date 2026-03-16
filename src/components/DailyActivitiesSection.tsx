import { useState, useEffect } from "react";
import { CheckCircle2, Circle, Trophy, Flame, RotateCcw } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface Activity {
  id: string;
  emoji: string;
  title: string;
  description: string;
}

const ACTIVITIES: Activity[] = [
  {
    id: "talk",
    emoji: "🗣️",
    title: "Talk to a New Person",
    description: "Strike up a 5-minute conversation with someone you don't usually talk to. Practice active listening!",
  },
  {
    id: "object-work",
    emoji: "☕",
    title: "Object Work Practice",
    description: "Practice making coffee, eating cereal, or something you just did — without any real objects. Make it vivid!",
  },
  {
    id: "walks",
    emoji: "🚶",
    title: "Character Walks",
    description: "Walk as 3 different characters. Try old, rushed, royalty. Notice how each walk changes how you feel.",
  },
  {
    id: "yes-and",
    emoji: "✅",
    title: 'Say "Yes, And…"',
    description: "In a real conversation today, practice accepting what someone says and building on it instead of redirecting.",
  },
  {
    id: "observe",
    emoji: "👀",
    title: "People Watch for 10 Min",
    description: "Sit somewhere public. Pick a stranger and invent their entire backstory. The weirder, the better.",
  },
  {
    id: "emotion",
    emoji: "🎭",
    title: "Emotion Replay",
    description: "Retell something that happened today — but in a completely different emotion. Sad grocery trip? Furious breakfast?",
  },
  {
    id: "gibberish",
    emoji: "🤪",
    title: "1 Minute of Gibberish",
    description: "Speak total nonsense out loud for 60 seconds. Commit to the sounds. It frees up your brain!",
  },
];

const getWeekKey = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const week = Math.ceil(((now.getTime() - start.getTime()) / 86400000 + start.getDay() + 1) / 7);
  return `impro-week-${now.getFullYear()}-${week}`;
};

const DailyActivitiesSection = () => {
  const weekKey = getWeekKey();
  const [completed, setCompleted] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(weekKey) || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(weekKey, JSON.stringify(completed));
  }, [completed, weekKey]);

  const toggle = (id: string) => {
    setCompleted((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const reset = () => setCompleted([]);

  const pct = Math.round((completed.length / ACTIVITIES.length) * 100);
  const allDone = completed.length === ACTIVITIES.length;

  return (
    <section className="py-24 px-6 bg-spotlight">
      <div className="container max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-secondary font-bold text-sm tracking-widest uppercase mb-3">
            🔥 Daily Reps
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Level Up This Week
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Improv is a muscle. These daily micro-exercises keep you sharp, loose, and ready for anything.
          </p>
        </div>

        {/* Progress bar */}
        <div className="mb-10 p-6 rounded-2xl border-2 border-border bg-card-gradient">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              {allDone ? (
                <Trophy size={20} className="text-accent" />
              ) : (
                <Flame size={20} className="text-primary" />
              )}
              <span className="font-bold text-foreground text-lg">
                {completed.length}/{ACTIVITIES.length} completed
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-primary">{pct}%</span>
              <button
                onClick={reset}
                className="text-muted-foreground hover:text-foreground transition-colors"
                title="Reset week"
              >
                <RotateCcw size={16} />
              </button>
            </div>
          </div>
          <Progress value={pct} className="h-3 bg-muted" />
          {allDone && (
            <p className="text-accent font-bold text-sm mt-3 text-center animate-bounce">
              🎉 You crushed it this week! Legend status unlocked.
            </p>
          )}
        </div>

        {/* Activity list */}
        <div className="grid gap-4">
          {ACTIVITIES.map((activity) => {
            const done = completed.includes(activity.id);
            return (
              <button
                key={activity.id}
                onClick={() => toggle(activity.id)}
                className={`flex gap-4 items-start p-5 rounded-2xl border-2 text-left transition-all duration-300 ${
                  done
                    ? "border-secondary/50 bg-secondary/5 opacity-75"
                    : "border-border bg-card-gradient hover:border-primary/40 hover:-translate-y-0.5"
                }`}
              >
                <span className="text-2xl shrink-0 mt-0.5">
                  {done ? (
                    <CheckCircle2 size={28} className="text-secondary" />
                  ) : (
                    <Circle size={28} className="text-muted-foreground" />
                  )}
                </span>
                <div className="flex-1 min-w-0">
                  <h3 className={`text-lg font-bold mb-1 ${done ? "line-through text-muted-foreground" : "text-foreground"}`}>
                    {activity.emoji} {activity.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {activity.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DailyActivitiesSection;
