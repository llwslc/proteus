import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { useRef } from "react";
import type { ComponentPropsWithoutRef, ReactElement, ReactNode } from "react";
import { cx } from "../cx";
import { Button } from "../Button";
import type { ButtonSize, ButtonVariant } from "../Button";
import { XIcon } from "../icons";
import { ModalVine } from "../bloom";
import "./Dialog.css";

export interface DialogProps {
  trigger: ReactElement;
  title?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  actions?: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

export function Dialog({
  trigger,
  title,
  description,
  children,
  actions,
  open,
  onOpenChange,
  className,
}: DialogProps) {
  const popupRef = useRef<HTMLDivElement>(null);
  return (
    <BaseDialog.Root open={open} onOpenChange={onOpenChange}>
      <BaseDialog.Trigger render={trigger} />
      <BaseDialog.Portal>
        <BaseDialog.Backdrop className="nocturne-backdrop" />
        <BaseDialog.Viewport className="nocturne-viewport">
          <BaseDialog.Popup
            ref={popupRef}
            initialFocus={popupRef}
            className={cx(
              "nocturne-modal",
              "nocturne-velvet--wine",
              "nocturne-lined",
              "nocturne-dialog",
              className,
            )}
          >
            <BaseDialog.Close
              className="nocturne-modal-close"
              render={
                <Button variant="icon-ghost" aria-label="Close">
                  <XIcon />
                </Button>
              }
            />
            <p className="nocturne-modal-latin" aria-hidden="true">
              Registrum Noctis
            </p>
            {title != null ? (
              <BaseDialog.Title className="nocturne-modal-title">
                {title}
              </BaseDialog.Title>
            ) : null}
            <ModalVine />
            {description != null ? (
              <BaseDialog.Description className="nocturne-modal-desc">
                {description}
              </BaseDialog.Description>
            ) : null}
            {children != null ? (
              <div className="nocturne-modal-body">{children}</div>
            ) : null}
            {actions != null ? (
              <div className="nocturne-modal-actions">{actions}</div>
            ) : null}
          </BaseDialog.Popup>
        </BaseDialog.Viewport>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  );
}

export type DialogCloseVariant = ButtonVariant;

export interface DialogCloseProps extends Omit<
  ComponentPropsWithoutRef<typeof BaseDialog.Close>,
  "className" | "render"
> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

export function DialogClose({
  variant = "ghost",
  size = "md",
  className,
  children,
  ...props
}: DialogCloseProps) {
  return (
    <BaseDialog.Close
      render={
        <Button variant={variant} size={size} className={className}>
          {children}
        </Button>
      }
      {...props}
    />
  );
}
