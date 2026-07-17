import { Combobox as BaseCombobox } from "@base-ui/react/combobox";
import { cx } from "../cx";
import { ScrollArea } from "../ScrollArea";
import { useId } from "react";
import { Check, ChevronDown, Close, Search } from "../icons";
import "./Combobox.css";

export type ComboboxItem = string | { label: string; disabled?: boolean };

export interface ComboboxProps extends Omit<
  React.ComponentProps<typeof BaseCombobox.Root>,
  "items" | "children" | "className"
> {
  items: ComboboxItem[];
  placeholder?: string;
  emptyText?: string;
  label?: string;
  className?: string;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
}

export function Combobox({
  items,
  placeholder = "Search…",
  emptyText = "No matches",
  label,
  className,
  side = "bottom",
  align = "center",
  ...props
}: ComboboxProps) {
  const inputId = useId();
  const labels = items.map((it) => (typeof it === "string" ? it : it.label));
  const inert = new Set(
    items.flatMap((it) => (typeof it !== "string" && it.disabled ? [it.label] : [])),
  );
  return (
    <BaseCombobox.Root items={labels} {...props}>
      <BaseCombobox.InputGroup className={cx("brass-plate brass-combobox", className)}>
        <span className="brass-combobox__lead" aria-hidden>
          <Search />
        </span>
        <BaseCombobox.Input
          id={inputId}
          placeholder={placeholder}
          aria-label={label ?? placeholder}
          className="brass-combobox__control"
        />
        <span className="brass-combobox__aux">
          <BaseCombobox.Clear className="brass-combobox__clear" aria-label="Clear">
            <Close />
          </BaseCombobox.Clear>
          <BaseCombobox.Trigger className="brass-combobox__trigger" aria-label="Open">
            <BaseCombobox.Icon>
              <ChevronDown />
            </BaseCombobox.Icon>
          </BaseCombobox.Trigger>
        </span>
      </BaseCombobox.InputGroup>
      <BaseCombobox.Portal>
        <BaseCombobox.Positioner
          className="brass-lift"
          sideOffset={6}
          side={side}
          align={align}
        >
          <BaseCombobox.Popup className="brass-plate brass-pop brass-popup brass-popup-list brass-combobox__popup">
            <BaseCombobox.Empty className="brass-text brass-combobox__empty">
              {emptyText}
            </BaseCombobox.Empty>
            <ScrollArea variant="popup">
              <BaseCombobox.List>
                {(item: string) => (
                  <BaseCombobox.Item
                    key={item}
                    value={item}
                    disabled={inert.has(item)}
                    className="brass-list-item"
                  >
                    <span className="brass-list-item__text">{item}</span>
                    <span className="brass-list-item__check">
                      <BaseCombobox.ItemIndicator>
                        <Check />
                      </BaseCombobox.ItemIndicator>
                    </span>
                  </BaseCombobox.Item>
                )}
              </BaseCombobox.List>
            </ScrollArea>
          </BaseCombobox.Popup>
        </BaseCombobox.Positioner>
      </BaseCombobox.Portal>
    </BaseCombobox.Root>
  );
}
