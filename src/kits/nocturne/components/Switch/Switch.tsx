import { useId } from "react";
import { Switch as BaseSwitch } from "@base-ui/react/switch";
import { cx } from "../cx";
import type { ComponentPropsWithoutRef } from "react";
import { Bloom, MotifDefs } from "../bloom";
import "./Switch.css";

export interface SwitchProps extends ComponentPropsWithoutRef<typeof BaseSwitch.Root> {}

export function Switch({ className, ...props }: SwitchProps) {
  const id = useId();
  return (
    <BaseSwitch.Root className={cx("nocturne-switch", className)} {...props}>
      <svg className="nocturne-switch__scene" viewBox="0 0 64 36" aria-hidden="true" focusable="false">
        <MotifDefs id={`${id}s`} />
        <path className="nocturne-switch__branch" d="M6 28 C 20 28.5, 34 26, 44 22 C 45.8 21.3, 47 20.7, 48 20" />
        <g transform="translate(13,27.6) rotate(-40) scale(.86)">
          <path
            d="M0 0 C 3.4 -3.6, 9 -4.2, 13 -1.2 C 9 2.4, 3.4 2.6, 0 0 Z"
            fill={`url(#${id}s-leaf)`}
            stroke="var(--nocturne-gilt-dim)"
            strokeWidth="0.5"
          />
        </g>
      </svg>
      <BaseSwitch.Thumb className="nocturne-switch__thumb">
        <svg className="nocturne-switch__bloom" viewBox="-17 -17 34 34" aria-hidden="true" focusable="false">
          <MotifDefs id={`${id}b`} />
          <g transform="rotate(42) scale(1.45)">
            <Bloom defs={`${id}b`} r={10} coreR={2.9} coreDots={3} sepals bud mode="state" />
          </g>
        </svg>
      </BaseSwitch.Thumb>
    </BaseSwitch.Root>
  );
}
