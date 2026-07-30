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
    <div className={cx("nocturne-fieldframe", "nocturne-input", className)}>
      {icon ? <span className="nocturne-input__icon">{icon}</span> : null}
      <BaseInput id={id ?? autoId} className="nocturne-input__control" {...props} />
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
      className={cx("nocturne-field", className)}
      name={name}
      invalid={error != null}
    >
      {label != null ? (
        <BaseField.Label className="nocturne-cap">{label}</BaseField.Label>
      ) : null}
      <div className="nocturne-fieldframe nocturne-input">
        {icon ? <span className="nocturne-input__icon">{icon}</span> : null}
        <BaseField.Control
          className="nocturne-input__control"
          {...control}
        />
      </div>
      {description != null ? (
        <BaseField.Description className="nocturne-field__desc">
          {description}
        </BaseField.Description>
      ) : null}
      {error != null ? (
        <BaseField.Error className="nocturne-field__error" match>
          {error}
        </BaseField.Error>
      ) : (
        <BaseField.Error className="nocturne-field__error" />
      )}
    </BaseField.Root>
  );
}
