import { Switch as BaseSwitch } from "@base-ui/react/switch";
import { cx } from "../cx";
import type { ComponentPropsWithoutRef } from "react";
import "./Switch.css";

export interface SwitchProps extends ComponentPropsWithoutRef<typeof BaseSwitch.Root> {}

export function Switch({ className, ...props }: SwitchProps) {
  return (
    <BaseSwitch.Root className={cx("bauhaus-switch", className)} {...props}>
      <BaseSwitch.Thumb className="bauhaus-switch__thumb" />
    </BaseSwitch.Root>
  );
}
