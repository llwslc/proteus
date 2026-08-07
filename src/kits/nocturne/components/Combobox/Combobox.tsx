import { Combobox as BaseCombobox } from "@base-ui/react/combobox";
import { cx } from "../cx";
import { ScrollArea } from "../ScrollArea";
import { useId } from "react";
import { ChevronDownIcon, SearchIcon, XIcon } from "../icons";
import "./Combobox.css";

export type ComboboxItem = string | { label: string; disabled?: boolean };

export interface ComboboxProps extends Omit<
  React.ComponentProps<typeof BaseCombobox.Root>,
  "items" | "children" | "className" | "multiple"
> {
  items: ComboboxItem[];
  multiple?: boolean;
  placeholder?: string;
  emptyText?: string;
  label?: string;
  className?: string;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
}

export function Combobox({
  items,
  multiple,
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
    <BaseCombobox.Root items={labels} multiple={multiple} {...props}>
      <BaseCombobox.InputGroup
        className={cx("nocturne-fieldframe nocturne-combobox", className)}
      >
        <span className="nocturne-combobox__glyph">
          <SearchIcon />
        </span>
        {multiple ? (
          <BaseCombobox.Chips className="nocturne-combobox__chips">
            <BaseCombobox.Value>
              {(value: string[]) =>
                value.map((v) => (
                  <BaseCombobox.Chip key={v} className="nocturne-combobox__chip">
                    {v}
                    <BaseCombobox.ChipRemove
                      className="nocturne-combobox__chip-x"
                      aria-label="Remove"
                    >
                      <XIcon />
                    </BaseCombobox.ChipRemove>
                  </BaseCombobox.Chip>
                ))
              }
            </BaseCombobox.Value>
            <BaseCombobox.Input
              id={inputId}
              aria-label={label ?? placeholder}
              placeholder={placeholder}
              className="nocturne-combobox__input nocturne-combobox__chip-input"
            />
          </BaseCombobox.Chips>
        ) : (
          <BaseCombobox.Input
            id={inputId}
            aria-label={label ?? placeholder}
            placeholder={placeholder}
            className="nocturne-combobox__input"
          />
        )}
        <BaseCombobox.Clear className="nocturne-combobox__clear" aria-label="Clear">
          <XIcon />
        </BaseCombobox.Clear>
        <BaseCombobox.Trigger className="nocturne-combobox__trigger" aria-label="Open">
          <ChevronDownIcon />
        </BaseCombobox.Trigger>
      </BaseCombobox.InputGroup>
      <BaseCombobox.Portal>
        <BaseCombobox.Positioner
          className="nocturne-elevation nocturne-combobox__positioner"
          sideOffset={6}
          side={side}
          align={align}
        >
          <BaseCombobox.Popup className="nocturne-popup nocturne-velvet--pop nocturne-drift nocturne-popup-list nocturne-combobox__popup">
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
                    <BaseCombobox.ItemIndicator className="nocturne-list-item__check">
                      <span className="nocturne-moondot" />
                    </BaseCombobox.ItemIndicator>
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
