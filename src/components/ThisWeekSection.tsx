import { useState, useEffect } from "react";
import { CheckCircle2, Circle, RotateCcw, Flame, Trophy } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const WEEK = {
  theme: "Show Up Week",
  number: 1,
  learn: "The hardest part of improv is not being funny. It is walking into the room. Del Close, the godfather of modern improv, used to say the only real mistake is not showing up. Every great improviser you have ever seen started by just walking through the door, having no idea what they were doing. That is the whole game. Show up. The rest figures itself out.",
  reward: { text: "The only rule is work.", author: "Corita Kent" },
  fact: { stat: "1955", context: "The year Viola Spolin published the first improv exercises ever written down. Before that, nobody had a rulebook. Everyone was just showing up and figuring it out." },
  activities: [
    { id: "stranger", emoji: "🗣️", title: "Talk to a Stranger", description: "Strike up a 5-minute conversation with someone you don't usually talk to. No agenda. Just show up." },
    { id: "gibberish", emoji: "🤪", title: "1 Minute of Gibberish", description: "Speak total nonsense out loud for 60 seconds. Commit to the sounds. It frees up your brain." },
    { id: "walks", emoji: "🚶", title: "Character Walks", description: "Walk as 3 different characters. Old, rushed, royalty. Notice how each walk changes how you feel." },
    { id: "yes", emoji: "✅", title: "Say Yes to Something", description: "Say yes to something you would normally decline today. Small or big. Just say yes." },
    { id: "emotion", emoji: "🎭", title: "Emotion Replay", description: "Retell something that happened today in a completely different emotion. Sad grocery trip? Furious breakfast?" },
    { id: "observe", emoji: "👀", title: "People Watch", description: "Sit somewhere public for 10 minutes. Pick a stranger and invent their entire backstory. The weirder the better." },
    { id: "embarrass", emoji: "😬", title: "Do Something Embarrassing", description: "Do something slightly embarrassing on purpose, alone. Dance in your kitchen. Talk to yourself on the street. Show up anyway." },
  ]
};

const getWeekKey = () => "bunny-bunny-week-" + WEEK.number;

const ThisWeekSection = () => {
  const weekKey = getWeekKey();
  const [completed, setCompleted] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem(weekKey) || "[]"); }
    catch { return []; }
  });
  const [showReward, setShowReward] = useState(false);

  useEffect(() => {
    localStorage.setItem(weekKey, JSON.stringify(completed));
    if (completed.length === WEEK.activities.length) {
      setTimeout(() => setShowReward(true), 400);
    }
  }, [completed, weekKey]);

  const toggle = (id: string) => {
    setCompleted(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]);
  };

  const reset = () => { setCompleted([]); setShowReward(false); };

  const pct = Math.round((completed.length / WEEK.activities.length) * 100);
  const allDone = completed.length === WEEK.activities.length;

  return (
    <section className="py-20 px-6 border-t-2 border-foreground/20">
      <div className="container max-w-4xl mx-auto">

        <div className="mb-12">
          <p className="font-mono-editorial text-xs tracking-widest uppercase mb-2 text-primary">— this week —</p>
          <h2 className="font-display text-6xl md:text-8xl text-foreground leading-none mb-8">
            {WEEK.theme.toUpperCase()}
          </h2>
          <div className="border-l-2 border-primary pl-6 max-w-2xl">
            <p className="font-mono-editorial text-sm text-foreground/80 leading-relaxed">{WEEK.learn}</p>
          </div>
        </div>

        <div className="mb-8 border-2 border-foreground/20 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              {allDone ? <Trophy size={18} className="text-primary" /> : <Flame size={18} className="text-primary" />}
              <span className="font-mono-editorial text-sm text-foreground">
                {completed.length}/{WEEK.activities.length} completed
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-mono-editorial text-xs text-primary font-bold">{pct}%</span>
              <button onClick={reset} className="font-mono-editorial text-xs text-foreground/40 hover:text-foreground transition-colors">
                reset
              </button>
            </div>
          </div>
          <Progress value={pct} className="h-1 bg-foreground/10" />
        </div>

        {showReward && allDone && (
          <div className="mb-8 border-2 border-primary p-6 bg-primary/5">
            <p className="font-mono-editorial text-xs tracking-widest uppercase text-primary mb-4">— you showed up. all 7. —</p>
            <p className="font-display text-4xl text-foreground mb-2">"{WEEK.reward.text}"</p>
            <p className="font-mono-editorial text-xs text-primary tracking-widest uppercase">— {WEEK.reward.author}</p>
          </div>
        )}

        <div className="grid gap-3">
          {WEEK.activities.map((activity) => {
            const done = completed.includes(activity.id);
            return (
              <button
                key={activity.id}
                onClick={() => toggle(activity.id)}
                className={"flex gap-4 items-start p-5 border-2 text-left transition-all duration-200 w-full " + (done ? "border-primary/40 bg-primary/5 opacity-70" : "border-foreground/20 hover:border-primary bg-transparent")}
              >
                <span className="shrink-0 mt-0.5">
                  {done
                    ? <CheckCircle2 size={22} className="text-primary" />
                    : <Circle size={22} className="text-foreground/30" />
                  }
                </span>
                <div className="flex-1 min-w-0">
                  <h3 className={"font-display text-2xl mb-1 " + (done ? "line-through text-foreground/40" : "text-foreground")}>
                    {activity.emoji} {activity.title.toUpperCase()}
                  </h3>
                  <p className="font-mono-editorial text-xs text-foreground/60 leading-relaxed">{activity.description}</p>
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ThisWeekSection;
