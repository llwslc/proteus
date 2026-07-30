import type { ReactNode } from "react";
import { cx } from "../cx";
import { Sprig } from "../bloom";
import "./Panel.css";

export interface PanelProps {
  id?: string;
  title?: ReactNode;
  corners?: boolean;
  wide?: boolean;
  children?: ReactNode;
}

function PanelCorner({ mod }: { mod: string }) {
  return (
    <span className={`nocturne-panel__corner nocturne-panel__corner--${mod}`} aria-hidden="true">
      <svg className="nocturne-panel__sprig" viewBox="0 0 56 56" focusable="false">
        <Sprig transform="translate(56,0) scale(-1,1)" />
      </svg>
    </span>
  );
}

export function Panel({ id, title, corners = true, wide, children }: PanelProps) {
  return (
    <section
      id={id}
      className={cx(
        "nocturne-panel",
        "nocturne-velvet",
        "nocturne-lined",
        wide && "nocturne-panel--wide",
      )}
    >
      {corners ? (
        <>
          <PanelCorner mod="tl" />
          <PanelCorner mod="tr" />
          <PanelCorner mod="bl" />
          <PanelCorner mod="br" />
        </>
      ) : null}
      {title && (
        <header className="nocturne-panel__head">
          {title && <h3 className="nocturne-plaque nocturne-panel__title">{title}</h3>}
        </header>
      )}
      <div className="nocturne-panel__body">{children}</div>
    </section>
  );
}
