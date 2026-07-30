import { cx } from "../cx";
import { Toolbar as BaseToolbar } from "@base-ui/react/toolbar";
import type { ComponentPropsWithoutRef } from "react";
import "./Toolbar.css";

export interface ToolbarProps extends ComponentPropsWithoutRef<typeof BaseToolbar.Root> {}

export function Toolbar({ className, children, ...props }: ToolbarProps) {
  return (
    <BaseToolbar.Root className={cx("nova-surface nova-toolbar", className)} {...props}>
      {children}
    </BaseToolbar.Root>
  );
}

export interface ToolbarButtonProps extends ComponentPropsWithoutRef<
  typeof BaseToolbar.Button
> {
  value?: string;
}

export function ToolbarButton({ className, children, ...props }: ToolbarButtonProps) {
  return (
    <span className="nova-toolbar__btnwrap">
      <BaseToolbar.Button className={cx("nova-toolbar__btn", className)} {...props}>
        {children}
      </BaseToolbar.Button>
    </span>
  );
}

export function ToolbarLink({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<typeof BaseToolbar.Link>) {
  return (
    <BaseToolbar.Link className={cx("nova-toolbar__link", className)} {...props}>
      {children}
    </BaseToolbar.Link>
  );
}

export function ToolbarSeparator() {
  return <BaseToolbar.Separator className="nova-toolbar__sep" />;
}

export function ToolbarGroup({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<typeof BaseToolbar.Group>) {
  return (
    <BaseToolbar.Group className={cx("nova-toolbar__group", className)} {...props}>
      {children}
    </BaseToolbar.Group>
  );
}
