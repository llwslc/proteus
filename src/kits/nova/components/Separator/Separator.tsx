import { cx } from "../cx";
import { Separator as BaseSeparator } from "@base-ui/react/separator";
import type { ReactNode } from "react";
import "./Separator.css";

export interface SeparatorProps extends Omit<
  React.ComponentProps<typeof BaseSeparator>,
  "className"
> {
  label?: ReactNode;
  className?: string;
}

export function Separator({
  orientation = "horizontal",
  label,
  className,
  ...props
}: SeparatorProps) {
  if (label != null) {
    return (
      <div
        role="separator"
        aria-orientation="horizontal"
        className={cx("nova-separator-labeled", className)}
      >
        <span className="nova-separator-labeled__line" />
        <span className="nova-separator-labeled__text">{label}</span>
        <span className="nova-separator-labeled__line" />
      </div>
    );
  }
  return (
    <BaseSeparator
      orientation={orientation}
      {...props}
      className={cx("nova-separator", `nova-separator--${orientation}`, className)}
    />
  );
}
