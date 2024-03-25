import { MHomeIcon } from "@/_v1/icons";
import IconHome from "@/_v1/icons/sources/IconHome";
import RightArrow from "@/_v1/icons/sources/RightArrow";
import Seperator from "@/_v1/icons/sources/Seperator";
import { Breadcrumbs } from "@mantine/core";
import Link from "next/link";
import React from "react";

interface BreadcrumbProps {
  items: any[];
}

const Breadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <div className="flex items-center gap-[10px] py-[15px] px-[3px]  sticky top-[71.2px] left-0 z-[100] bg-[#F3F4F8] ">
      <Link href="/">
        <IconHome className="mt-[-3px]" />
      </Link>
      {items?.map((e: any, _: number) => (
        <>
          <RightArrow />
          <Link
            style={{ fontFamily: "Source Sans 3, sans-serif, system-ui" }}
            className={`
            capitalize-first 
              text-[14px]  leading-[21px]
              ${
                _ === items?.length - 1
                  ? " text-[#101828]   font-[600] cursor-default "
                  : "text-[#98A2B3] hover:underline cursor-pointer "
              }
            `}
            href={e?.path}
          >
            {e?.name}
          </Link>
        </>
      ))}
    </div>
  );
};

export default Breadcrumb;
