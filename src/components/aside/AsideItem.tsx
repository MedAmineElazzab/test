import { clsx,Tooltip } from "@mantine/core";
import Link from "next/link";
import { ReactNode } from "react";
interface AsideItemProps {
  active?: boolean;
  href: string;
  name: string;
  icon: ReactNode;
}
export function AsideItem({ href, name, active, icon: Icon }: AsideItemProps) {
  const classNames = clsx(
    "w-12 h-12 flex rounded justify-center items-center text-white/70 ",
    "hover:bg-white/10 hover:text-white",
    {
      "bg-white/10 !text-white": active === true,
    }
  );
  return (
    <Tooltip label={name} withArrow arrowRadius={20} position="right">
      <Link href={href} className={classNames}>
        {Icon}
      </Link>
    </Tooltip>
  );
}
