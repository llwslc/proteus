import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = (viewBox: string, props: IconProps) => {
  const [, , w, h] = viewBox.split(" ").map(Number);
  const s = 1 / Math.max(w, h);
  return {
    width: `${(w * s).toFixed(3)}em`,
    height: `${(h * s).toFixed(3)}em`,
    viewBox,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: Number((1.5 / 24 / s).toFixed(2)),
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    ...props,
  };
};

export const CheckIcon = (p: IconProps) => (
  <svg {...base("4.25 4.25 16 14.3", p)}>
    <path d="M5 12.5 C 7 14, 8.5 15.7, 9.8 17.8 C 12.4 13, 15.8 8.6, 19.5 5" />
  </svg>
);

export const MinusIcon = (p: IconProps) => (
  <svg {...base("4.25 11.25 15.5 1.5", p)}>
    <path d="M5 12 H 19" />
  </svg>
);

export const PlusIcon = (p: IconProps) => (
  <svg {...base("4.25 4.25 15.5 15.5", p)}>
    <path d="M12 5 V 19 M5 12 H 19" />
  </svg>
);

export const ChevronDownIcon = (p: IconProps) => (
  <svg {...base("4.25 8.25 15.5 8.5", p)}>
    <path d="M5 9 L 12 16 L 19 9" />
  </svg>
);

export const ChevronUpIcon = (p: IconProps) => (
  <svg {...base("4.25 7.25 15.5 8.5", p)}>
    <path d="M5 15 L 12 8 L 19 15" />
  </svg>
);

export const ChevronRightIcon = (p: IconProps) => (
  <svg {...base("8.25 4.25 8.5 15.5", p)}>
    <path d="M9 5 L 16 12 L 9 19" />
  </svg>
);

export const XIcon = (p: IconProps) => (
  <svg {...base("5.25 5.25 13.5 13.5", p)}>
    <path d="M6 6 L 18 18 M18 6 L 6 18" />
  </svg>
);

export const SearchIcon = (p: IconProps) => (
  <svg {...base("4.25 4.25 16 16", p)}>
    <circle cx="10.5" cy="10.5" r="5.5" />
    <path d="M14.7 14.7 L 19.5 19.5" />
  </svg>
);

export const ClockIcon = (p: IconProps) => (
  <svg {...base("3.75 3.75 16.5 16.5", p)}>
    <circle cx="12" cy="12" r="7.5" />
    <path d="M12 8.2 V 12.4 L 15 14.2" />
  </svg>
);

export const MoonIcon = (p: IconProps) => (
  <svg {...base("3.75 3.5 17 17.5", p)}>
    <path d="M9.5 4.25 A 8.25 8.25 0 1 0 20 14.75 A 6.9 6.9 0 0 1 9.5 4.25 Z" />
  </svg>
);

export const LeafIcon = (p: IconProps) => (
  <svg {...base("3.25 4.75 17.5 13.5", p)}>
    <path d="M4 12 C 8 6.5, 15 5.5, 20 6.5 C 19.5 12, 14.5 17.5, 8.5 17.5 C 6.5 17.5, 5 16.5, 4 15 Z" />
    <path d="M6 14.5 C 10 12, 14 9.8, 18 8.2" />
  </svg>
);

export const LampIcon = (p: IconProps) => (
  <svg {...base("6 3.75 12 15", p)}>
    <path d="M9.5 4.5 H 14.5 M10.5 4.5 V 6.5 H 13.5 V 4.5" />
    <path d="M8 6.5 H 16 L 17 15.2 A 2.4 2.4 0 0 1 14.6 18 H 9.4 A 2.4 2.4 0 0 1 7 15.2 Z" />
    <path d="M12 9.5 C 10.9 11, 11 12.5, 12 13.4 C 13 12.5, 13.1 11, 12 9.5 Z" />
  </svg>
);

export const BellIcon = (p: IconProps) => (
  <svg {...base("5.25 3.75 13.5 17", p)}>
    <path d="M6 16.5 H 18 V 15.4 C 16.6 14.3, 16 12.6, 16 10.5 A 4 4 0 0 0 8 10.5 C 8 12.6, 7.4 14.3, 6 15.4 Z" />
    <path d="M10.4 18.5 A 1.7 1.7 0 0 0 13.6 18.5" />
  </svg>
);

export const VialIcon = (p: IconProps) => (
  <svg {...base("6.5 3.75 11 16.5", p)}>
    <path d="M10 4.5 H 14" />
    <path d="M11 4.5 V 9.4 L 7.8 16.4 A 1.9 1.9 0 0 0 9.6 19.25 H 14.4 A 1.9 1.9 0 0 0 16.2 16.4 L 13 9.4 V 4.5" />
    <path d="M9.3 13.5 H 14.7" />
  </svg>
);

export const DropIcon = (p: IconProps) => (
  <svg {...base("6.25 3.75 11.5 15.5", p)}>
    <path d="M12 4.5 C 9.2 8.3, 7 11.3, 7 14 A 5 5 0 0 0 17 14 C 17 11.3, 14.8 8.3, 12 4.5 Z" />
  </svg>
);

export const SealIcon = (p: IconProps) => (
  <svg {...base("3.25 3.25 17.5 17.5", p)}>
    <path d="M12 4 C 9 7, 9 10, 12 12 C 15 10, 15 7, 12 4 Z M12 12 C 9 14, 9 17, 12 20 C 15 17, 15 14, 12 12 Z M4 12 C 7 9, 10 9, 12 12 C 10 15, 7 15, 4 12 Z M12 12 C 14 9, 17 9, 20 12 C 17 15, 14 15, 12 12 Z" />
  </svg>
);

export const QuillIcon = (p: IconProps) => (
  <svg {...base("5.25 3.75 15 16", p)}>
    <path d="M19.5 4.5 C 13 5.5, 8.5 9, 7 15.5 L 6 19" />
    <path d="M7.5 14 C 11.5 13.6, 15.5 11.2, 18 7.6" />
  </svg>
);

export const BookIcon = (p: IconProps) => (
  <svg {...base("4.25 3.9 15.5 15.7", p)}>
    <path d="M5 5.2 C 7.4 4.3, 10 4.4, 12 5.6 V 18.8 C 10 17.6, 7.4 17.5, 5 18.4 Z" />
    <path d="M19 5.2 C 16.6 4.3, 14 4.4, 12 5.6 V 18.8 C 14 17.6, 16.6 17.5, 19 18.4 Z" />
  </svg>
);

export const KeyIcon = (p: IconProps) => (
  <svg {...base("3.75 3.75 16.5 16.5", p)}>
    <circle cx="8.5" cy="8.5" r="4" />
    <path d="M11.3 11.3 L 19.5 19.5 M15.7 15.7 L 17.9 13.5 M17.7 17.7 L 19.7 15.7" />
  </svg>
);
