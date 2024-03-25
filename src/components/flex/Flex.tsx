import { FlexProps as FLexMantineProps, Flex as FlexMantine } from "@mantine/core"

interface FlexProps extends FLexMantineProps {}
export function Flex(props: FlexProps) {
  return (
    <FlexMantine {...props} />
  )
}
