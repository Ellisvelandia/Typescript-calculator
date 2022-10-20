import clsx from "clsx";
import Pad, { PadProps } from "./Pad";

export default function PadOrange({
  selected,
  className,
  ...props
}: PadProps & {
  selected?: boolean;
}) {
  return (
    <Pad
      className={clsx(
        selected ? "text-white bg-orange-500" : "text-white bg-orange-500",
        className
      )}
      {...props}
    />
  );
}
