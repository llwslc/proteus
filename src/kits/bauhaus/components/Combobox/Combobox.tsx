import { Combobox as BaseCombobox } from "@base-ui/react/combobox";
import { cx } from "../cx";
import { ScrollArea } from "../ScrollArea";
import { useId } from "react";
import { Check, ChevronDown, Close } from "../icons";
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
        className={cx("bauhaus-surface bauhaus-combobox", className)}
      >
        <BaseCombobox.Input
          id={inputId}
          aria-label={label ?? placeholder}
          placeholder={placeholder}
          className="bauhaus-combobox__input"
        />
        <BaseCombobox.Clear className="bauhaus-combobox__clear" aria-label="Clear">
          <Close />
        </BaseCombobox.Clear>
        <BaseCombobox.Trigger className="bauhaus-combobox__trigger" aria-label="Open">
          <ChevronDown />
        </BaseCombobox.Trigger>
      </BaseCombobox.InputGroup>
      <BaseCombobox.Portal>
        <BaseCombobox.Positioner
          className="bauhaus-lift"
          sideOffset={6}
          side={side}
          align={align}
        >
          <BaseCombobox.Popup className="bauhaus-surface bauhaus-pop bauhaus-popup bauhaus-popup-list bauhaus-combobox__popup">
            <BaseCombobox.Empty className="bauhaus-combobox__empty">
              {emptyText}
            </BaseCombobox.Empty>
            <ScrollArea variant="popup">
              <BaseCombobox.List className="bauhaus-combobox__list">
                {(item: string) => (
                  <BaseCombobox.Item
                    key={item}
                    value={item}
                    disabled={inert.has(item)}
                    className="bauhaus-list-item"
                  >
                    <span className="bauhaus-list-item__text">{item}</span>
                    <BaseCombobox.ItemIndicator className="bauhaus-list-item__check">
                      <Check />
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
