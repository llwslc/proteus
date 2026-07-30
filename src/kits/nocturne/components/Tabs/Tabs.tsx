import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import type { ReactNode } from "react";
import { cx } from "../cx";
import "./Tabs.css";

export interface TabItem {
  label: ReactNode;
  value: string;
  content: ReactNode;
  disabled?: boolean;
}

export interface TabsProps extends Omit<
  React.ComponentProps<typeof BaseTabs.Root>,
  "children" | "className" | "value" | "defaultValue" | "onValueChange"
> {
  items: TabItem[];
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

export function Tabs({
  items,
  defaultValue,
  value,
  onValueChange,
  className,
  ...props
}: TabsProps) {
  return (
    <BaseTabs.Root
      className={cx("nocturne-tabs", className)}
      defaultValue={defaultValue ?? items[0]?.value}
      value={value}
      onValueChange={onValueChange}
      {...props}
    >
      <BaseTabs.List className="nocturne-tabs__list">
        <div className="nocturne-tabs__strip">
          {items.map((it) => (
            <BaseTabs.Tab
              key={it.value}
              value={it.value}
              disabled={it.disabled}
              className="nocturne-tabs__tab"
            >
              {it.label}
            </BaseTabs.Tab>
          ))}
          <BaseTabs.Indicator className="nocturne-tabs__indicator" />
        </div>
      </BaseTabs.List>
      {items.map((it) => (
        <BaseTabs.Panel key={it.value} value={it.value} className="nocturne-tabs__panel">
          {it.content}
        </BaseTabs.Panel>
      ))}
    </BaseTabs.Root>
  );
}
