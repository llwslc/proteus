import { cx } from "../cx";
import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox";
import { useId } from "react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import "./Checkbox.css";

export interface CheckboxProps extends ComponentPropsWithoutRef<
  typeof BaseCheckbox.Root
> {
  label?: ReactNode;
}

export function Checkbox({ className, label, id, ...props }: CheckboxProps) {
  const autoId = useId();
  const box = (
    <BaseCheckbox.Root
      id={id ?? autoId}
      className={cx("sumi-check sumi-frame", className)}
      {...props}
    >
      <svg className="sumi-check__sigil" viewBox="0 0 28 28" aria-hidden>
        <path
          className="sumi-check__mark"
          pathLength="1"
          d="M6.5 14.6 L11.8 20 L21.5 8.4"
        />
        <line className="sumi-check__bar" x1="8" y1="14" x2="20" y2="14" />
      </svg>
    </BaseCheckbox.Root>
  );

  if (label == null) return box;
  return (
    <label className="sumi-check-field">
      {box}
      <span className="sumi-check-field__label">{label}</span>
    </label>
  );
}
