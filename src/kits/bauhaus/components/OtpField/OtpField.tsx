import { OTPFieldPreview as BaseOtp } from "@base-ui/react/otp-field";
import { cx } from "../cx";
import { Fragment, useId } from "react";
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
      className={cx("bauhaus-otp", className)}
      {...props}
    >
      {Array.from({ length }, (_, i) => (
        <Fragment key={i}>
          {splitAt != null && i === splitAt ? (
            <span className="bauhaus-otp__divider" aria-hidden="true" />
          ) : null}
          <BaseOtp.Input className="bauhaus-surface bauhaus-otp__cell" />
        </Fragment>
      ))}
    </BaseOtp.Root>
  );
}
