import { cx } from "../cx";
import { Collapsible as BaseCollapsible } from "@base-ui/react/collapsible";
import type { ReactNode } from "react";
import { SealIcon } from "../icons";
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
      className={cx("sumi-collapsible sumi-frame", className)}
    >
      <BaseCollapsible.Trigger className="sumi-disclosure__trigger sumi-collapsible__trigger">
        <span className="sumi-collapsible__rune" aria-hidden>
          <SealIcon />
        </span>
        <span className="sumi-disclosure__title">{title}</span>
      </BaseCollapsible.Trigger>
      <BaseCollapsible.Panel className="sumi-disclosure__panel">
        <div className="sumi-disclosure__content sumi-text">{children}</div>
      </BaseCollapsible.Panel>
    </BaseCollapsible.Root>
  );
}
