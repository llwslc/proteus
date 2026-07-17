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
    <BaseMenubar className={cx("abyss-frame abyss-menubar", className)} {...props}>
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
      <span className="abyss-menubar__triggerwrap">
        <BaseMenu.Trigger className="abyss-seg__btn abyss-frame abyss-menubar__trigger">
          {label}
        </BaseMenu.Trigger>
      </span>
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
