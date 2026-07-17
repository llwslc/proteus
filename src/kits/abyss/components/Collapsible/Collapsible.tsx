import { cx } from "../cx";
import { Collapsible as BaseCollapsible } from "@base-ui/react/collapsible";
import type { ReactNode } from "react";
import { ChevronDownIcon, SigilIcon } from "../icons";
import "./Collapsible.css";

export interface CollapsibleProps extends Omit<
  React.ComponentProps<typeof BaseCollapsible.Root>,
  "children" | "className" | "title"
> {
  title: ReactNode;
  children: ReactNode;
  className?: string;
}

export function Collapsible({ title, children, className, ...props }: CollapsibleProps) {
  return (
    <BaseCollapsible.Root
      className={cx("abyss-collapsible abyss-frame", className)}
      {...props}
    >
      <BaseCollapsible.Trigger className="abyss-disclosure__trigger abyss-collapsible__trigger">
        <span className="abyss-collapsible__rune" aria-hidden>
          <SigilIcon />
        </span>
        <span className="abyss-disclosure__title">{title}</span>
        <ChevronDownIcon className="abyss-collapsible__chevron" />
      </BaseCollapsible.Trigger>
      <BaseCollapsible.Panel className="abyss-disclosure__panel">
        <div className="abyss-disclosure__content abyss-text">{children}</div>
      </BaseCollapsible.Panel>
    </BaseCollapsible.Root>
  );
}
