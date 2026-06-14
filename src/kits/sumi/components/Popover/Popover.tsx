import { cx } from "../cx";
import { Popover as BasePopover } from "@base-ui/react/popover";
import type { ReactElement, ReactNode } from "react";
import { Button } from "../Button";
import { SealIcon, XIcon } from "../icons";
import "./Popover.css";

export interface PopoverProps {
  trigger: ReactElement;
  title?: ReactNode;
  children: ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
  sideOffset?: number;
  className?: string;
}

export function Popover({
  trigger,
  title,
  children,
  side = "bottom",
  align = "center",
  sideOffset = 10,
  className,
}: PopoverProps) {
  return (
    <BasePopover.Root>
      <BasePopover.Trigger render={trigger} />
      <BasePopover.Portal>
        <BasePopover.Positioner
          className="sumi-elevation sumi-popover__pos"
          side={side}
          align={align}
          sideOffset={sideOffset}
        >
          <BasePopover.Popup
            className={cx("sumi-pop sumi-popover__popup", className)}
          >
            <span className="sumi-frame sumi-popover__surface">
              {title != null ? (
                <BasePopover.Title className="sumi-popover__title">
                  <SealIcon className="sumi-popover__conch" aria-hidden />
                  {title}
                </BasePopover.Title>
              ) : null}
              <div className="sumi-popover__body">{children}</div>
              <BasePopover.Close
                render={
                  <Button
                    variant="icon-ghost"
                    aria-label="Close"
                    className="sumi-modal-x sumi-popover__x"
                  >
                    <XIcon />
                  </Button>
                }
              />
            </span>
            <BasePopover.Arrow className="sumi-connector" />
          </BasePopover.Popup>
        </BasePopover.Positioner>
      </BasePopover.Portal>
    </BasePopover.Root>
  );
}
