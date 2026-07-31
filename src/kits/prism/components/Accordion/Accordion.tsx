import { Accordion as BaseAccordion } from "@base-ui/react/accordion";
import type { ReactNode } from "react";
import { cx } from "../cx";
import { ChevronDown, SquareFill } from "../icons";
import "./Accordion.css";

export interface AccordionItem {
  title: ReactNode;
  value: string;
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
      className={cx("prism-accordion", className)}
      multiple={openMultiple}
      defaultValue={defaultValue}
      {...props}
    >
      {items.map((it) => (
        <BaseAccordion.Item
          key={it.value}
          value={it.value}
          disabled={it.disabled}
          className="prism-accordion__item"
        >
          <BaseAccordion.Header className="prism-accordion__header">
            <BaseAccordion.Trigger className="prism-collapse-trigger">
              <span className="prism-collapse-marker">
                <SquareFill />
              </span>
              <span className="prism-collapse-title prism-cap">{it.title}</span>
              <span className="prism-collapse-chevron">
                <ChevronDown />
              </span>
            </BaseAccordion.Trigger>
          </BaseAccordion.Header>
          <BaseAccordion.Panel className="prism-collapse-panel">
            <div className="prism-collapse-content prism-text">{it.content}</div>
          </BaseAccordion.Panel>
        </BaseAccordion.Item>
      ))}
    </BaseAccordion.Root>
  );
}
