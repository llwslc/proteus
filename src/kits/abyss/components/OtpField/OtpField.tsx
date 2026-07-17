import { OTPFieldPreview as BaseOtp } from "@base-ui/react/otp-field";
import { cx } from "../cx";
import { useId } from "react";
import "./OtpField.css";

export interface OtpFieldProps extends Omit<
  React.ComponentProps<typeof BaseOtp.Root>,
  "children"
> {
  splitAt?: number;
  label?: string;
}

export function OtpField({
  length = 6,
  splitAt,
  label,
  className,
  ...props
}: OtpFieldProps) {
  const id = useId();
  return (
    <BaseOtp.Root
      role="group"
      aria-label={label}
      id={id}
      length={length}
      className={cx("abyss-otp", className)}
      {...props}
    >
      {Array.from({ length }, (_, i) => (
        <span className="abyss-otp__slot-wrap" key={i}>
          <span className="abyss-otp__cell-glow">
            <span className="abyss-otp__cell abyss-frame">
              <span className="abyss-otp__well" aria-hidden="true" />
              <BaseOtp.Input className="abyss-otp__slot" />
              <span className="abyss-otp__caret" aria-hidden="true" />
            </span>
          </span>
          {splitAt != null && i + 1 === splitAt && i + 1 < length ? (
            <span className="abyss-otp__divider" aria-hidden="true" />
          ) : null}
        </span>
      ))}
    </BaseOtp.Root>
  );
}
