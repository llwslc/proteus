import { Meter as BaseMeter } from "@base-ui/react/meter";
import { cx } from "../cx";
import { BloomMark } from "../icons";
import type { CSSProperties, ComponentPropsWithoutRef, ReactNode } from "react";
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
  style,
  ...props
}: MeterProps) {
  const max = props.max ?? 100;
  const min = props.min ?? 0;
  const open = Math.min(
    1,
    Math.max(0, ((props.value ?? min) - min) / (max - min || 1)),
  );
  return (
    <BaseMeter.Root
      className={cx("nocturne-meter", `nocturne-meter--${tone}`, className)}
      style={{ ...style, "--nocturne-meter-open": open } as CSSProperties}
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
        <BaseMeter.Indicator
          className="nocturne-meter__indicator"
          style={{ height: "inherit" }}
        >
          <BloomMark className="nocturne-meter__bloom" />
        </BaseMeter.Indicator>
      </BaseMeter.Track>
    </BaseMeter.Root>
  );
}
