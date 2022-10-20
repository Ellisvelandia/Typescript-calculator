import React from "react";
import clsx from "clsx";

export type PadProps = {
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
};

export default function pad({ className, ...props }: PadProps) {
  return (
    <button
      className={clsx(
        "text-4xl rounded-full grid place-content-center w-full h-full p-8",
        className
      )}
      {...props}
    />
  );
}
