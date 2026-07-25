import { Toast as BaseToast } from "@base-ui/react/toast";
import type { ReactNode } from "react";
import { cx } from "../cx";
import { Button } from "../Button";
import { XIcon } from "../icons";
import "./Toast.css";

export type ToastTone = "info" | "success" | "warning" | "danger";

function toneOf(type: string | undefined): ToastTone {
  return type === "success" || type === "warning" || type === "danger" ? type : "info";
}

function ToastBloom() {
  return (
    <svg viewBox="-14 -14 28 28" aria-hidden="true">
      {[0, 72, 144, 216, 288].map((a) => (
        <g key={a} transform={`rotate(${a})`}>
          <path
            className="nocturne-toast__petal"
            d="M0 0 C -4 -4,-4.2 -10,0 -13 C 4.2 -10,4 -4,0 0 Z"
          />
        </g>
      ))}
      <circle className="nocturne-toast__core" r="2.8" />
    </svg>
  );
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
        <BaseToast.Viewport className="nocturne-toast__viewport">
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
          className={cx("nocturne-toast", `nocturne-toast--${toneOf(toast.type)}`)}
        >
          <span className="nocturne-toast__marker" aria-hidden="true">
            <ToastBloom />
          </span>
          <span className="nocturne-toast__life" aria-hidden="true" />
          <div className="nocturne-toast__body">
            <BaseToast.Title className="nocturne-toast__title" />
            <BaseToast.Description className="nocturne-toast__desc" />
            {toast.actionProps && (
              <BaseToast.Action
                className="nocturne-toast__action"
                render={<Button variant="ghost" size="sm" />}
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
        </BaseToast.Root>
      ))}
    </>
  );
}

export function useToast() {
  return BaseToast.useToastManager();
}
