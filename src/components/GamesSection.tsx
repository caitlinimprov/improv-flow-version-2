import { useState, useCallback, useRef } from "react";
import { Zap, Users, Lightbulb, Smile, Heart, Star, Shuffle } from "lucide-react";

interface GameCardProps {
  title: string;
  description: string;
  players: string;
  difficulty: "Easy" | "Medium" | "Hard";
  icon: React.ReactNode;
  emoji: string;
}

const difficultyColor = {
  Easy: "bg-secondary/20 text-secondary",
  Medium: "bg-accent/20 text-accent",
  Hard: "bg-primary/20 text-primary",
};

const GameCard = ({ title, description, players, difficulty, emoji, isHighlighted, cardRef }: GameCardProps & { isHighlighted?: boolean; cardRef?: React.Ref<HTMLDivElement> }) => (
  <div
    ref={cardRef}
    className={`bg-card-gradient border-2 rounded-none p-6 transition-all duration-500 group ${
      isHighlighted
        ? "border-primary scale-[1.03] shadow-[4px_4px_0px_#E8007A]"
        : "border-foreground/30 hover:border-primary hover:shadow-[4px_4px_0px_#E8007A]"
    }`}
  >
    <div className="flex items-start justify-between mb-4">
      <span className="text-3xl">{emoji}</span>
      <span className={`text-xs font-bold px-3 py-1 rounded-full ${difficultyColor[difficulty]}`}>
        {difficulty}
      </span>
    </div>
    <h3 className="text-xl font-bold mb-2 text-foreground">{title}</h3>
    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{description}</p>
    <div className="flex items-center gap-1.5 text-secondary text-xs font-medium">
      <Users size={14} />
      <span>{players}</span>
    </div>
  </div>
);

const games: GameCardProps[] = [
  { title: "Yes, And...", description: "The foundation of improv. Accept what your partner offers and build on it. Never deny, always expand.", players: "2+ players", difficulty: "Easy", icon: <Heart size={22} />, emoji: "💛" },
  { title: "Freeze Tag", description: "Two performers act out a scene. Anyone can yell 'Freeze!', tap in, and start a completely new scene.", players: "4-10 players", difficulty: "Medium", icon: <Zap size={22} />, emoji: "🧊" },
  { title: "Scenes From a Hat", description: "Audience suggestions are drawn from a hat. Performers must instantly create a scene from each prompt.", players: "3-6 players", difficulty: "Easy", icon: <Star size={22} />, emoji: "🎩" },
  { title: "Emotional Rollercoaster", description: "Act out a scene while rapidly switching between emotions called out by the audience or host.", players: "2-4 players", difficulty: "Medium", icon: <Smile size={22} />, emoji: "🎢" },
  { title: "Story Spine", description: "Build a story collaboratively using the structure: 'Once upon a time... Every day... Until one day...'", players: "3-8 players", difficulty: "Easy", icon: <Lightbulb size={22} />, emoji: "📖" },
  { title: "The Harold", description: "A long-form improv format weaving three separate scenes that gradually connect into one unified narrative.", players: "5-8 players", difficulty: "Hard", icon: <Users size={22} />, emoji: "🧠" },
];

const GamesSection = () => {
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const pickRandom = useCallback(() => {
    if (isSpinning) return;
    setIsSpinning(true);
    setHighlightedIndex(null);

    let count = 0;
    const totalCycles = 12 + Math.floor(Math.random() * 6);
    const finalIndex = Math.floor(Math.random() * games.length);

    const cycle = () => {
      const currentIndex = count < totalCycles ? count % games.length : finalIndex;
      setHighlightedIndex(currentIndex);
      count++;

      if (count <= totalCycles) {
        const delay = count < totalCycles - 3 ? 80 : count < totalCycles ? 200 : 400;
        setTimeout(cycle, delay);
      } else {
        setIsSpinning(false);
        cardRefs.current[finalIndex]?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    };

    cycle();
  }, [isSpinning]);

  return (
    <section className="py-24 px-6">
      <div className="container max-w-6xl mx-auto">
        <div className="mb-12">
          <p className="font-mono-editorial text-xs tracking-widest uppercase mb-3 text-primary">🎭 explore</p>
          <h2 className="font-display text-6xl md:text-8xl text-foreground mb-4 text-left">
            Improv Games & Exercises
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            From beginner warm-ups to advanced long-form formats — find the perfect game for your crew.
          </p>

          <button
            onClick={pickRandom}
            disabled={isSpinning}
            className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-primary text-white font-display text-xl tracking-widest hover:bg-white hover:text-black transition-colors border-2 border-primary px-7 py-3.5 disabled:opacity-60"
          >
            <Shuffle size={18} className={isSpinning ? "animate-wiggle" : ""} />
            {isSpinning ? "Picking..." : "🎲 Random Game!"}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game, i) => (
            <GameCard
              key={game.title}
              {...game}
              isHighlighted={highlightedIndex === i}
              cardRef={(el) => { cardRefs.current[i] = el; }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GamesSection;
