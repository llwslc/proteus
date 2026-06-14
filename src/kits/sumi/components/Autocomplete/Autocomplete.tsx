import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";
import { useId } from "react";
import { SearchIcon } from "../icons";
import "./Autocomplete.css";

export interface AutocompleteProps {
  items: string[];
  placeholder?: string;
  defaultValue?: string;
  emptyText?: string;
  label?: string;
}

export function Autocomplete({
  items,
  placeholder = "Speak a name…",
  defaultValue,
  emptyText = "No such name is known",
  label,
}: AutocompleteProps) {
  const inputId = useId();
  return (
    <BaseAutocomplete.Root items={items} defaultValue={defaultValue}>
      <div className="sumi-autocomplete__field">
        <div className="sumi-frame sumi-autocomplete__control">
          <span className="sumi-autocomplete__lead">
            <SearchIcon />
          </span>
          <BaseAutocomplete.Input
            id={inputId}
            className="sumi-autocomplete__input"
            placeholder={placeholder}
            aria-label={label ?? placeholder}
          />
        </div>
      </div>
      <BaseAutocomplete.Portal>
        <BaseAutocomplete.Positioner
          className="sumi-elevation sumi-autocomplete__positioner"
          sideOffset={6}
        >
          <BaseAutocomplete.Popup className="sumi-pop sumi-frame sumi-autocomplete__popup">
            <BaseAutocomplete.Empty className="sumi-autocomplete__empty">
              {emptyText}
            </BaseAutocomplete.Empty>
            <BaseAutocomplete.List className="sumi-autocomplete__list">
              {(item: string) => (
                <BaseAutocomplete.Item
                  key={item}
                  value={item}
                  className="sumi-autocomplete__item"
                >
                  <span className="sumi-autocomplete__label">{item}</span>
                </BaseAutocomplete.Item>
              )}
            </BaseAutocomplete.List>
          </BaseAutocomplete.Popup>
        </BaseAutocomplete.Positioner>
      </BaseAutocomplete.Portal>
    </BaseAutocomplete.Root>
  );
}
