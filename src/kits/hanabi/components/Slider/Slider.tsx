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
      className={cx("hanabi-slider", className)}
      thumbAlignment="edge"
      {...props}
    >
      {(label != null || showValue) && (
        <div className="hanabi-slider__head">
          {label != null ? (
            <BaseSlider.Label className="hanabi-cap hanabi-slider__label">
              {label}
            </BaseSlider.Label>
          ) : null}
          {showValue ? <BaseSlider.Value className="hanabi-slider__value" /> : null}
        </div>
      )}
      <BaseSlider.Control className="hanabi-slider__control">
        <BaseSlider.Track className="hanabi-slider__track">
          <BaseSlider.Indicator className="hanabi-slider__indicator" />
          <BaseSlider.Thumb className="hanabi-slider__thumb" />
        </BaseSlider.Track>
      </BaseSlider.Control>
    </BaseSlider.Root>
  );
}
