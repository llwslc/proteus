import { cx } from "../cx";
import { ScrollArea as BaseScrollArea } from "@base-ui/react/scroll-area";
import type { CSSProperties, ReactNode } from "react";
import "./ScrollArea.css";

export interface ScrollAreaProps {
  children: ReactNode;
  maxHeight?: number | string;
  className?: string;
}

export function ScrollArea({ children, maxHeight = 220, className }: ScrollAreaProps) {
  return (
    <BaseScrollArea.Root className={cx("abyss-frame abyss-scrollarea", className)}>
      <BaseScrollArea.Viewport
        className="abyss-scrollarea__viewport"
        style={{ maxHeight } as CSSProperties}
      >
        <div className="abyss-scrollarea__content">{children}</div>
      </BaseScrollArea.Viewport>
      <BaseScrollArea.Scrollbar
        className="abyss-scrollarea__scrollbar"
        orientation="vertical"
      >
        <BaseScrollArea.Thumb className="abyss-scrollarea__thumb">
        </BaseScrollArea.Thumb>
      </BaseScrollArea.Scrollbar>
    </BaseScrollArea.Root>
  );
}
