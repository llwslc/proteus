import type { ReactNode } from "react";
import { Menu as BaseMenu } from "@base-ui/react/menu";
import { ScrollArea } from "../ScrollArea";
import "./Menu.css";

export interface MenuProps {
  trigger: ReactNode;
  children: ReactNode;
}

export function Menu({ trigger, children }: MenuProps) {
  return (
    <BaseMenu.Root>
      <BaseMenu.Trigger render={trigger as React.ReactElement} />
      <BaseMenu.Portal>
        <BaseMenu.Positioner
          className="nova-elevation nova-menu__positioner"
          side="bottom"
          align="start"
          sideOffset={6}
        >
          <BaseMenu.Popup className="nova-surface nova-anim-pop nova-menu__popup">
            <ScrollArea variant="popup">{children}</ScrollArea>
          </BaseMenu.Popup>
        </BaseMenu.Positioner>
      </BaseMenu.Portal>
    </BaseMenu.Root>
  );
}
