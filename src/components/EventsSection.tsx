import { useState, useMemo } from "react";
import { MapPin, Calendar, Clock, ChevronDown, ChevronUp, Ticket, Navigation } from "lucide-react";
import { AVAILABLE_CITIES, SAMPLE_EVENTS, type City, type ImprovEvent } from "@/data/events";
import { useLocationPreferences } from "@/hooks/useLocationPreferences";

const typeStyles: Record<ImprovEvent["type"], string> = {
  show: "text-primary border-primary",
  workshop: "text-secondary border-secondary",
  jam: "text-accent border-accent",
  festival: "text-green-400 border-green-400",
};

const typeEmoji: Record<ImprovEvent["type"], string> = {
  show: "SHOW",
  workshop: "WORKSHOP",
  jam: "JAM",
  festival: "FESTIVAL",
};

const EventCard = ({ event }: { event: ImprovEvent }) => {
  const dateObj = new Date(event.date + "T00:00:00");
  const formatted = dateObj.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });

  return (
    <div className="border-2 border-foreground/20 p-5 hover:border-primary transition-all duration-300">
      <div className="flex items-start justify-between mb-3">
        <span className={"font-mono-editorial text-xs font-bold px-2 py-0.5 border " + typeStyles[event.type]}>
          {typeEmoji[event.type]}
        </span>
        <span className="font-mono-editorial text-xs text-primary font-bold">{event.price}</span>
      </div>
      <h3 className="font-display text-2xl text-foreground mb-1">{event.title.toUpperCase()}</h3>
      <p className="font-mono-editorial text-xs text-foreground/70 mb-3 leading-relaxed">{event.description}</p>
      <div className="flex flex-wrap gap-3 font-mono-editorial text-xs text-foreground/50">
        <span className="flex items-center gap-1"><MapPin size={10} />{event.venue}</span>
        <span className="flex items-center gap-1"><Calendar size={10} />{formatted}</span>
        <span className="flex items-center gap-1"><Clock size={10} />{event.time}</span>
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
    <section id="events" className="py-20 px-6 border-t-2 border-foreground/20">
      <div className="container max-w-6xl mx-auto">
        <div className="mb-10">
          <p className="font-mono-editorial text-xs tracking-widest uppercase mb-2 text-primary">— near you —</p>
          <h2 className="font-display text-6xl md:text-8xl text-foreground leading-none mb-4">
            EVENTS
          </h2>
        </div>

        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <button
              onClick={detectLocation}
              disabled={detectingLocation}
              className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-primary text-primary font-mono-editorial text-xs font-bold hover:bg-primary hover:text-white transition-colors disabled:opacity-50"
            >
              <Navigation size={12} className={detectingLocation ? "animate-spin" : ""} />
              {detectingLocation ? "detecting..." : "use my location"}
            </button>
            {detectedCity && (
              <span className="font-mono-editorial text-xs text-foreground/60">
                detected: <span className="text-foreground font-bold">{detectedCity}</span>
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {displayedCities.map((city) => {
              const isSelected = selectedCities.includes(city);
              return (
                <button
                  key={city}
                  onClick={() => toggleCity(city)}
                  className={"px-4 py-2 font-mono-editorial text-xs font-bold transition-all duration-200 border-2 " + (isSelected ? "bg-primary text-white border-primary" : "bg-transparent text-foreground/60 border-foreground/20 hover:border-primary hover:text-foreground")}
                >
                  {city}
                </button>
              );
            })}
            <button
              onClick={() => setShowAllCities(!showAllCities)}
              className="px-4 py-2 font-mono-editorial text-xs font-bold text-foreground/40 border-2 border-foreground/20 hover:border-primary transition-colors flex items-center gap-1"
            >
              {showAllCities ? <>less <ChevronUp size={12} /></> : <>more <ChevronDown size={12} /></>}
            </button>
          </div>

          {selectedCities.length > 0 && (
            <p className="mt-4 font-mono-editorial text-xs text-foreground/50">
              showing <span className="text-primary font-bold">{filteredEvents.length}</span> events in <span className="text-foreground">{selectedCities.join(", ")}</span>
            </p>
          )}
        </div>

        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center">
            <Ticket size={32} className="mx-auto mb-4 text-foreground/20" />
            <p className="font-display text-3xl text-foreground/40">NO EVENTS FOUND</p>
            <p className="font-mono-editorial text-xs text-foreground/30 mt-2">try selecting different cities above</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default EventsSection;
