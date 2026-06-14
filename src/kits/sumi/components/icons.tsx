import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = (props: IconProps) => ({
  width: "1em",
  height: "1em",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  ...props,
});

export const SealIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="4.5" y="4.5" width="15" height="15" rx="1.5" />
    <path d="M9.4 8.2c2.1 0 3.3 1.2 3.3 3s-1.1 2.8-2.6 2.8M9.4 8.2v7.6" />
  </svg>
);

export const ExclaimIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 5v9" />
    <circle cx="12" cy="18.4" r="0.7" fill="currentColor" stroke="none" />
  </svg>
);

export const KeyIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="8" cy="8" r="4" />
    <path d="M11 11l8 8" />
    <path d="M16 16l2-2M19 19l2-2" />
  </svg>
);

export const SignalIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 18a14 14 0 0 1 14-14M7 18a9 9 0 0 1 9-9" />
    <circle cx="6" cy="18" r="1.4" fill="currentColor" stroke="none" />
  </svg>
);

export const XIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);
export const ChevronDownIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="m5 9 7 7 7-7" />
  </svg>
);
export const ChevronUpIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="m5 15 7-7 7 7" />
  </svg>
);
export const ChevronRightIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="m9 5 7 7-7 7" />
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
export const CheckIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
);
export const SearchIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.6-3.6" />
  </svg>
);
export const CopyIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="9" y="9" width="11" height="11" rx="1.5" />
    <path d="M5 15V5a1 1 0 0 1 1-1h9" />
  </svg>
);
export const TrashIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13" />
  </svg>
);
