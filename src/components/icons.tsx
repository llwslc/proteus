/* Minimal inline icon set shared by the NOVA components.
   Each is a 1em, currentColor SVG so it inherits text color + size. */
import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = (props: IconProps) => ({
  width: "1em",
  height: "1em",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  ...props,
});

export const CheckIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export const MinusIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M5 12h14" />
  </svg>
);

export const PlusIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const ChevronDownIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const ChevronUpIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="m18 15-6-6-6 6" />
  </svg>
);

export const ChevronRightIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="m9 6 6 6-6 6" />
  </svg>
);

export const XIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

export const SearchIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="11" cy="11" r="7" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

export const BoltIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />
  </svg>
);
