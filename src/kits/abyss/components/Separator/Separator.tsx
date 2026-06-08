import { cx } from "../cx";
import { Separator as BaseSeparator } from "@base-ui/react/separator";
import { SigilIcon } from "../icons";
import type { ReactNode } from "react";
import "./Separator.css";

export interface SeparatorProps {
  orientation?: "horizontal" | "vertical";
  label?: ReactNode;
  className?: string;
}

/* A wavering inked rule. Plain = the shared .abyss-separator hairline warped by
   #abyss-edge. Labelled = a centered sigil + display-caps text flanked by two
   inked rules; the sigil is the eldritch mark that holds the seam shut. */
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
        className={cx("abyss-separator-labeled", className)}
      >
        <span className="abyss-separator-labeled__line" aria-hidden />
        <span className="abyss-separator-labeled__mark">
          <span className="abyss-separator-labeled__sigil" aria-hidden>
            <SigilIcon />
          </span>
          <span className="abyss-separator-labeled__text">{label}</span>
        </span>
        <span className="abyss-separator-labeled__line abyss-separator-labeled__line--end" aria-hidden />
      </div>
    );
  }
  return (
    <BaseSeparator
      orientation={orientation}
      className={cx("abyss-separator", `abyss-separator--${orientation}`, className)}
    />
  );
}
