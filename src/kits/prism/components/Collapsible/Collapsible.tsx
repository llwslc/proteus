import { Collapsible as BaseCollapsible } from "@base-ui/react/collapsible";
import type { ReactNode } from "react";
import { cx } from "../cx";
import { ChevronDown, SquareFill } from "../icons";
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
      className={cx("prism-surface", "prism-collapsible", className)}
      {...props}
    >
      <BaseCollapsible.Trigger className="prism-collapse-trigger">
        <span className="prism-collapse-marker">
          <SquareFill />
        </span>
        <span className="prism-collapse-title prism-cap">{title}</span>
        <span className="prism-collapse-chevron">
          <ChevronDown />
        </span>
      </BaseCollapsible.Trigger>
      <BaseCollapsible.Panel className="prism-collapse-panel">
        <div className="prism-collapse-content prism-text">{children}</div>
      </BaseCollapsible.Panel>
    </BaseCollapsible.Root>
  );
}
