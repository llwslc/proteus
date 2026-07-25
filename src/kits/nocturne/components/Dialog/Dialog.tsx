import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { useRef } from "react";
import type { ComponentPropsWithoutRef, ReactElement, ReactNode } from "react";
import { cx } from "../cx";
import { Button } from "../Button";
import type { ButtonSize, ButtonVariant } from "../Button";
import { XIcon } from "../icons";
import "./Dialog.css";

function DialogVine() {
  return (
    <div className="nocturne-dialog__vine" aria-hidden="true">
      <svg viewBox="0 0 320 44" fill="none">
        <path
          className="nocturne-dialog__branch"
          pathLength={1}
          d="M160 22 C 132 12,104 12,80 22 C 60 30,36 30,16 22"
        />
        <path
          className="nocturne-dialog__branch"
          pathLength={1}
          d="M160 22 C 188 12,216 12,240 22 C 260 30,284 30,304 22"
        />
        <g
          className="nocturne-dialog__leaf"
          transform="translate(112,16) rotate(-24) scale(.8)"
        >
          <path d="M0 0 C 3.4 -3.6,9 -4.2,13 -1.2 C 9 2.4,3.4 2.6,0 0 Z" />
        </g>
        <g
          className="nocturne-dialog__leaf"
          transform="translate(208,16) rotate(24) scale(-.8,.8)"
        >
          <path d="M0 0 C 3.4 -3.6,9 -4.2,13 -1.2 C 9 2.4,3.4 2.6,0 0 Z" />
        </g>
        <g
          className="nocturne-dialog__leaf"
          transform="translate(56,26) rotate(-150) scale(.7)"
        >
          <path d="M0 0 C 3.4 -3.6,9 -4.2,13 -1.2 C 9 2.4,3.4 2.6,0 0 Z" />
        </g>
        <g
          className="nocturne-dialog__leaf"
          transform="translate(264,26) rotate(150) scale(-.7,.7)"
        >
          <path d="M0 0 C 3.4 -3.6,9 -4.2,13 -1.2 C 9 2.4,3.4 2.6,0 0 Z" />
        </g>
        <g transform="translate(160,22)">
          {[0, 72, 144, 216, 288].map((a) => (
            <g key={a} transform={`rotate(${a})`}>
              <path
                className="nocturne-dialog__petal"
                d="M0 0 C -4 -4,-4.2 -10,0 -13 C 4.2 -10,4 -4,0 0 Z"
              />
            </g>
          ))}
          <circle className="nocturne-dialog__core" r="2.6" />
        </g>
      </svg>
    </div>
  );
}

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
              "nocturne-unveil",
              "nocturne-modal",
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
            {title != null ? (
              <BaseDialog.Title className="nocturne-plate nocturne-modal-title">
                {title}
              </BaseDialog.Title>
            ) : null}
            <DialogVine />
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
