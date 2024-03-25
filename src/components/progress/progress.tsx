import {
  Progress as ProgressMantine,
  ProgressProps as ProgressPropsMantine,
  clsx,
} from "@mantine/core";
interface ProgressProps extends Omit<ProgressPropsMantine, "color"> {
  color: "primary" | "warning" | "success" | "danger";
}
export function Progress(props: ProgressProps) {
  const classNames = clsx(props.className, {
    "text-primary-normal": props.color === "primary",
    "text-green-500": props.color === "success",
    "text-yellow-500": props.color === "warning",
    "text-red-500": props.color === "danger",
  });
  return (
    <ProgressMantine
      {...props}
      className={classNames}
      styles={{
        bar: {
          backgroundColor: "currentcolor !important",
        },
      }}
    />
  );
}
