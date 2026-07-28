import { Accordion as BaseAccordion } from "@base-ui/react/accordion";
import type { ReactNode } from "react";
import { cx } from "../cx";
import { ChevronDownIcon, QuatrefoilMark } from "../icons";
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
      className={cx("nocturne-accordion", className)}
      multiple={openMultiple}
      defaultValue={defaultValue}
      {...props}
    >
      {items.map((it) => (
        <BaseAccordion.Item
          key={it.value}
          value={it.value}
          disabled={it.disabled}
          className="nocturne-accordion__item"
        >
          <BaseAccordion.Header className="nocturne-accordion__header">
            <BaseAccordion.Trigger className="nocturne-collapse-trigger">
              <span className="nocturne-marker nocturne-collapse-marker">
                <QuatrefoilMark />
              </span>
              <span className="nocturne-collapse-title">{it.title}</span>
              <span className="nocturne-collapse-chevron">
                <ChevronDownIcon />
              </span>
            </BaseAccordion.Trigger>
          </BaseAccordion.Header>
          <BaseAccordion.Panel className="nocturne-collapse-panel">
            <div className="nocturne-collapse-content">{it.content}</div>
          </BaseAccordion.Panel>
        </BaseAccordion.Item>
      ))}
    </BaseAccordion.Root>
  );
}
