import { Toast as BaseToast } from "@base-ui/react/toast";
import type { ReactNode } from "react";
import { XIcon } from "../icons";
import "./Toast.css";

export type ToastTone = "info" | "success" | "warning" | "danger";

export interface ToastProviderProps {
  children: ReactNode;
  timeout?: number;
  limit?: number;
}

export function ToastProvider({
  children,
  timeout = 5000,
  limit = 4,
}: ToastProviderProps) {
  return (
    <BaseToast.Provider timeout={timeout} limit={limit}>
      {children}
      <BaseToast.Viewport className="abyss-toast__viewport">
        <ToastList />
      </BaseToast.Viewport>
    </BaseToast.Provider>
  );
}

function ToastList() {
  const { toasts } = BaseToast.useToastManager();
  return (
    <>
      {toasts.map((toast) => (
        <BaseToast.Root
          key={toast.id}
          toast={toast}
          swipeDirection="right"
          className={`abyss-elevation abyss-toast abyss-toast--${toast.type ?? "info"}`}
        >
          <div className="abyss-surface abyss-toast__surface">
            <span className="abyss-toast__beam" />
            <div className="abyss-toast__main">
              <BaseToast.Title className="abyss-toast__title" />
              <BaseToast.Description className="abyss-toast__desc" />
            </div>
            <BaseToast.Close className="abyss-toast__close" aria-label="Dismiss">
              <XIcon />
            </BaseToast.Close>
          </div>
        </BaseToast.Root>
      ))}
    </>
  );
}

export function useToast() {
  return BaseToast.useToastManager();
}
