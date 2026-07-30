import { RadioGroup as BaseRadioGroup } from "@base-ui/react/radio-group";
import { Radio as BaseRadio } from "@base-ui/react/radio";
import { cx } from "../cx";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import "./Radio.css";

export interface RadioGroupProps extends ComponentPropsWithoutRef<
  typeof BaseRadioGroup
> {}

export function RadioGroup({ className, ...props }: RadioGroupProps) {
  return <BaseRadioGroup className={cx("nocturne-radiogroup", className)} {...props} />;
}

export interface RadioProps extends ComponentPropsWithoutRef<typeof BaseRadio.Root> {
  children?: ReactNode;
}

export function Radio({ children, className, ...props }: RadioProps) {
  return (
    <label className={cx("nocturne-radio", className)}>
      <BaseRadio.Root className="nocturne-radio__control" {...props}>
        <span className="nocturne-radio__moon" aria-hidden="true" />
        <BaseRadio.Indicator keepMounted className="nocturne-radio__shade" />
      </BaseRadio.Root>
      {children != null ? <span className="nocturne-cap">{children}</span> : null}
    </label>
  );
}
