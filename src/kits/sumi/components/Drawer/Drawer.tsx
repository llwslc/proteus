import { cx } from "../cx";
import { Drawer as BaseDrawer } from "@base-ui/react/drawer";
import type { ReactElement, ReactNode } from "react";
import { Button } from "../Button";
import { KeyIcon, XIcon } from "../icons";
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
  footer?: ReactNode;
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
  footer,
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
        <BaseDrawer.Backdrop className="sumi-scrim sumi-drawer__backdrop" />
        <BaseDrawer.Viewport className="sumi-drawer__viewport">
          <BaseDrawer.Popup
            className={cx("sumi-elevation sumi-drawer", `sumi-drawer--${side}`, className)}
          >
            <BaseDrawer.Content className="sumi-frame sumi-drawer__tablet">
              <span className="sumi-drawer__seam sumi-breathe" aria-hidden />
              <BaseDrawer.Close
                render={
                  <Button
                    variant="icon-ghost"
                    aria-label="Close"
                    className="sumi-modal-x sumi-drawer__x"
                  >
                    <XIcon />
                  </Button>
                }
              />
              {title != null ? (
                <BaseDrawer.Title className="sumi-modal-title">
                  <span className="sumi-drawer__key" aria-hidden>
                    <KeyIcon />
                  </span>
                  {title}
                </BaseDrawer.Title>
              ) : null}
              {description != null ? (
                <BaseDrawer.Description className="sumi-modal-desc">
                  {description}
                </BaseDrawer.Description>
              ) : null}
              {children != null ? (
                <div className="sumi-drawer__body sumi-modal-body">{children}</div>
              ) : null}
              {footer != null ? (
                <div className="sumi-drawer__footer">{footer}</div>
              ) : null}
            </BaseDrawer.Content>
          </BaseDrawer.Popup>
        </BaseDrawer.Viewport>
      </BaseDrawer.Portal>
    </BaseDrawer.Root>
  );
}
