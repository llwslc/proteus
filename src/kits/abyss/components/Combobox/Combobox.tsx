import { Combobox as BaseCombobox } from "@base-ui/react/combobox";
import { cx } from "../cx";
import { ScrollArea } from "../ScrollArea";
import { useId } from "react";
import { CheckIcon, ChevronDownIcon, SearchIcon, XIcon } from "../icons";
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
  emptyText = "No matching omen",
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
      <div className={cx("abyss-combobox__field", className)}>
        <BaseCombobox.InputGroup className="abyss-frame abyss-combobox__control">
          <span className="abyss-combobox__lead" aria-hidden>
            <SearchIcon />
          </span>
          <BaseCombobox.Input
            id={inputId}
            className="abyss-combobox__input"
            placeholder={placeholder}
            aria-label={label ?? placeholder}
          />
          <BaseCombobox.Clear className="abyss-combobox__clear" aria-label="Clear">
            <XIcon />
          </BaseCombobox.Clear>
          <BaseCombobox.Trigger
            className="abyss-combobox__trigger"
            aria-label="Open list"
          >
            <ChevronDownIcon />
          </BaseCombobox.Trigger>
        </BaseCombobox.InputGroup>
      </div>
      <BaseCombobox.Portal>
        <BaseCombobox.Positioner
          className="abyss-elevation abyss-combobox__positioner"
          sideOffset={6}
          side={side}
          align={align}
        >
          <BaseCombobox.Popup className="abyss-aura-pop abyss-combobox__popup">
            <span className="abyss-frame abyss-combobox__tablet" aria-hidden />
            <BaseCombobox.Empty className="abyss-combobox__empty">
              {emptyText}
            </BaseCombobox.Empty>
            <ScrollArea variant="popup">
              <BaseCombobox.List className="abyss-combobox__list">
                {(item: string) => (
                  <BaseCombobox.Item
                    key={item}
                    value={item}
                    disabled={inert.has(item)}
                    className="abyss-list-item"
                  >
                    <span className="abyss-combobox__item-text">{item}</span>
                    <span className="abyss-combobox__indicator" aria-hidden>
                      <BaseCombobox.ItemIndicator>
                        <CheckIcon className="abyss-breathe" />
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
