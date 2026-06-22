import { Collapsible as BaseCollapsible } from "@base-ui/react/collapsible";
import type { ReactNode } from "react";
import { cx } from "../cx";
import { ChevronDown, SquareFill } from "../icons";
import "./Collapsible.css";

export interface CollapsibleProps {
  title: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

export function Collapsible({
  title,
  children,
  defaultOpen,
  open,
  onOpenChange,
  className,
}: CollapsibleProps) {
  return (
    <BaseCollapsible.Root
      className={cx("bauhaus-surface", "bauhaus-collapsible", className)}
      defaultOpen={defaultOpen}
      open={open}
      onOpenChange={onOpenChange}
    >
      <BaseCollapsible.Trigger className="bauhaus-collapse-trigger">
        <span className="bauhaus-collapse-marker">
          <SquareFill />
        </span>
        <span className="bauhaus-collapse-title bauhaus-cap">{title}</span>
        <span className="bauhaus-collapse-chevron">
          <ChevronDown />
        </span>
      </BaseCollapsible.Trigger>
      <BaseCollapsible.Panel className="bauhaus-collapse-panel">
        <div className="bauhaus-collapse-content bauhaus-text">{children}</div>
      </BaseCollapsible.Panel>
    </BaseCollapsible.Root>
  );
}
