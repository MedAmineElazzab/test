import { clsx } from "@mantine/core";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { ReactNode } from "react";

interface LinkProps extends NextLinkProps {
  children: ReactNode;
  className?: string;
}

export function Link(props: LinkProps) {
  const classNames = clsx(props.className, "hover:underline");

  return (
    <NextLink {...props} passHref legacyBehavior>
      <a className={classNames}>{props.children}</a>
    </NextLink>
  );
}
