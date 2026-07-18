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

export const FireworkIcon = (p: IconProps) => (
  <svg {...base("2.5 2.5 18.5 18.5", p)}>
    <path d="M12 10V5M12 14v5M10 12H5M14 12h5M10.4 10.4 7 7M13.6 13.6 17 17M13.6 10.4 17 7M10.4 13.6 7 17" />
    <g fill="currentColor" stroke="none">
      <circle cx="12" cy="12" r="1.4" />
      <circle cx="12" cy="3.6" r=".9" />
      <circle cx="12" cy="20.4" r=".9" />
      <circle cx="3.6" cy="12" r=".9" />
      <circle cx="20.4" cy="12" r=".9" />
      <circle cx="5.5" cy="5.5" r=".9" />
      <circle cx="18.5" cy="18.5" r=".9" />
      <circle cx="18.5" cy="5.5" r=".9" />
      <circle cx="5.5" cy="18.5" r=".9" />
    </g>
  </svg>
);

export const ShieldIcon = (p: IconProps) => (
  <svg {...base("3.5 2 17 19", p)}>
    <path d="M12 3.2l7.5 2.8v5.5c0 4.8-7.5 8.8-7.5 8.8s-7.5-4-7.5-8.8V6z" />
    <path d="M9 11.5l2.2 2.2 4-4.4" />
  </svg>
);

export const TargetIcon = (p: IconProps) => (
  <svg {...base("1 1 22 22", p)}>
    <circle cx="12" cy="12" r="6.3" />
    <path d="M12 2v3.4M12 18.6V22M2 12h3.4M18.6 12H22" />
    <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
  </svg>
);

export const HeartIcon = (p: IconProps) => (
  <svg {...base("3 3.5 18.5 17.5", p)}>
    <path d="M12 20.3S3.8 15 3.8 9.2C3.8 6.4 5.8 4.7 8 4.7c1.7 0 3.2 1.1 4 2.4.8-1.3 2.3-2.4 4-2.4 2.2 0 4.2 1.7 4.2 4.5 0 5.8-8.2 11.1-8.2 11.1Z" />
  </svg>
);

export const RocketIcon = (p: IconProps) => (
  <svg {...base("5 2 14 18", p)}>
    <path d="M12 3c2.5 2 3.8 5 3.8 8.5L12 15l-3.8-3.5C8.2 8 9.5 5 12 3Z" />
    <circle cx="12" cy="9" r="1.4" />
    <path d="M8.5 13.5 6 16l2.5.3M15.5 13.5 18 16l-2.5.3M10.5 16v3M13.5 16v3" />
  </svg>
);

export const BladeIcon = (p: IconProps) => (
  <svg {...base("2.5 2.5 19 18", p)}>
    <path d="M20.5 3.5 10 14" />
    <path d="M8.2 12.2 11.8 15.8" />
    <path d="M10 14 5 19l-1.5.5.5-1.5z" />
    <path d="M18 4.5 19.5 6" />
  </svg>
);
