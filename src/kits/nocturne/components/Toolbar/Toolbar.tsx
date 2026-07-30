import { Toolbar as BaseToolbar } from "@base-ui/react/toolbar";
import type { ComponentPropsWithoutRef } from "react";
import { cx } from "../cx";
import "./Toolbar.css";

export interface ToolbarProps extends ComponentPropsWithoutRef<typeof BaseToolbar.Root> {}

export function Toolbar({ className, children, ...props }: ToolbarProps) {
  return (
    <BaseToolbar.Root
      className={cx("nocturne-seg", "nocturne-toolbar", className)}
      {...props}
    >
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
    <BaseToolbar.Button className={cx("nocturne-seg__btn", className)} {...props}>
      {children}
    </BaseToolbar.Button>
  );
}

export function ToolbarLink({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<typeof BaseToolbar.Link>) {
  return (
    <BaseToolbar.Link className={cx("nocturne-toolbar__link", className)} {...props}>
      {children}
    </BaseToolbar.Link>
  );
}

export function ToolbarSeparator() {
  return <BaseToolbar.Separator className="nocturne-toolbar__sep" />;
}

export function ToolbarGroup({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<typeof BaseToolbar.Group>) {
  return (
    <BaseToolbar.Group className={cx("nocturne-toolbar__group", className)} {...props}>
      {children}
    </BaseToolbar.Group>
  );
}
