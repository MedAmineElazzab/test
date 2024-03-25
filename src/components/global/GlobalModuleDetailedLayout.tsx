import { Breadcrumbs } from "@/components";
import { ModulesTitles } from "@/enum";
import Head from "next/head";
import { ReactNode } from "react";

interface GlobalModuleDetailedLayoutProps {
  moduleType: ModulesTitles;
  breadcrumbsItems: any;
  rightSection: ReactNode;
  leftSection: ReactNode;
  title: string;
}
export function GlobalModuleDetailedLayout({
  breadcrumbsItems,
  rightSection,
  leftSection,
  moduleType,
  title,
}: GlobalModuleDetailedLayoutProps) {
  return (
    <>
      <Head>
        <title>
          {moduleType &&
            title &&
            `${ModulesTitles.EVENTS} • ${title} • Meducate ${moduleType}`}
        </title>
      </Head>
      <div className="sticky z-10 top-0 px-6 py-4 bg-gray-100">
        <Breadcrumbs items={breadcrumbsItems} />
      </div>

      <div className="relative w-full max-w-container left-1/2 -translate-x-1/2 px-6">
        <div className="relative Note-container w-full min-h-1000 mb-5 flex gap-4">
          <div className="w-container-left-section">
            <div className="w-full min-h-1000 flex flex-col pb-5 gap-4">
              {leftSection}
            </div>
          </div>
          <div className="relative h-auto">
            <div className="w-300 overflow-y-auto transition-all">
              <div className="sticky-container w-full flex flex-col gap-3">
                {rightSection}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
