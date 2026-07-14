import type { ReactNode } from "react";
import { cx } from "../cx";
import "./Panel.css";

export interface PanelProps {
  id?: string;
  title?: ReactNode;
  meta?: ReactNode;
  marker?: ReactNode;
  wide?: boolean;
  children?: ReactNode;
}

export function Panel({ id, title, meta, marker, wide, children }: PanelProps) {
  return (
    <section id={id} className={cx("hanabi-panel", wide && "hanabi-panel--wide")}>
      {(title || meta || marker) && (
        <header className="hanabi-panel__head">
          {title && (
            <h3 className="hanabi-plate hanabi-panel__title">
              {marker !== undefined ? (
                marker && <span className="hanabi-panel__marker">{marker}</span>
              ) : (
                <span className="hanabi-panel__marker">✦</span>
              )}
              {title}
            </h3>
          )}
          {meta && <span className="hanabi-cap hanabi-panel__meta">{meta}</span>}
        </header>
      )}
      <div className="hanabi-panel__body">{children}</div>
    </section>
  );
}
