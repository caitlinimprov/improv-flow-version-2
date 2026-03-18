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
      <footer className="py-12 px-6 border-t-2 border-foreground/20">
        <p className="font-mono-editorial text-xs text-foreground/40 tracking-widest">
          LISTEN FIRST. MAKE STATEMENTS. EMBRACE FAILURE. BE STUPID. 🐰 BUNNY BUNNY.
        </p>
      </footer>
    </div>
  );
};

export default Index;
