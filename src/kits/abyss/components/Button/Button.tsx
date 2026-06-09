import { cx } from "../cx";
import { Button as BaseButton } from "@base-ui/react/button";
import { forwardRef } from "react";
import type { ComponentPropsWithoutRef, PointerEvent, ReactNode } from "react";
import "./Button.css";

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

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", size = "md", icon, className, children, onPointerDown, ...props },
  ref,
) {
  const handlePointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    const el = event.currentTarget;
    if (!el.disabled) {
      el.classList.remove("is-pressed");
      void el.offsetWidth;
      el.classList.add("is-pressed");
    }
    onPointerDown?.(event);
  };
  return (
    <BaseButton
      ref={ref}
      className={cx(
        "abyss-btn abyss-frame",
        `abyss-btn--${variant}`,
        `abyss-btn--${size}`,
        className,
      )}
      onPointerDown={handlePointerDown}
      {...props}
    >
      <span className="abyss-btn__label">
        {icon ? <span className="abyss-btn__icon">{icon}</span> : null}
        {children}
      </span>
    </BaseButton>
  );
});
