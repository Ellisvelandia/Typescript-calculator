import clsx from "clsx";
import Pad, { PadProps } from "./Pad";

export default function PadLightGray({
  selected,
  className,
  ...props
}: PadProps & {
  selected?: boolean;
}) {
  return (
    <Pad
      className={clsx(
        selected ? "text-black bg-gray-300" : "text-black bg-gray-300",
        className
      )}
      {...props}
    />
  );
}
