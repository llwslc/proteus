import { cx } from "../cx";
import { Input as BaseInput } from "@base-ui/react/input";
import { Field as BaseField } from "@base-ui/react/field";
import { useId } from "react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import "./Input.css";

export interface InputProps extends ComponentPropsWithoutRef<typeof BaseInput> {
  icon?: ReactNode;
}

export function Input({ className, icon, id, ...props }: InputProps) {
  const autoId = useId();
  return (
    <div
      className={cx(
        "hanabi-fieldframe",
        "hanabi-lockon",
        "hanabi-lockon--within",
        "hanabi-input",
        className,
      )}
    >
      {icon ? <span className="hanabi-input__icon">{icon}</span> : null}
      <BaseInput id={id ?? autoId} className="hanabi-input__control" {...props} />
    </div>
  );
}

export interface FieldProps extends ComponentPropsWithoutRef<typeof BaseField.Control> {
  label?: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  icon?: ReactNode;
}

export function Field({
  label,
  description,
  error,
  icon,
  className,
  name,
  ...control
}: FieldProps) {
  return (
    <BaseField.Root
      className={cx("hanabi-field", className)}
      name={name}
      invalid={error != null}
    >
      {label != null ? (
        <BaseField.Label className="hanabi-cap">{label}</BaseField.Label>
      ) : null}
      <div className="hanabi-fieldframe hanabi-lockon hanabi-lockon--within hanabi-input">
        {icon ? <span className="hanabi-input__icon">{icon}</span> : null}
        <BaseField.Control
          className="hanabi-input__control"
          {...control}
        />
      </div>
      {description != null ? (
        <BaseField.Description className="hanabi-field__desc">
          {description}
        </BaseField.Description>
      ) : null}
      {error != null ? (
        <BaseField.Error className="hanabi-field__error" match>
          {error}
        </BaseField.Error>
      ) : (
        <BaseField.Error className="hanabi-field__error" />
      )}
    </BaseField.Root>
  );
}
