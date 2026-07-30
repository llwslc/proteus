import type { ReactNode } from "react";
import { cx } from "../cx";
import { Gear } from "../icons";
import "./Panel.css";

export interface PanelProps {
  title?: ReactNode;
  marker?: ReactNode;
  children?: ReactNode;
}

export function Panel({ title, marker, children }: PanelProps) {
  return (
    <section className={cx("brass-plate", "brass-rivets", "brass-panel")}>
      {(title || marker) && (
        <header className="brass-panel__head">
          {marker !== undefined ? (
            marker && <span className="brass-marker brass-panel__marker">{marker}</span>
          ) : (
            <span className="brass-marker brass-panel__marker">
              <Gear />
            </span>
          )}
          {title && <h3 className="brass-h3 brass-panel__title">{title}</h3>}
        </header>
      )}
      <div className="brass-panel__body">{children}</div>
    </section>
  );
}
