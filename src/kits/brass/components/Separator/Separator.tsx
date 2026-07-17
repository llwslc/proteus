import { Separator as BaseSeparator } from "@base-ui/react/separator";
import type { ReactNode } from "react";
import { cx } from "../cx";
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
        className={cx("brass-separator-labeled", className)}
      >
        <span className="brass-separator-labeled__line" aria-hidden />
        <span className="brass-separator-labeled__text brass-cap">{label}</span>
        <span
          className="brass-separator-labeled__line brass-separator-labeled__line--end"
          aria-hidden
        />
      </div>
    );
  }
  return (
    <BaseSeparator
      orientation={orientation}
      {...props}
      className={cx("brass-separator", className)}
    />
  );
}
