import { useState, useEffect } from "react";
import heroImage from "@/assets/hero-stage.jpg";

const quotes = [
  { text: "Say yes, and you'll figure it out afterwards.", author: "Tina Fey" },
  { text: "There are no mistakes, only opportunities.", author: "Amy Poehler" },
  { text: "Listen with the intent to be changed by what you hear.", author: "Chris Hines" },
  { text: "The fun is not knowing what happens next.", author: "Chris Alvarado" },
  { text: "You can't be brave if you've only had wonderful things happen to you.", author: "Carla Cakowski" },
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
    <div className={`animate-fade-up mb-8 transition-opacity duration-400 ${fade ? "opacity-100" : "opacity-0"}`} style={{ animationDelay: "150ms" }}>
      <p className="text-secondary/90 italic text-base md:text-lg max-w-md mx-auto leading-relaxed">
        "{q.text}"
      </p>
      <p className="text-muted-foreground text-sm mt-1 font-bold">— {q.author}</p>
    </div>
  );
};

const HeroSection = () => (
  <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-retro-grid">
    {/* Background image */}
    <div className="absolute inset-0">
      <img
        src={heroImage}
        alt="Dramatic theater stage with warm spotlights"
        className="w-full h-full object-cover opacity-20 mix-blend-screen"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/30 to-background" />
    </div>

    {/* Floating shapes */}
    <div className="absolute top-20 left-[10%] w-16 h-16 rounded-full bg-primary/15 blur-sm animate-float" />
    <div className="absolute top-40 right-[15%] w-10 h-10 rounded-lg bg-secondary/20 blur-sm animate-float" style={{ animationDelay: "1s" }} />
    <div className="absolute bottom-32 left-[20%] w-12 h-12 rounded-full bg-accent/15 blur-sm animate-float" style={{ animationDelay: "2s" }} />

    {/* Content */}
    <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
      <p className="text-secondary font-bold text-sm tracking-[0.3em] uppercase mb-6 animate-fade-up">
        🐰 A training tool for improvisers
      </p>
      <h1 className="font-display text-5xl sm:text-6xl md:text-8xl text-gradient-hero leading-[1.1] mb-6 animate-fade-up" style={{ animationDelay: "100ms" }}>
        BUNNY BUNNY
      </h1>
      <QuoteRotator />
      <p className="text-lg md:text-xl text-foreground/70 max-w-xl mx-auto mb-10 animate-fade-up leading-relaxed font-medium" style={{ animationDelay: "250ms" }}>
        Get loose. Stay sharp. Make it meaningful. 
      </p>
      <div className="animate-fade-up flex gap-4 justify-center flex-wrap" style={{ animationDelay: "300ms" }}>
        <a
          href="#games"
          className="inline-flex items-center px-8 py-4 rounded-full bg-primary text-primary-foreground font-bold text-sm tracking-wide hover:scale-105 transition-transform glow-primary"
        >
          🎲 Explore Games
        </a>
        <a
          href="#events"
          className="inline-flex items-center px-8 py-4 rounded-full border-2 border-secondary text-secondary font-bold text-sm tracking-wide hover:bg-secondary hover:text-secondary-foreground transition-all"
        >
          📍 Find Events
        </a>
      </div>
    </div>
  </section>
);

export default HeroSection;
