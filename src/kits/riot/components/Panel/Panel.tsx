import { cx } from "../cx";
import type { ReactNode } from "react";
import "./Panel.css";

export interface PanelProps {
  title?: ReactNode;
  children: ReactNode;
  tape?: "tl" | "tr" | "bl" | "br" | "top";
  stapled?: boolean;
  tilt?: 1 | 2 | 3 | 4;
  className?: string;
}

export function Panel({ title, children, tape, stapled, tilt, className }: PanelProps) {
  return (
    <div className={cx("riot-panel", tilt && `riot-panel--tilt-${tilt}`, className)}>
      {tape ? <span className={`riot-tape riot-tape--${tape}`} aria-hidden /> : null}
      {stapled ? (
        <>
          <i
            className="riot-staple riot-panel__staple riot-panel__staple--l"
            aria-hidden
          />
          <i
            className="riot-staple riot-panel__staple riot-panel__staple--r"
            aria-hidden
          />
        </>
      ) : null}
      <section className="riot-surface riot-surface--torn riot-panel__sheet">
        {title != null && (
          <header className="riot-panel__head">
            {title != null ? (
              <h3 className="riot-h3 riot-panel__title">{title}</h3>
            ) : (
              <span />
            )}
          </header>
        )}
        <div className="riot-panel__body">{children}</div>
      </section>
    </div>
  );
}
