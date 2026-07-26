import { Suspense, lazy, useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { KITS, resolveKit } from "../kits/registry";
import "./Shell.css";

const APPS = Object.fromEntries(KITS.map((k) => [k.id, lazy(k.app)]));
const LOADERS = Object.fromEntries(KITS.map((k) => [k.id, lazy(k.loader)]));

const safeGet = (key: string) => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};
const safeSet = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value);
  } catch {
    return;
  }
};
const safeRemove = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch {
    return;
  }
};

export function Shell() {
  const params = new URLSearchParams(location.search);
  if (params.get("embed") === "1")
    return <EmbedApp kitId={resolveKit(params.get("kit"))} />;
  return <FullShell />;
}

function DeviceIcon({ mode }: { mode: string }) {
  return mode === "mobile" ? (
    <svg
      viewBox="0 0 16 16"
      width="15"
      height="15"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      aria-hidden="true"
    >
      <rect x="4.5" y="1.5" width="7" height="13" rx="1.6" />
      <line x1="7" y1="12.4" x2="9" y2="12.4" />
    </svg>
  ) : (
    <svg
      viewBox="0 0 16 16"
      width="15"
      height="15"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      aria-hidden="true"
    >
      <rect x="1.5" y="2.5" width="13" height="9" rx="1.2" />
      <line x1="5.5" y1="14" x2="10.5" y2="14" />
      <line x1="8" y1="11.5" x2="8" y2="14" />
    </svg>
  );
}

function EmbedApp({ kitId }: { kitId: string }) {
  const Active = APPS[kitId];
  const KitLoader = LOADERS[kitId];
  return (
    <Suspense fallback={<div className="shell-boot" />}>
      <Suspense fallback={<KitLoader />}>
        <Active />
      </Suspense>
    </Suspense>
  );
}

