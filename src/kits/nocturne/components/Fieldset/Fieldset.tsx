import { Fieldset as BaseFieldset } from "@base-ui/react/fieldset";
import { cx } from "../cx";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import "./Fieldset.css";

export interface FieldsetProps extends ComponentPropsWithoutRef<
  typeof BaseFieldset.Root
> {
  legend?: ReactNode;
}

export function Fieldset({ legend, className, children, ...props }: FieldsetProps) {
  return (
    <BaseFieldset.Root className={cx("nocturne-fieldset", className)} {...props}>
      {legend != null ? (
        <BaseFieldset.Legend className="nocturne-fieldset__legend">
          <span className="nocturne-cap">{legend}</span>
          <span className="nocturne-hairline nocturne-fieldset__rule" aria-hidden="true" />
        </BaseFieldset.Legend>
      ) : null}
      {children}
    </BaseFieldset.Root>
  );
}
