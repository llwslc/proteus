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
    <BaseSlider.Root className={cx("nocturne-slider", className)} {...props}>
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
          <BaseSlider.Indicator className="nocturne-slider__indicator" />
          <BaseSlider.Thumb
            className="nocturne-slider__thumb"
            getAriaLabel={typeof label === "string" ? () => label : undefined}
          />
        </BaseSlider.Track>
      </BaseSlider.Control>
    </BaseSlider.Root>
  );
}
