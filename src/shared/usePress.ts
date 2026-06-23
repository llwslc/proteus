// Latch a press to a minimum-visible window so a quick (sub-frame) tap still animates:
// `:active` alone never commits the pressed style when a press is shorter than one paint.
import { useEffect, useRef, useState } from "react";
import type { ComponentPropsWithoutRef, PointerEvent as ReactPointerEvent } from "react";

const MIN_PRESS_MS = 120;
type ButtonDomProps = ComponentPropsWithoutRef<"button">;

export function usePress(
  props: ButtonDomProps = {},
): ButtonDomProps & { "data-pressed"?: "" } {
  const [pressed, setPressed] = useState(false);
  const held = useRef(false);
  const locked = useRef(false);
  const timer = useRef<number>();

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const settle = () => {
    if (!held.current && !locked.current) setPressed(false);
  };

  const onPointerDown = (e: ReactPointerEvent<HTMLButtonElement>) => {
    held.current = true;
    locked.current = true;
    setPressed(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      locked.current = false;
      settle();
    }, MIN_PRESS_MS);
    props.onPointerDown?.(e);
  };

  const release =
    (next?: ButtonDomProps["onPointerUp"]) =>
    (e: ReactPointerEvent<HTMLButtonElement>) => {
      held.current = false;
      settle();
      next?.(e);
    };

  return {
    ...props,
    "data-pressed": pressed ? "" : undefined,
    onPointerDown,
    onPointerUp: release(props.onPointerUp),
    onPointerCancel: release(props.onPointerCancel),
    onPointerLeave: release(props.onPointerLeave),
  };
}
