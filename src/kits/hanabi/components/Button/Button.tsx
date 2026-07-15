import { forwardRef, useState } from "react";
import { Button as BaseButton } from "@base-ui/react/button";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cx } from "../cx";
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
  upright?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", size = "md", icon, upright, className, children, ...props },
  ref,
) {
  void upright;
  const [flashKey, setFlashKey] = useState(0);
  return (
    <BaseButton
      ref={ref}
      className={cx(
        "hanabi-btn",
        `hanabi-btn--${variant}`,
        size !== "md" && `hanabi-btn--${size}`,
        className,
      )}
      {...props}
      onPointerDown={(e) => {
        props.onPointerDown?.(e);
        if (variant === "primary" && !e.defaultPrevented) setFlashKey((k) => k + 1);
      }}
    >
      {icon ? <span className="hanabi-btn__icon">{icon}</span> : null}
      {children}
      {flashKey > 0 && (
        <span key={flashKey} className="hanabi-btn__flash" aria-hidden="true" />
      )}
    </BaseButton>
  );
});
