import { Meta } from "@/@types";
import { api, setContext } from "@/api";
import { SIBLINGS } from "@/common/constants";
import {
  Breadcrumbs,
  Divider,
  HeaderFilters,
  ModuleCard,
  NoResultsFound,
  Pagination,
} from "@/components";
import { ModulesPathnames, ModulesTitles } from "@/enum";
import { Module as ServerModule } from "@/services/types";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

interface ModulesData {
  data: ServerModule[];
  meta: Meta;
}

interface IndexProps {
  Modules: ModulesData;
}

export default function Modules({ Modules }: IndexProps) {
  const { back } = useRouter();
  const items = [
    { title: ModulesTitles.MODULES, href: ModulesPathnames.MODULE },
  ];
  return (
    <>
      <div className="sticky z-10 top-0 px-6 py-4 bg-gray-100">
        <Breadcrumbs items={items} />
      </div>
      <div className="relative w-full max-w-container left-1/2 -translate-x-1/2">
        <div className="sticky z-10 top-52p px-6 rounded-lg flex flex-col">
          <HeaderFilters
            num={4}
            withCategories
            withKeywords
            withPathologies
            withSpecialities
          />
        </div>

        {Modules.data.length === 0 ? (
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
            {Modules.data.map((moduleElement) => (
              <ModuleCard
                categoryOnModule={moduleElement.CategoryOnModule}
                specialityOnModule={moduleElement.SpecialityOnModule}
                diseaseOnModule={moduleElement.DiseaseOnModule}
                modulePartner={moduleElement.ModulePartner}
                {...moduleElement}
                key={moduleElement.slug}
              />
            ))}
          </div>
        )}

        {Modules.meta && (
          <div className="flex flex-col gap-5 mb-5 px-6">
            <Divider
              className="opacity-30 w-full h-0.5"
              orientation="horizontal"
            />
            <div>
              <Pagination
                initialPage={Modules.meta.currentPage}
                siblings={SIBLINGS}
                total={Modules.meta.totalPages}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  setContext(context);
  const { query } = context;
  const page = query?.page || 1;
  const perPage = query?.perPage || 12;
  const sortBy = query?.sortBy || "id";
  const sortOrder = query?.sortOrder || "desc";
  const categoryId = query?.category || undefined;
  const specialityId = query?.speciality || undefined;
  const pathologyId = Number(query?.pathology) || undefined;
  const professionId = Number(query?.profil) || undefined;
  const search = query?.keyWords || undefined;
  const date = query?.date || undefined;
  const diseaseId = query?.disease || undefined;

  try {
    const { data } = await api.get<{ items: ServerModule[]; meta: Meta }>(
      `/module`,
      {
        params: {
          page,
          perPage,
          sortBy,
          sortOrder,
          categoryId,
          specialityId,
          pathologyId,
          search,
          createdAt: date,
          professionId,
          diseaseId,
        },
      }
    );

    return {
      props: {
        Modules: {
          data: data.items,
          meta: data.meta,
        },
      },
    };
  } catch (error) {
    return {
      props: {
        Modules: {
          data: [],
          meta: {},
        },
      },
    };
  }
};
