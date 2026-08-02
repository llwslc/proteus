import { Slider as BaseSlider } from "@base-ui/react/slider";
import type { CSSProperties, ComponentPropsWithoutRef, ReactNode } from "react";
import { useState } from "react";
import { cx } from "../cx";
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
  const lo = min ?? 0;
  const hi = max ?? 100;
  const [tracked, setTracked] = useState<number>(first(defaultValue) ?? lo);
  const current = first(controlled) ?? tracked;
  const frac = hi > lo ? (current - lo) / (hi - lo) : 0;
  return (
    <BaseSlider.Root
      className={cx("hanabi-slider", className)}
      style={{ "--hanabi-slider-frac": frac.toFixed(3) } as CSSProperties}
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
        <div className="hanabi-slider__head">
          {label != null ? (
            <span className="hanabi-cap hanabi-slider__label">{label}</span>
          ) : null}
          {showValue ? <BaseSlider.Value className="hanabi-slider__value" /> : null}
        </div>
      )}
      <BaseSlider.Control className="hanabi-slider__control">
        <BaseSlider.Track className="hanabi-slider__track">
          <BaseSlider.Indicator className="hanabi-slider__indicator" />
          <BaseSlider.Thumb
            className="hanabi-slider__thumb"
            getAriaLabel={typeof label === "string" ? () => label : undefined}
          />
        </BaseSlider.Track>
      </BaseSlider.Control>
    </BaseSlider.Root>
  );
}
