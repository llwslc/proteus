import { cx } from "../cx";
import { Collapsible as BaseCollapsible } from "@base-ui/react/collapsible";
import type { ReactNode } from "react";
import { ChevronDownIcon } from "../icons";
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
      className={cx("nova-surface nova-collapsible", className)}
      {...props}
    >
      <BaseCollapsible.Trigger className="nova-collapse-trigger">
        <span className="nova-collapse-marker" />
        <span className="nova-collapse-title">{title}</span>
        <ChevronDownIcon className="nova-collapse-chevron" />
      </BaseCollapsible.Trigger>
      <BaseCollapsible.Panel className="nova-collapse-panel">
        <div className="nova-collapse-content">{children}</div>
      </BaseCollapsible.Panel>
    </BaseCollapsible.Root>
  );
}
