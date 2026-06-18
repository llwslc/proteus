import type { ReactNode } from "react";
import { AlertDialog as BaseAlertDialog } from "@base-ui/react/alert-dialog";
import { Button, type ButtonProps } from "../Button";
import { Bolt, Gauge, Gear } from "../icons";
import "./AlertDialog.css";

type Tone = "danger" | "warning" | "primary";
type ButtonVariant = ButtonProps["variant"];

export interface AlertDialogProps {
  trigger: ReactNode;
  triggerVariant?: ButtonVariant;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  actions?: ReactNode;
  tone?: Tone;
}

export interface AlertDialogCloseProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonProps["size"];
}

const toneMarker = {
  primary: <Gear />,
  warning: <Gauge />,
  danger: <Bolt />,
} as const;

export function AlertDialogClose({ children, variant = "ghost", size }: AlertDialogCloseProps) {
  return (
    <BaseAlertDialog.Close render={<Button variant={variant} size={size}>{children}</Button>} />
  );
}

export function AlertDialog({
  trigger,
  triggerVariant = "secondary",
  title,
  description,
  children,
  actions,
  tone = "danger",
}: AlertDialogProps) {
  return (
    <BaseAlertDialog.Root>
      <BaseAlertDialog.Trigger render={<Button variant={triggerVariant}>{trigger}</Button>} />
      <BaseAlertDialog.Portal>
        <BaseAlertDialog.Backdrop className="brass-backdrop" />
        <BaseAlertDialog.Viewport className="brass-viewport">
          <BaseAlertDialog.Popup
            className={`brass-plate brass-lift brass-lift--modal brass-rivets brass-pop brass-modal brass-alert brass-alert--${tone}`}
          >
            <BaseAlertDialog.Title className="brass-h2 brass-modal-title">
              <span className="brass-marker brass-modal__sigil">{toneMarker[tone]}</span>
              {title}
            </BaseAlertDialog.Title>
            {description && (
              <BaseAlertDialog.Description className="brass-text brass-modal-desc">
                {description}
              </BaseAlertDialog.Description>
            )}
            {children && <div className="brass-modal-body">{children}</div>}
            {actions != null && (
              <div className="brass-modal-actions">{actions}</div>
            )}
          </BaseAlertDialog.Popup>
        </BaseAlertDialog.Viewport>
      </BaseAlertDialog.Portal>
    </BaseAlertDialog.Root>
  );
}
