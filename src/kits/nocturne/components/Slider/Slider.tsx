import { useId } from "react";
import { Slider as BaseSlider } from "@base-ui/react/slider";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cx } from "../cx";
import { Bloom, MotifDefs } from "../bloom";
import "./Slider.css";

export interface SliderProps extends ComponentPropsWithoutRef<typeof BaseSlider.Root> {
  label?: ReactNode;
  showValue?: boolean;
}

export function Slider({ label, showValue = true, className, ...props }: SliderProps) {
  const id = useId();
  return (
    <BaseSlider.Root
      className={cx("nocturne-slider", className)}
      thumbAlignment="edge"
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
                openExpr="1"
                sepalExpr="0.7"
              />
            </svg>
          </BaseSlider.Thumb>
        </BaseSlider.Track>
      </BaseSlider.Control>
    </BaseSlider.Root>
  );
}
