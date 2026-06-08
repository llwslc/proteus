import { cx } from "../cx";
import { Collapsible as BaseCollapsible } from "@base-ui/react/collapsible";
import type { ReactNode } from "react";
import { ChevronDownIcon } from "../icons";
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
      defaultOpen={defaultOpen}
      open={open}
      onOpenChange={onOpenChange}
      className={cx("abyss-collapsible", className)}
    >
      <BaseCollapsible.Trigger className="abyss-disclosure__trigger">
        <span className="abyss-disclosure__marker" />
        <span className="abyss-disclosure__title">{title}</span>
        <ChevronDownIcon className="abyss-disclosure__chevron" />
      </BaseCollapsible.Trigger>
      <BaseCollapsible.Panel className="abyss-disclosure__panel">
        <div className="abyss-disclosure__content">{children}</div>
      </BaseCollapsible.Panel>
    </BaseCollapsible.Root>
  );
}
