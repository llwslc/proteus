import { Menu as BaseMenu } from "@base-ui/react/menu";
import { ScrollArea } from "../ScrollArea";
import type { ReactNode } from "react";
import { Button } from "../Button";
import { ChevronDown } from "../icons";
import { cx } from "../cx";
import "./Menu.css";

export interface MenuProps extends Omit<
  React.ComponentProps<typeof BaseMenu.Root>,
  "children"
> {
  trigger: ReactNode;
  children: ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
}

export function Menu({
  trigger,
  children,
  side = "bottom",
  align = "start",
  ...props
}: MenuProps) {
  return (
    <BaseMenu.Root {...props}>
      <BaseMenu.Trigger
        render={<Button variant="ghost" className="prism-menu__trigger" />}
      >
        <span className="prism-menu__trigger-label">{trigger}</span>
        <span className="prism-menu__trigger-chevron">
          <ChevronDown />
        </span>
      </BaseMenu.Trigger>
      <BaseMenu.Portal>
        <BaseMenu.Positioner
          className="prism-lift prism-menu-tier"
          sideOffset={6}
          side={side}
          align={align}
        >
          <BaseMenu.Popup
            className={cx(
              "prism-surface prism-pop prism-popup prism-popup-list",
              props.orientation === "horizontal" && "prism-menu--horizontal",
            )}
          >
            {props.orientation === "horizontal" ? (
              <div className="prism-menu__row">{children}</div>
            ) : (
              <ScrollArea variant="popup">{children}</ScrollArea>
            )}
          </BaseMenu.Popup>
        </BaseMenu.Positioner>
      </BaseMenu.Portal>
    </BaseMenu.Root>
  );
}
