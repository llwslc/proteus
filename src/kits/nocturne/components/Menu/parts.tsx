import { Menu as BaseMenu } from "@base-ui/react/menu";
import { ScrollArea } from "../ScrollArea";
import type { ComponentProps, ReactNode } from "react";
import { cx } from "../cx";
import { ChevronRightIcon } from "../icons";

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
        "nocturne-list-item",
        tone === "danger" && "nocturne-list-item--danger",
        className,
      )}
      {...props}
    >
      {icon ? <span className="nocturne-menu__icon">{icon}</span> : null}
      <span className="nocturne-list-item__text">{children}</span>
      {shortcut ? <span className="nocturne-menu__shortcut">{shortcut}</span> : null}
    </BaseMenu.Item>
  );
}

export function MenuSeparator() {
  return <BaseMenu.Separator className="nocturne-menu-sep" />;
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
      <BaseMenu.SubmenuTrigger className="nocturne-list-item nocturne-menu__sub">
        {icon ? <span className="nocturne-menu__icon">{icon}</span> : null}
        <span className="nocturne-list-item__text">{label}</span>
        <span className="nocturne-menu__chevron">
          <ChevronRightIcon />
        </span>
      </BaseMenu.SubmenuTrigger>
      <BaseMenu.Portal>
        <BaseMenu.Positioner
          className="nocturne-elevation nocturne-menu-pos"
          side="right"
          align="start"
          sideOffset={12}
        >
          <BaseMenu.Popup className="nocturne-popup nocturne-velvet--pop nocturne-drift nocturne-popup-list nocturne-menu-pane">
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
      className={cx("nocturne-list-item", className)}
      label={label ?? (typeof children === "string" ? children : undefined)}
      {...props}
    >
      <BaseMenu.CheckboxItemIndicator className="nocturne-menu__mark" keepMounted>
        <span className="nocturne-moondot" />
      </BaseMenu.CheckboxItemIndicator>
      <span className="nocturne-list-item__text">{children}</span>
      {shortcut ? <span className="nocturne-menu__shortcut">{shortcut}</span> : null}
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
      className={cx("nocturne-list-item", className)}
      label={label ?? (typeof children === "string" ? children : undefined)}
      {...props}
    >
      <BaseMenu.RadioItemIndicator className="nocturne-menu__mark" keepMounted>
        <span className="nocturne-moondot" />
      </BaseMenu.RadioItemIndicator>
      <span className="nocturne-list-item__text">{children}</span>
      {shortcut ? <span className="nocturne-menu__shortcut">{shortcut}</span> : null}
    </BaseMenu.RadioItem>
  );
}
