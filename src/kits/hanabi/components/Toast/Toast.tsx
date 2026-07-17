import { Toast as BaseToast } from "@base-ui/react/toast";
import type { ReactNode } from "react";
import { cx } from "../cx";
import { Button } from "../Button";
import { XIcon } from "../icons";
import "./Toast.css";

export type ToastTone = "info" | "success" | "warning" | "danger";

const GLYPH: Record<ToastTone, string> = {
  info: "✦",
  success: "★",
  warning: "⚠",
  danger: "!",
};

function toneOf(type: string | undefined): ToastTone {
  return type === "success" || type === "warning" || type === "danger" ? type : "info";
}

type SwipeDirection = "up" | "down" | "left" | "right";

export interface ToastProviderProps extends Omit<
  React.ComponentProps<typeof BaseToast.Provider>,
  "children"
> {
  children: ReactNode;
  swipeDirection?: SwipeDirection | SwipeDirection[];
}

export function ToastProvider({
  children,
  timeout = 5000,
  limit = 4,
  swipeDirection = "right",
  ...props
}: ToastProviderProps) {
  return (
    <BaseToast.Provider timeout={timeout} limit={limit} {...props}>
      {children}
      <BaseToast.Portal>
        <BaseToast.Viewport className="hanabi-toast__viewport">
          <ToastList swipeDirection={swipeDirection} />
        </BaseToast.Viewport>
      </BaseToast.Portal>
    </BaseToast.Provider>
  );
}

function ToastList({
  swipeDirection,
}: {
  swipeDirection: SwipeDirection | SwipeDirection[];
}) {
  const { toasts } = BaseToast.useToastManager();
  return (
    <>
      {toasts.map((toast) => (
        <BaseToast.Root
          key={toast.id}
          toast={toast}
          swipeDirection={swipeDirection}
          className={cx("hanabi-toast")}
        >
          <span className="hanabi-toast__marker" aria-hidden="true">
            {GLYPH[toneOf(toast.type)]}
          </span>
          <div className="hanabi-toast__body">
            <BaseToast.Title className="hanabi-toast__title" />
            <BaseToast.Description className="hanabi-toast__desc" />
            {toast.actionProps && (
              <BaseToast.Action
                className="hanabi-toast__action"
                render={<Button variant="ghost" size="sm" />}
              />
            )}
          </div>
          <BaseToast.Close
            className="hanabi-toast__close"
            aria-label="Dismiss"
            render={
              <Button variant="icon-ghost">
                <XIcon />
              </Button>
            }
          />
        </BaseToast.Root>
      ))}
    </>
  );
}

export function useToast() {
  return BaseToast.useToastManager();
}
