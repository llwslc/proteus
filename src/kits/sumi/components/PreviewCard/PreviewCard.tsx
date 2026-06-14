import { PreviewCard as BasePreviewCard } from "@base-ui/react/preview-card";
import { useState } from "react";
import type { PointerEvent, ReactElement, ReactNode } from "react";
import { SealIcon } from "../icons";
import "./PreviewCard.css";

export interface PreviewCardProps {
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
}: PreviewCardProps) {
  const [open, setOpen] = useState(false);
  const onTouchToggle = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "touch") {
      return;
    }
    event.preventDefault();
    setOpen((prev) => !prev);
  };
  return (
    <BasePreviewCard.Root open={open} onOpenChange={setOpen}>
      <BasePreviewCard.Trigger render={trigger} onPointerDown={onTouchToggle} />
      <BasePreviewCard.Portal>
        <BasePreviewCard.Positioner
          className="sumi-elevation sumi-previewcard__positioner"
          side={side}
          align={align}
          sideOffset={sideOffset}
        >
          <BasePreviewCard.Popup className="sumi-pop sumi-previewcard__popup">
            <span className="sumi-frame sumi-previewcard__surface">
              <SealIcon className="sumi-previewcard__mark" aria-hidden />
              <div className="sumi-previewcard__body">{children}</div>
            </span>
            <BasePreviewCard.Arrow className="sumi-connector" />
          </BasePreviewCard.Popup>
        </BasePreviewCard.Positioner>
      </BasePreviewCard.Portal>
    </BasePreviewCard.Root>
  );
}
