import { cx } from "../cx";
import { Separator as BaseSeparator } from "@base-ui/react/separator";
import { SealIcon } from "../icons";
import type { ReactNode } from "react";
import "./Separator.css";

export interface SeparatorProps {
  orientation?: "horizontal" | "vertical";
  label?: ReactNode;
  className?: string;
}

export function Separator({
  orientation = "horizontal",
  label,
  className,
}: SeparatorProps) {
  if (label != null) {
    return (
      <div
        role="separator"
        aria-orientation="horizontal"
        className={cx("sumi-separator-labeled", className)}
      >
        <span className="sumi-separator-labeled__line" aria-hidden />
        <span className="sumi-separator-labeled__mark">
          <span className="sumi-separator-labeled__sigil sumi-breathe" aria-hidden>
            <SealIcon />
          </span>
          <span className="sumi-separator-labeled__text sumi-cap">{label}</span>
        </span>
        <span
          className="sumi-separator-labeled__line sumi-separator-labeled__line--end"
          aria-hidden
        />
      </div>
    );
  }
  return (
    <BaseSeparator
      orientation={orientation}
      className={cx("sumi-separator", `sumi-separator--${orientation}`, className)}
    />
  );
}
