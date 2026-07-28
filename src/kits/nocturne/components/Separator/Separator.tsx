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
        className={cx(
          "nocturne-separator-labeled",
          `nocturne-separator-labeled--${orientation}`,
          className,
        )}
        role="separator"
        aria-orientation={orientation}
      >
        <span className="nocturne-hairline nocturne-separator-labeled__line" />
        <span className="nocturne-cap nocturne-separator-labeled__text">{label}</span>
        <span className="nocturne-hairline nocturne-separator-labeled__line" />
      </div>
    );
  }
  return (
    <BaseSeparator
      orientation={orientation}
      {...props}
      className={cx("nocturne-separator", `nocturne-separator--${orientation}`, className)}
    />
  );
}
