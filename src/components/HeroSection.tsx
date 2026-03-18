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
      <p className="font-mono-editorial text-sm max-w-md leading-relaxed text-foreground/80 italic">
        "{q.text}"
      </p>
      <p className="font-mono-editorial text-xs mt-2 text-primary font-bold tracking-widest uppercase">— {q.author}</p>
    </div>
  );
};

const HeroSection = () => (
  <section className="relative min-h-[90vh] flex items-center justify-start overflow-hidden bg-background border-b-2 border-primary px-6">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_hsl(330_100%_45%_/_0.06)_0%,_transparent_60%)]"></div>
    <div className="relative z-10 w-full max-w-6xl mx-auto">
      <p className="font-mono-editorial text-xs tracking-[0.4em] uppercase mb-1 text-primary">
        — a training tool for improvisers —
      </p>
      <h1 className="font-display leading-[0.88] text-foreground uppercase w-full" style={{fontSize: "clamp(80px, 18vw, 220px)"}}>
        BUNNY
      </h1>
      <h1 className="font-display leading-[0.88] uppercase w-full mb-8" style={{fontSize: "clamp(80px, 18vw, 220px)", WebkitTextStroke: "3px #E8007A", color: "transparent"}}>
        BUNNY
      </h1>
      <div className="mt-6 max-w-lg">
        <p className="font-mono-editorial text-xl md:text-2xl mb-6 text-foreground tracking-widest uppercase border-l-4 border-primary pl-4">
          Care quickly.
        </p>
        <QuoteRotator />
        <div className="flex gap-4 flex-wrap mt-4">
          <a href="#events" className="inline-flex items-center px-10 py-4 bg-transparent text-primary font-display text-2xl tracking-widest hover:bg-primary hover:text-white transition-colors border-2 border-primary">
            FIND EVENTS
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
