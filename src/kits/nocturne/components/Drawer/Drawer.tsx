import { Drawer as BaseDrawer } from "@base-ui/react/drawer";
import type { ComponentPropsWithoutRef, ReactElement, ReactNode } from "react";
import { cx } from "../cx";
import { Button, type ButtonSize, type ButtonVariant } from "../Button";
import { XIcon } from "../icons";
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
        <BaseDrawer.Backdrop className="nocturne-backdrop" />
        <BaseDrawer.Viewport className="nocturne-drawer__viewport">
          <BaseDrawer.Popup
            className={cx("nocturne-drawer", `nocturne-drawer--${side}`, className)}
          >
            <BaseDrawer.Content className="nocturne-velvet nocturne-lined nocturne-drawer__sheet">
              <BaseDrawer.Close
                className="nocturne-modal-close"
                render={
                  <Button variant="icon-ghost" aria-label="Close">
                    <XIcon />
                  </Button>
                }
              />
              <p
                className="nocturne-modal-latin nocturne-drawer__latin"
                aria-hidden="true"
              >
                Registrum Noctis
              </p>
              {title != null ? (
                <BaseDrawer.Title className="nocturne-drawer__title">
                  {title}
                </BaseDrawer.Title>
              ) : null}
              {description != null ? (
                <BaseDrawer.Description className="nocturne-modal-desc">
                  {description}
                </BaseDrawer.Description>
              ) : null}
              <div className="nocturne-modal-body nocturne-drawer__body">{children}</div>
              {actions != null ? (
                <div className="nocturne-modal-actions">{actions}</div>
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
