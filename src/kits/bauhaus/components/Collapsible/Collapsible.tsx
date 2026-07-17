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
      className={cx("bauhaus-surface", "bauhaus-collapsible", className)}
      {...props}
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
