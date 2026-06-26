import type { ReactNode } from "react";
import { Menu as BaseMenu } from "@base-ui/react/menu";
import { ScrollArea } from "../ScrollArea";
import { Button } from "../Button";
import { ChevronDownIcon } from "../icons";
import "./Menu.css";

export interface MenuProps {
  trigger: ReactNode;
  children: ReactNode;
}

export function Menu({ trigger, children }: MenuProps) {
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
          className="abyss-elevation abyss-menu__positioner"
          side="bottom"
          align="start"
          sideOffset={6}
        >
          <BaseMenu.Popup className="abyss-aura-pop abyss-frame abyss-menu__popup">
            <ScrollArea variant="popup">{children}</ScrollArea>
          </BaseMenu.Popup>
        </BaseMenu.Positioner>
      </BaseMenu.Portal>
    </BaseMenu.Root>
  );
}
