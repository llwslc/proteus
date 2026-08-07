import type { ReactNode } from "react";
import { Menu } from "@base-ui/react/menu";
import { ScrollArea } from "../ScrollArea";
import { cx } from "../cx";
import { CheckIcon, ChevronRightIcon } from "../icons";

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
        "nova-list-item nova-menu__item",
        tone === "danger" && "nova-menu__item--danger",
        className,
      )}
      label={label ?? (typeof children === "string" ? children : undefined)}
      {...props}
    >
      <span className="nova-menu__icon">{icon}</span>
      <span className="nova-menu__label">{children}</span>
      {shortcut ? <kbd className="nova-menu__shortcut">{shortcut}</kbd> : null}
    </Menu.Item>
  );
}

export function MenuSeparator() {
  return <Menu.Separator className="nova-menu__separator" />;
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
      <Menu.SubmenuTrigger className="nova-list-item nova-menu__item">
        <span className="nova-menu__icon">{icon}</span>
        <span className="nova-menu__label">{label}</span>
        <span className="nova-menu__arrow">
          <ChevronRightIcon />
        </span>
      </Menu.SubmenuTrigger>
      <Menu.Portal>
        <Menu.Positioner
          className="nova-elevation nova-menu-tier"
          side="right"
          align="start"
          sideOffset={10}
        >
          <Menu.Popup className="nova-surface nova-anim-pop nova-menu-pane">
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
      className={cx("nova-list-item nova-menu__item", className)}
      label={label ?? (typeof children === "string" ? children : undefined)}
      {...props}
    >
      <span className="nova-menu__icon">
        <Menu.CheckboxItemIndicator className="nova-menu__mark">
          <CheckIcon />
        </Menu.CheckboxItemIndicator>
      </span>
      <span className="nova-menu__label">{children}</span>
      {shortcut ? <kbd className="nova-menu__shortcut">{shortcut}</kbd> : null}
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
      className={cx("nova-list-item nova-menu__item", className)}
      label={label ?? (typeof children === "string" ? children : undefined)}
      {...props}
    >
      <span className="nova-menu__icon">
        <Menu.RadioItemIndicator className="nova-menu__mark">
          <CheckIcon />
        </Menu.RadioItemIndicator>
      </span>
      <span className="nova-menu__label">{children}</span>
      {shortcut ? <kbd className="nova-menu__shortcut">{shortcut}</kbd> : null}
    </Menu.RadioItem>
  );
}
