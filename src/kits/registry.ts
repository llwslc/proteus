import type { ComponentType } from "react";

export interface KitDef {
  id: string;
  label: string; // switcher label, e.g. "ABYSS"
  tag: string; // switcher subtitle
  load: () => Promise<{ default: ComponentType }>;
}

export const KITS: KitDef[] = [
  {
    id: "abyss",
    label: "ABYSS",
    tag: "Eldritch · Grimoire",
    load: () => import("./abyss"),
  },
  { id: "nova", label: "NOVA", tag: "Sci-Fi · HUD", load: () => import("./nova") },
];

export const DEFAULT_KIT = KITS[0].id;

export function resolveKit(id: string | null): string {
  return KITS.some((k) => k.id === id) ? (id as string) : DEFAULT_KIT;
}
