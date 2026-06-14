import { cx } from "../cx";
import { Toolbar as BaseToolbar } from "@base-ui/react/toolbar";
import type { ReactNode } from "react";
import "./Toolbar.css";

export interface ToolbarProps {
  children: ReactNode;
  className?: string;
  "aria-label"?: string;
}

export function Toolbar({ className, children, ...props }: ToolbarProps) {
  return (
    <BaseToolbar.Root className={cx("sumi-toolbar sumi-frame", className)} {...props}>
      {children}
    </BaseToolbar.Root>
  );
}

export interface ToolbarButtonProps {
  children: ReactNode;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  "aria-label"?: string;
}

export function ToolbarButton({ children, active, ...props }: ToolbarButtonProps) {
  return (
    <span className="sumi-toolbar__btnwrap">
      <BaseToolbar.Button
        className={cx("sumi-toolbar__btn sumi-frame", active ? "is-active" : "")}
        {...props}
      >
        <span className="sumi-toolbar__label">{children}</span>
      </BaseToolbar.Button>
    </span>
  );
}

export function ToolbarSeparator() {
  return (
    <BaseToolbar.Separator className="sumi-separator sumi-separator--vertical sumi-toolbar__sep" />
  );
}

export function ToolbarGroup({ children }: { children: ReactNode }) {
  return (
    <BaseToolbar.Group className="sumi-toolbar__group">{children}</BaseToolbar.Group>
  );
}
