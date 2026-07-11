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
    <div className={cx("riot-surface", "riot-field__control", "riot-input", className)}>
      {icon ? <span className="riot-field__lead">{icon}</span> : null}
      <BaseInput id={id ?? autoId} className="riot-field__input" {...props} />
    </div>
  );
}

export interface FieldProps extends ComponentPropsWithoutRef<typeof BaseField.Control> {
  label?: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  icon?: ReactNode;
  rootClassName?: string;
}

export function Field({
  label,
  description,
  error,
  icon,
  rootClassName,
  className,
  ...control
}: FieldProps) {
  return (
    <BaseField.Root className={cx("riot-field", rootClassName)} invalid={error != null}>
      {label != null ? (
        <BaseField.Label className="riot-cap riot-field__label">{label}</BaseField.Label>
      ) : null}
      <div className="riot-surface riot-field__control riot-input">
        {icon ? <span className="riot-field__lead">{icon}</span> : null}
        <BaseField.Control className={cx("riot-field__input", className)} {...control} />
      </div>
      {description != null ? (
        <BaseField.Description className="riot-text riot-field__desc">
          {description}
        </BaseField.Description>
      ) : null}
      {error != null ? (
        <BaseField.Error className="riot-field__error" match>
          {error}
        </BaseField.Error>
      ) : null}
    </BaseField.Root>
  );
}
