import { NumberField as BaseNumberField } from "@base-ui/react/number-field";
import { useId, useState } from "react";
import type { ComponentPropsWithoutRef } from "react";
import { cx } from "../cx";
import { Plus, Minus } from "../icons";
import "./NumberField.css";

export interface NumberFieldProps extends ComponentPropsWithoutRef<
  typeof BaseNumberField.Root
> {}

export function NumberField({
  className,
  id,
  name,
  min,
  max,
  defaultValue,
  value: controlled,
  onValueChange,
  ...props
}: NumberFieldProps) {
  const autoId = useId();
  const [tracked, setTracked] = useState<number | null>(defaultValue ?? null);
  const value = controlled !== undefined ? controlled : tracked;
  const atMin = min != null && value != null && value <= min;
  const atMax = max != null && value != null && value >= max;

  return (
    <BaseNumberField.Root
      id={id ?? autoId}
      className={cx("prism-numberfield", className)}
      name={name}
      min={min}
      max={max}
      {...(controlled !== undefined ? { value: controlled } : { defaultValue })}
      onValueChange={(next, details) => {
        if (controlled === undefined) setTracked(next);
        onValueChange?.(next, details);
      }}
      {...props}
    >
      <BaseNumberField.Group className="prism-numberfield__group">
        <BaseNumberField.Decrement
          className="prism-surface prism-numberfield__btn"
          disabled={atMin}
        >
          <Minus />
        </BaseNumberField.Decrement>
        <BaseNumberField.Input className="prism-surface prism-numberfield__input" />
        <BaseNumberField.Increment
          className="prism-surface prism-numberfield__btn"
          disabled={atMax}
        >
          <Plus />
        </BaseNumberField.Increment>
      </BaseNumberField.Group>
    </BaseNumberField.Root>
  );
}
