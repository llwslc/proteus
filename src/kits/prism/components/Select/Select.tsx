import { Select as BaseSelect } from "@base-ui/react/select";
import { ScrollArea } from "../ScrollArea";
import { useId } from "react";
import type { ReactNode } from "react";
import { cx } from "../cx";
import { Check, ChevronDown } from "../icons";
import "./Select.css";

export interface SelectOption {
  label: ReactNode;
  value: string;
  disabled?: boolean;
}

export interface SelectProps<Value extends string = string> extends Omit<
  React.ComponentProps<typeof BaseSelect.Root>,
  "items" | "value" | "defaultValue" | "onValueChange" | "children" | "id" | "className"
> {
  items: Array<SelectOption & { value: Value }>;
  placeholder?: string;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
  className?: string;
  multiple?: boolean;
  value?: Value | Value[] | null;
  defaultValue?: Value | Value[] | null;
  onValueChange?: (value: Value | Value[] | null) => void;
  id?: string;
}

export function Select<Value extends string = string>({
  items,
  multiple,
  placeholder = "Select…",
  className,
  value,
  defaultValue,
  onValueChange,
  name,
  id,
  side = "bottom",
  align = "center",
  ...props
}: SelectProps<Value>) {
  const autoId = useId();
  return (
    <BaseSelect.Root<Value, boolean>
      items={items}
      multiple={multiple}
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      name={name ?? autoId}
      {...props}
    >
      <BaseSelect.Trigger
        id={id ?? autoId}
        className={cx(
          "prism-surface",
          "prism-select",
          "prism-select__trigger",
          className,
        )}
      >
        <BaseSelect.Value className="prism-select__value" placeholder={placeholder} />
        <BaseSelect.Icon className="prism-select__icon">
          <ChevronDown />
        </BaseSelect.Icon>
      </BaseSelect.Trigger>
      <BaseSelect.Portal>
        <BaseSelect.Positioner
          className="prism-lift"
          sideOffset={6}
          alignItemWithTrigger={false}
          side={side}
          align={align}
        >
          <BaseSelect.Popup className="prism-surface prism-pop prism-popup prism-popup-list prism-select__popup">
            <ScrollArea variant="popup">
              {items.map((it) => (
                <BaseSelect.Item
                  key={it.value}
                  value={it.value}
                  disabled={it.disabled}
                  className="prism-list-item"
                >
                  <BaseSelect.ItemText className="prism-list-item__text">
                    {it.label}
                  </BaseSelect.ItemText>
                  <BaseSelect.ItemIndicator className="prism-list-item__check">
                    <Check />
                  </BaseSelect.ItemIndicator>
                </BaseSelect.Item>
              ))}
            </ScrollArea>
          </BaseSelect.Popup>
        </BaseSelect.Positioner>
      </BaseSelect.Portal>
    </BaseSelect.Root>
  );
}
