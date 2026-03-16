import { Sparkles, MessageCircle, ThumbsUp } from "lucide-react";

const tips = [
  {
    emoji: "👂",
    title: "Listen First",
    text: "Great improv starts with truly hearing your scene partner. React to what they give you, not what you planned.",
  },
  {
    emoji: "💬",
    title: "Make Statements",
    text: "Don't ask questions — make bold choices. 'We're on Mars!' is more powerful than 'Where are we?'",
  },
  {
    emoji: "🤸",
    title: "Embrace Failure",
    text: "The best improvisers fail joyfully. Every mistake is a gift — it's an unexpected offer to build from.",
  },
];

const TipsSection = () => (
  <section className="py-24 px-6 bg-spotlight">
    <div className="container max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <p className="text-accent font-bold text-sm tracking-widest uppercase mb-3">✏️ Learn</p>
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          Golden Rules of Improv
        </h2>
      </div>
      <div className="grid gap-6">
        {tips.map((tip, i) => (
          <div
            key={tip.title}
            className="flex gap-5 items-start p-6 rounded-2xl border-2 border-border bg-card-gradient hover:border-secondary/40 transition-all duration-300"
          >
            <span className="text-3xl shrink-0">{tip.emoji}</span>
            <div>
              <h3 className="text-xl font-bold text-foreground mb-1">{tip.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{tip.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TipsSection;
