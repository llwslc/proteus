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
    <section className={cx("bauhaus-surface", "bauhaus-panel")}>
      {(title || marker) && (
        <header className="bauhaus-panel__head">
          {marker !== undefined ? (
            marker && (
              <span className="bauhaus-marker bauhaus-panel__marker">{marker}</span>
            )
          ) : (
            <span className="bauhaus-marker bauhaus-panel__marker">
              <SquareFill />
            </span>
          )}
          {title && <h3 className="bauhaus-h3 bauhaus-panel__title">{title}</h3>}
        </header>
      )}
      <div className="bauhaus-panel__body">{children}</div>
    </section>
  );
}
