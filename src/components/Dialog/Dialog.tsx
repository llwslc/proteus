import { Dialog as BaseDialog } from "@base-ui-components/react/dialog";
import type { ComponentPropsWithoutRef, ReactElement, ReactNode } from "react";
import { XIcon } from "../icons";
import "./Dialog.css";

export interface DialogProps {
  /** Element that opens the dialog. */
  trigger: ReactElement;
  title?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

export function Dialog({
  trigger,
  title,
  description,
  children,
  footer,
  open,
  onOpenChange,
  className,
}: DialogProps) {
  return (
    <BaseDialog.Root open={open} onOpenChange={onOpenChange}>
      <BaseDialog.Trigger render={trigger} />
      <BaseDialog.Portal>
        <BaseDialog.Backdrop className="nova-dialog__backdrop" />
        <BaseDialog.Popup
          className={["nova-dialog__popup", className].filter(Boolean).join(" ")}
        >
          <span className="nova-dialog__scan" />
          <BaseDialog.Close className="nova-dialog__x" aria-label="Close">
            <XIcon />
          </BaseDialog.Close>
          {title != null ? (
            <BaseDialog.Title className="nova-dialog__title">
              <span className="nova-dialog__title-tick" />
              {title}
            </BaseDialog.Title>
          ) : null}
          {description != null ? (
            <BaseDialog.Description className="nova-dialog__desc">
              {description}
            </BaseDialog.Description>
          ) : null}
          {children != null ? (
            <div className="nova-dialog__body">{children}</div>
          ) : null}
          {footer != null ? (
            <div className="nova-dialog__footer">{footer}</div>
          ) : null}
        </BaseDialog.Popup>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  );
}

/** Styled close button for use inside a Dialog footer. */
export interface DialogCloseProps
  extends ComponentPropsWithoutRef<typeof BaseDialog.Close> {}

export function DialogClose({ className, ...props }: DialogCloseProps) {
  return (
    <BaseDialog.Close
      className={["nova-dialog__close-btn", className].filter(Boolean).join(" ")}
      {...props}
    />
  );
}
