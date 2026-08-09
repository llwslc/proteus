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
      <span className={cx("riot-select__field", className)}>
        <BaseSelect.Trigger
          id={id ?? autoId}
          className="riot-surface riot-select__trigger"
        >
          <BaseSelect.Value className="riot-select__value" placeholder={placeholder} />
          <BaseSelect.Icon className="riot-select__chevron">
            <ChevronDownIcon />
          </BaseSelect.Icon>
        </BaseSelect.Trigger>
      </span>

      <BaseSelect.Portal>
        <BaseSelect.Positioner
          className="riot-lift riot-select__positioner"
          sideOffset={6}
          alignItemWithTrigger={false}
          side={side}
          align={align}
        >
          <BaseSelect.Popup className="riot-surface riot-popup riot-pop riot-select__popup">
            <ScrollArea variant="popup">
              {items.map((it) => (
                <BaseSelect.Item
                  key={it.value}
                  value={it.value}
                  disabled={it.disabled}
                  className="riot-list-item"
                >
                  <BaseSelect.ItemText className="riot-select__item-text riot-list-item__text">
                    {it.label}
                  </BaseSelect.ItemText>
                  <span className="riot-select__item-indicator">
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
