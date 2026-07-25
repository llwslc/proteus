import { Combobox as BaseCombobox } from "@base-ui/react/combobox";
import { cx } from "../cx";
import { ScrollArea } from "../ScrollArea";
import { useId } from "react";
import { ChevronDownIcon, SearchIcon, XIcon } from "../icons";
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
      <BaseCombobox.InputGroup
        className={cx(
          "nocturne-field nocturne-ring nocturne-ring--within nocturne-combobox",
          className,
        )}
      >
        <span className="nocturne-combobox__glyph">
          <SearchIcon />
        </span>
        <BaseCombobox.Input
          id={inputId}
          aria-label={label ?? placeholder}
          placeholder={placeholder}
          className="nocturne-combobox__input"
        />
        <BaseCombobox.Clear className="nocturne-combobox__clear" aria-label="Clear">
          <XIcon />
        </BaseCombobox.Clear>
        <BaseCombobox.Trigger className="nocturne-combobox__trigger" aria-label="Open">
          <ChevronDownIcon />
        </BaseCombobox.Trigger>
      </BaseCombobox.InputGroup>
      <BaseCombobox.Portal>
        <BaseCombobox.Positioner
          className="nocturne-elevation"
          sideOffset={6}
          side={side}
          align={align}
        >
          <BaseCombobox.Popup className="nocturne-surface nocturne-unveil nocturne-popup nocturne-popup-list nocturne-combobox__popup">
            <BaseCombobox.Empty className="nocturne-combobox__empty">
              {emptyText}
            </BaseCombobox.Empty>
            <ScrollArea variant="popup">
              <BaseCombobox.List className="nocturne-combobox__list">
                {(item: string) => (
                  <BaseCombobox.Item
                    key={item}
                    value={item}
                    disabled={inert.has(item)}
                    className="nocturne-list-item"
                  >
                    <span className="nocturne-list-item__text">{item}</span>
                    <BaseCombobox.ItemIndicator className="nocturne-list-item__check" />
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
