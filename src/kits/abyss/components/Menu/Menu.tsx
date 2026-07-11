import type { ReactNode } from "react";
import { Menu as BaseMenu } from "@base-ui/react/menu";
import { ScrollArea } from "../ScrollArea";
import { Button } from "../Button";
import { ChevronDownIcon } from "../icons";
import "./Menu.css";

export interface MenuProps {
  trigger: ReactNode;
  children: ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
}

export function Menu({ trigger, children, side = "bottom", align = "start" }: MenuProps) {
  return (
    <BaseMenu.Root>
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
          <BaseMenu.Popup className="abyss-aura-pop abyss-frame abyss-menu-pane">
            <ScrollArea variant="popup">{children}</ScrollArea>
          </BaseMenu.Popup>
        </BaseMenu.Positioner>
      </BaseMenu.Portal>
    </BaseMenu.Root>
  );
}
