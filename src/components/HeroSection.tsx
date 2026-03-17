import { useState, useEffect } from "react";

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
      <p className="font-mono-editorial text-xs max-w-md mx-auto leading-relaxed text-foreground/60 italic">
        "{q.text}"
      </p>
      <p className="font-mono-editorial text-xs mt-2 text-primary font-bold tracking-widest uppercase">— {q.author}</p>
    </div>
  );
};

const HeroSection = () => (
  <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-background border-b-2 border-primary">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(330_100%_45%_/_0.08)_0%,_transparent_70%)]"></div>
    <div className="relative z-10 text-center px-6 max-w-5xl mx-auto w-full">
      <p className="font-mono-editorial text-xs tracking-[0.5em] uppercase mb-4 text-primary">
        — a training tool for improvisers —
      </p>
      <h1 className="font-display block w-full text-[22vw] leading-none text-foreground uppercase">
        BUNNY
      </h1>
      <h1 className="font-display block w-full text-[22vw] leading-none text-primary uppercase mb-6">
        BUNNY
      </h1>
      <div className="w-16 h-0.5 bg-primary mx-auto mb-6"></div>
      <p className="font-mono-editorial text-base md:text-lg mb-6 text-foreground/90 tracking-widest uppercase">
        Care quickly.
      </p>
      <QuoteRotator />
      <div className="flex gap-4 justify-center flex-wrap">
        <a href="#games" className="inline-flex items-center px-8 py-4 bg-primary text-white font-display text-xl tracking-widest hover:bg-white hover:text-black transition-colors border-2 border-primary">
          EXPLORE GAMES
        </a>
        <a href="#events" className="inline-flex items-center px-8 py-4 bg-transparent text-primary font-display text-xl tracking-widest hover:bg-primary hover:text-white transition-colors border-2 border-primary">
          FIND EVENTS
        </a>
      </div>
    </div>
  </section>
);

export default HeroSection;
