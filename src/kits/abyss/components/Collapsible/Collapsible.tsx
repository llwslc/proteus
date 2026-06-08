import { cx } from "../cx";
import { Collapsible as BaseCollapsible } from "@base-ui/react/collapsible";
import type { ReactNode } from "react";
import { SigilIcon } from "../icons";
import "./Collapsible.css";

export interface CollapsibleProps {
  title: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

/* A single disclosure: an inked tablet whose trigger bears a sigil rune that
   rotates and ignites phosphor as the leaf unfurls (data-panel-open). The panel
   unrolls on Base UI's measured --collapsible-panel-height, a slow height run. */
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
      className={cx("abyss-collapsible abyss-frame", className)}
    >
      <BaseCollapsible.Trigger className="abyss-collapsible__trigger">
        <span className="abyss-collapsible__rune" aria-hidden>
          <SigilIcon />
        </span>
        <span className="abyss-collapsible__title">{title}</span>
      </BaseCollapsible.Trigger>
      <BaseCollapsible.Panel className="abyss-collapsible__panel">
        <div className="abyss-collapsible__content">{children}</div>
      </BaseCollapsible.Panel>
    </BaseCollapsible.Root>
  );
}
