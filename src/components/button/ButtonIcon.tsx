import { ActionIcon, ActionIconProps } from "@mantine/core";
interface ButtonIconProps
  extends ActionIconProps,
    React.ComponentPropsWithoutRef<"button"> {
  color?: string;
}
export function ButtonIcon(props: ButtonIconProps) {
  return <ActionIcon {...props} />;
}
