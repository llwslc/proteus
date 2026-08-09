import { Slider as BaseSlider } from "@base-ui/react/slider";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cx } from "../cx";
import "./Slider.css";

export interface SliderProps extends ComponentPropsWithoutRef<typeof BaseSlider.Root> {
  label?: ReactNode;
  showValue?: boolean;
}

export function Slider({ label, showValue = true, className, ...props }: SliderProps) {
  const v = props.value ?? props.defaultValue;
  const thumbs = Array.isArray(v) ? v.map((_, i) => i) : [0];
  return (
    <BaseSlider.Root
      className={cx("brass-slider", className)}
      thumbAlignment="edge"
      {...props}
    >
      {(label != null || showValue) && (
        <div className="brass-slider__head">
          {label != null ? (
            <BaseSlider.Label className="brass-cap">{label}</BaseSlider.Label>
          ) : (
            <span />
          )}
          {showValue ? <BaseSlider.Value className="brass-slider__value" /> : null}
        </div>
      )}
      <BaseSlider.Control className="brass-slider__control">
        <BaseSlider.Track className="brass-slider__track">
          <BaseSlider.Indicator className="brass-slider__indicator" />
          {thumbs.map((i) => (
            <BaseSlider.Thumb key={i} className="brass-slider__thumb brass-knob" />
          ))}
        </BaseSlider.Track>
      </BaseSlider.Control>
    </BaseSlider.Root>
  );
}
