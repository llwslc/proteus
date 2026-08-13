import { cx } from "../cx";
import { ToggleGroup as BaseToggleGroup } from "@base-ui/react/toggle-group";
import { Toggle as BaseToggle } from "@base-ui/react/toggle";
import type { ComponentPropsWithoutRef } from "react";
import "./ToggleGroup.css";

export interface ToggleGroupProps extends ComponentPropsWithoutRef<
  typeof BaseToggleGroup
> {}

export function ToggleGroup({ className, children, ...props }: ToggleGroupProps) {
  return (
    <BaseToggleGroup
      className={cx("abyss-togglegroup abyss-frame", className)}
      {...props}
    >
      <div className="abyss-togglegroup__rail">{children}</div>
    </BaseToggleGroup>
  );
}

export interface ToggleProps extends ComponentPropsWithoutRef<typeof BaseToggle> {}

export function Toggle({ className, ...props }: ToggleProps) {
  return (
    <span className="abyss-togglegroup__item">
      <BaseToggle
        className={cx("abyss-seg__btn abyss-togglegroup__btn abyss-frame", className)}
        {...props}
      />
    </span>
  );
}
