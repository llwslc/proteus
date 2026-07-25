import { Fieldset as BaseFieldset } from "@base-ui/react/fieldset";
import { cx } from "../cx";
import { FlowerIcon } from "../icons";
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
        <BaseFieldset.Legend className="nocturne-cap nocturne-fieldset__legend">
          <span className="nocturne-marker">
            <FlowerIcon />
          </span>
          {legend}
        </BaseFieldset.Legend>
      ) : null}
      {children}
    </BaseFieldset.Root>
  );
}
