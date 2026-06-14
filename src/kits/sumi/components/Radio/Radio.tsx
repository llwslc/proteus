import { cx } from "../cx";
import { RadioGroup as BaseRadioGroup } from "@base-ui/react/radio-group";
import { Radio as BaseRadio } from "@base-ui/react/radio";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import "./Radio.css";

export interface RadioGroupProps extends ComponentPropsWithoutRef<
  typeof BaseRadioGroup
> {}

export function RadioGroup({ className, ...props }: RadioGroupProps) {
  return <BaseRadioGroup className={cx("sumi-radiogroup", className)} {...props} />;
}

export interface RadioProps extends ComponentPropsWithoutRef<typeof BaseRadio.Root> {
  children?: ReactNode;
}

export function Radio({ className, children, ...props }: RadioProps) {
  return (
    <label className="sumi-radio">
      <BaseRadio.Root
        className={cx("sumi-radio__control sumi-frame", className)}
        {...props}
      >
        <span className="sumi-radio__dot" aria-hidden />
      </BaseRadio.Root>
      {children != null ? <span className="sumi-radio__label">{children}</span> : null}
    </label>
  );
}
