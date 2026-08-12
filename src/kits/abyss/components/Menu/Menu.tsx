import { Children } from "react";
import type { ReactNode } from "react";
import { Menu as BaseMenu } from "@base-ui/react/menu";
import { ScrollArea } from "../ScrollArea";
import { Button } from "../Button";
import { ChevronDownIcon } from "../icons";
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
          <Button variant="ghost" className="abyss-menu__trigger">
            {trigger} <ChevronDownIcon className="abyss-menu__trigger-chevron" />
          </Button>
        }
      />
      <BaseMenu.Portal>
        <BaseMenu.Positioner
          className="abyss-elevation abyss-menu-tier"
          sideOffset={6}
          side={side}
          align={align}
        >
          <BaseMenu.Popup
            className={cx(
              "abyss-aura-pop abyss-frame abyss-menu-pane",
              props.orientation === "horizontal" && "abyss-menu--horizontal",
            )}
          >
            {props.orientation === "horizontal" ? (
              <div className="abyss-menu__row">
                {Children.toArray(children).flatMap((c, i) =>
                  i
                    ? [
                        <span
                          key={`vsep-${i}`}
                          className="abyss-menu__vsep"
                          aria-hidden="true"
                        />,
                        c,
                      ]
                    : [c],
                )}
              </div>
            ) : (
              <ScrollArea variant="popup">{children}</ScrollArea>
            )}
          </BaseMenu.Popup>
        </BaseMenu.Positioner>
      </BaseMenu.Portal>
    </BaseMenu.Root>
  );
}
