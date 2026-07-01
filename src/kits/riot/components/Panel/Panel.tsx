import { cx } from "../cx";
import type { ReactNode } from "react";
import "./Panel.css";

export interface PanelProps {
  title?: ReactNode;
  meta?: ReactNode;
  children: ReactNode;
  taped?: boolean;
  id?: string;
  wide?: boolean;
  className?: string;
}

export function Panel({ title, meta, children, taped, id, wide, className }: PanelProps) {
  return (
    <section
      id={id}
      className={cx(
        "riot-surface",
        "riot-surface--torn",
        "riot-panel",
        taped ? "riot-surface--taped" : "",
        wide ? "riot-panel--wide" : "",
        className,
      )}
    >
      {(title != null || meta != null) && (
        <header className="riot-panel__head">
          {title != null ? <h3 className="riot-h3 riot-panel__title">{title}</h3> : <span />}
          {meta != null ? <span className="riot-panel__meta">{meta}</span> : null}
        </header>
      )}
      <div className="riot-panel__body">{children}</div>
    </section>
  );
}
