import { cx } from "../cx";
import { Avatar as BaseAvatar } from "@base-ui/react/avatar";
import type { CSSProperties, ReactNode } from "react";
import "./Avatar.css";

export type AvatarStatus = "online" | "busy" | "away" | "offline";

export interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: ReactNode;
  size?: number;
  status?: AvatarStatus;
  className?: string;
}

export function Avatar({
  src,
  alt,
  fallback,
  size = 46,
  status,
  className,
}: AvatarProps) {
  return (
    <span
      className={cx("sumi-avatar", className)}
      style={{ "--sumi-avatar-size": `${size}px` } as CSSProperties}
    >
      <BaseAvatar.Root className="sumi-avatar__root sumi-frame">
        {src ? (
          <BaseAvatar.Image src={src} alt={alt} className="sumi-avatar__img" />
        ) : null}
        <BaseAvatar.Fallback className="sumi-avatar__fallback">
          {fallback}
        </BaseAvatar.Fallback>
      </BaseAvatar.Root>
      {status ? (
        <span
          className={`sumi-avatar__status sumi-avatar__status--${status}`}
          data-status={status}
          title={status}
        >
          <span className="sumi-avatar__moon" aria-hidden>
            <span className="sumi-avatar__moon-shadow" />
          </span>
        </span>
      ) : null}
    </span>
  );
}
