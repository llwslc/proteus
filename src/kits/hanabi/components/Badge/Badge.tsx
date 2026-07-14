import type { ReactNode } from "react";
import { cx } from "../cx";
import "./Badge.css";

export type BadgeTone =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | "neutral";

export interface BadgeProps {
  tone?: BadgeTone;
  dot?: boolean;
  children: ReactNode;
  className?: string;
}

export function Badge({
  tone = "primary",
  dot = false,
  className,
  children,
}: BadgeProps) {
  return (
    <span className={cx("hanabi-badge", `hanabi-badge--${tone}`, className)}>
      {dot ? <span className="hanabi-badge__dot" aria-hidden="true" /> : null}
      {children}
    </span>
  );
}
