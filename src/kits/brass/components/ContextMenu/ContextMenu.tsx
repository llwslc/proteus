import type { ReactElement, ReactNode } from "react";
import { ContextMenu as BaseContextMenu } from "@base-ui/react/context-menu";
import { ScrollArea } from "../ScrollArea";

export interface ContextMenuProps extends Omit<
  React.ComponentProps<typeof BaseContextMenu.Root>,
  "children"
> {
  trigger: ReactElement;
  children: ReactNode;
  className?: string;
}

export function ContextMenu({
  disabled,
  trigger,
  children,
  className,
  ...props
}: ContextMenuProps) {
  return (
    <BaseContextMenu.Root disabled={disabled} {...props}>
      <BaseContextMenu.Trigger
        render={trigger}
        className={className}
        data-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : 0}
        onKeyDown={(e) => {
          if ((e.shiftKey && e.key === "F10") || e.key === "ContextMenu") {
            e.preventDefault();
            const r = e.currentTarget.getBoundingClientRect();
            e.currentTarget.dispatchEvent(
              new MouseEvent("contextmenu", {
                bubbles: true,
                clientX: r.left + r.width / 2,
                clientY: r.top + r.height / 2,
              }),
            );
          }
        }}
      />
      <BaseContextMenu.Portal>
        <BaseContextMenu.Positioner className="brass-lift brass-menu-tier">
          <BaseContextMenu.Popup className="brass-plate brass-pop brass-popup brass-popup-list">
            <ScrollArea variant="popup">{children}</ScrollArea>
          </BaseContextMenu.Popup>
        </BaseContextMenu.Positioner>
      </BaseContextMenu.Portal>
    </BaseContextMenu.Root>
  );
}
