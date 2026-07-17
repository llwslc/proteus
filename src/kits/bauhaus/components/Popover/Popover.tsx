import { Popover as BasePopover } from "@base-ui/react/popover";
import type { ReactElement, ReactNode } from "react";
import { cx } from "../cx";
import { Button } from "../Button";
import { Close as CloseIcon } from "../icons";
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
          className="bauhaus-lift"
          side={side}
          align={align}
          sideOffset={sideOffset}
        >
          <BasePopover.Popup
            className={cx(
              "bauhaus-surface",
              "bauhaus-pop",
              "bauhaus-popup",
              "bauhaus-popover",
              className,
            )}
          >
            <BasePopover.Close
              className="bauhaus-popover__close"
              render={<Button variant="icon-ghost" aria-label="Close" />}
            >
              <CloseIcon />
            </BasePopover.Close>
            {title ? (
              <BasePopover.Title className={cx("bauhaus-h2", "bauhaus-popover__title")}>
                {title}
              </BasePopover.Title>
            ) : null}
            <div className="bauhaus-text bauhaus-popover__body">{children}</div>
          </BasePopover.Popup>
          <BasePopover.Arrow className="bauhaus-connector" />
        </BasePopover.Positioner>
      </BasePopover.Portal>
    </BasePopover.Root>
  );
}
