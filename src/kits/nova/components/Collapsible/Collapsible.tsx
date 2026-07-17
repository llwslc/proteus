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
      <BaseCollapsible.Trigger className="nova-disclosure__trigger">
        <span className="nova-disclosure__marker" />
        <span className="nova-disclosure__title">{title}</span>
        <ChevronDownIcon className="nova-disclosure__chevron" />
      </BaseCollapsible.Trigger>
      <BaseCollapsible.Panel className="nova-disclosure__panel">
        <div className="nova-disclosure__content">{children}</div>
      </BaseCollapsible.Panel>
    </BaseCollapsible.Root>
  );
}
