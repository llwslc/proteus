import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";
import { ScrollArea } from "../ScrollArea";
import { useId } from "react";
import { cx } from "../cx";
import { Close, Search } from "../icons";
import "./Autocomplete.css";

export type AutocompleteItem = string | { label: string; disabled?: boolean };

export interface AutocompleteProps extends Omit<
  React.ComponentProps<typeof BaseAutocomplete.Root>,
  "items" | "children" | "className"
> {
  items: AutocompleteItem[];
  placeholder?: string;
  emptyText?: string;
  label?: string;
  className?: string;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
}

export function Autocomplete({
  items,
  placeholder = "Search…",
  emptyText = "No suggestions",
  label,
  className,
  side = "bottom",
  align = "center",
  ...props
}: AutocompleteProps) {
  const inputId = useId();
  const labels = items.map((it) => (typeof it === "string" ? it : it.label));
  const inert = new Set(
    items.flatMap((it) => (typeof it !== "string" && it.disabled ? [it.label] : [])),
  );
  return (
    <BaseAutocomplete.Root items={labels} {...props}>
      <BaseAutocomplete.InputGroup
        className={cx("brass-plate", "brass-autocomplete", className)}
      >
        <span className="brass-autocomplete__icon">
          <Search />
        </span>
        <BaseAutocomplete.Input
          id={inputId}
          placeholder={placeholder}
          aria-label={label ?? placeholder}
          className="brass-autocomplete__control"
        />
        <BaseAutocomplete.Clear className="brass-autocomplete__clear" aria-label="Clear">
          <Close />
        </BaseAutocomplete.Clear>
      </BaseAutocomplete.InputGroup>
      <BaseAutocomplete.Portal>
        <BaseAutocomplete.Positioner
          className="brass-lift"
          sideOffset={6}
          side={side}
          align={align}
        >
          <BaseAutocomplete.Popup className="brass-plate brass-pop brass-popup brass-popup-list brass-autocomplete__popup">
            <BaseAutocomplete.Empty className="brass-text brass-autocomplete__empty">
              {emptyText}
            </BaseAutocomplete.Empty>
            <ScrollArea variant="popup">
              <BaseAutocomplete.List>
                {(item: string) => (
                  <BaseAutocomplete.Item
                    key={item}
                    value={item}
                    disabled={inert.has(item)}
                    className="brass-list-item"
                  >
                    <span className="brass-list-item__text">{item}</span>
                  </BaseAutocomplete.Item>
                )}
              </BaseAutocomplete.List>
            </ScrollArea>
          </BaseAutocomplete.Popup>
        </BaseAutocomplete.Positioner>
      </BaseAutocomplete.Portal>
    </BaseAutocomplete.Root>
  );
}
