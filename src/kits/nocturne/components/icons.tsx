import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = (viewBox: string, props: IconProps) => {
  const [, , w, h] = viewBox.split(" ").map(Number);
  const s = 0.82 / Math.max(w, h);
  return {
    width: `${(w * s).toFixed(3)}em`,
    height: `${(h * s).toFixed(3)}em`,
    viewBox,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: Number((1.6 / 24 / s).toFixed(2)),
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    ...props,
  };
};

export const CheckIcon = (p: IconProps) => (
  <svg {...base("3.5 5.5 17 13.5", p)}>
    <path d="M4.5 12.5 10 18 19.5 6.5" />
  </svg>
);

export const MinusIcon = (p: IconProps) => (
  <svg {...base("5 11 14 2", p)}>
    <path d="M6 12h12" />
  </svg>
);

export const PlusIcon = (p: IconProps) => (
  <svg {...base("5 5 14 14", p)}>
    <path d="M12 6v12M6 12h12" />
  </svg>
);

export const ChevronDownIcon = (p: IconProps) => (
  <svg {...base("5 8.5 14 8", p)}>
    <path d="m6 9.5 6 6 6-6" />
  </svg>
);

export const ChevronRightIcon = (p: IconProps) => (
  <svg {...base("8.5 5 8 14", p)}>
    <path d="m9.5 6 6 6-6 6" />
  </svg>
);

export const XIcon = (p: IconProps) => (
  <svg {...base("5.5 5.5 13 13", p)}>
    <path d="M6.5 6.5l11 11M17.5 6.5l-11 11" />
  </svg>
);

export const SearchIcon = (p: IconProps) => (
  <svg {...base("3.5 3.5 17.5 17.5", p)}>
    <circle cx="10.5" cy="10.5" r="6" />
    <path d="m15.5 15.5 4.5 4.5" />
  </svg>
);

export const LeafIcon = (p: IconProps) => (
  <svg {...base("3 3 18 18", p)}>
    <path d="M20 4C10 4 4 9 4 17c0 0 0 3 0 3 8 0 16-5 16-16Z" />
    <path d="M4 20C8 15 12 12 17 10" />
  </svg>
);

export const BudIcon = (p: IconProps) => (
  <svg {...base("6 2 12 20", p)}>
    <path d="M12 3c-3 4-3 8 0 11 3-3 3-7 0-11Z" />
    <path d="M12 14v7" />
    <path d="M12 18c-2 0-4-1-5-3M12 18c2 0 4-1 5-3" />
  </svg>
);

export const FlowerIcon = (p: IconProps) => (
  <svg {...base("2.5 2.5 19 19", p)}>
    <circle cx="12" cy="12" r="2.4" />
    <path d="M12 9.6c-1-3-1-5 0-6.6 1 1.6 1 3.6 0 6.6Z" />
    <path d="M12 14.4c1 3 1 5 0 6.6-1-1.6-1-3.6 0-6.6Z" />
    <path d="M9.6 12c-3-1-5-1-6.6 0 1.6 1 3.6 1 6.6 0Z" />
    <path d="M14.4 12c3-1 5-1 6.6 0-1.6 1-3.6 1-6.6 0Z" />
  </svg>
);

export const MoonIcon = (p: IconProps) => (
  <svg {...base("3 2.5 18 19", p)}>
    <path d="M20 15.5A8.5 8.5 0 1 1 9 4a6.5 6.5 0 0 0 11 11.5Z" />
  </svg>
);

export const FlameIcon = (p: IconProps) => (
  <svg {...base("5 2 14 20", p)}>
    <path d="M12 3c4 6 6 9 4 13a5 5 0 0 1-8 0C6 12 8 9 12 3Z" />
    <path d="M12 12c1.6 2.4 2 4 1 5.4-1 1.2-2.4.6-2.4-1 0-1.4.4-2.6 1.4-4.4Z" />
  </svg>
);

export const DropIcon = (p: IconProps) => (
  <svg {...base("5 2.5 14 19", p)}>
    <path d="M12 3c4 5 6 8 6 11a6 6 0 0 1-12 0c0-3 2-6 6-11Z" />
    <path d="M9 14.5c.3 1.6 1.4 2.8 3 3" />
  </svg>
);

export const KeyIcon = (p: IconProps) => (
  <svg {...base("2.5 2.5 19 19", p)}>
    <circle cx="8" cy="8" r="4.5" />
    <path d="m11 11 9 9M17 17l2-2M15 15l2-2" />
  </svg>
);

export const BellIcon = (p: IconProps) => (
  <svg {...base("3.5 2.5 17 19", p)}>
    <path d="M6 17V11a6 6 0 0 1 12 0v6l1.5 2h-15Z" />
    <path d="M10 20a2 2 0 0 0 4 0" />
  </svg>
);

export const FeatherIcon = (p: IconProps) => (
  <svg {...base("3 2.5 18 19", p)}>
    <path d="M20 4A9 9 0 0 0 5 11l-1 6 6-1A9 9 0 0 0 20 4Z" />
    <path d="M4 20 11 13M9 10h4M12 7h4" />
  </svg>
);

export const VialIcon = (p: IconProps) => (
  <svg {...base("5 2.5 14 19", p)}>
    <path d="M9 3v11a3.5 3.5 0 0 0 7 0V3" />
    <path d="M8 3h9M9.5 12.5h5" />
  </svg>
);

export const SproutIcon = (p: IconProps) => (
  <svg {...base("3.5 3 17 18", p)}>
    <path d="M12 20v-8" />
    <path d="M12 13C12 8 8 6 4 6c0 5 4 7 8 7Z" />
    <path d="M12 12c0-4 3-6 7-6 0 4-3 6-7 6Z" />
  </svg>
);

export const ClockIcon = (p: IconProps) => (
  <svg {...base("2.5 2.5 19 19", p)}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2.5" />
  </svg>
);

export const CopyIcon = (p: IconProps) => (
  <svg {...base("3.5 3.5 17 17", p)}>
    <rect x="8.5" y="8.5" width="11" height="11" rx="1" />
    <path d="M15.5 5.5v-1h-11v11h1" />
  </svg>
);

export const TrashIcon = (p: IconProps) => (
  <svg {...base("3.5 3.5 17 17.5", p)}>
    <path d="M4.5 7h15M9.5 7V4.5h5V7M6.5 7l1 13h9l1-13" />
    <path d="M10 11v5.5M14 11v5.5" />
  </svg>
);
