import {
    Anchor as AnchorMantine,
    AnchorProps as AnchorMantineProps,
} from "@mantine/core";
interface AnchorProps extends AnchorMantineProps {}
export  function Anchor(
  props: AnchorProps & React.ComponentPropsWithoutRef<"a">
) {
  return <AnchorMantine  {...props} />;
}
