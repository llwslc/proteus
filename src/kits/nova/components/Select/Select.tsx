import { cx } from "../cx";
import { Select as BaseSelect } from "@base-ui/react/select";
import { ScrollArea } from "../ScrollArea";
import { useId } from "react";
import type { ReactNode } from "react";
import { CheckIcon, ChevronDownIcon } from "../icons";
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
      <span className={cx("nova-select__field", className)}>
        <BaseSelect.Trigger id={id ?? autoId} className="nova-select__trigger">
          <BaseSelect.Value>
            {(val) => {
              const picked = (Array.isArray(val) ? val : val == null ? [] : [val])
                .map((v) => items.find((i) => i.value === v))
                .filter(Boolean);
              return picked.length ? (
                <span className="nova-select__value">
                  {picked.map((i, n) => (
                    <span key={i!.value}>
                      {n ? ", " : ""}
                      {i!.label}
                    </span>
                  ))}
                </span>
              ) : (
                <span className="nova-select__placeholder">{placeholder}</span>
              );
            }}
          </BaseSelect.Value>
          <BaseSelect.Icon className="nova-select__chevron">
            <ChevronDownIcon />
          </BaseSelect.Icon>
        </BaseSelect.Trigger>
      </span>

      <BaseSelect.Portal>
        <BaseSelect.Positioner
          className="nova-elevation nova-select__positioner"
          sideOffset={6}
          alignItemWithTrigger={false}
          side={side}
          align={align}
        >
          <BaseSelect.Popup className="nova-surface nova-anim-pop nova-select__popup">
            <ScrollArea variant="popup">
              {items.map((it) => (
                <BaseSelect.Item
                  key={it.value}
                  value={it.value}
                  disabled={it.disabled}
                  className="nova-list-item"
                >
                  <BaseSelect.ItemText className="nova-select__item-text">
                    {it.label}
                  </BaseSelect.ItemText>
                  <span className="nova-select__item-indicator">
                    <BaseSelect.ItemIndicator>
                      <CheckIcon />
                    </BaseSelect.ItemIndicator>
                  </span>
                </BaseSelect.Item>
              ))}
            </ScrollArea>
          </BaseSelect.Popup>
        </BaseSelect.Positioner>
      </BaseSelect.Portal>
    </BaseSelect.Root>
  );
}
