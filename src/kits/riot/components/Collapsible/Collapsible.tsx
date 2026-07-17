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
      className={cx("riot-surface riot-collapsible", className)}
      {...props}
    >
      <BaseCollapsible.Trigger className="riot-collapse-trigger">
        <span className="riot-collapse-marker" aria-hidden />
        <span className="riot-collapse-title riot-cap">{title}</span>
        <ChevronDownIcon className="riot-collapse-chevron" />
      </BaseCollapsible.Trigger>
      <BaseCollapsible.Panel className="riot-collapse-panel">
        <div className="riot-collapse-content">{children}</div>
      </BaseCollapsible.Panel>
    </BaseCollapsible.Root>
  );
}
