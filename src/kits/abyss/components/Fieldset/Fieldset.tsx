import { cx } from "../cx";
import { Fieldset as BaseFieldset } from "@base-ui/react/fieldset";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import "./Fieldset.css";

export interface FieldsetProps extends ComponentPropsWithoutRef<
  typeof BaseFieldset.Root
> {
  legend?: ReactNode;
}

export function Fieldset({ className, legend, children, ...props }: FieldsetProps) {
  return (
    <BaseFieldset.Root className={cx("abyss-fieldset", className)} {...props}>
      {legend != null ? (
        <BaseFieldset.Legend className="abyss-fieldset__legend">
          <span className="abyss-tick" />
          {legend}
        </BaseFieldset.Legend>
      ) : null}
      <div className="abyss-fieldset__body">{children}</div>
    </BaseFieldset.Root>
  );
}
