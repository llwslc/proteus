import { AlertDialog as BaseAlertDialog } from "@base-ui/react/alert-dialog";
import { useRef } from "react";
import type { ComponentPropsWithoutRef, ReactElement, ReactNode } from "react";
import { cx } from "../cx";
import { Button } from "../Button";
import type { ButtonSize, ButtonVariant } from "../Button";
import { ModalVine } from "../icons";
import "./AlertDialog.css";

export type AlertDialogTone = "danger" | "warning" | "primary";

export interface AlertDialogProps {
  trigger: ReactElement;
  title?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  actions?: ReactNode;
  tone?: AlertDialogTone;
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
  const popupRef = useRef<HTMLDivElement>(null);
  return (
    <BaseAlertDialog.Root open={open} onOpenChange={onOpenChange}>
      <BaseAlertDialog.Trigger render={trigger} />
      <BaseAlertDialog.Portal>
        <BaseAlertDialog.Backdrop className="nocturne-backdrop" />
        <BaseAlertDialog.Viewport className="nocturne-viewport">
          <BaseAlertDialog.Popup
            ref={popupRef}
            initialFocus={popupRef}
            className={cx(
              "nocturne-modal",
              "nocturne-velvet--wine",
              "nocturne-lined",
              "nocturne-alert",
              `nocturne-alert--${tone}`,
              className,
            )}
          >
            <p className="nocturne-modal-latin" aria-hidden="true">
              Monitum
            </p>
            {title != null ? (
              <BaseAlertDialog.Title className="nocturne-modal-title">
                {title}
              </BaseAlertDialog.Title>
            ) : null}
            <ModalVine />
            {description != null ? (
              <BaseAlertDialog.Description className="nocturne-modal-desc">
                {description}
              </BaseAlertDialog.Description>
            ) : null}
            {children != null ? (
              <div className="nocturne-modal-body">{children}</div>
            ) : null}
            {actions != null ? (
              <div className="nocturne-modal-actions">{actions}</div>
            ) : null}
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
