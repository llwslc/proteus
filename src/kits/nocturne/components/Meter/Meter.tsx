import { Meter as BaseMeter } from "@base-ui/react/meter";
import { cx } from "../cx";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
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
      <BaseMeter.Track className="nocturne-meter__track">
        <BaseMeter.Indicator className="nocturne-meter__indicator" />
      </BaseMeter.Track>
    </BaseMeter.Root>
  );
}
