import { MHomeIcon } from "@/_v1/icons";
import Seperator from "@/_v1/icons/sources/Seperator";
import { Breadcrumbs } from "@mantine/core";
import Link from "next/link";
import React from "react";
import { Input } from "../Inputs";

interface BreadcrumbItem {
  title: string;
  href: string;
}

interface BreadcrumbProps {
  items: React.JSX.Element[];
  separator?: React.ReactNode;
}

export default function Breadcrumb({ separator, items }: BreadcrumbProps) {
  return (
    <div className="flex px-4 items-center gap-2 py-4 text-primary-normal ">
      <Link href="/">
        <MHomeIcon className="opacity-60" />
      </Link>
      <Seperator className="opacity-60" />
      <Breadcrumbs
        styles={{
          root: {
            marginTop: "0 !important",
          },
        }}
        separator={<Seperator className="text-primary-normal" />}
      >
        {items}
      </Breadcrumbs>
     
    </div>
  );
}
