import { VerifiedIcon } from "@/components";
import { FullPath } from "@/lib";
import {
  Avatar as AvatarMantine,
  AvatarProps as AvatarMantineProps,
  clsx,
} from "@mantine/core";
import { ReactNode } from "react";
interface AvatarProps extends AvatarMantineProps {
  color?: "primary";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "3xl" | "5xl";
  children?: ReactNode;
  src?: string;
  verified?: boolean;
  radius?: "xs" | "sm" | "md" | "lg" | "xl" | "full" | string;
  withBorder?: boolean;
  withShadow?: boolean;
}

export function Avatar({
  ...props
}: AvatarProps & React.ComponentPropsWithoutRef<"div">) {
  const classNames = clsx("!min-w-6 relative ", {
    "w-24 h-24": props.size === "3xl",
    "w-8 h-8": props.size === "md",
    "w-6 h-6": props.size === "xs",
    "w-10 h-10": props.size === "lg",
    "w-16 h-16": props.size === "xl",
    "w-40 h-40": props.size === "5xl",
    "rounded-full": props.radius === "full",
    "shadow-md": props.withShadow,
  });

  const placeholderImageClassnames = clsx("bg-inherit text-current", {
    "!bg-primary-light !text-primary-normal": props.color === "primary",
    "border-4 border-white": props.withBorder,
    "rounded-full": props.radius === "full",
    "text-2xl": props.size === "3xl",
    "text-sm": props.size === "md" || props.size === "lg",
    "text-xs": props.size === "xs",
    "text-3xl": props.size === "5xl",
    "text-base": props.size === "xl",
  });

  return (
    <div className="relative Avatar-wrap w-fit uppercase">
      <AvatarMantine
        {...props}
        size={props.size}
        className={classNames}
        classNames={{
          placeholder: placeholderImageClassnames,
          image: placeholderImageClassnames,
        }}
        src={props.src ? FullPath(props.src) : null}
      >
        {props.children}
      </AvatarMantine>
      {props.verified && (
        <div className="absolute -bottom-1 -right-1">
          <VerifiedIcon />
        </div>
      )}
    </div>
  );
}