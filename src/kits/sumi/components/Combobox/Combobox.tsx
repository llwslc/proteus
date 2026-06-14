import { Combobox as BaseCombobox } from "@base-ui/react/combobox";
import { useId } from "react";
import { CheckIcon, ChevronDownIcon, SearchIcon, XIcon } from "../icons";
import "./Combobox.css";

export interface ComboboxProps {
  items: string[];
  placeholder?: string;
  defaultValue?: string;
  emptyText?: string;
  label?: string;
  name?: string;
}

export function Combobox({
  items,
  placeholder = "Search…",
  defaultValue,
  emptyText = "No matching omen",
  label,
  name,
}: ComboboxProps) {
  const inputId = useId();
  return (
    <BaseCombobox.Root items={items} defaultValue={defaultValue} name={name}>
      <div className="sumi-combobox__control">
        <span className="sumi-combobox__lead" aria-hidden>
          <SearchIcon />
        </span>
        <BaseCombobox.Input
          id={inputId}
          className="sumi-combobox__input"
          placeholder={placeholder}
          aria-label={label ?? placeholder}
        />
        <BaseCombobox.Clear className="sumi-combobox__clear" aria-label="Clear">
          <XIcon />
        </BaseCombobox.Clear>
        <BaseCombobox.Trigger className="sumi-combobox__trigger" aria-label="Open list">
          <ChevronDownIcon />
        </BaseCombobox.Trigger>
      </div>
      <BaseCombobox.Portal>
        <BaseCombobox.Positioner className="sumi-elevation sumi-combobox__positioner" sideOffset={8}>
          <BaseCombobox.Popup className="sumi-pop sumi-combobox__popup">
            <span className="sumi-frame sumi-combobox__tablet" aria-hidden />
            <BaseCombobox.Empty className="sumi-combobox__empty">
              {emptyText}
            </BaseCombobox.Empty>
            <BaseCombobox.List className="sumi-combobox__list">
              {(item: string) => (
                <BaseCombobox.Item
                  key={item}
                  value={item}
                  className="sumi-combobox__item"
                >
                  <span className="sumi-combobox__item-text">{item}</span>
                  <span className="sumi-combobox__indicator" aria-hidden>
                    <BaseCombobox.ItemIndicator>
                      <CheckIcon className="sumi-breathe" />
                    </BaseCombobox.ItemIndicator>
                  </span>
                </BaseCombobox.Item>
              )}
            </BaseCombobox.List>
          </BaseCombobox.Popup>
        </BaseCombobox.Positioner>
      </BaseCombobox.Portal>
    </BaseCombobox.Root>
  );
}
