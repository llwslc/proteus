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
    <BaseMenubar className={cx("riot-seg riot-menubar", className)} {...props}>
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
      <BaseMenu.Trigger className="riot-seg__btn riot-menubar__trigger">
        {label}
      </BaseMenu.Trigger>
      <BaseMenu.Portal>
        <BaseMenu.Positioner
          className="riot-lift riot-menu-tier"
          sideOffset={6}
          side={side}
          align={align}
        >
          <BaseMenu.Popup className="riot-surface riot-popup riot-pop riot-menu-pane">
            <ScrollArea variant="popup">{children}</ScrollArea>
          </BaseMenu.Popup>
        </BaseMenu.Positioner>
      </BaseMenu.Portal>
    </BaseMenu.Root>
  );
}
