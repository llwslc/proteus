import type { ReactNode } from "react";
import { cx } from "../cx";
import { FlowerIcon } from "../icons";
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
    <section id={id} className={cx("nocturne-panel", wide && "nocturne-panel--wide")}>
      {(title || meta || marker) && (
        <header className="nocturne-panel__head">
          {title && (
            <h3 className="nocturne-plate nocturne-panel__title">
              {marker !== undefined ? (
                marker && <span className="nocturne-panel__marker">{marker}</span>
              ) : (
                <span className="nocturne-panel__marker">
                  <FlowerIcon />
                </span>
              )}
              {title}
            </h3>
          )}
          {meta && <span className="nocturne-cap nocturne-panel__meta">{meta}</span>}
        </header>
      )}
      <div className="nocturne-panel__body">{children}</div>
    </section>
  );
}
