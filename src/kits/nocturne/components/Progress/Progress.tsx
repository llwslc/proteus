import { Progress as BaseProgress } from "@base-ui/react/progress";
import { useId } from "react";
import { cx } from "../cx";
import type { CSSProperties, ComponentPropsWithoutRef, ReactNode } from "react";
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
  const max = props.max ?? 100;
  const min = props.min ?? 0;
  const frac = indeterminate ? 0 : (Number(props.value) - min) / (max - min || 1);
  return (
    <BaseProgress.Root
      className={cx("nocturne-progress", className)}
      style={{ "--nocturne-prog-frac": frac.toFixed(3) } as CSSProperties}
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
      <BaseProgress.Track className="nocturne-track nocturne-progress__track">
        <BaseProgress.Indicator className="nocturne-progress__indicator">
          {!indeterminate && (
            <span className="nocturne-progress__tip" aria-hidden="true">
              <svg className="nocturne-progress__bloom" viewBox="-17 -17 34 34" focusable="false">
                <MotifDefs id={id} />
                <Bloom
                  defs={id}
                  r={12}
                  coreDots={5}
                  mode="state"
                  openExpr="calc(0.15 + 0.85 * var(--nocturne-prog-frac, 0))"
                />
              </svg>
            </span>
          )}
        </BaseProgress.Indicator>
      </BaseProgress.Track>
    </BaseProgress.Root>
  );
}
