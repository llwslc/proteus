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
  emptyText = "No matching signal",
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
      <div className={cx("nova-field nova-combobox__field", className)}>
        <BaseCombobox.InputGroup className="nova-field__control nova-combobox__control">
          <span className="nova-field__lead">
            <SearchIcon />
          </span>
          <BaseCombobox.Input
            id={inputId}
            className="nova-field__input"
            placeholder={placeholder}
            aria-label={label ?? placeholder}
          />
          <BaseCombobox.Clear className="nova-combobox__clear" aria-label="Clear">
            <XIcon />
          </BaseCombobox.Clear>
          <BaseCombobox.Trigger className="nova-combobox__trigger" aria-label="Open list">
            <ChevronDownIcon />
          </BaseCombobox.Trigger>
        </BaseCombobox.InputGroup>
      </div>
      <BaseCombobox.Portal>
        <BaseCombobox.Positioner
          className="nova-elevation nova-combobox__positioner"
          sideOffset={6}
          side={side}
          align={align}
        >
          <BaseCombobox.Popup className="nova-surface nova-anim-pop nova-combobox__popup">
            <BaseCombobox.Empty className="nova-combobox__empty">
              {emptyText}
            </BaseCombobox.Empty>
            <ScrollArea variant="popup">
              <BaseCombobox.List className="nova-combobox__list">
                {(item: string) => (
                  <BaseCombobox.Item
                    key={item}
                    value={item}
                    disabled={inert.has(item)}
                    className="nova-list-item"
                  >
                    <span className="nova-combobox__item-text">{item}</span>
                    <span className="nova-combobox__indicator">
                      <BaseCombobox.ItemIndicator>
                        <CheckIcon />
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
