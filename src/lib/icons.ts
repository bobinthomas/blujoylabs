/**
 * Fixed picklist of SVG icon paths content editors can choose from via an
 * `iconKey` select field in Keystatic. Raw path data is a design decision,
 * not content, so it's never itself editable — this is the only place it's
 * allowed to live in code.
 */
export const ICONS = {
  shield: "M12 3l7 4v5c0 4.5-3 8-7 9-4-1-7-4.5-7-9V7l7-4zM9 12.5l2 2 4-4.5",
  speed: "M13 10V3L4 14h7v7l9-11h-7z",
  results: "M3 3v18h18M7 15l4-4 3 3 5-6",
  partnership: "M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m5-5.13a4 4 0 100-8 4 4 0 000 8zm6 1a4 4 0 100-8 4 4 0 000 8z",
  layers: "M12 3l9 5-9 5-9-5 9-5zm-9 9l9 5 9-5M3 16l9 5 9-5",
  code: "M10 20l4-16m4 4l4 4-4 4M6 8l-4 4 4 4",
  govcon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
  sap: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4",
  design: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01",
  compliance: "M12 3l7 4v5c0 4.5-3 8-7 9-4-1-7-4.5-7-9V7l7-4zM9 12.5l2 2 4-4.5",
  flexible: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  globe: "M3 12h18M12 3c2.5 2.6 3.8 5.8 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.8-3.8-9s1.3-6.4 3.8-9z",
  users: "M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m5-5.13a4 4 0 100-8 4 4 0 000 8zm6 1a4 4 0 100-8 4 4 0 000 8z",
  arrowUp: "M7 17L17 7M17 7H8M17 7v9",
  check: "M5 13l4 4L19 7",
  search: "M11 4a7 7 0 100 14 7 7 0 000-14zM21 21l-4.35-4.35",
  chat: "M4 5h16v11H8l-4 4V5z",
  document: "M6 2h9l5 5v15H6V2zM14 2v6h6M9 13h6M9 17h6",
} as const;

export type IconKey = keyof typeof ICONS;

export const ICON_OPTIONS = Object.keys(ICONS).map((key) => ({ label: key, value: key }));
