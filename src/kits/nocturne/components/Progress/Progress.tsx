import { Progress as BaseProgress } from "@base-ui/react/progress";
import { cx } from "../cx";
import { BloomMark } from "../icons";
import type { CSSProperties, ComponentPropsWithoutRef, ReactNode } from "react";
import "./Progress.css";

export interface ProgressProps extends ComponentPropsWithoutRef<
  typeof BaseProgress.Root
> {
  label?: ReactNode;
  showValue?: boolean;
}

export function Progress({
  label,
  showValue = true,
  className,
  style,
  ...props
}: ProgressProps) {
  const indeterminate = props.value == null;
  const max = props.max ?? 100;
  const min = props.min ?? 0;
  const open = indeterminate
    ? 0
    : Math.min(1, Math.max(0, ((props.value as number) - min) / (max - min || 1)));
  return (
    <BaseProgress.Root
      className={cx("nocturne-progress", className)}
      style={{ ...style, "--nocturne-progress-open": open } as CSSProperties}
      {...props}
    >
      {(label != null || (showValue && !indeterminate)) && (
        <div className="nocturne-progress__head">
          {label != null ? (
            <BaseProgress.Label className="nocturne-cap nocturne-progress__label">
              {label}
            </BaseProgress.Label>
          ) : null}
          {showValue && !indeterminate ? (
            <BaseProgress.Value className="nocturne-progress__value" />
          ) : null}
        </div>
      )}
      <BaseProgress.Track className="nocturne-progress__track">
        <BaseProgress.Indicator
          className="nocturne-progress__indicator"
          style={{ height: "inherit" }}
        >
          {!indeterminate ? (
            <BloomMark className="nocturne-progress__bloom" />
          ) : null}
        </BaseProgress.Indicator>
      </BaseProgress.Track>
    </BaseProgress.Root>
  );
}
