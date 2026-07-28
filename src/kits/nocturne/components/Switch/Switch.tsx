import { useId } from "react";
import { Switch as BaseSwitch } from "@base-ui/react/switch";
import type { ComponentPropsWithoutRef } from "react";
import { cx } from "../cx";
import "./Switch.css";

export interface SwitchProps extends ComponentPropsWithoutRef<typeof BaseSwitch.Root> {}

const PETALS = [0, 72, 144, 216, 288];
const SEPALS = [36, 108, 180, 252, 324];

export function Switch({ className, ...props }: SwitchProps) {
  const uid = useId();
  const budId = `${uid}bud`;
  const petId = `${uid}pet`;
  const sepId = `${uid}sep`;
  return (
    <BaseSwitch.Root className={cx("nocturne-switch", className)} {...props}>
      <svg
        className="nocturne-switch__branch"
        viewBox="0 0 64 32"
        aria-hidden="true"
        focusable="false"
      >
        <path
          className="nocturne-switch__stem"
          d="M3 22c11 0 19-.9 27-2.8 4-1 8-2.4 12-4"
        />
        <path
          className="nocturne-switch__leaf"
          d="M12 20.2c2.2-3.4 6.8-4.2 10-1.8-2.8 3-7.4 3.4-10 1.8Z"
        />
      </svg>
      <BaseSwitch.Thumb className="nocturne-switch__thumb">
        <svg
          className="nocturne-switch__bloom"
          viewBox="-14 -14 28 28"
          aria-hidden="true"
          focusable="false"
        >
          <defs>
            <linearGradient id={budId} x1="0" y1="1" x2="0" y2="0">
              <stop offset="0" stopColor="#8a2a48" />
              <stop offset="1" stopColor="#55152b" />
            </linearGradient>
            <linearGradient id={petId} x1="0" y1="1" x2="0" y2="0">
              <stop offset="0" stopColor="#a63a5c" />
              <stop offset="1" stopColor="#6b1e38" />
            </linearGradient>
            <linearGradient id={sepId} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#6e5a2e" />
              <stop offset="1" stopColor="#3e3118" />
            </linearGradient>
          </defs>
          <g className="nocturne-switch__sepals">
            {SEPALS.map((a) => (
              <g key={a} transform={`rotate(${a})`}>
                <path fill={`url(#${sepId})`} d="M0 2C-2-3-2-8 0-10 2-8 2-3 0 2Z" />
              </g>
            ))}
          </g>
          <g>
            {PETALS.map((a) => (
              <g key={a} transform={`rotate(${a})`}>
                <path
                  className="nocturne-switch__petal"
                  fill={`url(#${petId})`}
                  d="M0 0C-3-3-3.2-7.6 0-10 3.2-7.6 3-3 0 0Z"
                />
              </g>
            ))}
          </g>
          <path
            className="nocturne-switch__bud"
            fill={`url(#${budId})`}
            d="M0 2C-3.4-1.5-2.8-8 0-10 2.8-8 3.4-1.5 0 2Z"
          />
          <path className="nocturne-switch__fold" d="M0 1C-1.2-3-1-7 0-9M0 1C1.2-3 1-7 0-9" />
          <g className="nocturne-switch__eye">
            <circle className="nocturne-switch__iris" r="2.9" />
            <g className="nocturne-switch__seeds">
              <circle cy="-1.6" r="0.75" />
              <circle cx="1.5" cy="0.6" r="0.75" />
              <circle cx="-1.5" cy="0.6" r="0.75" />
            </g>
          </g>
        </svg>
      </BaseSwitch.Thumb>
    </BaseSwitch.Root>
  );
}
