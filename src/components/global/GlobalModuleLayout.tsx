import { Meta } from "@/@types";
import { SIBLINGS } from "@/common/constants";
import {
  Breadcrumbs,
  Divider,
  FiltersHeaderProps,
  HeaderFilters,
  BreadcrumbsItem,
  NoResultsFound,
  Pagination,
} from "@/components";
import { ModulesTitles } from "@/enum";
import Head from "next/head";
import { useRouter } from "next/router";
import { ReactNode } from "react";
interface GlobalModuleLayoutProps {
  moduleType: ModulesTitles;
  breadcrumbsItems: BreadcrumbsItem[];
  dataLength: number;
  children: ReactNode;
  meta: Meta;
  filters: FiltersHeaderProps;
}
export function GlobalModuleLayout({
  breadcrumbsItems,
  moduleType,
  dataLength,
  children,
  meta,
  filters,
}: GlobalModuleLayoutProps) {
  const { back } = useRouter();
  return (
    <>
      <Head>
        <title>
          {moduleType &&
            ` Meducate ${moduleType} • Explorez notre base de connaissances médicales`}
        </title>
      </Head>
      <div className="sticky z-10 top-0 px-6 py-4 bg-gray-100">
        <Breadcrumbs items={breadcrumbsItems} />
      </div>
      <div className="relative w-full max-w-container left-1/2 -translate-x-1/2">
        <div className="sticky z-10 top-52p px-6 rounded-lg flex flex-col">
          <HeaderFilters {...filters} />
        </div>

        {dataLength === 0 ? (
          <NoResultsFound
            action={() => {
              back();
            }}
            title="Aucun résultat trouvé"
            actionMessage="Retour"
            description="Essayez de mettre à jour votre terme de recherche ou vos filtres"
          />
        ) : (
          <div className="data-cards-container grid grid-cols-4 mt-4 min-h-700 gap-4 px-6 mb-8">
            {children}
          </div>
        )}

        {meta && (
          <div className="flex flex-col gap-5 mb-5 px-6">
            <Divider
              className="opacity-30 w-full h-0.5"
              orientation="horizontal"
            />
            <div>
              <Pagination
                initialPage={meta.currentPage}
                siblings={SIBLINGS}
                total={meta.totalPages}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
