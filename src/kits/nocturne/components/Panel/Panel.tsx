import type { ReactNode } from "react";
import { cx } from "../cx";
import { Sprig } from "../bloom";
import "./Panel.css";

export interface PanelProps {
  title?: ReactNode;
  corners?: boolean;
  children?: ReactNode;
}

function PanelCorner({ mod }: { mod: string }) {
  return (
    <span
      className={`nocturne-panel__corner nocturne-panel__corner--${mod}`}
      aria-hidden="true"
    >
      <svg className="nocturne-panel__sprig" viewBox="0 0 56 56" focusable="false">
        <Sprig transform="translate(56,0) scale(-1,1)" />
      </svg>
    </span>
  );
}

export function Panel({ title, corners = true, children }: PanelProps) {
  return (
    <div className="nocturne-panel">
      <section
        className={cx("nocturne-panel__frame", "nocturne-velvet", "nocturne-lined")}
      >
        {corners ? (
          <>
            <PanelCorner mod="tl" />
            <PanelCorner mod="tr" />
          </>
        ) : null}
        {title && (
          <header className="nocturne-panel__head">
            {title && <h3 className="nocturne-plaque nocturne-panel__title">{title}</h3>}
          </header>
        )}
        <div className="nocturne-panel__body">{children}</div>
      </section>
    </div>
  );
}
