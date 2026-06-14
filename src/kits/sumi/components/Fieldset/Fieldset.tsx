import { cx } from "../cx";
import { SealIcon } from "../icons";
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
    <BaseFieldset.Root className={cx("sumi-fieldset", className)} {...props}>
      {legend != null ? (
        <BaseFieldset.Legend className="sumi-fieldset__legend">
          <SealIcon className="sumi-fieldset__sigil" aria-hidden />
          <span className="sumi-fieldset__legend-text">{legend}</span>
        </BaseFieldset.Legend>
      ) : null}
      <div className="sumi-fieldset__body sumi-frame">{children}</div>
    </BaseFieldset.Root>
  );
}
