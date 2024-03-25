import {
  Indicator as IndicatorMantine,
  IndicatorProps as IndicatorMantineProps,
} from "@mantine/core";
export function Indicator(props: IndicatorMantineProps) {
  return (
    <IndicatorMantine
      {...props}
      classNames={{
        indicator: "w-5 h-5 text-2xs font-bold",
      }}
    />
  );
}
