import {
  Divider as DividerMantine,
  DividerProps as DividerMantineProps,
} from "@mantine/core";
interface DividerProps extends DividerMantineProps {
  centered?: boolean;
  fullwidth?: boolean | string;
}
export function Divider(props: DividerProps) {
  return (
    <div className="flex items-center justify-center">
      <DividerMantine {...props} w={props.fullwidth ? "100%" : props.w} />
    </div>
  );
}
