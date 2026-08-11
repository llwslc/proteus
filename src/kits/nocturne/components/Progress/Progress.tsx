import { Progress as BaseProgress } from "@base-ui/react/progress";
import { useId } from "react";
import { cx } from "../cx";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Bloom, MotifDefs } from "../bloom";
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
  ...props
}: ProgressProps) {
  const id = useId();
  const indeterminate = props.value == null;
  return (
    <BaseProgress.Root className={cx("nocturne-progress", className)} {...props}>
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
      <BaseProgress.Track className="nocturne-track nocturne-progress__track">
        <BaseProgress.Indicator className="nocturne-progress__indicator" />
        {!indeterminate && (
          <span className="nocturne-progress__seal" aria-hidden="true">
            <svg
              className="nocturne-progress__bloom"
              viewBox="-13 -13 26 26"
              focusable="false"
            >
              <MotifDefs id={id} />
              <Bloom
                defs={id}
                r={12}
                coreDots={5}
                mode="state"
                bud
                openExpr="var(--nocturne-seal-open)"
              />
            </svg>
          </span>
        )}
      </BaseProgress.Track>
    </BaseProgress.Root>
  );
}
