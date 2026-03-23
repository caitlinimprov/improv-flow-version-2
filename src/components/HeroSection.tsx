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
    <div className={"mb-6 transition-opacity duration-400 " + (fade ? "opacity-100" : "opacity-0")}>
      <p className="font-mono-editorial text-base max-w-lg leading-relaxed text-foreground/80 italic">
        "{q.text}"
      </p>
      <p className="font-mono-editorial text-xs mt-2 text-primary font-bold tracking-widest uppercase">— {q.author}</p>
    </div>
  );
};

const HeroSection = () => (
  <section className="relative min-h-[90vh] flex items-end justify-start overflow-hidden bg-background border-b-4 border-primary pb-12 px-4 md:px-8">
    
    {/* Grain texture */}
    <div className="absolute inset-0 opacity-[0.08]" style={{backgroundImage: `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>")`, backgroundRepeat: "repeat", backgroundSize: "128px"}}></div>

    {/* Pink glow top left */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_hsl(330_100%_45%_/_0.1)_0%,_transparent_55%)]"></div>

    {/* Registration marks */}
    <div className="absolute top-5 left-5 text-primary/40 font-mono-editorial text-sm leading-none select-none">+</div>
    <div className="absolute top-5 right-5 text-primary/40 font-mono-editorial text-sm leading-none select-none">+</div>

    {/* Top label */}
    <div className="absolute top-5 left-0 right-0 flex justify-center">
      <p className="font-mono-editorial text-xs tracking-[0.4em] uppercase text-primary/70">— a training tool for improvisers —</p>
    </div>

    {/* Main content — bottom aligned */}
    <div className="relative z-10 w-full">
      <div className="overflow-hidden">
        <h1 className="font-display text-foreground uppercase w-full block" style={{
          fontSize: "clamp(72px, 20vw, 240px)",
          lineHeight: "0.88",
          letterSpacing: "-0.01em"
        }}>
          BUNNY
        </h1>
        <h1 className="font-display uppercase w-full block" style={{
          fontSize: "clamp(72px, 20vw, 240px)",
          lineHeight: "0.88",
          letterSpacing: "-0.01em",
          WebkitTextStroke: "3px #E8007A",
          color: "transparent",
          paddingLeft: "clamp(8px, 3vw, 48px)"
        }}>
          BUNNY
          <button
            onClick={() => document.getElementById("bunny-note")?.scrollIntoView({behavior: "smooth"})}
            className="text-primary"
            style={{
              fontSize: "clamp(14px, 2.5vw, 32px)",
              verticalAlign: "super",
              WebkitTextStroke: "0px",
              color: "#E8007A",
              background: "none",
              border: "none",
              cursor: "pointer",
              lineHeight: 1
            }}
          >*</button>
        </h1>
      </div>

      <div className="mt-6 max-w-lg">
        <p className="font-mono-editorial text-xl md:text-2xl mb-5 text-foreground tracking-widest uppercase border-l-4 border-primary pl-4">
          Care quickly.
        </p>
        <QuoteRotator />
        <div className="flex gap-4 flex-wrap mt-2">
          <button
            onClick={() => document.getElementById("events")?.scrollIntoView({behavior: "smooth"})}
            className="inline-flex items-center px-8 py-3 bg-transparent text-primary font-display text-xl md:text-2xl tracking-widest hover:bg-primary hover:text-white transition-colors border-2 border-primary"
          >
            FIND EVENTS
          </button>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
