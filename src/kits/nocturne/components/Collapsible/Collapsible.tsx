import { Collapsible as BaseCollapsible } from "@base-ui/react/collapsible";
import type { ReactNode } from "react";
import { cx } from "../cx";
import { ChevronDownIcon, FlowerIcon } from "../icons";
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
    <BaseCollapsible.Root className={cx("nocturne-collapsible", className)} {...props}>
      <BaseCollapsible.Trigger className="nocturne-collapse-trigger">
        <span className="nocturne-marker nocturne-collapse-marker">
          <FlowerIcon />
        </span>
        <span className="nocturne-collapse-title">{title}</span>
        <span className="nocturne-collapse-chevron">
          <ChevronDownIcon />
        </span>
      </BaseCollapsible.Trigger>
      <BaseCollapsible.Panel className="nocturne-collapse-panel">
        <div className="nocturne-collapse-content">{children}</div>
      </BaseCollapsible.Panel>
    </BaseCollapsible.Root>
  );
}
