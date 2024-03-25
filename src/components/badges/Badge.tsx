import {
  Badge as MantineBadge,
  BadgeProps as MantineBadgeProps,
  clsx,
} from "@mantine/core";
import { ReactNode } from "react";
import { Tooltip } from "..";

interface BadgeProps extends MantineBadgeProps {
  size?: "sm" | "md" | "lg" | "xl";
  color?: "secondary" | "primary" | "orange";
  Icon?: JSX.Element;
  children: ReactNode;
  variant?: "dot" | "filled" | "outline";
  /**
   * If true, the badge will have a maximum width.
   */
  withMaxWidth?: boolean;
  withHover?: boolean;
  clickable?: true;
  withTooltip?: true;
}

export function Badge({
  ...props
}: BadgeProps & React.ComponentPropsWithoutRef<"div">) {
  const color = props.color;
  const classNames = clsx({
    [props.className || ""]: true,
    "text-sm font-[500] h-[28px]": props?.size === "lg",
    "text-xs font-[500] h-[22px]": props?.size === "md",
    //default
    "normal-case tracking-normal transition-colors": true,
    "cursor-pointer": props.clickable === true,
    //@primary
    "bg-[#E6EDFC] text-[#00349F]":
      color === "primary" && props.variant === "filled", //filled
    "hover:bg-primary-normal hover:text-white":
      color === "primary" &&
      props.variant === "filled" &&
      props.withHover === true, //filled with hover
    "bg-primary-normal/20 text-primary-normal before:bg-primary-normal/80 border-primary-normal/0":
      color === "primary" && props.variant === "dot", //dot
    "bg-primary-normal/0  before:bg-primary-normal/50 text-primary-normal  border-primary-normal/50":
      color === "primary" && props.variant === "outline", //outline,
    "bg-primary-normal/0  before:bg-primary-normal/50 text-primary-normal  border-primary-normal/50 hover:bg-primary-normal/10":
      color === "primary" &&
      props.variant === "outline" &&
      props.withHover === true, //outline with hover:
    //@secondary
    "bg-gray-100 text-gray-700 ":
      color === "secondary" && props.variant === "filled", //filled
    "hover:bg-gray-300":
      color === "secondary" &&
      props.variant === "filled" &&
      props.withHover === true, //filled with hover
    "bg-gray-100 text-gray-700 before:bg-gray-500 border-gray-200 ":
      color === "secondary" && props.variant === "dot", //dot
    "bg-transparent text-gray-500 before:bg-gray-500 border-gray-300":
      color === "secondary" && props.variant === "outline", //outline
    "hover:border-gray-500":
      color === "secondary" &&
      props.variant === "outline" &&
      props.withHover === true, //outline with hover
    "max-w-40": props.withMaxWidth === true,
    //@orange
    "bg-[#FFFAEB] text-[#F79009]":
      color === "orange" && props.variant === "filled", //filled
    // "hover:bg-primary-normal hover:text-white":
    //   color === "orange" &&
    //   props.variant === "filled" &&
    //   props.withHover === true, //filled with hover
    // "bg-primary-normal/20 text-primary-normal before:bg-primary-normal/80 border-primary-normal/0":
    //   color === "orange" && props.variant === "dot", //dot
    
  });
  if (props.withTooltip) {
    return (
      <Tooltip label={props.children}>
        <MantineBadge
          {...props}
          variant={props.variant || "filled"}
          size={props?.size}
          className={classNames}
        >
          {props.children}
        </MantineBadge>
      </Tooltip>
    );
  }
  return (
    <MantineBadge
      {...props}
      variant={props.variant || "filled"}
      size={props?.size}
      className={classNames}
    >
      {props.children}
    </MantineBadge>
  );
}
