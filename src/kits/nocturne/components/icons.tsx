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
    strokeWidth: Number((1.5 / 24 / s).toFixed(2)),
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

export const MoonIcon = (p: IconProps) => (
  <svg {...base("3 3 18 18", p)}>
    <path d="M13.8 4A8.2 8.2 0 1 0 20 10.2 6.6 6.6 0 0 1 13.8 4Z" />
  </svg>
);

export const LampIcon = (p: IconProps) => (
  <svg {...base("6 2 12 18.5", p)}>
    <circle cx="12" cy="3.7" r="1.4" />
    <path d="M8.5 7.5h7M8 7.5l-1.1 9h10.2L16 7.5M9.2 19.7h5.6" />
    <path d="M12 10.6c-1 1.4-1 2.7 0 3.7 1-1 1-2.3 0-3.7Z" />
  </svg>
);

export const BloomIcon = (p: IconProps) => (
  <svg {...base("4 3.5 16 16.5", p)}>
    <g>
      {[0, 72, 144, 216, 288].map((a) => (
        <path
          key={a}
          d="M12 10.4C10.8 8.6 10.8 6.3 12 4.6c1.2 1.7 1.2 4 0 5.8Z"
          transform={`rotate(${a} 12 12)`}
        />
      ))}
    </g>
    <circle cx="12" cy="12" r="1.6" />
  </svg>
);

export const LeafIcon = (p: IconProps) => (
  <svg {...base("3.5 4.5 17 14", p)}>
    <path d="M4.5 15C7 8.5 13 5.5 19.5 5.5 19 12.5 13.5 18 6.5 17.5" />
    <path d="M6.5 17.5C9 13 13 9.5 17 8" />
  </svg>
);

export const BellIcon = (p: IconProps) => (
  <svg {...base("4.5 3.5 15 17", p)}>
    <path d="M7 15.5C7 10 8.5 6.5 12 6.5s5 3.5 5 9M5.5 15.5h13M12 6.5V4.2" />
    <path d="M10.5 18.3a1.5 1.5 0 0 0 3 0" />
  </svg>
);

export const DropIcon = (p: IconProps) => (
  <svg {...base("6 3 12 17", p)}>
    <path d="M12 4c-3 4-5 7-5 10a5 5 0 0 0 10 0c0-3-2-6-5-10Z" />
  </svg>
);

export const BookIcon = (p: IconProps) => (
  <svg {...base("4 3.5 16 16.5", p)}>
    <path d="M12 6C10 4.8 7.5 4.5 5 4.8v13.4c2.5-.3 5 0 7 1.2 2-1.2 4.5-1.5 7-1.2V4.8C16.5 4.5 14 4.8 12 6Z" />
    <path d="M12 6v13.4" />
  </svg>
);

export const SealIcon = (p: IconProps) => (
  <svg {...base("3 3 18 18", p)}>
    <path d="M12 4c-3 3-3 6 0 8 3-2 3-5 0-8ZM12 12c-3 2-3 5 0 8 3-3 3-6 0-8ZM4 12c3-3 6-3 8 0-2 3-5 3-8 0ZM12 12c2-3 5-3 8 0-3 3-6 3-8 0Z" />
  </svg>
);

export const VialIcon = (p: IconProps) => (
  <svg {...base("6 3 12 18", p)}>
    <path d="M9.5 4h5M10.5 4v4.5L7.5 13a5 5 0 1 0 9 0l-3-4.5V4" />
    <path d="M8.3 14.5h7.4" />
  </svg>
);

export const KeyIcon = (p: IconProps) => (
  <svg {...base("4 4 16.5 16.5", p)}>
    <circle cx="8.5" cy="8.5" r="3.5" />
    <path d="M11.2 11.2 19.5 19.5M14.8 14.8l2.5-2.5M17.2 17.2l2.3-2.3" />
  </svg>
);

export const FeatherIcon = (p: IconProps) => (
  <svg {...base("4 3.5 16 16.5", p)}>
    <path d="M5 19c0-7 4-13 14-14.5C18.5 12 13.5 17.5 7 18" />
    <path d="M5 19c3-4 6-7 9.5-10" />
  </svg>
);

export const TagIcon = (p: IconProps) => (
  <svg {...base("3.5 4.5 17 16.5", p)}>
    <path d="M4.5 5.5h6l8.5 8.5a1 1 0 0 1 0 1.4l-4.6 4.6a1 1 0 0 1-1.4 0L4.5 11.5Z" />
    <circle cx="8.2" cy="9.2" r="1.2" />
  </svg>
);

export const EyeIcon = (p: IconProps) => (
  <svg {...base("2.5 4.5 19 15", p)}>
    <path d="M3.5 12C6 7.5 9 5.5 12 5.5s6 2 8.5 6.5c-2.5 4.5-5.5 6.5-8.5 6.5S6 16.5 3.5 12Z" />
    <circle cx="12" cy="12" r="2.6" />
  </svg>
);

