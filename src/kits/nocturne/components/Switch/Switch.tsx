import { Switch as BaseSwitch } from "@base-ui/react/switch";
import { cx } from "../cx";
import type { ComponentPropsWithoutRef } from "react";
import "./Switch.css";

const SEPALS = [36, 108, 180, 252, 324];
const PETALS = [0, 72, 144, 216, 288];

export interface SwitchProps extends ComponentPropsWithoutRef<typeof BaseSwitch.Root> {}

export function Switch({ className, ...props }: SwitchProps) {
  return (
    <BaseSwitch.Root
      className={cx("nocturne-switch", "nocturne-ring", className)}
      {...props}
    >
      <span className="nocturne-switch__bloom" aria-hidden="true">
        <svg viewBox="0 0 64 38">
          <path
            className="nocturne-switch__branch"
            d="M5 27 C 14 27,21.5 26.2,28 24.2 C 31 23.3,34 22.1,36.4 20.6"
          />
          <g
            className="nocturne-switch__leaf"
            transform="translate(12.6,26.6) rotate(-40) scale(.86)"
          >
            <path d="M0 0 C 3.4 -3.6,9 -4.2,13 -1.2 C 9 2.4,3.4 2.6,0 0 Z" />
          </g>
          <g transform="translate(38.8,17.2) rotate(42) scale(1.45)">
            <g className="nocturne-switch__sepals">
              {SEPALS.map((a) => (
                <g key={a} transform={`rotate(${a})`}>
                  <path d="M0 2 C -2 -3,-2 -8,0 -10 C 2 -8,2 -3,0 2 Z" />
                </g>
              ))}
            </g>
            <g>
              {PETALS.map((a) => (
                <g key={a} transform={`rotate(${a})`}>
                  <path
                    className="nocturne-switch__pet"
                    d="M0 0 C -3 -3,-3.2 -7.6,0 -10 C 3.2 -7.6,3 -3,0 0 Z"
                  />
                </g>
              ))}
            </g>
            <path
              className="nocturne-switch__bud"
              d="M0 2 C -3.4 -1.5,-2.8 -8,0 -10 C 2.8 -8,3.4 -1.5,0 2 Z"
            />
            <path
              className="nocturne-switch__fold"
              d="M0 1 C -1.2 -3,-1 -7,0 -9 M0 1 C 1.2 -3,1 -7,0 -9"
            />
            <g className="nocturne-switch__eye">
              <circle r="2.9" className="nocturne-switch__eye-disc" />
              <g className="nocturne-switch__eye-dots">
                <circle cy="-1.6" r=".75" />
                <circle cx="1.5" cy=".6" r=".75" />
                <circle cx="-1.5" cy=".6" r=".75" />
              </g>
            </g>
          </g>
        </svg>
      </span>
    </BaseSwitch.Root>
  );
}
