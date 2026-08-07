import { Menu as BaseMenu } from "@base-ui/react/menu";
import { ScrollArea } from "../ScrollArea";
import type { ComponentProps, ReactNode } from "react";
import { cx } from "../cx";
import { Check, ChevronRight } from "../icons";

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

export interface MenuCheckboxItemProps extends ComponentProps<
  typeof BaseMenu.CheckboxItem
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
    <BaseMenu.CheckboxItem
      className={cx("prism-list-item", className)}
      label={label ?? (typeof children === "string" ? children : undefined)}
      {...props}
    >
      <span className="prism-menu__icon">
        <BaseMenu.CheckboxItemIndicator className="prism-menu__mark">
          <Check />
        </BaseMenu.CheckboxItemIndicator>
      </span>
      <span className="prism-list-item__text">{children}</span>
      {shortcut ? <span className="prism-menu__shortcut">{shortcut}</span> : null}
    </BaseMenu.CheckboxItem>
  );
}

export function MenuRadioGroup(props: ComponentProps<typeof BaseMenu.RadioGroup>) {
  return <BaseMenu.RadioGroup {...props} />;
}

export interface MenuRadioItemProps extends ComponentProps<typeof BaseMenu.RadioItem> {
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
    <BaseMenu.RadioItem
      className={cx("prism-list-item", className)}
      label={label ?? (typeof children === "string" ? children : undefined)}
      {...props}
    >
      <span className="prism-menu__icon">
        <BaseMenu.RadioItemIndicator className="prism-menu__mark">
          <Check />
        </BaseMenu.RadioItemIndicator>
      </span>
      <span className="prism-list-item__text">{children}</span>
      {shortcut ? <span className="prism-menu__shortcut">{shortcut}</span> : null}
    </BaseMenu.RadioItem>
  );
}
