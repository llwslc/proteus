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
      className={cx("bauhaus-meter", `bauhaus-meter--${tone}`, className)}
      {...props}
    >
      {(label != null || showValue) && (
        <div className="bauhaus-meter__head">
          {label != null ? (
            <BaseMeter.Label className="bauhaus-cap bauhaus-meter__label">
              {label}
            </BaseMeter.Label>
          ) : null}
          {showValue ? <BaseMeter.Value className="bauhaus-meter__value" /> : null}
        </div>
      )}
      <BaseMeter.Track className="bauhaus-surface bauhaus-meter__track">
        <BaseMeter.Indicator className="bauhaus-meter__indicator" />
      </BaseMeter.Track>
    </BaseMeter.Root>
  );
}
