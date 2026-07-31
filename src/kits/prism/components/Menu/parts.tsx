import { Menu as BaseMenu } from "@base-ui/react/menu";
import { ScrollArea } from "../ScrollArea";
import type { ComponentProps, ReactNode } from "react";
import { cx } from "../cx";
import { ChevronRight } from "../icons";

export interface MenuItemProps extends ComponentProps<typeof BaseMenu.Item> {
  icon?: ReactNode;
  shortcut?: ReactNode;
  tone?: "default" | "danger";
}

export function MenuItem({
  icon,
  shortcut,
  tone = "default",
  className,
  children,
  ...props
}: MenuItemProps) {
  return (
    <BaseMenu.Item
      className={cx(
        "prism-list-item",
        tone === "danger" && "prism-list-item--danger",
        className,
      )}
      {...props}
    >
      {icon ? <span className="prism-menu__icon">{icon}</span> : null}
      <span className="prism-list-item__text">{children}</span>
      {shortcut ? <span className="prism-menu__shortcut">{shortcut}</span> : null}
    </BaseMenu.Item>
  );
}

export function MenuSeparator() {
  return <BaseMenu.Separator className="prism-menu-sep" />;
}

export function MenuSub({
  label,
  icon,
  children,
}: {
  label: ReactNode;
  icon?: ReactNode;
  children: ReactNode;
}) {
  return (
    <BaseMenu.SubmenuRoot>
      <BaseMenu.SubmenuTrigger className="prism-list-item prism-menu__sub">
        {icon ? <span className="prism-menu__icon">{icon}</span> : null}
        <span className="prism-list-item__text">{label}</span>
        <span className="prism-list-item__chevron">
          <ChevronRight />
        </span>
      </BaseMenu.SubmenuTrigger>
      <BaseMenu.Portal>
        <BaseMenu.Positioner
          className="prism-lift"
          side="right"
          align="start"
          sideOffset={12}
        >
          <BaseMenu.Popup className="prism-surface prism-pop prism-popup prism-popup-list">
            <ScrollArea variant="popup">{children}</ScrollArea>
          </BaseMenu.Popup>
        </BaseMenu.Positioner>
      </BaseMenu.Portal>
    </BaseMenu.SubmenuRoot>
  );
}
