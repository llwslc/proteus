import { cx } from "../cx";
import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox";
import { useId } from "react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { CheckIcon, MinusIcon } from "../icons";
import "./Checkbox.css";

export interface CheckboxProps extends ComponentPropsWithoutRef<
  typeof BaseCheckbox.Root
> {
  label?: ReactNode;
}

export function Checkbox({ className, label, id, ...props }: CheckboxProps) {
  const autoId = useId();
  const box = (
    <span className="abyss-checkbox-box">
      <BaseCheckbox.Root
        id={id ?? autoId}
        className={cx("abyss-checkbox", className)}
        {...props}
      >
        <BaseCheckbox.Indicator className="abyss-checkbox__indicator" keepMounted>
          <CheckIcon className="abyss-checkbox__check" />
          <MinusIcon className="abyss-checkbox__dash" />
        </BaseCheckbox.Indicator>
      </BaseCheckbox.Root>
    </span>
  );

  if (label == null) return box;
  return (
    <label className="abyss-checkbox-field">
      {box}
      <span className="abyss-checkbox-field__label">{label}</span>
    </label>
  );
}
