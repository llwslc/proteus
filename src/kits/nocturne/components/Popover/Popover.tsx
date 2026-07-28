import { Popover as BasePopover } from "@base-ui/react/popover";
import type { ReactElement, ReactNode } from "react";
import { cx } from "../cx";
import { Button } from "../Button";
import { XIcon } from "../icons";
import "./Popover.css";

export interface PopoverProps extends Omit<
  React.ComponentProps<typeof BasePopover.Root>,
  "children"
> {
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
  ...props
}: PopoverProps) {
  return (
    <BasePopover.Root {...props}>
      <BasePopover.Trigger render={trigger} />
      <BasePopover.Portal>
        <BasePopover.Positioner
          className="nocturne-elevation"
          side={side}
          align={align}
          sideOffset={sideOffset}
        >
          <BasePopover.Popup
            className={cx(
              "nocturne-surface",
              "nocturne-surface--strong",
              "nocturne-velvet--pop",
              "nocturne-drift",
              "nocturne-popup",
              "nocturne-popover",
              className,
            )}
          >
            <BasePopover.Close
              className="nocturne-popover__close"
              render={<Button variant="icon-ghost" aria-label="Close" />}
            >
              <XIcon />
            </BasePopover.Close>
            {title ? (
              <div className="nocturne-popover__head">
                <BasePopover.Title className="nocturne-h3 nocturne-popover__title">
                  {title}
                </BasePopover.Title>
                <span className="nocturne-hairline" aria-hidden="true" />
              </div>
            ) : null}
            <div className="nocturne-popover__body">{children}</div>
          </BasePopover.Popup>
          <BasePopover.Arrow className="nocturne-connector" />
        </BasePopover.Positioner>
      </BasePopover.Portal>
    </BasePopover.Root>
  );
}
