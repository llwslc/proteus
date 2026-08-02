import { useState } from "react";
import { cx } from "../cx";
import { Slider as BaseSlider } from "@base-ui/react/slider";
import type { CSSProperties, ComponentPropsWithoutRef, ReactNode } from "react";
import "./Slider.css";

export interface SliderProps extends ComponentPropsWithoutRef<typeof BaseSlider.Root> {
  label?: ReactNode;
  showValue?: boolean;
}

const first = (v: number | readonly number[] | undefined): number | undefined =>
  typeof v === "number" ? v : Array.isArray(v) ? v[0] : undefined;

export function Slider({
  className,
  label,
  showValue = true,
  min,
  max,
  defaultValue,
  value: controlled,
  onValueChange,
  ...props
}: SliderProps) {
  const lo = min ?? 0;
  const hi = max ?? 100;
  const [tracked, setTracked] = useState<number>(first(defaultValue) ?? lo);
  const current = first(controlled) ?? tracked;
  const frac = hi > lo ? (current - lo) / (hi - lo) : 0;
  return (
    <BaseSlider.Root
      className={cx("abyss-slider", className)}
      style={{ "--abyss-slider-frac": frac.toFixed(3) } as CSSProperties}
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
        <div className="abyss-slider__head">
          {label != null ? (
            <span className="abyss-cap abyss-slider__label">{label}</span>
          ) : (
            <span />
          )}
          {showValue ? <BaseSlider.Value className="abyss-slider__value" /> : null}
        </div>
      )}
      <BaseSlider.Control className="abyss-slider__control">
        <BaseSlider.Track className="abyss-slider__track">
          <BaseSlider.Indicator className="abyss-slider__indicator" />
          <BaseSlider.Thumb
            className="abyss-slider__thumb"
            getAriaLabel={typeof label === "string" ? () => label : undefined}
          />
        </BaseSlider.Track>
      </BaseSlider.Control>
    </BaseSlider.Root>
  );
}
