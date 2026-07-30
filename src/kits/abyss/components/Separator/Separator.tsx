import { cx } from "../cx";
import { Separator as BaseSeparator } from "@base-ui/react/separator";
import { SigilIcon } from "../icons";
import type { ReactNode } from "react";
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
          "abyss-separator-labeled",
          `abyss-separator-labeled--${align}`,
          className,
        )}
      >
        <span className="abyss-separator-labeled__line" aria-hidden />
        <span className="abyss-separator-labeled__mark">
          <span className="abyss-separator-labeled__sigil abyss-breathe" aria-hidden>
            <SigilIcon />
          </span>
          <span className="abyss-separator-labeled__text abyss-cap">{label}</span>
        </span>
        <span
          className="abyss-separator-labeled__line abyss-separator-labeled__line--end"
          aria-hidden
        />
      </BaseSeparator>
    );
  }
  return (
    <BaseSeparator
      orientation={orientation}
      {...props}
      className={cx("abyss-separator", `abyss-separator--${orientation}`, className)}
    />
  );
}
