import { AlertDialog as BaseAlertDialog } from "@base-ui/react/alert-dialog";
import type { ComponentPropsWithoutRef, ReactElement, ReactNode } from "react";
import { cx } from "../cx";
import { Button, type ButtonSize, type ButtonVariant } from "../Button";
import { CircleFill, TriangleFill, SquareFill } from "../icons";
import "./AlertDialog.css";

type Tone = "danger" | "warning" | "primary";

const TONE_MARKER: Record<Tone, ReactNode> = {
  primary: <CircleFill />,
  warning: <TriangleFill />,
  danger: <SquareFill />,
};

export interface AlertDialogProps {
  trigger: ReactElement;
  title?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  actions?: ReactNode;
  tone?: Tone;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
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
        <BaseAlertDialog.Backdrop className="prism-backdrop" />
        <BaseAlertDialog.Viewport className="prism-viewport">
          <BaseAlertDialog.Popup
            className={cx(
              "prism-surface prism-lift prism-lift--modal prism-modal prism-alert",
              `prism-alert--${tone}`,
              className,
            )}
          >
            {title != null ? (
              <BaseAlertDialog.Title className="prism-h2 prism-modal-title">
                <span className="prism-modal__sigil" aria-hidden="true">
                  {TONE_MARKER[tone]}
                </span>
                {title}
              </BaseAlertDialog.Title>
            ) : null}
            {description != null ? (
              <BaseAlertDialog.Description className="prism-text prism-modal-desc">
                {description}
              </BaseAlertDialog.Description>
            ) : null}
            {children != null ? <div className="prism-modal-body">{children}</div> : null}
            {actions != null ? (
              <div className="prism-modal-actions">{actions}</div>
            ) : null}
          </BaseAlertDialog.Popup>
        </BaseAlertDialog.Viewport>
      </BaseAlertDialog.Portal>
    </BaseAlertDialog.Root>
  );
}
