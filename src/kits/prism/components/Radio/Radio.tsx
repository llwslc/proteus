import { RadioGroup as BaseRadioGroup } from "@base-ui/react/radio-group";
import { Radio as BaseRadio } from "@base-ui/react/radio";
import { cx } from "../cx";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import "./Radio.css";

export interface RadioGroupProps extends ComponentPropsWithoutRef<
  typeof BaseRadioGroup
> {}

export function RadioGroup({ className, ...props }: RadioGroupProps) {
  return <BaseRadioGroup className={cx("prism-radiogroup", className)} {...props} />;
}

export interface RadioProps extends ComponentPropsWithoutRef<typeof BaseRadio.Root> {
  children?: ReactNode;
}

export function Radio({ children, className, ...props }: RadioProps) {
  return (
    <label className={cx("prism-radio", className)}>
      <BaseRadio.Root className="prism-surface prism-radio__control" {...props}>
        <BaseRadio.Indicator className="prism-radio__dot" />
      </BaseRadio.Root>
      {children != null ? <span className="prism-cap">{children}</span> : null}
    </label>
  );
}
