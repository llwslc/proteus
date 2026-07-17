import { Menubar as BaseMenubar } from "@base-ui/react/menubar";
import { cx } from "../cx";
import { Menu as BaseMenu } from "@base-ui/react/menu";
import { ScrollArea } from "../ScrollArea";
import type { ReactNode } from "react";
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
    <BaseMenubar className={cx("nova-surface nova-menubar", className)} {...props}>
      {children}
    </BaseMenubar>
  );
}

export interface MenubarMenuProps extends Omit<
  React.ComponentProps<typeof BaseMenu.Root>,
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
    <BaseMenu.Root {...props}>
      <span className="nova-menubar__triggerwrap">
        <BaseMenu.Trigger className="nova-menubar__trigger">{label}</BaseMenu.Trigger>
      </span>
      <BaseMenu.Portal>
        <BaseMenu.Positioner
          className="nova-elevation nova-menu-tier"
          sideOffset={6}
          side={side}
          align={align}
        >
          <BaseMenu.Popup className="nova-surface nova-anim-pop nova-menu-pane">
            <ScrollArea variant="popup">{children}</ScrollArea>
          </BaseMenu.Popup>
        </BaseMenu.Positioner>
      </BaseMenu.Portal>
    </BaseMenu.Root>
  );
}
