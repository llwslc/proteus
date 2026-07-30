import { useId } from "react";
import type { CSSProperties } from "react";

const petalPath = (r: number) => {
  const f = (n: number) => Number(n.toFixed(2));
  return `M0 0 C ${f(-0.3 * r)} ${f(-0.36 * r)}, ${f(-0.32 * r)} ${f(-0.76 * r)}, 0 ${f(-r)} C ${f(0.32 * r)} ${f(-0.76 * r)}, ${f(0.3 * r)} ${f(-0.36 * r)}, 0 0 Z`;
};

const sepalPath = (r: number) => {
  const f = (n: number) => Number(n.toFixed(2));
  return `M0 ${f(0.2 * r)} C ${f(-0.296 * r)} ${f(-0.306 * r)}, ${f(-0.316 * r)} ${f(-0.765 * r)}, 0 ${f(-r)} C ${f(0.316 * r)} ${f(-0.765 * r)}, ${f(0.296 * r)} ${f(-0.306 * r)}, 0 ${f(0.2 * r)} Z`;
};

export function MotifDefs({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={`${id}-petal`} x1="0" y1="1" x2="0" y2="0">
        <stop offset="0" style={{ stopColor: "var(--nocturne-petal)" }} />
        <stop offset="1" style={{ stopColor: "var(--nocturne-petal-deep)" }} />
      </linearGradient>
      <linearGradient id={`${id}-petal-lit`} x1="0" y1="1" x2="0" y2="0">
        <stop offset="0" style={{ stopColor: "var(--nocturne-bloom-tone, var(--nocturne-petal-lit))" }} />
        <stop offset="1" style={{ stopColor: "var(--nocturne-bloom-tone-deep, var(--nocturne-petal-lit-deep))" }} />
      </linearGradient>
      <linearGradient id={`${id}-leaf`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" style={{ stopColor: "var(--nocturne-leaf)" }} />
        <stop offset="1" style={{ stopColor: "var(--nocturne-leaf-deep)" }} />
      </linearGradient>
    </defs>
  );
}

export interface MotifPieceProps {
  defs: string;
  transform?: string;
  className?: string;
  style?: CSSProperties;
}

export interface BloomProps {
  defs: string;
  r?: number;
  coreR?: number;
  lit?: boolean;
  mode?: "static" | "entrance" | "state";
  delay?: number;
  sepals?: boolean;
  bud?: boolean;
  coreDots?: 3 | 5;
  transform?: string;
}

export function Bloom({
  defs,
  r = 14,
  coreR,
  lit = true,
  mode = "static",
  delay = 0,
  sepals = false,
  bud = false,
  coreDots = 5,
  transform,
}: BloomProps) {
  const fill = `url(#${defs}-${lit ? "petal-lit" : "petal"})`;
  const five = [0, 1, 2, 3, 4];
  const sw = r > 12 ? 1 : 0.55;
  const cr = coreR ?? r * 0.18;
  const k = r / 10;
  return (
    <g transform={transform}>
      {sepals &&
        five.map((i) => (
          <g key={`s${i}`} transform={`rotate(${i * 72 + 36})`}>
            <path
              className={mode === "state" ? "nocturne-bloom__sepal" : undefined}
              d={sepalPath(r * 0.75)}
              fill={`url(#${defs}-leaf)`}
              stroke="var(--nocturne-gilt-dim)"
              strokeWidth={sw}
            />
          </g>
        ))}
      {five.map((i) => (
        <g key={`p${i}`} transform={`rotate(${i * 72})`}>
          <path
            className={mode === "state" ? "nocturne-bloom__petal" : mode === "entrance" ? "nocturne-bloom-in" : undefined}
            style={mode === "entrance" ? ({ "--nocturne-d": `${(delay + i * 0.16).toFixed(2)}s` } as CSSProperties) : undefined}
            d={petalPath(r)}
            fill={fill}
            stroke="var(--nocturne-gilt-dim)"
            strokeWidth={sw}
          />
        </g>
      ))}
      {bud && (
        <g className="nocturne-bloom__bud" transform={`scale(${Number(k.toFixed(3))})`}>
          <path
            d="M0 2 C -3.4 -1.5, -2.8 -8, 0 -10 C 2.8 -8, 3.4 -1.5, 0 2 Z"
            fill={`url(#${defs}-petal)`}
            stroke="var(--nocturne-gilt-dim)"
            strokeWidth={0.7}
          />
          <path
            d="M0 1 C -1.2 -3, -1 -7, 0 -9 M0 1 C 1.2 -3, 1 -7, 0 -9"
            fill="none"
            stroke="var(--nocturne-gilt)"
            strokeWidth={0.5}
            opacity={0.55}
          />
        </g>
      )}
      <g
        className={mode === "state" ? "nocturne-bloom__core" : mode === "entrance" ? "nocturne-core-in" : undefined}
        style={mode === "entrance" ? ({ "--nocturne-d": `${(delay + 0.9).toFixed(2)}s` } as CSSProperties) : undefined}
      >
        <circle r={Number(cr.toFixed(2))} fill="var(--nocturne-gilt-bright)" stroke="var(--nocturne-gilt-dim)" strokeWidth={sw > 0.6 ? 1 : 0.5} />
        {coreDots === 5
          ? five.map((j) => {
              const a = ((j * 72 - 90) * Math.PI) / 180;
              const rr = r * 0.3;
              return (
                <circle
                  key={j}
                  cx={Number((Math.cos(a) * rr).toFixed(2))}
                  cy={Number((Math.sin(a) * rr).toFixed(2))}
                  r={Number(Math.max(0.95, r * 0.055).toFixed(2))}
                  fill="var(--nocturne-gilt)"
                />
              );
            })
          : (
            <g fill="var(--nocturne-primary-deep)">
              <circle cy={Number((-1.6 * k).toFixed(2))} r={Number((0.75 * k).toFixed(2))} />
              <circle cx={Number((1.5 * k).toFixed(2))} cy={Number((0.6 * k).toFixed(2))} r={Number((0.75 * k).toFixed(2))} />
              <circle cx={Number((-1.5 * k).toFixed(2))} cy={Number((0.6 * k).toFixed(2))} r={Number((0.75 * k).toFixed(2))} />
            </g>
          )}
      </g>
    </g>
  );
}

export function Leaf({ defs, transform, className, style }: MotifPieceProps) {
  return (
    <g transform={transform} className={className} style={style}>
      <path
        d="M0 0 C 10 -9, 26 -11, 38 -2 C 26 8, 10 8, 0 0 Z"
        fill={`url(#${defs}-leaf)`}
        stroke="var(--nocturne-gilt-dim)"
        strokeWidth="1"
      />
      <path d="M3 0 C 13 -3, 24 -4, 34 -2" fill="none" stroke="var(--nocturne-gilt)" strokeWidth="0.8" opacity="0.7" />
    </g>
  );
}

export function Bud({ defs, transform, className, style }: MotifPieceProps) {
  return (
    <g transform={transform} className={className} style={style}>
      <path
        d="M0 0 C -6 -8, -6 -18, 0 -24 C 6 -18, 6 -8, 0 0 Z"
        fill={`url(#${defs}-petal)`}
        stroke="var(--nocturne-gilt-dim)"
        strokeWidth="1"
      />
      <path
        d="M-4 -2 C -2 -8, -1 -13, 0 -20 M4 -2 C 2 -8, 1 -13, 0 -20"
        fill="none"
        stroke="var(--nocturne-gilt)"
        strokeWidth="0.8"
        opacity="0.65"
      />
      <path d="M-5 0 C -2 -4, 2 -4, 5 0" fill="none" stroke="var(--nocturne-gilt-dim)" strokeWidth="1.2" />
    </g>
  );
}

export function Tendril({ transform, className, style }: Omit<MotifPieceProps, "defs">) {
  return (
    <g transform={transform} className={className} style={style}>
      <path
        d="M0 0 C 10 -7, 22 -7, 25 2 C 27 9, 19 14, 13 10 C 8 7, 10 1, 15 2"
        fill="none"
        stroke="var(--nocturne-gilt)"
        strokeWidth="1.2"
        opacity="0.75"
      />
    </g>
  );
}

export function ModalVine() {
  const id = useId();
  const accent = "var(--nocturne-modal-accent, var(--nocturne-gilt-bright))";
  return (
    <svg className="nocturne-modal-vine" viewBox="0 0 400 60" aria-hidden="true" focusable="false">
      <MotifDefs id={id} />
      <path
        className="nocturne-grow"
        pathLength={1}
        d="M200 30 C 170 18, 140 18, 112 30 C 88 40, 60 40, 36 30"
        fill="none"
        stroke={accent}
        strokeWidth="1.4"
        opacity="0.8"
        style={{ "--nocturne-d": "0.15s" } as CSSProperties}
      />
      <path
        className="nocturne-grow"
        pathLength={1}
        d="M200 30 C 230 18, 260 18, 288 30 C 312 40, 340 40, 364 30"
        fill="none"
        stroke={accent}
        strokeWidth="1.4"
        opacity="0.8"
        style={{ "--nocturne-d": "0.15s" } as CSSProperties}
      />
      <Leaf defs={id} className="nocturne-sprout" style={{ "--nocturne-d": "0.8s" } as CSSProperties} transform="translate(155,21) rotate(-134) scale(.5)" />
      <Leaf defs={id} className="nocturne-sprout" style={{ "--nocturne-d": "0.8s" } as CSSProperties} transform="translate(245,21) rotate(134) scale(-.5,.5)" />
      <Leaf defs={id} className="nocturne-sprout" style={{ "--nocturne-d": "1.05s" } as CSSProperties} transform="translate(112,30) rotate(-166) scale(.44)" />
      <Leaf defs={id} className="nocturne-sprout" style={{ "--nocturne-d": "1.05s" } as CSSProperties} transform="translate(288,30) rotate(166) scale(-.44,.44)" />
      <Leaf defs={id} className="nocturne-sprout" style={{ "--nocturne-d": "1.3s" } as CSSProperties} transform="translate(74,37.5) rotate(122) scale(.44)" />
      <Leaf defs={id} className="nocturne-sprout" style={{ "--nocturne-d": "1.3s" } as CSSProperties} transform="translate(326,37.5) rotate(-122) scale(-.44,.44)" />
      <Bud defs={id} className="nocturne-sprout" style={{ "--nocturne-d": "1.72s" } as CSSProperties} transform="translate(36,30) rotate(-108) scale(.84)" />
      <Bud defs={id} className="nocturne-sprout" style={{ "--nocturne-d": "1.72s" } as CSSProperties} transform="translate(364,30) rotate(108) scale(-.84,.84)" />
      <Bloom defs={id} r={22} mode="entrance" delay={0.2} transform="translate(200,30)" />
    </svg>
  );
}

export function ModalCorners() {
  const corner = (mod: string) => (
    <span className={`nocturne-modal__corner nocturne-modal__corner--${mod}`} aria-hidden="true">
      <svg viewBox="0 0 56 56" focusable="false">
        <Sprig transform="translate(56,0) scale(-1,1)" />
      </svg>
    </span>
  );
  return (
    <>
      {corner("tl")}
      {corner("tr")}
      {corner("bl")}
      {corner("br")}
    </>
  );
}

export function Sprig({ transform, className, style }: Omit<MotifPieceProps, "defs">) {
  const leaf = (
    <>
      <path d="M0 0 C 4 -6, 13 -6, 18 0 C 13 6, 4 6, 0 0 Z" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <path d="M2 0 C 7 -2, 13 -2, 16 0" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.7" />
    </>
  );
  return (
    <g transform={transform} className={className} style={style} strokeLinecap="round">
      <path d="M6 50 C 12 34, 15 22, 27 13 C 35 8, 44 8, 50 5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <g transform="translate(12.7,32.3) rotate(-5) scale(.72)">{leaf}</g>
      <g transform="translate(20.2,19.5) rotate(-112) scale(.72)">{leaf}</g>
      <g transform="translate(31.9,10.5) rotate(40) scale(.7)">{leaf}</g>
      <circle cx="8" cy="49" r="1.6" fill="currentColor" />
    </g>
  );
}
