import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = (viewBox: string, props: IconProps) => {
  const [, , w, h] = viewBox.split(" ").map(Number);
  const s = 0.8 / Math.max(w, h);
  return {
    width: `${(w * s).toFixed(3)}em`,
    height: `${(h * s).toFixed(3)}em`,
    viewBox,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: Number((2 / 24 / s).toFixed(2)),
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

export const ChevronUpIcon = (p: IconProps) => (
  <svg {...base("5 7.5 14 8", p)}>
    <path d="m6 14.5 6-6 6 6" />
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

export const BoltIcon = (p: IconProps) => (
  <svg {...base("5 2 14 20", p)}>
    <path d="M13.5 3 6 13.5h5L10.5 21 18 10.5h-5L13.5 3Z" />
  </svg>
);

export const TrashIcon = (p: IconProps) => (
  <svg {...base("3.5 3.5 17 17.5", p)}>
    <path d="M4.5 7h15M9.5 7V4.5h5V7M6.5 7l1 13h9l1-13" />
    <path d="M10 11v5.5M14 11v5.5" />
  </svg>
);

export const CopyIcon = (p: IconProps) => (
  <svg {...base("3.5 3.5 17 17", p)}>
    <rect x="8.5" y="8.5" width="11" height="11" rx="2" />
    <path d="M15.5 5.5v-1h-11v11h1" />
  </svg>
);

export const SignalIcon = (p: IconProps) => (
  <svg {...base("4 5 17 15", p)}>
    <path d="M5 19v-4M10 19v-8M15 19V6M20 19v-2.5" />
  </svg>
);

export const SparkIcon = (p: IconProps) => (
  <svg {...base("5.5 3.5 13 13.3", p)} fill="currentColor" stroke="none">
    <path d="M12 3.5c.7 3.8 2.4 5.6 6.5 6.3-4.1 1-5.8 2.8-6.5 7-.7-4.2-2.4-6-6.5-7 4.1-.7 5.8-2.5 6.5-6.3Z" />
  </svg>
);

export const ClockIcon = (p: IconProps) => (
  <svg {...base("2.5 2.5 19 19", p)}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2.5" />
  </svg>
);
