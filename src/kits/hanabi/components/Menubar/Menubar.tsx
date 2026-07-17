import { Menubar as BaseMenubar } from "@base-ui/react/menubar";
import { cx } from "../cx";
import { ScrollArea } from "../ScrollArea";
import { Menu as BaseMenu } from "@base-ui/react/menu";
import type { ReactNode } from "react";
import "./Menubar.css";

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
      <BaseMenu.Trigger className="hanabi-seg__btn hanabi-menubar__trigger">
        {label}
      </BaseMenu.Trigger>
      <BaseMenu.Portal>
        <BaseMenu.Positioner
          className="hanabi-lift hanabi-lift--menu"
          sideOffset={6}
          side={side}
          align={align}
        >
          <BaseMenu.Popup className="hanabi-surface hanabi-pop hanabi-popup hanabi-popup-list hanabi-menu-pane">
            <ScrollArea variant="popup">{children}</ScrollArea>
          </BaseMenu.Popup>
        </BaseMenu.Positioner>
      </BaseMenu.Portal>
    </BaseMenu.Root>
  );
}

export interface MenubarProps extends Omit<
  React.ComponentProps<typeof BaseMenubar>,
  "children" | "className"
> {
  children: ReactNode;
  className?: string;
}

export function Menubar({ children, className, ...props }: MenubarProps) {
  return (
    <BaseMenubar className={cx("hanabi-seg hanabi-menubar", className)} {...props}>
      {children}
    </BaseMenubar>
  );
}
