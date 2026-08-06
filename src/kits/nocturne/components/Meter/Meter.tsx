import { Meter as BaseMeter } from "@base-ui/react/meter";
import { useId } from "react";
import { cx } from "../cx";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Bloom, MotifDefs } from "../bloom";
import "./Meter.css";

export interface MeterProps extends ComponentPropsWithoutRef<typeof BaseMeter.Root> {
  label?: ReactNode;
  showValue?: boolean;
  tone?: "primary" | "success" | "warning" | "danger";
}

export function Meter({
  label,
  showValue = true,
  tone = "primary",
  className,
  ...props
}: MeterProps) {
  const id = useId();
  return (
    <BaseMeter.Root
      className={cx("nocturne-meter", `nocturne-meter--${tone}`, className)}
      {...props}
    >
      {(label != null || showValue) && (
        <div className="nocturne-meter__head">
          {label != null ? (
            <BaseMeter.Label className="nocturne-cap nocturne-meter__label">
              {label}
            </BaseMeter.Label>
          ) : null}
          {showValue ? <BaseMeter.Value className="nocturne-meter__value" /> : null}
        </div>
      )}
      <BaseMeter.Track className="nocturne-track nocturne-meter__track">
        <BaseMeter.Indicator className="nocturne-meter__indicator">
          <span className="nocturne-meter__tip" aria-hidden="true">
            <svg
              className="nocturne-meter__bloom"
              viewBox="-17 -17 34 34"
              focusable="false"
            >
              <MotifDefs id={id} />
              <Bloom defs={id} r={12} coreDots={5} mode="state" openExpr="1" />
            </svg>
          </span>
        </BaseMeter.Indicator>
      </BaseMeter.Track>
    </BaseMeter.Root>
  );
}
