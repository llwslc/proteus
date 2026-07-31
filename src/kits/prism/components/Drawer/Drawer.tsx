import { Drawer as BaseDrawer } from "@base-ui/react/drawer";
import type { ComponentPropsWithoutRef, ReactElement, ReactNode } from "react";
import { cx } from "../cx";
import { Button, type ButtonSize, type ButtonVariant } from "../Button";
import { SquareFill, Close } from "../icons";
import "./Drawer.css";

export type DrawerSide = "left" | "right" | "top" | "bottom";

const SWIPE_DIRECTION: Record<DrawerSide, "left" | "right" | "up" | "down"> = {
  left: "left",
  right: "right",
  top: "up",
  bottom: "down",
};

export interface DrawerProps {
  trigger: ReactElement;
  title?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  actions?: ReactNode;
  side?: DrawerSide;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

export function Drawer({
  trigger,
  title,
  description,
  children,
  actions,
  side = "right",
  open,
  onOpenChange,
  className,
}: DrawerProps) {
  return (
    <BaseDrawer.Root
      open={open}
      onOpenChange={onOpenChange}
      swipeDirection={SWIPE_DIRECTION[side]}
    >
      <BaseDrawer.Trigger render={trigger} />
      <BaseDrawer.Portal>
        <BaseDrawer.Backdrop className="prism-backdrop prism-drawer__backdrop" />
        <BaseDrawer.Viewport className="prism-drawer__viewport">
          <BaseDrawer.Popup
            className={cx("prism-drawer", `prism-drawer--${side}`, className)}
          >
            <BaseDrawer.Content className="prism-surface prism-drawer__sheet">
              <BaseDrawer.Close
                className="prism-modal-close"
                render={
                  <Button variant="icon-ghost" aria-label="Close">
                    <Close />
                  </Button>
                }
              />
              {title != null ? (
                <BaseDrawer.Title className="prism-h2 prism-modal-title">
                  <span className="prism-modal__sigil" aria-hidden="true">
                    <SquareFill />
                  </span>
                  {title}
                </BaseDrawer.Title>
              ) : null}
              {description != null ? (
                <BaseDrawer.Description className="prism-text prism-modal-desc">
                  {description}
                </BaseDrawer.Description>
              ) : null}
              {children != null ? (
                <div className="prism-modal-body prism-drawer__body">{children}</div>
              ) : null}
              {actions != null ? (
                <div className="prism-modal-actions">{actions}</div>
              ) : null}
            </BaseDrawer.Content>
          </BaseDrawer.Popup>
        </BaseDrawer.Viewport>
      </BaseDrawer.Portal>
    </BaseDrawer.Root>
  );
}

export type DrawerCloseVariant = ButtonVariant;

export interface DrawerCloseProps extends Omit<
  ComponentPropsWithoutRef<typeof BaseDrawer.Close>,
  "className" | "render"
> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

export function DrawerClose({
  variant = "ghost",
  size = "md",
  className,
  children,
  ...props
}: DrawerCloseProps) {
  return (
    <BaseDrawer.Close
      render={
        <Button variant={variant} size={size} className={className}>
          {children}
        </Button>
      }
      {...props}
    />
  );
}
