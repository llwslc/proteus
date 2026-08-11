import type { ReactNode } from "react";
import { Menu as BaseMenu } from "@base-ui/react/menu";
import { ScrollArea } from "../ScrollArea";
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
        render={
          <Button variant="ghost" className="brass-menu__trigger">
            <span className="brass-menu__trigger-label">{trigger}</span>
            <ChevronDown className="brass-menu__trigger-chevron" />
          </Button>
        }
      />
      <BaseMenu.Portal>
        <BaseMenu.Positioner
          className="brass-lift brass-menu-tier"
          sideOffset={6}
          side={side}
          align={align}
        >
          <BaseMenu.Popup
            className={cx(
              "brass-plate brass-pop brass-popup brass-popup-list",
              props.orientation === "horizontal" && "brass-menu--horizontal",
            )}
          >
            {props.orientation === "horizontal" ? (
              <div className="brass-menu__row">{children}</div>
            ) : (
              <ScrollArea variant="popup">{children}</ScrollArea>
            )}
          </BaseMenu.Popup>
        </BaseMenu.Positioner>
      </BaseMenu.Portal>
    </BaseMenu.Root>
  );
}
