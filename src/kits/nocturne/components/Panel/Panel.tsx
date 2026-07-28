import type { ReactNode } from "react";
import { cx } from "../cx";
import { SprigMark } from "../icons";
import "./Panel.css";

export interface PanelProps {
  id?: string;
  title?: ReactNode;
  meta?: ReactNode;
  wide?: boolean;
  corners?: boolean;
  children?: ReactNode;
}

export function Panel({ id, title, meta, wide, corners = true, children }: PanelProps) {
  return (
    <section
      id={id}
      className={cx(
        "nocturne-panel",
        "nocturne-surface",
        "nocturne-surface--strong",
        "nocturne-velvet",
        "nocturne-lined",
        wide && "nocturne-panel--wide",
      )}
    >
      {corners ? (
        <>
          <span className="nocturne-panel__corner nocturne-panel__corner--tl" aria-hidden="true">
            <SprigMark />
          </span>
          <span className="nocturne-panel__corner nocturne-panel__corner--tr" aria-hidden="true">
            <SprigMark />
          </span>
          <span className="nocturne-panel__corner nocturne-panel__corner--bl" aria-hidden="true">
            <SprigMark />
          </span>
          <span className="nocturne-panel__corner nocturne-panel__corner--br" aria-hidden="true">
            <SprigMark />
          </span>
        </>
      ) : null}
      {(title || meta) && (
        <header className="nocturne-panel__head">
          {title && <h3 className="nocturne-panel__title">{title}</h3>}
          {meta && <span className="nocturne-panel__meta">{meta}</span>}
        </header>
      )}
      <div className="nocturne-panel__body">{children}</div>
    </section>
  );
}
