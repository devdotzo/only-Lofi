export interface SoundLayer {
  id: string;
  name: string;
  file: string;
  defaultVolume: number;
  defaultPan: number;
}

export interface LofiStation {
  id: string;
  name: string;
  youtubeId: string;
  description: string;
}

export interface Environment {
  id: string;
  name: string;
  icon: "coffee" | "book" | "waves" | "radio";
  theme: {
    bg: string;
    primary: string;
    accent: string;
    text: string;
  };
  illustration?: {
    type: "image" | "video";
    src: string;
  };
  spotifyPlaylist?: string;
  youtubePlaylist?: string;
  lofiStations?: LofiStation[];
  sounds: SoundLayer[];
}

export const environments: Environment[] = [
  {
    id: "cafe",
    name: "Cozy Cafe",
    icon: "coffee",
    theme: {
      bg: "#ffe8d6",
      primary: "text-cafe-text",
      accent: "#8B6F47",
      text: "#2d1f1a",
    },
    illustration: {
      type: "video",
      src: "/illustrations/cafe loop video.mp4",
    },
    spotifyPlaylist: "37i9dQZF1DX4WYpdgoIcn6",
    sounds: [
      {
        id: "cafe-cups",
        name: "Cups Clinking",
        file: "/sounds/cafe/drink clinking sfx.m4a",
        defaultVolume: 0.4,
        defaultPan: 0.4,
      },
      {
        id: "cafe-espresso",
        name: "Espresso Machine",
        file: "/sounds/cafe/expresso sfx.m4a",
        defaultVolume: 0.3,
        defaultPan: 0.6,
      },
      {
        id: "cafe-jazz",
        name: "Background Jazz",
        file: "/sounds/cafe/jazz sfx.m4a",
        defaultVolume: 0.3,
        defaultPan: 0,
      },
      {
        id: "cafe-typing",
        name: "Keyboard Typing",
        file: "/sounds/cafe/Keyboard SFX .m4a",
        defaultVolume: 0.4,
        defaultPan: -0.5,
      },
      {
        id: "cafe-rain",
        name: "Rain on Window",
        file: "/sounds/cafe/Rain in the window sfx.m4a",
        defaultVolume: 0.3,
        defaultPan: -0.3,
      },
    ],
  },
  {
    id: "library",
    name: "Quiet Library",
    icon: "book",
    theme: {
      bg: "#e8e4f3",
      primary: "text-library-text",
      accent: "#5e4fbb",
      text: "#1a1a2e",
    },
    illustration: {
      type: "image",
      src: "/illustrations/library.gif",
    },
    spotifyPlaylist: "37i9dQZF1DWXe9gFZP0gtP",
    sounds: [
      {
        id: "lib-clock",
        name: "Clock Ticking",
        file: "/sounds/library/clock ticking .m4a",
        defaultVolume: 0.3,
        defaultPan: 0.8,
      },
      {
        id: "lib-fireplace",
        name: "Distant Fireplace",
        file: "/sounds/library/Distant fireplace sfx.m4a",
        defaultVolume: 0.2,
        defaultPan: 0,
      },
      {
        id: "lib-rain",
        name: "Distant Rain",
        file: "/sounds/library/Distant Rain SFX.m4a",
        defaultVolume: 0.4,
        defaultPan: -0.4,
      },
      {
        id: "lib-pages",
        name: "Turning Pages",
        file: "/sounds/library/Turning Pages SFX.m4a",
        defaultVolume: 0.6,
        defaultPan: 0.2,
      },
      {
        id: "lib-writing",
        name: "Pencil Writing",
        file: "/sounds/library/Writing SFX.m4a",
        defaultVolume: 0.5,
        defaultPan: -0.2,
      },
    ],
  },
  {
    id: "ocean",
    name: "Ocean Retreat",
    icon: "waves",
    theme: {
      bg: "#d4f1f9",
      primary: "text-ocean-text",
      accent: "#0097a7",
      text: "#002f3a",
    },
    illustration: {
      type: "image",
      src: "/illustrations/inside_ocean_loop.gif",
    },
    spotifyPlaylist: "37i9dQZF1DX4PP3DA4J0N8",
    sounds: [
      {
        id: "ocean-waves",
        name: "Waves Crashing",
        file: "/sounds/ocean/waves crashing sfx.m4a",
        defaultVolume: 0.6,
        defaultPan: 0,
      },
      {
        id: "ocean-gulls",
        name: "Seagulls",
        file: "/sounds/ocean/seagulls.m4a",
        defaultVolume: 0.3,
        defaultPan: 0.7,
      },
      {
        id: "ocean-wind",
        name: "Wind Chimes",
        file: "/sounds/ocean/wind chime .m4a",
        defaultVolume: 0.4,
        defaultPan: -0.6,
      },
      {
        id: "ocean-fire",
        name: "Beach Fire",
        file: "/sounds/ocean/Beach fire SFX .m4a",
        defaultVolume: 0.4,
        defaultPan: 0.3,
      },
      {
        id: "ocean-thunder",
        name: "Distant Thunder",
        file: "/sounds/ocean/distant thunder sfx.m4a",
        defaultVolume: 0.2,
        defaultPan: -0.8,
      },
      {
        id: "ocean-underwater",
        name: "Underwater",
        file: "/sounds/ocean/Under water SFX .m4a",
        defaultVolume: 0.3,
        defaultPan: 0,
      },
    ],
  },
  {
    id: "lofi-radio",
    name: "Lofi Radio",
    icon: "radio",
    theme: {
      bg: "#1a1a2e",
      primary: "text-radio-text",
      accent: "#ff6b9d",
      text: "#e8e8e8",
    },
    illustration: {
      type: "image",
      src: "/illustrations/radio.svg",
    },
    lofiStations: [
      {
        id: "lofi-girl",
        name: "Lofi Girl",
        youtubeId: "jfKfPfyJRdk",
        description: "beats to relax/study to [LIVE 24/7]",
      },
      {
        id: "chillhop",
        name: "Chillhop Radio",
        youtubeId: "5yx6BWlEVcY",
        description: "jazzy & lofi hip hop beats [LIVE]",
      },
      {
        id: "synthwave-boy",
        name: "Synthwave Radio",
        youtubeId: "4xDzrJKXOOY",
        description: "synthwave & chillwave radio [LIVE]",
      },
      {
        id: "jazz-hop",
        name: "Jazz Hop Café",
        youtubeId: "Dx5qFachd3A",
        description: "smooth jazz beats [LIVE 24/7]",
      },
      {
        id: "lofi-geek",
        name: "Lofi Geek",
        youtubeId: "f02mOEt11OQ",
        description: "coding & gaming beats [LIVE 24/7]",
      },
      {
        id: "steezyasfuck",
        name: "Steezy Lofi",
        youtubeId: "lTRiuFIWV54",
        description: "chill hip hop beats [LIVE 24/7]",
      },
      {
        id: "bootsy-collins",
        name: "Lofi Hip Hop Radio",
        youtubeId: "7NOSDKb0HlU",
        description: "24/7 chill beats [LIVE]",
      },
    ],
    sounds: [],
  },
];
