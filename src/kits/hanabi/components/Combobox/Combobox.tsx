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
          "hanabi-field hanabi-lockon hanabi-lockon--within hanabi-combobox",
          className,
        )}
      >
        <span className="hanabi-combobox__glyph">
          <SearchIcon />
        </span>
        <BaseCombobox.Input
          id={inputId}
          aria-label={label ?? placeholder}
          placeholder={placeholder}
          className="hanabi-combobox__input"
        />
        <BaseCombobox.Clear className="hanabi-combobox__clear" aria-label="Clear">
          <XIcon />
        </BaseCombobox.Clear>
        <BaseCombobox.Trigger className="hanabi-combobox__trigger" aria-label="Open">
          <ChevronDownIcon />
        </BaseCombobox.Trigger>
      </BaseCombobox.InputGroup>
      <BaseCombobox.Portal>
        <BaseCombobox.Positioner
          className="hanabi-lift"
          sideOffset={6}
          side={side}
          align={align}
        >
          <BaseCombobox.Popup className="hanabi-surface hanabi-pop hanabi-popup hanabi-popup-list hanabi-combobox__popup">
            <BaseCombobox.Empty className="hanabi-combobox__empty">
              {emptyText}
            </BaseCombobox.Empty>
            <ScrollArea variant="popup">
              <BaseCombobox.List className="hanabi-combobox__list">
                {(item: string) => (
                  <BaseCombobox.Item
                    key={item}
                    value={item}
                    disabled={inert.has(item)}
                    className="hanabi-list-item"
                  >
                    <span className="hanabi-list-item__text">{item}</span>
                    <BaseCombobox.ItemIndicator className="hanabi-list-item__check">
                      ✦
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
