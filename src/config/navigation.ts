export type NavigationItem = {
  key: string;
  label: string;
  href: string;
  description: string;
};

export const NAVIGATION_CONFIG: Record<string, NavigationItem> = {
  guide: {
    key: "guide",
    label: "Guide",
    href: "/guide",
    description: "Beginner guides, extraction basics, solo tips, healing, and friend-play tutorials.",
  },
  codes: {
    key: "codes",
    label: "Codes",
    href: "/codes",
    description: "Active codes, official rewards, launch gifts, and reward tracking.",
  },
  trampler: {
    key: "trampler",
    label: "Trampler",
    href: "/trampler",
    description: "Trampler builds, editor basics, driving, recharging, refueling, and repairs.",
  },
  weapons: {
    key: "weapons",
    label: "Weapons",
    href: "/weapons",
    description: "Weapons, PvP combat, Trampler combat, melee, and tier list content.",
  },
  loot: {
    key: "loot",
    label: "Loot",
    href: "/loot",
    description: "Loot routes, red boxes, crates, resources, extraction targets, and Server Slam rewards.",
  },
  modes: {
    key: "modes",
    label: "Modes",
    href: "/modes",
    description: "Voyage, Storm Dive, sandstorm rules, multiplayer, crew size, and server size.",
  },
  system: {
    key: "system",
    label: "System",
    href: "/system",
    description: "System requirements, performance, BattlEye, controller support, Steam, PS5, and Xbox.",
  },
  media: {
    key: "media",
    label: "Media",
    href: "/media",
    description: "Gameplay, review, trailer, release date, early access, price, and community topics.",
  },
};

export const CONTENT_TYPES = Object.keys(NAVIGATION_CONFIG);
