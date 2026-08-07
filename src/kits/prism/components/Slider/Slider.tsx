import { Slider as BaseSlider } from "@base-ui/react/slider";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cx } from "../cx";
import "./Slider.css";

export interface SliderProps extends ComponentPropsWithoutRef<typeof BaseSlider.Root> {
  label?: ReactNode;
  showValue?: boolean;
}

export function Slider({ label, showValue = true, className, ...props }: SliderProps) {
  return (
    <BaseSlider.Root
      className={cx("prism-slider", className)}
      thumbAlignment="edge"
      {...props}
    >
      {(label != null || showValue) && (
        <div className="prism-slider__head">
          {label != null ? (
            <BaseSlider.Label className="prism-cap prism-slider__label">
              {label}
            </BaseSlider.Label>
          ) : null}
          {showValue ? <BaseSlider.Value className="prism-slider__value" /> : null}
        </div>
      )}
      <BaseSlider.Control className="prism-slider__control">
        <BaseSlider.Track className="prism-slider__track">
          <BaseSlider.Indicator className="prism-slider__indicator" />
          <BaseSlider.Thumb className="prism-slider__thumb" />
        </BaseSlider.Track>
      </BaseSlider.Control>
    </BaseSlider.Root>
  );
}
