import { cx } from "../cx";
import { ExclaimIcon, SealIcon } from "../icons";
import { AlertDialog as BaseAlertDialog } from "@base-ui/react/alert-dialog";
import type { ComponentPropsWithoutRef, ReactElement, ReactNode } from "react";
import { Button } from "../Button";
import type { ButtonVariant, ButtonSize } from "../Button";
import "./AlertDialog.css";

export interface AlertDialogProps {
  trigger: ReactElement;
  title?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  actions?: ReactNode;
  tone?: "danger" | "warning" | "primary";
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

export function AlertDialog({
  trigger,
  title,
  description,
  children,
  actions,
  tone = "danger",
  open,
  onOpenChange,
  className,
}: AlertDialogProps) {
  return (
    <BaseAlertDialog.Root open={open} onOpenChange={onOpenChange}>
      <BaseAlertDialog.Trigger render={trigger} />
      <BaseAlertDialog.Portal>
        <BaseAlertDialog.Backdrop className="sumi-scrim" />
        <BaseAlertDialog.Viewport className="sumi-overlay-viewport">
          <BaseAlertDialog.Popup
            className={cx(
              "sumi-pop sumi-elevation sumi-alert",
              `sumi-alert--${tone}`,
              className,
            )}
          >
            <div className="sumi-frame sumi-alert__tablet">
              {title != null ? (
                <BaseAlertDialog.Title className="sumi-modal-title sumi-alert__title">
                  <span className="sumi-alert__mark" aria-hidden>
                    {tone === "primary" ? <SealIcon /> : <ExclaimIcon />}
                  </span>
                  {title}
                </BaseAlertDialog.Title>
              ) : null}
              {description != null ? (
                <BaseAlertDialog.Description className="sumi-modal-desc">
                  {description}
                </BaseAlertDialog.Description>
              ) : null}
              {children != null ? (
                <div className="sumi-modal-body">{children}</div>
              ) : null}
              {actions != null ? (
                <div className="sumi-modal-actions">{actions}</div>
              ) : null}
            </div>
          </BaseAlertDialog.Popup>
        </BaseAlertDialog.Viewport>
      </BaseAlertDialog.Portal>
    </BaseAlertDialog.Root>
  );
}

export interface AlertDialogCloseProps extends Omit<
  ComponentPropsWithoutRef<typeof BaseAlertDialog.Close>,
  "className" | "render"
> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

export function AlertDialogClose({
  variant = "ghost",
  size = "md",
  className,
  children,
  ...props
}: AlertDialogCloseProps) {
  return (
    <BaseAlertDialog.Close
      render={
        <Button variant={variant} size={size} className={className}>
          {children}
        </Button>
      }
      {...props}
    />
  );
}
