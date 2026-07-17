import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";
import { cx } from "../cx";
import { ScrollArea } from "../ScrollArea";
import { useId } from "react";
import { SearchIcon } from "../icons";
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
  placeholder = "Speak a name…",
  emptyText = "No such name is known",
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
      <div className={cx("abyss-autocomplete__field", className)}>
        <BaseAutocomplete.InputGroup className="abyss-frame abyss-autocomplete__control">
          <span className="abyss-autocomplete__lead">
            <SearchIcon />
          </span>
          <BaseAutocomplete.Input
            id={inputId}
            className="abyss-autocomplete__input"
            placeholder={placeholder}
            aria-label={label ?? placeholder}
          />
        </BaseAutocomplete.InputGroup>
      </div>
      <BaseAutocomplete.Portal>
        <BaseAutocomplete.Positioner
          className="abyss-elevation abyss-autocomplete__positioner"
          sideOffset={6}
          side={side}
          align={align}
        >
          <BaseAutocomplete.Popup className="abyss-aura-pop abyss-frame abyss-autocomplete__popup">
            <BaseAutocomplete.Empty className="abyss-autocomplete__empty">
              {emptyText}
            </BaseAutocomplete.Empty>
            <ScrollArea variant="popup">
              <BaseAutocomplete.List className="abyss-autocomplete__list">
                {(item: string) => (
                  <BaseAutocomplete.Item
                    key={item}
                    value={item}
                    disabled={inert.has(item)}
                    className="abyss-list-item"
                  >
                    <span className="abyss-autocomplete__label">{item}</span>
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
