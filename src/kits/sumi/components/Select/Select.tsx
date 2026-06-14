import { cx } from "../cx";
import { Select as BaseSelect } from "@base-ui/react/select";
import { useId } from "react";
import type { ReactNode } from "react";
import { CheckIcon, ChevronDownIcon } from "../icons";
import "./Select.css";

export interface SelectOption {
  label: ReactNode;
  value: string;
  disabled?: boolean;
}

export interface SelectProps<Value extends string = string> {
  items: Array<SelectOption & { value: Value }>;
  placeholder?: string;
  className?: string;
  value?: Value | null;
  defaultValue?: Value | null;
  onValueChange?: (value: Value | null) => void;
  disabled?: boolean;
  name?: string;
  id?: string;
}

export function Select<Value extends string = string>({
  items,
  placeholder = "Select…",
  className,
  value,
  defaultValue,
  onValueChange,
  disabled,
  name,
  id,
}: SelectProps<Value>) {
  const autoId = useId();
  return (
    <BaseSelect.Root<Value>
      items={items}
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      disabled={disabled}
      name={name ?? autoId}
    >
      <span className={cx("sumi-select__field", className)}>
        <BaseSelect.Trigger
          id={id ?? autoId}
          className="sumi-select__trigger"
        >
          <BaseSelect.Value>
            {(val) => {
              const item = items.find((i) => i.value === val);
              return item ? (
                <span className="sumi-select__value">{item.label}</span>
              ) : (
                <span className="sumi-select__placeholder">{placeholder}</span>
              );
            }}
          </BaseSelect.Value>
          <BaseSelect.Icon className="sumi-select__chevron">
            <ChevronDownIcon />
          </BaseSelect.Icon>
        </BaseSelect.Trigger>
      </span>

      <BaseSelect.Portal>
        <BaseSelect.Positioner
          className="sumi-elevation sumi-select__positioner"
          sideOffset={8}
          alignItemWithTrigger={false}
        >
          <BaseSelect.Popup className="sumi-frame sumi-pop sumi-select__popup">
            <div className="sumi-select__list">
              {items.map((it) => (
                <BaseSelect.Item
                  key={it.value}
                  value={it.value}
                  disabled={it.disabled}
                  className="sumi-select__item"
                >
                  <span className="sumi-select__item-indicator" aria-hidden>
                    <BaseSelect.ItemIndicator>
                      <CheckIcon className="sumi-select__item-seal sumi-breathe" />
                    </BaseSelect.ItemIndicator>
                  </span>
                  <BaseSelect.ItemText className="sumi-select__item-text">
                    {it.label}
                  </BaseSelect.ItemText>
                </BaseSelect.Item>
              ))}
            </div>
          </BaseSelect.Popup>
        </BaseSelect.Positioner>
      </BaseSelect.Portal>
    </BaseSelect.Root>
  );
}
