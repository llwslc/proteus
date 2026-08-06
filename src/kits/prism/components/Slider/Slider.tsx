import { Slider as BaseSlider } from "@base-ui/react/slider";
import { useRef } from "react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cx } from "../cx";
import "./Slider.css";

export interface SliderProps extends ComponentPropsWithoutRef<typeof BaseSlider.Root> {
  label?: ReactNode;
  showValue?: boolean;
}

export function Slider({
  className,
  label,
  showValue = true,
  onValueCommitted,
  ...props
}: SliderProps) {
  const controlRef = useRef<HTMLDivElement | null>(null);
  const snapThumbs = () => {
    requestAnimationFrame(() => {
      const control = controlRef.current;
      if (!control) return;
      const vertical = control.getAttribute("data-orientation") === "vertical";
      const span = vertical ? control.offsetHeight : control.offsetWidth;
      if (!span) return;
      for (const thumb of control.querySelectorAll<HTMLElement>('[class*="__thumb"]')) {
        const input = thumb.querySelector("input");
        if (!input) continue;
        const lo = Number(input.min || 0);
        const hi = Number(input.max || 100);
        const size = vertical ? thumb.offsetHeight : thumb.offsetWidth;
        const frac = hi > lo ? (Number(input.value) - lo) / (hi - lo) : 0;
        const pct = ((size / 2 + frac * (span - size)) / span) * 100;
        if (thumb.style.getPropertyValue("--position"))
          thumb.style.setProperty("--position", `${pct}%`);
        else if (vertical) thumb.style.bottom = `${pct}%`;
        else thumb.style.insetInlineStart = `${pct}%`;
      }
    });
  };
  return (
    <BaseSlider.Root
      className={cx("prism-slider", className)}
      thumbAlignment="edge"
      onValueCommitted={(value, eventDetails) => {
        snapThumbs();
        onValueCommitted?.(value, eventDetails);
      }}
      {...props}
    >
      {(label != null || showValue) && (
        <div className="prism-slider__head">
          {label != null ? (
            <span className="prism-cap prism-slider__label">{label}</span>
          ) : null}
          {showValue ? <BaseSlider.Value className="prism-slider__value" /> : null}
        </div>
      )}
      <BaseSlider.Control ref={controlRef} className="prism-slider__control">
        <BaseSlider.Track className="prism-slider__track">
          <BaseSlider.Indicator className="prism-slider__indicator" />
          <BaseSlider.Thumb
            className="prism-slider__thumb"
            getAriaLabel={typeof label === "string" ? () => label : undefined}
          />
        </BaseSlider.Track>
      </BaseSlider.Control>
    </BaseSlider.Root>
  );
}
