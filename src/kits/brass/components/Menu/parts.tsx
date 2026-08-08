import type { ReactNode } from "react";
import { Menu } from "@base-ui/react/menu";
import { ScrollArea } from "../ScrollArea";
import { cx } from "../cx";
import { Check, ChevronRight } from "../icons";

export interface MenuItemProps extends React.ComponentProps<typeof Menu.Item> {
  icon?: ReactNode;
  shortcut?: ReactNode;
  tone?: "default" | "danger";
}

export function MenuItem({
  className,
  children,
  icon,
  shortcut,
  tone = "default",
  label,
  ...props
}: MenuItemProps) {
  return (
    <Menu.Item
      className={cx(
        "brass-list-item",
        tone === "danger" && "brass-list-item--danger",
        className,
      )}
      label={label ?? (typeof children === "string" ? children : undefined)}
      {...props}
    >
      {icon && <span className="brass-menu__icon">{icon}</span>}
      <span className="brass-list-item__text">{children}</span>
      {shortcut && <span className="brass-menu__shortcut">{shortcut}</span>}
    </Menu.Item>
  );
}

export function MenuSeparator() {
  return <div className="brass-menu-sep" role="separator" />;
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
    <Menu.SubmenuRoot>
      <Menu.SubmenuTrigger className="brass-list-item">
        {icon && <span className="brass-list-item__check">{icon}</span>}
        <span className="brass-list-item__text">{label}</span>
        <ChevronRight className="brass-list-item__chevron" />
      </Menu.SubmenuTrigger>
      <Menu.Portal>
        <Menu.Positioner
          className="brass-lift brass-menu-tier"
          side="right"
          align="start"
          sideOffset={12}
        >
          <Menu.Popup className="brass-plate brass-pop brass-popup brass-popup-list">
            <ScrollArea variant="popup">{children}</ScrollArea>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.SubmenuRoot>
  );
}

export interface MenuCheckboxItemProps extends React.ComponentProps<
  typeof Menu.CheckboxItem
> {
  shortcut?: ReactNode;
}

export function MenuCheckboxItem({
  className,
  children,
  shortcut,
  label,
  ...props
}: MenuCheckboxItemProps) {
  return (
    <Menu.CheckboxItem
      className={cx("brass-list-item", className)}
      label={label ?? (typeof children === "string" ? children : undefined)}
      {...props}
    >
      <Menu.CheckboxItemIndicator className="brass-menu__mark" keepMounted>
        <Check />
      </Menu.CheckboxItemIndicator>
      <span className="brass-list-item__text">{children}</span>
      {shortcut ? <span className="brass-menu__shortcut">{shortcut}</span> : null}
    </Menu.CheckboxItem>
  );
}

export function MenuRadioGroup(props: React.ComponentProps<typeof Menu.RadioGroup>) {
  return <Menu.RadioGroup {...props} />;
}

export interface MenuRadioItemProps extends React.ComponentProps<typeof Menu.RadioItem> {
  shortcut?: ReactNode;
}

export function MenuRadioItem({
  className,
  children,
  shortcut,
  label,
  ...props
}: MenuRadioItemProps) {
  return (
    <Menu.RadioItem
      className={cx("brass-list-item", className)}
      label={label ?? (typeof children === "string" ? children : undefined)}
      {...props}
    >
      <Menu.RadioItemIndicator className="brass-menu__mark" keepMounted>
        <Check />
      </Menu.RadioItemIndicator>
      <span className="brass-list-item__text">{children}</span>
      {shortcut ? <span className="brass-menu__shortcut">{shortcut}</span> : null}
    </Menu.RadioItem>
  );
}
