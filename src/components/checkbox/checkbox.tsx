import {
  Checkbox as CheckboxMantine,
  CheckboxProps,
  clsx,
} from "@mantine/core";
interface CheckBoxOptions extends React.ComponentPropsWithoutRef<"input"> {
  isLoading?: boolean;
  color?: "secondary";
  Size?: "md";
}
export function Checkbox({ ...options }: CheckBoxOptions & CheckboxProps) {
  const classNames = clsx({
    "text-gray-500": options.color === "secondary",
  });
  return (
    <CheckboxMantine
      className={classNames}
      styles={{
        label: {
          color: "rgb(55 65 81)",
        },
        icon: {
          color: "#0049e0 !important",
        },
        ...options.styles,
      }}
      size={options.Size}
      sx={{
        input: {
          backgroundColor: "transparent",
          borderColor: "#0049e0 !important",
        },
        ["input:checked"]: {
          borderColor: "#0049e0",
          backgroundColor: "#0049e020 !important",
        },
        [".mantine-Checkbox-labelWrapper"]: {
          display: "block !important",
        },
        ...options.sx,
      }}
      {...options}
    />
  );
}
