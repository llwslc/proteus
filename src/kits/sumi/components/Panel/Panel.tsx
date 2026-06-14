import { cx } from "../cx";
import type { ReactNode } from "react";
import { SealIcon } from "../icons";
import "./Panel.css";

export interface PanelProps {
  title?: ReactNode;
  meta?: ReactNode;
  children: ReactNode;
  breathe?: boolean;
  className?: string;
}

export function Panel({ title, meta, children, breathe, className }: PanelProps) {
  return (
    <section className={cx("sumi-panel", className)}>
      {(title != null || meta != null) && (
        <header className="sumi-panel__head">
          {title != null ? (
            <h3 className="sumi-h3 sumi-panel__title">
              <SealIcon
                className={cx("sumi-panel__mark", breathe && "sumi-breathe")}
              />
              {title}
            </h3>
          ) : (
            <span />
          )}
          {meta != null ? <span className="sumi-panel__meta">{meta}</span> : null}
        </header>
      )}
      <div className="sumi-panel__body">{children}</div>
    </section>
  );
}
