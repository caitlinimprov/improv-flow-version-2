import { useState, useEffect } from "react";
import heroImage from "@/assets/hero-stage.jpg";

const quotes = [
  { text: "Say yes, and you will figure it out afterwards.", author: "Tina Fey" },
  { text: "There are no mistakes, only opportunities.", author: "Amy Poehler" },
  { text: "Listen with the intent to be changed by what you hear.", author: "Chris Hines" },
  { text: "The fun is not knowing what happens next.", author: "Chris Alvarado" },
  { text: "Be the scene partner you wish you had.", author: "Amy Poehler" },
  { text: "Improvising is about being in the moment, not in your head.", author: "Tina Fey" },
];

const QuoteRotator = () => {
  const [index, setIndex] = useState(() => Math.floor(Math.random() * quotes.length));
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % quotes.length);
        setFade(true);
      }, 400);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const q = quotes[index];
  return (
    <div className={"mb-8 transition-opacity duration-400 " + (fade ? "opacity-100" : "opacity-0")}>
      <p className="font-mono-editorial text-sm max-w-md mx-auto leading-relaxed text-foreground/70">
        "{q.text}"
      </p>
      <p className="font-mono-editorial text-xs mt-2 text-primary font-bold">— {q.author}</p>
    </div>
  );
};

const HeroSection = () => (
  <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-background border-b-4 border-foreground">
    <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
      <p className="font-mono-editorial text-xs tracking-[0.4em] uppercase mb-6 text-foreground/50">
        A training tool for improvisers
      </p>
      <h1 className="font-display text-[12vw] md:text-[10vw] font-black italic leading-none mb-2 text-foreground">
        BUNNY
      </h1>
      <h1 className="font-display text-[12vw] md:text-[10vw] font-black leading-none mb-6 text-primary">
        BUNNY
      </h1>
      <p className="font-mono-editorial text-lg md:text-xl mb-8 text-foreground border-l-4 border-primary pl-4 text-left max-w-xs mx-auto">
        Care quickly.
      </p>
      <QuoteRotator />
      <p className="font-mono-editorial text-sm text-foreground/60 max-w-xl mx-auto mb-10 leading-relaxed">
        Get loose. Stay sharp. Make it meaningful.
      </p>
      <div className="flex gap-4 justify-center flex-wrap">
        <a href="#games" className="inline-flex items-center px-8 py-4 bg-primary text-white font-mono-editorial font-bold text-sm tracking-wide hover:bg-foreground transition-colors border-2 border-foreground">
          Explore Games
        </a>
        <a href="#events" className="inline-flex items-center px-8 py-4 bg-transparent text-foreground font-mono-editorial font-bold text-sm tracking-wide hover:bg-foreground hover:text-background transition-colors border-2 border-foreground">
          Find Events
        </a>
      </div>
    </div>
  </section>
);

export default HeroSection;
