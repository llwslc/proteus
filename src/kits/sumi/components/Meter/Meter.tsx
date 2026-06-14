import { cx } from "../cx";
import { Meter as BaseMeter } from "@base-ui/react/meter";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import "./Meter.css";

export interface MeterProps extends ComponentPropsWithoutRef<typeof BaseMeter.Root> {
  label?: ReactNode;
  showValue?: boolean;
  tone?: "primary" | "success" | "warning" | "danger";
}

export function Meter({
  className,
  label,
  showValue = true,
  tone = "primary",
  ...props
}: MeterProps) {
  return (
    <BaseMeter.Root
      className={cx("sumi-meter", `sumi-meter--${tone}`, className)}
      {...props}
    >
      {(label != null || showValue) && (
        <div className="sumi-meter__head">
          {label != null ? (
            <BaseMeter.Label className="sumi-cap sumi-meter__label">
              {label}
            </BaseMeter.Label>
          ) : (
            <span />
          )}
          {showValue ? <BaseMeter.Value className="sumi-meter__value" /> : null}
        </div>
      )}
      <BaseMeter.Track className="sumi-meter__track">
        <BaseMeter.Indicator className="sumi-meter__indicator" />
      </BaseMeter.Track>
    </BaseMeter.Root>
  );
}
