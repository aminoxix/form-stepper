import { ReactNode } from "react";

type FormWrapperProps = {
  children: ReactNode;
  className?: string;
};

export function FormWrapper({ className, children }: FormWrapperProps) {
  return <div className={`w-full ${className}`}>{children}</div>;
}
