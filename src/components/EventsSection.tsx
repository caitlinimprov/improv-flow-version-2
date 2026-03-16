import { useState, useMemo } from "react";
import { MapPin, Navigation, Calendar, Clock, ChevronDown, ChevronUp, Ticket } from "lucide-react";
import { AVAILABLE_CITIES, SAMPLE_EVENTS, type City, type ImprovEvent } from "@/data/events";
import { useLocationPreferences } from "@/hooks/useLocationPreferences";

const typeStyles: Record<ImprovEvent["type"], string> = {
  show: "bg-primary/20 text-primary",
  workshop: "bg-secondary/20 text-secondary",
  jam: "bg-accent/20 text-accent",
  festival: "bg-green-500/20 text-green-400",
};

const typeEmoji: Record<ImprovEvent["type"], string> = {
  show: "🎤",
  workshop: "🛠️",
  jam: "🎵",
  festival: "🎪",
};

const EventCard = ({ event }: { event: ImprovEvent }) => {
  const dateObj = new Date(event.date + "T00:00:00");
  const formatted = dateObj.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });

  return (
    <div className="bg-card-gradient border-2 border-border rounded-2xl p-5 hover:border-primary/40 transition-all duration-300 hover:-translate-y-0.5">
      <div className="flex items-start justify-between mb-3">
        <span className={`text-xs font-bold px-3 py-1 rounded-full capitalize ${typeStyles[event.type]}`}>
          {typeEmoji[event.type]} {event.type}
        </span>
        <span className="text-accent font-bold text-sm">{event.price}</span>
      </div>
      <h3 className="text-lg font-bold text-foreground mb-1">{event.title}</h3>
      <p className="text-muted-foreground text-sm mb-3 leading-relaxed">{event.description}</p>
      <div className="flex flex-wrap gap-3 text-xs text-muted-foreground font-medium">
        <span className="flex items-center gap-1"><MapPin size={12} />{event.venue}</span>
        <span className="flex items-center gap-1"><Calendar size={12} />{formatted}</span>
        <span className="flex items-center gap-1"><Clock size={12} />{event.time}</span>
      </div>
    </div>
  );
};

const EventsSection = () => {
  const { selectedCities, toggleCity, detectLocation, detectingLocation, detectedCity } = useLocationPreferences();
  const [showAllCities, setShowAllCities] = useState(false);

  const filteredEvents = useMemo(() => {
    if (selectedCities.length === 0) return SAMPLE_EVENTS;
    return SAMPLE_EVENTS.filter((e) => selectedCities.includes(e.city as City));
  }, [selectedCities]);

  const displayedCities = showAllCities ? AVAILABLE_CITIES : AVAILABLE_CITIES.slice(0, 7);

  return (
    <section id="events" className="py-24 px-6 bg-retro-grid">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-primary font-bold text-sm tracking-widest uppercase mb-3">📍 Near You</p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Improv Events & Shows
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Find improv shows, workshops, and open jams in your city. Pick your spots below!
          </p>
        </div>

        {/* Location controls */}
        <div className="mb-10">
          <div className="flex flex-wrap items-center gap-3 justify-center mb-4">
            <button
              onClick={detectLocation}
              disabled={detectingLocation}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-secondary bg-secondary/10 text-secondary text-sm font-bold hover:bg-secondary/20 transition-colors disabled:opacity-50"
            >
              <Navigation size={14} className={detectingLocation ? "animate-spin" : ""} />
              {detectingLocation ? "Detecting..." : "📡 Use My Location"}
            </button>
            {detectedCity && (
              <span className="text-muted-foreground text-sm font-medium">
                📍 Detected: <span className="text-foreground font-bold">{detectedCity}</span>
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {displayedCities.map((city) => {
              const isSelected = selectedCities.includes(city);
              return (
                <button
                  key={city}
                  onClick={() => toggleCity(city)}
                  className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 border-2 ${
                    isSelected
                      ? "bg-primary text-primary-foreground border-primary glow-primary"
                      : "bg-muted/50 text-foreground/70 border-border hover:border-primary/40"
                  }`}
                >
                  {city}
                </button>
              );
            })}
            <button
              onClick={() => setShowAllCities(!showAllCities)}
              className="px-4 py-2 rounded-full text-sm font-bold text-muted-foreground border-2 border-border hover:border-secondary/40 transition-colors flex items-center gap-1"
            >
              {showAllCities ? <>Less <ChevronUp size={14} /></> : <>More <ChevronDown size={14} /></>}
            </button>
          </div>

          {selectedCities.length > 0 && (
            <p className="text-center mt-4 text-muted-foreground text-sm font-medium">
              Showing <span className="text-primary font-bold">{filteredEvents.length}</span> events in{" "}
              <span className="text-foreground">{selectedCities.join(", ")}</span>
            </p>
          )}
        </div>

        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-muted-foreground">
            <Ticket size={40} className="mx-auto mb-4 opacity-40" />
            <p className="text-lg font-bold">No events found for your selected cities.</p>
            <p className="text-sm mt-1">Try selecting different cities above!</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default EventsSection;
