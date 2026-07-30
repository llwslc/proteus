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
  if (label != null && orientation === "horizontal") {
    return (
      <BaseSeparator
        orientation={orientation}
        aria-label={typeof label === "string" ? label : undefined}
        {...props}
        className={cx(
          "nocturne-separator-labeled",
          `nocturne-separator-labeled--${align}`,
          className,
        )}
      >
        <span className="nocturne-hairline nocturne-separator-labeled__line" aria-hidden />
        <span className="nocturne-cap nocturne-separator-labeled__text">{label}</span>
        <span className="nocturne-hairline nocturne-separator-labeled__line" aria-hidden />
      </BaseSeparator>
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
