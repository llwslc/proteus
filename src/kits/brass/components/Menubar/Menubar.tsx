import type { ReactNode } from "react";
import { Menubar as BaseMenubar } from "@base-ui/react/menubar";
import { cx } from "../cx";
import { ScrollArea } from "../ScrollArea";
import { Menu } from "@base-ui/react/menu";
import "./Menubar.css";

export interface MenubarProps extends Omit<
  React.ComponentProps<typeof BaseMenubar>,
  "children" | "className"
> {
  children: ReactNode;
  className?: string;
}

export function Menubar({ children, className, ...props }: MenubarProps) {
  return (
    <BaseMenubar className={cx("brass-seg", className)} {...props}>
      {children}
    </BaseMenubar>
  );
}

export interface MenubarMenuProps extends Omit<
  React.ComponentProps<typeof Menu.Root>,
  "children"
> {
  label: ReactNode;
  children: ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
}

export function MenubarMenu({
  label,
  children,
  side = "bottom",
  align = "start",
  ...props
}: MenubarMenuProps) {
  return (
    <Menu.Root {...props}>
      <Menu.Trigger className="brass-seg__btn">{label}</Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner
          className="brass-lift brass-menu-tier"
          sideOffset={6}
          side={side}
          align={align}
        >
          <Menu.Popup className="brass-plate brass-pop brass-popup brass-popup-list">
            <ScrollArea variant="popup">{children}</ScrollArea>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}
