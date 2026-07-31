import type { ReactNode } from "react";
import { cx } from "../cx";
import { SquareFill } from "../icons";
import "./Panel.css";

export interface PanelProps {
  title?: ReactNode;
  marker?: ReactNode;
  children?: ReactNode;
}

export function Panel({ title, marker, children }: PanelProps) {
  return (
    <section className={cx("prism-surface", "prism-panel")}>
      {(title || marker) && (
        <header className="prism-panel__head">
          {marker !== undefined ? (
            marker && <span className="prism-marker prism-panel__marker">{marker}</span>
          ) : (
            <span className="prism-marker prism-panel__marker">
              <SquareFill />
            </span>
          )}
          {title && <h3 className="prism-h3 prism-panel__title">{title}</h3>}
        </header>
      )}
      <div className="prism-panel__body">{children}</div>
    </section>
  );
}
