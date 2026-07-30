import { useId, useState } from "react";
import { Slider as BaseSlider } from "@base-ui/react/slider";
import type { CSSProperties, ComponentPropsWithoutRef, ReactNode } from "react";
import { cx } from "../cx";
import { Bloom, MotifDefs } from "../bloom";
import "./Slider.css";

export interface SliderProps extends ComponentPropsWithoutRef<typeof BaseSlider.Root> {
  label?: ReactNode;
  showValue?: boolean;
}

const first = (v: number | readonly number[] | undefined): number | undefined =>
  typeof v === "number" ? v : Array.isArray(v) ? v[0] : undefined;

export function Slider({
  label,
  showValue = true,
  className,
  min,
  max,
  defaultValue,
  value: controlled,
  onValueChange,
  ...props
}: SliderProps) {
  const id = useId();
  const lo = min ?? 0;
  const hi = max ?? 100;
  const [tracked, setTracked] = useState<number>(first(defaultValue) ?? lo);
  const value = first(controlled) ?? tracked;
  const frac = hi > lo ? (value - lo) / (hi - lo) : 0;
  return (
    <BaseSlider.Root
      className={cx("nocturne-slider", className)}
      style={{ "--nocturne-slider-frac": frac.toFixed(3) } as CSSProperties}
      min={min}
      max={max}
      {...(controlled !== undefined ? { value: controlled } : { defaultValue })}
      onValueChange={(next, details) => {
        const n = first(next);
        if (n != null) setTracked(n);
        onValueChange?.(next as never, details);
      }}
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
        <BaseSlider.Track className="nocturne-track nocturne-slider__track">
          <BaseSlider.Indicator className="nocturne-slider__indicator" />
          <BaseSlider.Thumb
            className="nocturne-slider__thumb"
            getAriaLabel={typeof label === "string" ? () => label : undefined}
          >
            <svg
              className="nocturne-slider__bloom"
              viewBox="-17 -17 34 34"
              aria-hidden="true"
              focusable="false"
            >
              <MotifDefs id={id} />
              <Bloom
                defs={id}
                r={13}
                coreR={3.1}
                coreDots={3}
                sepals
                mode="state"
                openExpr="calc(0.3 + 0.7 * var(--nocturne-slider-frac, 0.5))"
                sepalExpr="0.7"
              />
            </svg>
          </BaseSlider.Thumb>
        </BaseSlider.Track>
      </BaseSlider.Control>
    </BaseSlider.Root>
  );
}
