import type { ReactNode } from "react";
import { Menu } from "@base-ui/react/menu";
import { ScrollArea } from "../ScrollArea";
import { cx } from "../cx";
import { CheckIcon, ChevronRightIcon } from "../icons";

export interface MenuItemProps extends React.ComponentProps<typeof Menu.Item> {
  icon?: ReactNode;
  tone?: "default" | "danger";
}

export function MenuItem({
  className,
  children,
  icon,
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
      {icon != null ? <span className="nova-menu__icon">{icon}</span> : null}
      <span className="nova-menu__label">{children}</span>
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
        {icon != null ? <span className="nova-menu__icon">{icon}</span> : null}
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
> {}

export function MenuCheckboxItem({
  className,
  children,
  label,
  ...props
}: MenuCheckboxItemProps) {
  return (
    <Menu.CheckboxItem
      className={cx("nova-list-item nova-menu__item", className)}
      label={label ?? (typeof children === "string" ? children : undefined)}
      {...props}
    >
      <Menu.CheckboxItemIndicator className="nova-menu__mark" keepMounted>
        <CheckIcon />
      </Menu.CheckboxItemIndicator>
      <span className="nova-menu__label">{children}</span>
    </Menu.CheckboxItem>
  );
}

export function MenuRadioGroup(props: React.ComponentProps<typeof Menu.RadioGroup>) {
  return <Menu.RadioGroup {...props} />;
}

export interface MenuRadioItemProps extends React.ComponentProps<typeof Menu.RadioItem> {}

export function MenuRadioItem({
  className,
  children,
  label,
  ...props
}: MenuRadioItemProps) {
  return (
    <Menu.RadioItem
      className={cx("nova-list-item nova-menu__item", className)}
      label={label ?? (typeof children === "string" ? children : undefined)}
      {...props}
    >
      <Menu.RadioItemIndicator className="nova-menu__mark" keepMounted>
        <CheckIcon />
      </Menu.RadioItemIndicator>
      <span className="nova-menu__label">{children}</span>
    </Menu.RadioItem>
  );
}
