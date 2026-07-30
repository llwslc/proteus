import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip";
import { useState } from "react";
import type { ReactElement, ReactNode } from "react";
import "./Tooltip.css";

export interface TooltipProps extends Omit<
  React.ComponentProps<typeof BaseTooltip.Root>,
  "open" | "onOpenChange" | "children"
> {
  content: ReactNode;
  children: ReactElement;
  side?: "top" | "bottom" | "left" | "right";
  sideOffset?: number;
  delay?: number;
  align?: "start" | "center" | "end";
}

export function Tooltip({
  content,
  children,
  side = "top",
  sideOffset = 10,
  delay = 200,
  align = "center",
  ...props
}: TooltipProps) {
  const [open, setOpen] = useState(false);

  return (
    <BaseTooltip.Provider>
      <BaseTooltip.Root open={open} onOpenChange={setOpen} {...props}>
        <BaseTooltip.Trigger
          delay={delay}
          closeOnClick={false}
          onPointerDown={(event) => {
            if (event.pointerType === "touch") {
              setOpen((o) => !o);
            }
          }}
          render={children}
        />
        <BaseTooltip.Portal>
          <BaseTooltip.Positioner
            className="nocturne-elevation nocturne-tooltip__positioner"
            side={side}
            sideOffset={sideOffset}
            align={align}
          >
            <BaseTooltip.Popup className="nocturne-popup nocturne-velvet--pop nocturne-drift nocturne-tooltip">
              {content}
            </BaseTooltip.Popup>
            <BaseTooltip.Arrow className="nocturne-arrow" />
          </BaseTooltip.Positioner>
        </BaseTooltip.Portal>
      </BaseTooltip.Root>
    </BaseTooltip.Provider>
  );
}
