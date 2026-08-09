import { cx } from "../cx";
import { Slider as BaseSlider } from "@base-ui/react/slider";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import "./Slider.css";

export interface SliderProps extends ComponentPropsWithoutRef<typeof BaseSlider.Root> {
  label?: ReactNode;
  showValue?: boolean;
}

export function Slider({ className, label, showValue = true, ...props }: SliderProps) {
  const v = props.value ?? props.defaultValue;
  const thumbs = Array.isArray(v) ? v.map((_, i) => i) : [0];
  return (
    <BaseSlider.Root
      className={cx("nova-slider", className)}
      thumbAlignment="edge"
      {...props}
    >
      {(label != null || showValue) && (
        <div className="nova-slider__head">
          {label != null ? (
            <BaseSlider.Label className="nova-cap nova-slider__label">
              {label}
            </BaseSlider.Label>
          ) : (
            <span />
          )}
          {showValue ? <BaseSlider.Value className="nova-slider__value" /> : null}
        </div>
      )}
      <BaseSlider.Control className="nova-slider__control">
        <BaseSlider.Track className="nova-slider__track">
          <BaseSlider.Indicator className="nova-slider__indicator" />
          {thumbs.map((i) => (
            <BaseSlider.Thumb key={i} className="nova-slider__thumb" />
          ))}
        </BaseSlider.Track>
      </BaseSlider.Control>
    </BaseSlider.Root>
  );
}
