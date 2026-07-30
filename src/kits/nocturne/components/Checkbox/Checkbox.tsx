import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox";
import { cx } from "../cx";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import "./Checkbox.css";

export interface CheckboxProps extends ComponentPropsWithoutRef<
  typeof BaseCheckbox.Root
> {
  label?: ReactNode;
}

export function Checkbox({ label, className, ...props }: CheckboxProps) {
  return (
    <label className={cx("nocturne-checkbox", className)}>
      <BaseCheckbox.Root className="nocturne-checkbox__box" {...props}>
        <BaseCheckbox.Indicator
          className="nocturne-checkbox__mark"
          render={(p, state) => (
            <span {...p}>
              {state.indeterminate ? (
                <svg viewBox="0 0 24 24" width="100%" height="100%" aria-hidden="true">
                  <path
                    d="M5.5 12 H 18.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.4}
                    strokeLinecap="round"
                  />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" width="100%" height="100%" aria-hidden="true">
                  <path
                    className="nocturne-checkbox__stroke"
                    pathLength={1}
                    d="M4.4 12.6 C 6.6 14.2, 8.4 16.2, 9.9 18.4 C 12.6 13.4, 16 8.6, 20 4.6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.4}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </span>
          )}
        />
      </BaseCheckbox.Root>
      {label != null ? <span className="nocturne-cap">{label}</span> : null}
    </label>
  );
}
