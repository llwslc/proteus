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
      className={cx("brass-otp", className)}
      {...props}
    >
      <div className="brass-otp__cells">
        {Array.from({ length }, (_, i) => (
          <Fragment key={i}>
            <div className="brass-plate brass-otp__cell">
              <BaseOtp.Input className="brass-otp__input" />
            </div>
            {splitAt != null && i + 1 === splitAt && i + 1 < length ? (
              <span className="brass-otp__divider" aria-hidden="true" />
            ) : null}
          </Fragment>
        ))}
      </div>
    </BaseOtp.Root>
  );
}
