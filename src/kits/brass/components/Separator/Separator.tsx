import { Separator as BaseSeparator } from "@base-ui/react/separator";
import type { ReactNode } from "react";
import { cx } from "../cx";
import "./Separator.css";

export type SeparatorAlign = "start" | "center" | "end";

export interface SeparatorProps extends Omit<
  React.ComponentProps<typeof BaseSeparator>,
  "className"
> {
  label?: ReactNode;
  align?: SeparatorAlign;
  className?: string;
}

export function Separator({
  orientation = "horizontal",
  label,
  align = "center",
  className,
  ...props
}: SeparatorProps) {
  if (label != null) {
    return (
      <BaseSeparator
        orientation={orientation}
        aria-label={typeof label === "string" ? label : undefined}
        {...props}
        className={cx(
          "brass-separator-labeled",
          `brass-separator-labeled--${align}`,
          className,
        )}
      >
        <span className="brass-separator-labeled__line" aria-hidden />
        <span className="brass-separator-labeled__text brass-cap">{label}</span>
        <span
          className="brass-separator-labeled__line brass-separator-labeled__line--end"
          aria-hidden
        />
      </BaseSeparator>
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
