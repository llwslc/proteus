import { Toast as BaseToast } from "@base-ui/react/toast";
import type { CSSProperties, ReactNode } from "react";
import { cx } from "../cx";
import { Button } from "../Button";
import { BloomMark, XIcon } from "../icons";
import "./Toast.css";

export type ToastTone = "info" | "success" | "warning" | "danger";

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
        <BaseToast.Viewport
          className="nocturne-toast__viewport"
          style={{ "--nocturne-toast-life": `${timeout}ms` } as CSSProperties}
        >
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
          className={cx("nocturne-toast", "nocturne-velvet")}
        >
          <span className="nocturne-toast__marker" aria-hidden="true">
            <BloomMark />
          </span>
          <div className="nocturne-toast__body">
            <BaseToast.Title className="nocturne-toast__title" />
            <BaseToast.Description className="nocturne-toast__desc" />
            {toast.actionProps && (
              <BaseToast.Action
                className="nocturne-toast__action"
                render={<Button variant="secondary" size="sm" />}
              />
            )}
          </div>
          <BaseToast.Close
            className="nocturne-toast__close"
            aria-label="Dismiss"
            render={
              <Button variant="icon-ghost">
                <XIcon />
              </Button>
            }
          />
          <span className="nocturne-toast__life" aria-hidden="true" />
        </BaseToast.Root>
      ))}
    </>
  );
}

export function useToast() {
  return BaseToast.useToastManager();
}
