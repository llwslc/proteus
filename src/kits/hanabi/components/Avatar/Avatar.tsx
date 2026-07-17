import { Avatar as BaseAvatar } from "@base-ui/react/avatar";
import { cx } from "../cx";
import "./Avatar.css";

type Size = "sm" | "md" | "lg";
type Status = "online" | "busy" | "away" | "offline";

const STATUS_LABEL: Record<Status, string> = {
  online: "Online",
  busy: "Busy",
  away: "Away",
  offline: "Offline",
};

export interface AvatarProps extends React.ComponentProps<typeof BaseAvatar.Root> {
  size?: Size;
  status?: Status;
}

export function Avatar({
  size = "md",
  status,
  className,
  children,
  ...props
}: AvatarProps) {
  return (
    <span className={cx("hanabi-avatar", `hanabi-avatar--${size}`)}>
      <BaseAvatar.Root className={cx("hanabi-avatar__frame", className)} {...props}>
        {children}
      </BaseAvatar.Root>
      {status ? (
        <span
          className={cx("hanabi-avatar__status", `hanabi-avatar__status--${status}`)}
          role="img"
          aria-label={STATUS_LABEL[status]}
        />
      ) : null}
    </span>
  );
}

export function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof BaseAvatar.Image>) {
  return <BaseAvatar.Image className={cx("hanabi-avatar__img", className)} {...props} />;
}

export function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof BaseAvatar.Fallback>) {
  return (
    <BaseAvatar.Fallback
      className={cx("hanabi-avatar__fallback", className)}
      {...props}
    />
  );
}
