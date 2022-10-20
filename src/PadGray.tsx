import Pad, { PadProps } from "./Pad";
import clsx from "clsx";

export default function PadGray({ className, ...props }: PadProps) {
  return (
    <Pad className={clsx("text-white bg-gray-700", className)} {...props} />
  );
}
