import HeroSection from "@/components/HeroSection";
import ThisWeekSection from "@/components/ThisWeekSection";
import NotesSection from "@/components/NotesSection";
import EventsSection from "@/components/EventsSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ThisWeekSection />
      <EventsSection />
      <NotesSection />
      <footer className="py-16 px-4 md:px-8 border-t-4 border-primary/40">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <p className="font-display text-5xl md:text-7xl text-primary leading-none">BUNNY BUNNY</p>
            <p className="font-mono-editorial text-xs text-foreground/50 tracking-[0.2em] uppercase text-left md:text-right">
              Listen First.<br/>Embrace Failure.<br/>Be Stupid.
            </p>
          </div>
          <div className="mt-8 pt-8 border-t-2 border-foreground/10">
            <p id="bunny-note" className="font-mono-editorial text-xs text-foreground/40 max-w-lg leading-relaxed">
              *Bunny Bunny is a high energy improv warm-up, involving Bunny Bunny, Ticky Tocky, and some good connecting eye contact and bunny ears. Controlled chaos.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
