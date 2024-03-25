import { Breadcrumbs, Flex, BreadcrumbsItem } from "@/components";
import { ModulesTitles } from "@/enum";
import Head from "next/head";
import { ReactNode } from "react";

interface GlobalModuleDetailedLayoutV2Props {
  moduleType: ModulesTitles;
  breadcrumbsItems: BreadcrumbsItem[];
  children: ReactNode;
  title: string;
}
export function GlobalModuleDetailedLayoutV2({
  breadcrumbsItems,
  children,
  moduleType,
  title,
}: GlobalModuleDetailedLayoutV2Props) {
  return (
    <>
      <Head>
        <title>
          {moduleType &&
            title &&
            `${ModulesTitles.EXPERTS} • ${title} • Meducate ${moduleType}`}
        </title>
      </Head>
      <div className="sticky z-10 top-0 px-6 py-4 bg-gray-100">
        <Breadcrumbs items={breadcrumbsItems} />
      </div>
      <div className="relative w-full mt-5 max-w-container left-1/2 -translate-x-1/2 px-6">
        <Flex direction={"column"} className="relative w-full mb-5 gap-4">
          {children}
        </Flex>
      </div>
    </>
  );
}