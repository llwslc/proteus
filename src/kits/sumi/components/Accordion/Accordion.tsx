import { cx } from "../cx";
import { Accordion as BaseAccordion } from "@base-ui/react/accordion";
import type { ReactNode } from "react";
import { ChevronDownIcon, SealIcon } from "../icons";
import "./Accordion.css";

export interface AccordionItem {
  value: string;
  title: ReactNode;
  content: ReactNode;
  disabled?: boolean;
}

export interface AccordionProps {
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
}: AccordionProps) {
  return (
    <BaseAccordion.Root
      className={cx("sumi-accordion", className)}
      multiple={openMultiple}
      defaultValue={defaultValue}
    >
      {items.map((it) => (
        <BaseAccordion.Item
          key={it.value}
          value={it.value}
          disabled={it.disabled}
          className="sumi-accordion__item sumi-frame"
        >
          <BaseAccordion.Header className="sumi-accordion__header">
            <BaseAccordion.Trigger className="sumi-disclosure__trigger sumi-accordion__trigger">
              <SealIcon className="sumi-accordion__sigil" aria-hidden />
              <span className="sumi-disclosure__title">{it.title}</span>
              <ChevronDownIcon className="sumi-accordion__chevron" />
            </BaseAccordion.Trigger>
          </BaseAccordion.Header>
          <BaseAccordion.Panel className="sumi-disclosure__panel">
            <div className="sumi-disclosure__content sumi-text">{it.content}</div>
          </BaseAccordion.Panel>
        </BaseAccordion.Item>
      ))}
    </BaseAccordion.Root>
  );
}
