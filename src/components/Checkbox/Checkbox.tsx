import { Checkbox as BaseCheckbox } from "@base-ui-components/react/checkbox";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { CheckIcon, MinusIcon } from "../icons";
import "./Checkbox.css";

export interface CheckboxProps
  extends ComponentPropsWithoutRef<typeof BaseCheckbox.Root> {
  /** Optional inline label rendered to the right of the box. */
  label?: ReactNode;
}

export function Checkbox({ className, label, id, ...props }: CheckboxProps) {
  const box = (
    <BaseCheckbox.Root
      id={id}
      className={["nova-checkbox", className].filter(Boolean).join(" ")}
      {...props}
    >
      <BaseCheckbox.Indicator className="nova-checkbox__indicator" keepMounted>
        <CheckIcon className="nova-checkbox__check" />
        <MinusIcon className="nova-checkbox__dash" />
      </BaseCheckbox.Indicator>
    </BaseCheckbox.Root>
  );

  if (label == null) return box;
  return (
    <label className="nova-checkbox-field" htmlFor={id}>
      {box}
      <span className="nova-checkbox-field__label">{label}</span>
    </label>
  );
}
