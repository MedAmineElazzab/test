import { Box as BoxMantine, BoxProps as BoxMantineProps } from "@mantine/core";
export interface BoxProps extends BoxMantineProps , React.ComponentPropsWithoutRef<"div"> {}

export function Box(props: BoxProps) {
  return <BoxMantine  {...props} />;
}
