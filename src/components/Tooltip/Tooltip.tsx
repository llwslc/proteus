import { Tooltip as BaseTooltip } from "@base-ui-components/react/tooltip";
import type { ReactElement, ReactNode } from "react";
import "./Tooltip.css";

export interface TooltipProps {
  /** Tooltip body content. */
  content: ReactNode;
  /** The trigger element (cloned with tooltip behaviour). */
  children: ReactElement;
  side?: "top" | "bottom" | "left" | "right";
  sideOffset?: number;
  delay?: number;
}

export function Tooltip({
  content,
  children,
  side = "top",
  sideOffset = 9,
  delay = 200,
}: TooltipProps) {
  return (
    <BaseTooltip.Provider delay={delay}>
      <BaseTooltip.Root>
        <BaseTooltip.Trigger render={children} />
        <BaseTooltip.Portal>
          <BaseTooltip.Positioner
            className="nova-tooltip__positioner"
            side={side}
            sideOffset={sideOffset}
          >
            <BaseTooltip.Popup className="nova-tooltip__popup">
              <BaseTooltip.Arrow className="nova-tooltip__arrow" />
              {content}
            </BaseTooltip.Popup>
          </BaseTooltip.Positioner>
        </BaseTooltip.Portal>
      </BaseTooltip.Root>
    </BaseTooltip.Provider>
  );
}
