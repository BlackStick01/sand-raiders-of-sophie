export const adsConfig = {
  enabled: true,

  slots: {
    mobileBanner: {
      enabled: true,
      key: "b3bb06fe0c9ae86cc6fe991b4e637806",
      width: 320,
      height: 50,
      devices: ["mobile"],
    },
    desktopLeaderboard: {
      enabled: true,
      key: "b580dde9b65d33db0c10aa112dab5751",
      width: 728,
      height: 90,
      devices: ["desktop"],
    },
    contentRectangle: {
      enabled: true,
      key: "55ecddd2ea4068673383c05a6afdb9db",
      width: 300,
      height: 250,
      devices: ["mobile", "desktop"],
    },
  },

  excludedPathSegments: ["privacy-policy", "terms-of-service", "copyright"],
} as const;

export type AdSlotKey = keyof typeof adsConfig.slots;
