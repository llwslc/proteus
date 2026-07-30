import type { ReactNode } from "react";
import { cx } from "../cx";
import "./Panel.css";

export interface PanelProps {
  title?: ReactNode;
  marker?: ReactNode;
  children?: ReactNode;
}

export function Panel({ title, marker, children }: PanelProps) {
  return (
    <section className={cx("hanabi-panel")}>
      {(title || marker) && (
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
        </header>
      )}
      <div className="hanabi-panel__body">{children}</div>
    </section>
  );
}
