import { cx } from "../cx";
import { createContext, useContext } from "react";
import type { ComponentType, ReactNode } from "react";
import { ChevronRightIcon } from "../icons";

export interface MenuParts {
  Item: ComponentType<any>;
  Separator: ComponentType<any>;
  SubmenuRoot: ComponentType<any>;
  SubmenuTrigger: ComponentType<any>;
  Portal: ComponentType<any>;
  Positioner: ComponentType<any>;
  Popup: ComponentType<any>;
}

const MenuPartsContext = createContext<MenuParts | null>(null);
export const MenuPartsProvider = MenuPartsContext.Provider;

function useParts() {
  const parts = useContext(MenuPartsContext);
  if (!parts) {
    throw new Error(
      "MenuItem / MenuSeparator / MenuSub must be rendered inside a Menu, Menubar (MenubarMenu), or ContextMenu.",
    );
  }
  return parts;
}

export interface MenuItemProps {
  children: ReactNode;
  icon?: ReactNode;
  shortcut?: string;
  onClick?: () => void;
  disabled?: boolean;
  tone?: "default" | "danger";
}

export function MenuItem({
  children,
  icon,
  shortcut,
  onClick,
  disabled,
  tone,
}: MenuItemProps) {
  const { Item } = useParts();
  return (
    <Item
      className={cx(
        "sumi-menu__item",
        tone === "danger" ? "sumi-menu__item--danger" : "",
      )}
      disabled={disabled}
      onClick={onClick}
    >
      <span className="sumi-menu__icon">{icon}</span>
      <span className="sumi-menu__label">{children}</span>
      {shortcut ? <kbd className="sumi-menu__shortcut">{shortcut}</kbd> : null}
    </Item>
  );
}

export function MenuSeparator() {
  const { Separator } = useParts();
  return <Separator className="sumi-separator sumi-menu__separator" />;
}

export interface MenuSubProps {
  label: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
  children: ReactNode;
}

export function MenuSub({ label, icon, disabled, children }: MenuSubProps) {
  const { SubmenuRoot, SubmenuTrigger, Portal, Positioner, Popup } = useParts();
  return (
    <SubmenuRoot>
      <SubmenuTrigger
        className="sumi-menu__item sumi-menu__item--sub"
        disabled={disabled}
      >
        <span className="sumi-menu__icon">{icon}</span>
        <span className="sumi-menu__label">{label}</span>
        <span className="sumi-menu__arrow">
          <ChevronRightIcon />
        </span>
      </SubmenuTrigger>
      <Portal>
        <Positioner
          className="sumi-elevation sumi-menu__positioner"
          side="right"
          align="start"
          sideOffset={14}
        >
          <Popup className="sumi-pop sumi-frame sumi-menu__popup">
            {children}
          </Popup>
        </Positioner>
      </Portal>
    </SubmenuRoot>
  );
}
