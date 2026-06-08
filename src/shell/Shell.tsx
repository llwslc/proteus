import { Suspense, lazy, useEffect, useState } from "react";
import { KITS, resolveKit } from "../kits/registry";
import "./Shell.css";

// One lazy component per registered kit — its theme CSS loads with its chunk.
const LAZY = Object.fromEntries(KITS.map((k) => [k.id, lazy(k.load)]));

export function Shell() {
  const [kit, setKit] = useState(() => resolveKit(localStorage.getItem("kit")));

  useEffect(() => {
    document.documentElement.dataset.kit = kit;
    localStorage.setItem("kit", kit);
  }, [kit]);

  const Active = LAZY[kit];

  return (
    <>
      <Suspense fallback={null}>
        <Active />
      </Suspense>
      <nav className="shell-switch" aria-label="Component kit">
        {KITS.map((k) => (
          <button
            key={k.id}
            type="button"
            className={"shell-switch__btn" + (kit === k.id ? " is-active" : "")}
            aria-pressed={kit === k.id}
            onClick={() => setKit(k.id)}
          >
            <span className="shell-switch__label">{k.label}</span>
            <span className="shell-switch__tag">{k.tag}</span>
          </button>
        ))}
      </nav>
    </>
  );
}
