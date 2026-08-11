import { Meter as BaseMeter } from "@base-ui/react/meter";
import { cx } from "../cx";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import "./Meter.css";

const ARC = Math.PI * 28;

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
  const min = props.min ?? 0;
  const max = props.max ?? 100;
  const v = Math.min(Math.max(((props.value ?? 0) - min) / (max - min), 0), 1);
  return (
    <BaseMeter.Root
      className={cx("nocturne-meter", `nocturne-meter--${tone}`, className)}
      {...props}
    >
      <BaseMeter.Track className="nocturne-meter__gauge">
        <svg
          className="nocturne-meter__dial"
          viewBox="0 0 64 36"
          focusable="false"
          aria-hidden="true"
        >
          <path className="nocturne-meter__arc" d="M 4 32 A 28 28 0 0 1 60 32" />
          <BaseMeter.Indicator
            render={
              <path
                className="nocturne-meter__fill"
                d="M 4 32 A 28 28 0 0 1 60 32"
                strokeDasharray={ARC}
                strokeDashoffset={ARC * (1 - v)}
              />
            }
          />
          <line
            className="nocturne-meter__needle"
            x1="32"
            y1="32"
            x2="13"
            y2="32"
            style={{ transform: `rotate(${v * 180}deg)` }}
          />
          <circle className="nocturne-meter__pivot" cx="32" cy="32" r="2.5" />
        </svg>
      </BaseMeter.Track>
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
    </BaseMeter.Root>
  );
}
