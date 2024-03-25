import {
  Tooltip as TooltipMantine,
  TooltipProps as TooltipPropsMantine,
} from "@mantine/core";
import { ReactNode } from "react";
interface TooltipProps extends TooltipPropsMantine {
  children: ReactNode;
}
export function Tooltip(props: TooltipProps) {
  return (
    <TooltipMantine {...props} withArrow={true}>
      {props.children}
    </TooltipMantine>
  );
}
