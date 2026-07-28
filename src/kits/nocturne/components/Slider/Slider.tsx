import { useId, useState } from "react";
import { Slider as BaseSlider } from "@base-ui/react/slider";
import type { CSSProperties, ComponentPropsWithoutRef, ReactNode } from "react";
import { cx } from "../cx";
import "./Slider.css";

export interface SliderProps extends ComponentPropsWithoutRef<typeof BaseSlider.Root> {
  label?: ReactNode;
  showValue?: boolean;
}

const PETALS = [0, 72, 144, 216, 288];
const SEPALS = [36, 108, 180, 252, 324];

function firstValue(v: number | readonly number[] | undefined): number | undefined {
  return Array.isArray(v) ? (v[0] as number) : (v as number | undefined);
}

export function Slider({
  label,
  showValue = true,
  className,
  min = 0,
  max = 100,
  defaultValue,
  value: controlled,
  onValueChange,
  style,
  ...props
}: SliderProps) {
  const uid = useId();
  const petId = `${uid}pet`;
  const sepId = `${uid}sep`;
  const [tracked, setTracked] = useState<number | undefined>(
    firstValue(defaultValue),
  );
  const value = controlled !== undefined ? firstValue(controlled) : tracked;
  const open = Math.min(1, Math.max(0, ((value ?? min) - min) / (max - min || 1)));

  return (
    <BaseSlider.Root
      className={cx("nocturne-slider", className)}
      min={min}
      max={max}
      {...(controlled !== undefined ? { value: controlled } : { defaultValue })}
      onValueChange={(next, details) => {
        if (controlled === undefined) setTracked(firstValue(next));
        onValueChange?.(next, details);
      }}
      style={{ ...style, "--nocturne-slider-open": open } as CSSProperties}
      {...props}
    >
      {(label != null || showValue) && (
        <div className="nocturne-slider__head">
          {label != null ? (
            <span className="nocturne-cap nocturne-slider__label">{label}</span>
          ) : null}
          {showValue ? <BaseSlider.Value className="nocturne-slider__value" /> : null}
        </div>
      )}
      <BaseSlider.Control className="nocturne-slider__control">
        <BaseSlider.Track className="nocturne-slider__track">
          <BaseSlider.Indicator
            className="nocturne-slider__indicator"
            style={{ height: "inherit" }}
          />
          <BaseSlider.Thumb
            className="nocturne-slider__thumb"
            getAriaLabel={typeof label === "string" ? () => label : undefined}
          >
            <svg viewBox="-17 -17 34 34" aria-hidden="true" focusable="false">
              <defs>
                <linearGradient id={petId} x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0" stopColor="#a63a5c" />
                  <stop offset="1" stopColor="#6b1e38" />
                </linearGradient>
                <linearGradient id={sepId} x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#6e5a2e" />
                  <stop offset="1" stopColor="#3e3118" />
                </linearGradient>
              </defs>
              <g className="nocturne-slider__sepals">
                {SEPALS.map((a) => (
                  <g key={a} transform={`rotate(${a})`}>
                    <path
                      fill={`url(#${sepId})`}
                      d="M0 0C-2.9-3-3.1-7.5 0-9.8 3.1-7.5 2.9-3 0 0Z"
                    />
                  </g>
                ))}
              </g>
              <g>
                {PETALS.map((a) => (
                  <g key={a} transform={`rotate(${a})`}>
                    <path
                      className="nocturne-slider__petal"
                      fill={`url(#${petId})`}
                      d="M0 0C-3.9-3.9-4.1-9.8 0-13 4.1-9.8 3.9-3.9 0 0Z"
                    />
                  </g>
                ))}
              </g>
              <circle className="nocturne-slider__core" r="3.1" />
              <g className="nocturne-slider__seeds">
                <circle cy="-1.6" r="0.75" />
                <circle cx="1.5" cy="0.6" r="0.75" />
                <circle cx="-1.5" cy="0.6" r="0.75" />
              </g>
            </svg>
          </BaseSlider.Thumb>
        </BaseSlider.Track>
      </BaseSlider.Control>
    </BaseSlider.Root>
  );
}
