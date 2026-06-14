import { cx } from "../cx";
import { Slider as BaseSlider } from "@base-ui/react/slider";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import "./Slider.css";

export interface SliderProps extends ComponentPropsWithoutRef<typeof BaseSlider.Root> {
  label?: ReactNode;
  showValue?: boolean;
}

export function Slider({ className, label, showValue = true, ...props }: SliderProps) {
  return (
    <BaseSlider.Root className={cx("sumi-slider", className)} {...props}>
      {(label != null || showValue) && (
        <div className="sumi-slider__head">
          {label != null ? (
            <span className="sumi-cap sumi-slider__label">{label}</span>
          ) : (
            <span />
          )}
          {showValue ? <BaseSlider.Value className="sumi-slider__value" /> : null}
        </div>
      )}
      <BaseSlider.Control className="sumi-slider__control">
        <BaseSlider.Track className="sumi-slider__track">
          <BaseSlider.Indicator className="sumi-slider__indicator" />
          <BaseSlider.Thumb className="sumi-slider__thumb" />
        </BaseSlider.Track>
      </BaseSlider.Control>
    </BaseSlider.Root>
  );
}
