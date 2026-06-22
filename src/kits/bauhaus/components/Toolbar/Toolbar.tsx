import { Toolbar as BaseToolbar } from "@base-ui/react/toolbar";
import type { ReactNode } from "react";
import { cx } from "../cx";
import "./Toolbar.css";

export interface ToolbarProps {
  children: ReactNode;
  className?: string;
  "aria-label"?: string;
}

export function Toolbar({ className, children, ...props }: ToolbarProps) {
  return (
    <BaseToolbar.Root className={cx("bauhaus-seg", "bauhaus-toolbar", className)} {...props}>
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
    <BaseToolbar.Button aria-pressed={active} className="bauhaus-seg__btn" {...props}>
      {children}
    </BaseToolbar.Button>
  );
}

export function ToolbarSeparator() {
  return <BaseToolbar.Separator className="bauhaus-toolbar__sep" />;
}

export function ToolbarGroup({ children }: { children: ReactNode }) {
  return <BaseToolbar.Group className="bauhaus-toolbar__group">{children}</BaseToolbar.Group>;
}
