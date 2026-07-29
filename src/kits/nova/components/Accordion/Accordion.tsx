import { cx } from "../cx";
import { Accordion as BaseAccordion } from "@base-ui/react/accordion";
import type { ReactNode } from "react";
import { ChevronDownIcon } from "../icons";
import "./Accordion.css";

export interface AccordionItem {
  value: string;
  title: ReactNode;
  content: ReactNode;
  disabled?: boolean;
}

export interface AccordionProps extends Omit<
  React.ComponentProps<typeof BaseAccordion.Root>,
  "children" | "className" | "multiple" | "defaultValue"
> {
  items: AccordionItem[];
  openMultiple?: boolean;
  defaultValue?: string[];
  className?: string;
}

export function Accordion({
  items,
  openMultiple = false,
  defaultValue,
  className,
  ...props
}: AccordionProps) {
  return (
    <BaseAccordion.Root
      className={cx("nova-accordion", className)}
      multiple={openMultiple}
      defaultValue={defaultValue}
      {...props}
    >
      {items.map((it) => (
        <BaseAccordion.Item
          key={it.value}
          value={it.value}
          disabled={it.disabled}
          className="nova-surface nova-accordion__item"
        >
          <BaseAccordion.Header className="nova-accordion__header">
            <BaseAccordion.Trigger className="nova-collapse-trigger">
              <span className="nova-collapse-marker" />
              <span className="nova-collapse-title">{it.title}</span>
              <ChevronDownIcon className="nova-collapse-chevron" />
            </BaseAccordion.Trigger>
          </BaseAccordion.Header>
          <BaseAccordion.Panel className="nova-collapse-panel">
            <div className="nova-collapse-content">{it.content}</div>
          </BaseAccordion.Panel>
        </BaseAccordion.Item>
      ))}
    </BaseAccordion.Root>
  );
}
