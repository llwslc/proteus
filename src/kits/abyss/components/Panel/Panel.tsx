import { cx } from "../cx";
import type { ReactNode } from "react";
import "./Panel.css";

export interface PanelProps {
  title?: ReactNode;
  meta?: ReactNode;
  children: ReactNode;
  scan?: boolean;
  className?: string;
}

export function Panel({ title, meta, children, scan, className }: PanelProps) {
  return (
    <div className="abyss-panel-frame">
      <i className="abyss-panel__corner abyss-panel__corner--tr" aria-hidden />
      <i className="abyss-panel__corner abyss-panel__corner--bl" aria-hidden />
      <section className={cx("abyss-panel", scan ? "abyss-panel--scan" : "", className)}>
        {(title != null || meta != null) && (
          <header className="abyss-panel__head">
            {title != null ? (
              <h3 className="abyss-h3 abyss-panel__title">{title}</h3>
            ) : (
              <span />
            )}
            {meta != null ? <span className="abyss-panel__meta">{meta}</span> : null}
          </header>
        )}
        <div className="abyss-panel__body">{children}</div>
      </section>
    </div>
  );
}
