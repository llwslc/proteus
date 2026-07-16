import { Collapsible as BaseCollapsible } from "@base-ui/react/collapsible";
import type { ReactNode } from "react";
import { cx } from "../cx";
import { ChevronDownIcon } from "../icons";
import "./Collapsible.css";

export interface CollapsibleProps {
  title: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
  className?: string;
}

export function Collapsible({
  title,
  children,
  defaultOpen,
  open,
  onOpenChange,
  disabled,
  className,
}: CollapsibleProps) {
  return (
    <BaseCollapsible.Root
      className={cx("hanabi-collapsible", className)}
      defaultOpen={defaultOpen}
      open={open}
      onOpenChange={onOpenChange}
      disabled={disabled}
    >
      <BaseCollapsible.Trigger className="hanabi-collapse-trigger">
        <span className="hanabi-marker hanabi-collapse-marker">✦</span>
        <span className="hanabi-collapse-title">{title}</span>
        <span className="hanabi-collapse-chevron">
          <ChevronDownIcon />
        </span>
      </BaseCollapsible.Trigger>
      <BaseCollapsible.Panel className="hanabi-collapse-panel">
        <div className="hanabi-collapse-content">{children}</div>
      </BaseCollapsible.Panel>
    </BaseCollapsible.Root>
  );
}
