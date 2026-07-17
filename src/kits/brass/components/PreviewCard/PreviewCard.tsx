import { PreviewCard as BasePreviewCard } from "@base-ui/react/preview-card";
import { useState } from "react";
import type { PointerEvent, ReactElement, ReactNode } from "react";
import "./PreviewCard.css";

export interface PreviewCardProps extends Omit<
  React.ComponentProps<typeof BasePreviewCard.Root>,
  "open" | "onOpenChange" | "children"
> {
  trigger: ReactElement;
  children: ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
  sideOffset?: number;
}

export function PreviewCard({
  trigger,
  children,
  side = "top",
  align = "center",
  sideOffset = 10,
  ...props
}: PreviewCardProps) {
  const [open, setOpen] = useState(false);
  const onTouchToggle = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "touch") return;
    event.preventDefault();
    setOpen((prev) => !prev);
  };
  return (
    <BasePreviewCard.Root open={open} onOpenChange={setOpen} {...props}>
      <BasePreviewCard.Trigger render={trigger} onPointerDown={onTouchToggle} />
      <BasePreviewCard.Portal>
        <BasePreviewCard.Positioner
          className="brass-lift brass-lift--sm"
          side={side}
          align={align}
          sideOffset={sideOffset}
        >
          <BasePreviewCard.Popup className="brass-plate brass-pop brass-popup brass-preview">
            <div className="brass-preview__body">{children}</div>
            <BasePreviewCard.Arrow className="brass-connector" />
          </BasePreviewCard.Popup>
        </BasePreviewCard.Positioner>
      </BasePreviewCard.Portal>
    </BasePreviewCard.Root>
  );
}
