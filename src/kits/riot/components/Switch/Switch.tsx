import { cx } from "../cx";
import { Switch as BaseSwitch } from "@base-ui/react/switch";
import type { ComponentPropsWithoutRef } from "react";
import "./Switch.css";

export interface SwitchProps extends ComponentPropsWithoutRef<typeof BaseSwitch.Root> {}

export function Switch({ className, ...props }: SwitchProps) {
  return (
    <BaseSwitch.Root className={cx("riot-switch", className)} {...props}>
      <span className="riot-switch__track" />
      <BaseSwitch.Thumb className="riot-switch__thumb" />
    </BaseSwitch.Root>
  );
}
