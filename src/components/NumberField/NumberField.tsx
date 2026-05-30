import { NumberField as BaseNumberField } from "@base-ui-components/react/number-field";
import type { ComponentPropsWithoutRef } from "react";
import { MinusIcon, PlusIcon } from "../icons";
import "./NumberField.css";

export interface NumberFieldProps
  extends ComponentPropsWithoutRef<typeof BaseNumberField.Root> {}

export function NumberField({ className, ...props }: NumberFieldProps) {
  return (
    <BaseNumberField.Root
      className={["nova-numberfield", className].filter(Boolean).join(" ")}
      {...props}
    >
      <BaseNumberField.Group className="nova-numberfield__group">
        <BaseNumberField.Decrement className="nova-numberfield__btn">
          <MinusIcon />
        </BaseNumberField.Decrement>
        <BaseNumberField.Input className="nova-numberfield__input" />
        <BaseNumberField.Increment className="nova-numberfield__btn">
          <PlusIcon />
        </BaseNumberField.Increment>
      </BaseNumberField.Group>
    </BaseNumberField.Root>
  );
}
