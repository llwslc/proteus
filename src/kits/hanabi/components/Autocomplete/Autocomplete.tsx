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
  placeholder = "Search…",
  emptyText = "No matches",
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
        className={cx(
          "hanabi-field hanabi-lockon hanabi-lockon--within hanabi-autocomplete",
          className,
        )}
      >
        <span className="hanabi-autocomplete__glyph">
          <SearchIcon />
        </span>
        <BaseAutocomplete.Input
          id={inputId}
          aria-label={label ?? placeholder}
          placeholder={placeholder}
          className="hanabi-autocomplete__input"
        />
      </BaseAutocomplete.InputGroup>
      <BaseAutocomplete.Portal>
        <BaseAutocomplete.Positioner
          className="hanabi-lift"
          sideOffset={6}
          side={side}
          align={align}
        >
          <BaseAutocomplete.Popup className="hanabi-surface hanabi-pop hanabi-popup hanabi-popup-list hanabi-autocomplete__popup">
            <BaseAutocomplete.Empty className="hanabi-autocomplete__empty">
              {emptyText}
            </BaseAutocomplete.Empty>
            <ScrollArea variant="popup">
              <BaseAutocomplete.List className="hanabi-autocomplete__list">
                {(item: string) => (
                  <BaseAutocomplete.Item
                    key={item}
                    value={item}
                    disabled={inert.has(item)}
                    className="hanabi-list-item"
                  >
                    <span className="hanabi-list-item__text">{item}</span>
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
