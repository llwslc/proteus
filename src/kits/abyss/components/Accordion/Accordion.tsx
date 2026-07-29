import { cx } from "../cx";
import { Accordion as BaseAccordion } from "@base-ui/react/accordion";
import type { ReactNode } from "react";
import { ChevronDownIcon, SigilIcon } from "../icons";
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
      className={cx("abyss-accordion", className)}
      multiple={openMultiple}
      defaultValue={defaultValue}
      {...props}
    >
      {items.map((it) => (
        <BaseAccordion.Item
          key={it.value}
          value={it.value}
          disabled={it.disabled}
          className="abyss-accordion__item abyss-frame"
        >
          <BaseAccordion.Header className="abyss-accordion__header">
            <BaseAccordion.Trigger className="abyss-collapse-trigger abyss-accordion__trigger">
              <SigilIcon className="abyss-accordion__sigil" aria-hidden />
              <span className="abyss-collapse-title">{it.title}</span>
              <ChevronDownIcon className="abyss-accordion__chevron" />
            </BaseAccordion.Trigger>
          </BaseAccordion.Header>
          <BaseAccordion.Panel className="abyss-collapse-panel">
            <div className="abyss-collapse-content abyss-text">{it.content}</div>
          </BaseAccordion.Panel>
        </BaseAccordion.Item>
      ))}
    </BaseAccordion.Root>
  );
}
