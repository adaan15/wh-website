"use client";

import { ComponentProps } from "react";
// import { experimental_useFormStatus as FormStatus } from "react-dom";
// @ts-expect-error
import { useFormStatus } from "react-dom";

type FormSubmitButtonProps = {
  children: React.ReactNode;
  className?: string;
} & ComponentProps<"button">;

export default function FormSubmitButton({
  children,
  className,
  ...props
}: FormSubmitButtonProps) {
  const status = useFormStatus();

  return (
    <button
      {...props}
      className={`btn-primary btn ${className}`}
      type="submit"
      disabled={status.pending}
    >
      {status.pending && <span className="loading loading-spinner" />}
      {children}
    </button>
  );
}