function FullShell() {
  const [entered, setEntered] = useState(() => safeGet("kit") != null);
  const kit = resolveKit(safeGet("kit"));
  const active = KITS.find((k) => k.id === kit) ?? KITS[0];
  const Active = APPS[kit];
  const KitLoader = LOADERS[kit];

  const [open, setOpen] = useState(false);
  const [overlay, setOverlay] = useState(false);
  const [vp, setVp] = useState(() =>
    safeGet("shell-vp") === "mobile" ? "mobile" : "pc",
  );
  const menuRef = useRef<HTMLUListElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const sync = () => {
      const modalOpen = document.body.style.overflow === "hidden";
      setOverlay(modalOpen);
      if (modalOpen) setOpen(false);
    };
    const mo = new MutationObserver(sync);
    mo.observe(document.body, { attributes: true, attributeFilter: ["style"] });
    sync();
    return () => mo.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const el =
      menuRef.current?.querySelector<HTMLButtonElement>(".is-active") ??
      menuRef.current?.querySelector<HTMLButtonElement>("button[role='option']");
    el?.focus();
  }, [open]);

  const enter = (id: string) => {
    safeSet("kit", id);
    location.reload();
  };
  const goHome = () => {
    safeRemove("kit");
    setOpen(false);
    setEntered(false);
  };
  const switchKit = (id: string) => {
    if (id === kit) {
      setOpen(false);
      return;
    }
    enter(id);
  };
  const stepKit = (dir: number) => {
    const i = KITS.findIndex((k) => k.id === kit);
    enter(KITS[(i + dir + KITS.length) % KITS.length].id);
  };
  const setViewport = (m: string) => {
    setVp(m);
    safeSet("shell-vp", m);
  };

  useEffect(() => {
    if (!entered) return;
    const onKey = (event: globalThis.KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const tag = (target?.tagName ?? "").toLowerCase();
      if (tag === "input" || tag === "textarea" || target?.isContentEditable) return;
      if (event.key === "Escape") {
        if (overlay) return;
        if (open) {
          setOpen(false);
          triggerRef.current?.focus();
          return;
        }
        goHome();
      } else if (event.key === "ArrowLeft") {
        stepKit(-1);
      } else if (event.key === "ArrowRight") {
        stepKit(1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [entered, overlay, open, kit]);

  useEffect(() => {
    if (entered) return;
    const thumbs = Array.from(
      document.querySelectorAll<HTMLElement>(".shell-home__thumb"),
    );
    if (thumbs.length === 0) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries)
        (entry.target as HTMLElement).style.setProperty(
          "--s",
          String(entry.contentRect.width / 1280),
        );
    });
    thumbs.forEach((t) => ro.observe(t));
    return () => ro.disconnect();
  }, [entered]);

  const onMenuKeyDown = (event: KeyboardEvent) => {
    const options = Array.from(
      menuRef.current?.querySelectorAll<HTMLButtonElement>('button[role="option"]') ?? [],
    );
    if (options.length === 0) return;
    const index = options.indexOf(document.activeElement as HTMLButtonElement);
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const step = event.key === "ArrowDown" ? 1 : -1;
      options[(index + step + options.length) % options.length].focus();
    } else if (event.key === "Home") {
      event.preventDefault();
      options[0].focus();
    } else if (event.key === "End") {
      event.preventDefault();
      options[options.length - 1].focus();
    }
  };

  return (
    <div className="shell" data-view={entered ? "kit" : "home"} data-vp={vp}>
      {!entered ? (
        <section className="shell-home">
          <header className="shell-home__head">
            <h1 className="shell-home__title">Base UI Theme Kits</h1>
            <p className="shell-home__sub">
              Independent, fully re-skinnable component worlds — pick one to open
              full-screen
            </p>
          </header>
          <div className="shell-home__grid">
            {KITS.map((k, i) => (
              <div key={k.id} className="shell-home__card">
                <span className="shell-home__thumb" aria-hidden="true">
                  <iframe
                    className="shell-home__frame"
                    title=""
                    tabIndex={-1}
                    loading="lazy"
                    src={`?embed=1&kit=${k.id}`}
                    onLoad={(e) =>
                      e.currentTarget
                        .closest(".shell-home__thumb")
                        ?.classList.add("is-loaded")
                    }
                  />
                  <span className="shell-home__tload">{k.label}</span>
                </span>
                <span className="shell-home__meta">
                  <span className="shell-home__idx">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="shell-home__label">{k.label}</span>
                  <span className="shell-home__tag">{k.tag}</span>
                </span>
                <button
                  type="button"
                  className="shell-home__hit"
                  aria-label={`Open ${k.label} — ${k.tag}`}
                  onClick={() => enter(k.id)}
                />
              </div>
            ))}
          </div>
        </section>
      ) : vp === "mobile" ? (
        <div className="shell-stage">
          <div className="shell-phone">
            <iframe
              className="shell-phone__frame"
              title={active.label}
              src={`?embed=1&kit=${kit}`}
            />
          </div>
        </div>
      ) : (
        <Suspense fallback={<div className="shell-boot" />}>
          <Suspense fallback={<KitLoader />}>
            <Active />
          </Suspense>
        </Suspense>
      )}

      <div
        className="shell-switch"
        data-open={open || undefined}
        data-overlay={overlay || undefined}
      >
        <button
          type="button"
          className="shell-switch__scrim"
          aria-label="Close theme menu"
          onClick={() => setOpen(false)}
        />
        <ul
          ref={menuRef}
          className="shell-switch__menu"
          role="listbox"
          aria-label="Switch theme"
          onKeyDown={onMenuKeyDown}
        >
          <li className="shell-switch__help" aria-hidden="true">
            <kbd>←</kbd>
            <kbd>→</kbd> switch theme · <kbd>Esc</kbd> home
          </li>
          {KITS.map((k) => (
            <li key={k.id}>
              <button
                type="button"
                data-kit-id={k.id}
                className={"shell-switch__btn" + (kit === k.id ? " is-active" : "")}
                role="option"
                aria-selected={kit === k.id}
                onClick={() => switchKit(k.id)}
              >
                <span className="shell-switch__label">{k.label}</span>
                <span className="shell-switch__tag">{k.tag}</span>
              </button>
            </li>
          ))}
        </ul>
        <div className="shell-switch__bar">
          <button
            ref={triggerRef}
            type="button"
            className="shell-switch__trigger"
            aria-haspopup="listbox"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span className="shell-switch__label">{active.label}</span>
            <span className="shell-switch__chev" aria-hidden="true">
              ▴
            </span>
          </button>
          <button
            type="button"
            className="shell-switch__device"
            aria-label={
              vp === "mobile" ? "Switch to PC preview" : "Switch to mobile preview"
            }
            aria-pressed={vp === "mobile"}
            onClick={() => setViewport(vp === "pc" ? "mobile" : "pc")}
          >
            <DeviceIcon mode={vp} />
          </button>
        </div>
      </div>
    </div>
  );
}