export const SproutIcon = (p: IconProps) => (
  <svg {...base("4.5 5 15 15.5", p)}>
    <path d="M12 20v-8" />
    <path d="M12 12c0-4-2.5-6-6.5-6 0 4 2.5 6 6.5 6ZM12 14c0-3.5 2.5-5.5 6.5-5.5 0 4-2.5 5.5-6.5 5.5" />
  </svg>
);

export const ClockIcon = (p: IconProps) => (
  <svg {...base("3 3 18 18", p)}>
    <circle cx="12" cy="12" r="8" />
    <path d="M12 7.5V12l3 2.5" />
  </svg>
);

export const ScissorsIcon = (p: IconProps) => (
  <svg {...base("3 4 17.5 16", p)}>
    <circle cx="6" cy="7" r="2.2" />
    <circle cx="6" cy="17" r="2.2" />
    <path d="M8 8.2 19 15.5M8 15.8 19 8.5" />
  </svg>
);

export const MistIcon = (p: IconProps) => (
  <svg {...base("3.5 6.5 17 11", p)}>
    <path d="M4.5 8.5C7 7 9 7 11.5 8.5s4.5 1.5 7 0" />
    <path d="M4.5 12.5c2.5-1.5 4.5-1.5 7 0s4.5 1.5 7 0" />
    <path d="M4.5 16.5c2.5-1.5 4.5-1.5 7 0s4.5 1.5 7 0" />
  </svg>
);

export const SprigMark = (p: IconProps) => (
  <svg viewBox="0 0 56 56" fill="none" stroke="currentColor" aria-hidden {...p}>
    <path
      d="M6 50C12 34 15 22 27 13c8-5 17-5 23-8"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <g strokeWidth="1.2">
      <path d="M13.6 30.5c2.4-3.9 8.2-4.6 12-1.6-3.2 3.7-8.9 4.3-12 1.6Z" transform="rotate(-8 19 29)" />
      <path d="M18.4 17.5c2.4-3.9 8.2-4.6 12-1.6-3.2 3.7-8.9 4.3-12 1.6Z" transform="rotate(-115 24 16)" />
      <path d="M30.6 9.2c2.2-3.5 7.4-4.1 10.8-1.4-2.9 3.3-8 3.9-10.8 1.4Z" transform="rotate(38 36 8)" />
    </g>
    <circle cx="8" cy="49" r="1.6" fill="currentColor" stroke="none" />
  </svg>
);

export const QuatrefoilMark = (p: IconProps) => (
  <svg viewBox="3 3 18 18" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden {...p}>
    <path d="M12 4.2c-1.5 2.4-1.5 4.6 0 6.4 1.5-1.8 1.5-4 0-6.4ZM12 13.4c-1.5 2.4-1.5 4.2 0 6.4 1.5-2.2 1.5-4 0-6.4ZM4.2 12c2.4-1.5 4.6-1.5 6.4 0-1.8 1.5-4 1.5-6.4 0ZM13.4 12c2.4-1.5 4.2-1.5 6.4 0-2.2 1.5-4 1.5-6.4 0Z" />
    <circle cx="12" cy="12" r="1.4" />
  </svg>
);

export const ModalVine = (p: IconProps) => (
  <svg
    viewBox="0 0 400 44"
    fill="none"
    className="nocturne-modal-vine"
    aria-hidden
    {...p}
  >
    <path
      className="nocturne-modal-vine__branch"
      pathLength={1}
      d="M200 22C170 12 140 12 112 22 88 30 60 30 36 22"
    />
    <path
      className="nocturne-modal-vine__branch"
      pathLength={1}
      d="M200 22C230 12 260 12 288 22 312 30 340 30 364 22"
    />
    <g className="nocturne-modal-vine__leaf">
      <path
        d="M152 15c3-4 9-4.6 13-1.4-3.4 3.8-9.4 4.2-13 1.4Z"
        transform="rotate(-16 158 14)"
      />
    </g>
    <g className="nocturne-modal-vine__leaf">
      <path
        d="M235 15c3-4 9-4.6 13-1.4-3.4 3.8-9.4 4.2-13 1.4Z"
        transform="rotate(196 241 14)"
      />
    </g>
    <g className="nocturne-modal-vine__bud">
      <circle cx="36" cy="22" r="2.4" />
    </g>
    <g className="nocturne-modal-vine__bud">
      <circle cx="364" cy="22" r="2.4" />
    </g>
  </svg>
);

export const BloomMark = (p: IconProps) => (
  <svg viewBox="-14 -14 28 28" fill="none" aria-hidden {...p}>
    {[0, 72, 144, 216, 288].map((a) => (
      <g key={a} transform={`rotate(${a})`}>
        <path
          className="nocturne-bloommark__petal"
          d="M0 0C-3.4-3.4-3.6-8.6 0-11.4 3.6-8.6 3.4-3.4 0 0Z"
        />
      </g>
    ))}
    <circle className="nocturne-bloommark__core" r="3" />
    <g className="nocturne-bloommark__seed">
      <circle cy="-1.4" r="0.7" />
      <circle cx="1.3" cy="0.6" r="0.7" />
      <circle cx="-1.3" cy="0.6" r="0.7" />
    </g>
  </svg>
);
