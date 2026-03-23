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
      <footer className="py-16 px-6 border-t-2 border-primary/40 text-center">
        <p className="font-mono-editorial text-xs text-foreground/60 tracking-[0.3em] uppercase">
          Listen First. Embrace Failure. Be Stupid.
        </p>
        <p className="font-display text-4xl text-primary mt-2">BUNNY BUNNY</p>
        <p id="bunny-note" className="font-mono-editorial text-xs text-foreground/40 mt-8 max-w-md mx-auto leading-relaxed">
          *Bunny Bunny is a high energy improv warm-up, involving Bunny Bunny, Ticky Tocky, and some good connecting eye contact and bunny ears. Controlled chaos.
        </p>
      </footer>
    </div>
  );
};

export default Index;
