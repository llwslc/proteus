import { cx } from "../cx";
import { Switch as BaseSwitch } from "@base-ui/react/switch";
import type { ComponentPropsWithoutRef } from "react";
import "./Switch.css";

export interface SwitchProps extends ComponentPropsWithoutRef<typeof BaseSwitch.Root> {}

export function Switch({ className, ...props }: SwitchProps) {
  return (
    <BaseSwitch.Root className={cx("abyss-switch", className)} {...props}>
      <span className="abyss-switch__track" />
      <BaseSwitch.Thumb className="abyss-switch__thumb" />
    </BaseSwitch.Root>
  );
}
