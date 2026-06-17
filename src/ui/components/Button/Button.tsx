import { forwardRef } from "react";
import { Button as BaseButton } from "@base-ui/react/button";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cx } from "../../cx";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "danger"
  | "ghost"
  | "icon"
  | "icon-ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
}

export function makeButton(rootClass = "") {
  return forwardRef<HTMLButtonElement, ButtonProps>(function Button(
    { variant = "primary", size = "md", icon, className, children, ...props },
    ref,
  ) {
    return (
      <BaseButton
        ref={ref}
        className={cx(rootClass, "k-btn", `k-btn--${variant}`, `k-btn--${size}`, className)}
        {...props}
      >
        <span className="k-btn__label">
          {icon ? <span className="k-btn__icon">{icon}</span> : null}
          {children}
        </span>
      </BaseButton>
    );
  });
}
