// ---- Day 01 content: swap this file (and public/photos) for each new episode. ----
export const FPS = 30;
export const BPM = 132; // matches public/audio/run-theme.mp3
export const BEAT = (FPS * 60) / BPM; // frames per beat (~13.64)
export const OV = 5; // crossfade overlap (frames)
export const ROUTE_LEN = 5; // START → 1 → 2 → 3 → 4 → FINISH

export const EPISODE = {
  day: 1,
  title: "POKÉMON RUN",
  place: "in MALAYSIA",
  edition: "30th ANNIVERSARY",
  where: "KLCC · Kuala Lumpur",
  date: "Sun 22 Nov 2026",
  music: "audio/run-theme.mp3",
};

type PhotoRaw = {
  type: "photo";
  file: string;
  w: number;
  h: number;
  beats: number;
  caption: string;
  sub?: string;
  km?: number; // position on the route bar (0..ROUTE_LEN)
  dex?: string; // Pokémon "spotted" in this shot
  focus?: [number, number]; // Ken Burns focal point (0..1)
  fit?: "cover" | "card";
  hideRoute?: boolean; // hide the route bar (e.g. closing scene)
};
type ChapterRaw = { type: "chapter"; beats: number; n: number; title: string; sub: string };
type IntroRaw = { type: "intro"; beats: number };
export type Raw = PhotoRaw | ChapterRaw | IntroRaw;

const P = (
  file: string,
  w: number,
  h: number,
  beats: number,
  caption: string,
  extra: Partial<PhotoRaw> = {},
): PhotoRaw => ({ type: "photo", file, w, h, beats, caption, ...extra });

export const SCRIPT: Raw[] = [
  { type: "intro", beats: 5 },
  P("01-flatlay.jpg", 1013, 1800, 4, "Gear check: DONE", { sub: "Tee, bib, bag + the plush squad", focus: [0.5, 0.55] }),

  // arrival
  P("02-banner.jpg", 1800, 1013, 2, "30 years of Pokémon", { sub: "Pokémon Run in Malaysia" }),
  P("03-start.jpg", 1800, 1013, 2, "START line", { sub: "Pikachu says go", km: 0 }),
  P("04-selfie.jpg", 1013, 1800, 3, "Squad check", { sub: "Plush on wrist: equipped", km: 0, focus: [0.55, 0.65] }),

  // the run
  P("05-plushwalk.jpg", 1800, 1013, 2, "Plushies on shoulders", { sub: "Official dress code", km: 0.5 }),
  P("06-km1.jpg", 1800, 1013, 2, "1 KM", { sub: "Mudkip is cheering", km: 1, dex: "Mudkip" }),
  P("07-piplup.jpg", 1013, 1800, 2, "Piplup!", { sub: "Spotted on the road", km: 1.3, dex: "Piplup", focus: [0.5, 0.65] }),
  P("08-snorlax.jpg", 1013, 1800, 2, "Snorlax backpack", { sub: "Respect.", km: 1.6, dex: "Snorlax", focus: [0.5, 0.55] }),
  P("09-glaceon.jpg", 1013, 1800, 2, "Glaceon", { sub: "Ice-type cool", km: 1.85, dex: "Glaceon", focus: [0.5, 0.6] }),
  P("10-km2.jpg", 1013, 1800, 2, "2 KM", { sub: "Pikachu still smiling", km: 2, focus: [0.55, 0.5] }),
  P("11-sylveon.jpg", 1013, 1800, 2, "Sylveon", { sub: "30th-anniversary edition", km: 2.35, dex: "Sylveon", focus: [0.35, 0.55] }),
  P("12-charizard.jpg", 1013, 1800, 2, "Charizard hitchhiker", { sub: "Free ride on a bag", km: 2.7, dex: "Charizard", focus: [0.75, 0.5] }),
  P("13-km3.jpg", 1013, 1800, 2, "3 KM", { sub: "Pikachu waving a flag", km: 3, focus: [0.5, 0.5] }),
  P("14-ceruledge.jpg", 1013, 1800, 2, "Ceruledge", { sub: "Final boss energy", km: 3.35, dex: "Ceruledge", focus: [0.4, 0.55] }),
  P("15-tents.jpg", 1800, 1013, 2, "Choose your type", { sub: "Grass · Fire · Water", km: 3.7 }),
  P("16-km4.jpg", 1013, 1800, 2, "4 KM", { sub: "Almost there", km: 4, focus: [0.5, 0.6] }),

  // finish + loot
  P("17-finish-wide.jpg", 1800, 1013, 3, "FINISH", { sub: "Crowd of yellow", km: 5 }),
  P("19-card.jpg", 1013, 1800, 4, "Run-exclusive Pikachu card", { sub: "With the Petronas Twin Towers", focus: [0.5, 0.45] }),
  P("21-me-inflatable.jpg", 1350, 1800, 3, "Me + the big yellow guy", { sub: "Goodie bag unlocked" }),
  P("22-me-point.jpg", 1350, 1800, 3, "Gotcha!", { sub: "Pikachu pose", dex: "Pikachu" }),
  P("23-cards.jpg", 1800, 1013, 2, "Charmander → Charizard", { sub: "Lenticular evolution cards" }),
  P("24-medal.jpg", 1013, 1800, 4, "Gym Badge earned!", { sub: "Medal + badge + lanyard", focus: [0.5, 0.55] }),
  P("25-plush.jpg", 1013, 1800, 3, "Finisher plush duo", { sub: "Run tee edition", focus: [0.5, 0.5] }),

  // end-credit scene
  P("26-end-me.jpg", 1350, 1800, 5, "See you next run!", { sub: "Pokémon Run in Malaysia · 30th Anniversary", hideRoute: true }),
];

// ---- timeline builder ----
export type Placed = Raw & { start: number; dur: number; index: number; prevKm: number; dexIndex: number; dexTotal: number };

export const buildTimeline = (script: Raw[]) => {
  let cum = 0;
  let lastKm = 0;
  let dex = 0;
  const placed: Placed[] = script.map((r, index) => {
    const start = Math.round(cum * BEAT);
    cum += r.beats;
    const end = Math.round(cum * BEAT);
    const p: Placed = { ...r, start, dur: end - start + OV, index, prevKm: lastKm, dexIndex: 0, dexTotal: 0 };
    if (r.type === "photo") {
      if (r.km !== undefined) lastKm = r.km;
      if (r.dex) {
        dex += 1;
        p.dexIndex = dex;
      }
    }
    return p;
  });
  const dexTotal = placed.reduce((a, p) => a + (p.type === "photo" && p.dex ? 1 : 0), 0);
  placed.forEach((p) => (p.dexTotal = dexTotal));
  return { placed, total: Math.round(cum * BEAT), dexTotal };
};

export const TIMELINE = buildTimeline(SCRIPT);
