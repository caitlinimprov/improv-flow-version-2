import HeroSection from "@/components/HeroSection";
import GamesSection from "@/components/GamesSection";
import DailyActivitiesSection from "@/components/DailyActivitiesSection";
import NotesSection from "@/components/NotesSection";
import EventsSection from "@/components/EventsSection";
import TipsSection from "@/components/TipsSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <div id="games">
        <GamesSection />
      </div>
      <DailyActivitiesSection />
      <NotesSection />
      <EventsSection />
      <TipsSection />
      <footer className="py-12 px-6 text-center border-t-2 border-border">
        <p className="text-muted-foreground text-sm font-medium">
          Made with chaos & 💖 — <span className="font-display text-primary text-lg">BUNNY BUNNY</span>
        </p>
      </footer>
    </div>
  );
};

export default Index;
