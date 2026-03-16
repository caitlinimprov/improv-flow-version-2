export interface ImprovEvent {
  id: string;
  title: string;
  venue: string;
  city: string;
  date: string;
  time: string;
  description: string;
  type: "show" | "workshop" | "jam" | "festival";
  price: string;
}

export const AVAILABLE_CITIES = [
  "New York",
  "Los Angeles",
  "Chicago",
  "Austin",
  "San Francisco",
  "Portland",
  "Seattle",
  "London",
  "Toronto",
  "Philadelphia",
  "Denver",
  "Atlanta",
  "Boston",
  "Minneapolis",
] as const;

export type City = (typeof AVAILABLE_CITIES)[number];

export const SAMPLE_EVENTS: ImprovEvent[] = [
  // New York
  { id: "ny1", title: "UCB Late Night Jam", venue: "Upright Citizens Brigade", city: "New York", date: "2026-03-05", time: "10:30 PM", description: "Open jam night — anyone can jump on stage. All levels welcome.", type: "jam", price: "Free" },
  { id: "ny2", title: "The Stepfathers", venue: "Magnet Theater", city: "New York", date: "2026-03-07", time: "8:00 PM", description: "NYC's longest-running improv house team delivers high-energy long-form.", type: "show", price: "$12" },
  { id: "ny3", title: "Intro to Long-Form Workshop", venue: "PIT Underground", city: "New York", date: "2026-03-10", time: "6:30 PM", description: "6-week intensive for beginners. Learn the Harold and more.", type: "workshop", price: "$275" },

  // Chicago
  { id: "ch1", title: "Second City Mainstage Revue", venue: "The Second City", city: "Chicago", date: "2026-03-04", time: "8:00 PM", description: "Sketch and improv from the legendary company that launched countless careers.", type: "show", price: "$30" },
  { id: "ch2", title: "iO Harold Night", venue: "iO Theater", city: "Chicago", date: "2026-03-06", time: "9:00 PM", description: "House teams perform the Harold — the gold standard of long-form improv.", type: "show", price: "$15" },
  { id: "ch3", title: "Improv for Anxiety Workshop", venue: "Annoyance Theatre", city: "Chicago", date: "2026-03-08", time: "2:00 PM", description: "Use improv techniques to manage anxiety and build confidence.", type: "workshop", price: "$45" },

  // Los Angeles
  { id: "la1", title: "Groundlings Main Show", venue: "The Groundlings", city: "Los Angeles", date: "2026-03-05", time: "8:00 PM", description: "The legendary LA troupe performs sketch and improv comedy.", type: "show", price: "$25" },
  { id: "la2", title: "Pack Theater Showcase", venue: "The Pack Theater", city: "Los Angeles", date: "2026-03-09", time: "7:30 PM", description: "Indie teams showcase original formats and experimental improv.", type: "show", price: "$10" },

  // Austin
  { id: "au1", title: "Hideout Theatre: Maestro", venue: "The Hideout Theatre", city: "Austin", date: "2026-03-06", time: "8:00 PM", description: "Competitive improv elimination — the audience votes who stays on stage.", type: "show", price: "$15" },
  { id: "au2", title: "ColdTowne Open Jam", venue: "ColdTowne Theater", city: "Austin", date: "2026-03-11", time: "9:30 PM", description: "Weekly open jam. Bring your friends, bring your courage.", type: "jam", price: "Free" },

  // San Francisco
  { id: "sf1", title: "BATS Improv: Friday Night", venue: "BATS Improv", city: "San Francisco", date: "2026-03-06", time: "8:00 PM", description: "SF's premiere improv company. A different show every Friday.", type: "show", price: "$20" },

  // Portland
  { id: "po1", title: "Curious Comedy Showcase", venue: "Curious Comedy Theater", city: "Portland", date: "2026-03-07", time: "7:30 PM", description: "Portland's inclusive comedy theater presents a night of improv and sketch.", type: "show", price: "$18" },

  // Seattle
  { id: "se1", title: "Unexpected Productions", venue: "Market Theater", city: "Seattle", date: "2026-03-05", time: "7:30 PM", description: "Improv in Pike Place Market — a Seattle institution since 1983.", type: "show", price: "$15" },

  // London
  { id: "lo1", title: "The Nursery Open Night", venue: "The Nursery Theatre", city: "London", date: "2026-03-04", time: "7:30 PM", description: "Friendly open night for improvisers of all levels.", type: "jam", price: "£5" },
  { id: "lo2", title: "Showstoppers! The Musical", venue: "Lyric Theatre", city: "London", date: "2026-03-08", time: "7:30 PM", description: "A completely improvised musical — Olivier Award-winning.", type: "show", price: "£25" },

  // Toronto
  { id: "to1", title: "Second City Toronto", venue: "The Second City", city: "Toronto", date: "2026-03-05", time: "8:00 PM", description: "Toronto's legendary comedy institution. Sketch and improv.", type: "show", price: "CA$35" },
  { id: "to2", title: "Bad Dog Theatre Jam", venue: "Bad Dog Theatre", city: "Toronto", date: "2026-03-10", time: "9:00 PM", description: "Toronto's friendliest open jam. Come play!", type: "jam", price: "CA$5" },

  // Denver
  { id: "de1", title: "Bovine Metropolis Throwdown", venue: "Bovine Metropolis Theater", city: "Denver", date: "2026-03-07", time: "8:00 PM", description: "High-energy short-form improv competition.", type: "show", price: "$16" },

  // Atlanta
  { id: "at1", title: "Dad's Garage Late Night", venue: "Dad's Garage Theatre", city: "Atlanta", date: "2026-03-06", time: "10:30 PM", description: "Atlanta's weirdest and most wonderful improv at its finest.", type: "show", price: "$20" },

  // Boston
  { id: "bo1", title: "ImprovBoston Mainstage", venue: "ImprovBoston", city: "Boston", date: "2026-03-05", time: "8:00 PM", description: "New England's largest improv theater. House teams perform nightly.", type: "show", price: "$18" },

  // Minneapolis
  { id: "mn1", title: "HUGE Improv Theater", venue: "HUGE Theater", city: "Minneapolis", date: "2026-03-04", time: "7:30 PM", description: "Independent improv in the heart of Minneapolis.", type: "show", price: "$10" },

  // Philadelphia
  { id: "ph1", title: "Philly Improv Theater Showcase", venue: "PHIT Comedy", city: "Philadelphia", date: "2026-03-06", time: "8:00 PM", description: "Philly's home for improv, sketch, and stand-up.", type: "show", price: "$12" },
];
