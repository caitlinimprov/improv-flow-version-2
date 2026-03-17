import { useState, useCallback, useRef } from "react";
import { Users, Shuffle } from "lucide-react";

interface GameCardProps {
  title: string;
  description: string;
  players: string;
  difficulty: "Easy" | "Medium" | "Hard";
  emoji: string;
}

const difficultyColor = {
  Easy: "text-primary border-primary",
  Medium: "text-secondary border-secondary",
  Hard: "text-white border-white",
};

const GameCard = ({ title, description, players, difficulty, emoji, isHighlighted, cardRef }: GameCardProps & { isHighlighted?: boolean; cardRef?: React.Ref<HTMLDivElement> }) => (
  <div
    ref={cardRef}
    className={"border-2 p-5 transition-all duration-300 " + (isHighlighted ? "border-primary bg-primary/5 -translate-y-1" : "border-foreground/25 hover:border-primary bg-transparent hover:-translate-y-1")}
  >
    <div className="flex items-start justify-between mb-3">
      <span className={"font-mono-editorial text-xs font-bold px-2 py-0.5 border " + difficultyColor[difficulty]}>
        {difficulty}
      </span>
      <span className="text-2xl">{emoji}</span>
    </div>
    <h3 className="font-display text-3xl text-foreground mb-2">{title}</h3>
    <p className="font-mono-editorial text-xs text-foreground/70 mb-4 leading-relaxed">{description}</p>
    <div className="flex items-center gap-1.5 text-primary text-xs font-mono-editorial">
      <Users size={12} />
      <span>{players}</span>
    </div>
  </div>
);

const games: GameCardProps[] = [
  { title: "Yes, And...", description: "The foundation of improv. Accept what your partner offers and build on it. Never deny, always expand.", players: "2+ players", difficulty: "Easy", emoji: "💛" },
  { title: "Freeze Tag", description: "Two performers act out a scene. Anyone can yell Freeze!, tap in, and start a completely new scene.", players: "4-10 players", difficulty: "Medium", emoji: "🧊" },
  { title: "Scenes From a Hat", description: "Audience suggestions are drawn from a hat. Performers must instantly create a scene from each prompt.", players: "3-6 players", difficulty: "Easy", emoji: "🎩" },
  { title: "Emotional Rollercoaster", description: "Act out a scene while rapidly switching between emotions called out by the audience or host.", players: "2-4 players", difficulty: "Medium", emoji: "🎢" },
  { title: "Story Spine", description: "Build a story collaboratively using the structure: Once upon a time... Every day... Until one day...", players: "3-8 players", difficulty: "Easy", emoji: "📖" },
  { title: "The Harold", description: "A long-form improv format weaving three separate scenes that gradually connect into one unified narrative.", players: "5-8 players", difficulty: "Hard", emoji: "🧠" },
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
    <section className="py-20 px-6 border-t-2 border-foreground/20">
      <div className="container max-w-6xl mx-auto">
        <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="font-mono-editorial text-xs tracking-widest uppercase mb-2 text-primary">— games —</p>
            <h2 className="font-display text-6xl md:text-8xl text-foreground leading-none">
              IMPROV<br/>GAMES
            </h2>
          </div>
          <button
            onClick={pickRandom}
            disabled={isSpinning}
            className="inline-flex items-center gap-2.5 px-6 py-3 bg-transparent text-primary font-mono-editorial text-sm font-bold hover:bg-primary hover:text-white transition-colors border-2 border-primary disabled:opacity-60 self-start md:self-auto"
          >
            <Shuffle size={16} className={isSpinning ? "animate-wiggle" : ""} />
            {isSpinning ? "picking..." : "random game"}
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
