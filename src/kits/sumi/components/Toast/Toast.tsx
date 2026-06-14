import { Toast as BaseToast } from "@base-ui/react/toast";
import type { ReactNode } from "react";
import { CheckIcon, ExclaimIcon, SealIcon, XIcon } from "../icons";
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
      <BaseToast.Viewport className="sumi-toast__viewport">
        <ToastList />
      </BaseToast.Viewport>
    </BaseToast.Provider>
  );
}

function ToneSigil({ tone }: { tone: ToastTone }) {
  if (tone === "success") return <CheckIcon />;
  if (tone === "warning") return <ExclaimIcon />;
  if (tone === "danger") return <ExclaimIcon />;
  return <SealIcon />;
}

function ToastList() {
  const { toasts } = BaseToast.useToastManager();
  return (
    <>
      {toasts.map((toast) => {
        const tone = (toast.type ?? "info") as ToastTone;
        return (
          <BaseToast.Root
            key={toast.id}
            toast={toast}
            swipeDirection="right"
            className={`sumi-elevation sumi-toast sumi-toast--${tone}`}
          >
            <div className="sumi-frame sumi-toast__tablet">
              <span className="sumi-toast__sigil sumi-breathe" aria-hidden>
                <ToneSigil tone={tone} />
              </span>
              <span className="sumi-toast__beam" aria-hidden />
              <div className="sumi-toast__main">
                <BaseToast.Title className="sumi-toast__title" />
                <BaseToast.Description className="sumi-toast__desc" />
              </div>
              <BaseToast.Close className="sumi-toast__close" aria-label="Dismiss">
                <XIcon />
              </BaseToast.Close>
            </div>
          </BaseToast.Root>
        );
      })}
    </>
  );
}

export function useToast() {
  return BaseToast.useToastManager();
}
