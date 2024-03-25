import { Meta } from "@/@types";
import { Note, Serie, api, setContext } from "@/api";
import { SIBLINGS } from "@/common/constants";
import {
  Breadcrumbs,
  Divider,
  HeaderFilters,
  NoResultsFound,
  Pagination,
  SerieCard,
} from "@/components";
import { ModulesPathnames, ModulesTitles } from "@/enum";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
export const nothingFoundLottie = require("@public/assets/animations/empty-search.json");

export default function Index({
  Series,
}: {
  Series: { data: Serie[]; meta: Meta };
}) {
  const { back } = useRouter();
  const items = [{ title: ModulesTitles.SERIES, href: ModulesPathnames.SERIE }];
  return (
    <>
      <Head>
        <title>
          Meducate Series • Explorez notre base de connaissances médicales avec
          des modules, vidéos et quiz
        </title>
      </Head>
      <div className="sticky z-10 top-0 px-6 py-4 bg-gray-100">
        <Breadcrumbs items={items} />
      </div>
      <div className="relative w-full  max-w-[1310px]  left-1/2 -translate-x-1/2">
        <div className="sticky z-10 top-[52px]  px-6 rounded-lg  flex flex-col">
          <HeaderFilters
            num={4}
            withCategories
            withKeywords
            withPathologies
            withSpecialities
          />
        </div>
        {Series.data.length === 0 ? (
          <NoResultsFound
            action={() => {
              back();
            }}
            title="Aucun résultat trouvé"
            actionMessage="Retour"
            description="Essayez de mettre à jour votre terme de recherche ou vos filtres"
          />
        ) : (
          <div className="data-cards-container grid grid-cols-4 mt-4 min-h-[700px]  gap-4 px-6 mb-8">
            {Series?.data?.map((serie) => {
              return (
                <SerieCard
                  categoryOnSerie={serie.CategoryOnSerie}
                  diseaseOnSerie={serie.DiseaseOnSerie}
                  specialityOnSerie={serie.SpecialityOnSerie}
                  seriePartner={serie.SeriePartner}
                  key={serie.slug}
                  {...serie}
                />
              );
            })}
          </div>
        )}
        {Series.meta && (
          <div className="flex flex-col gap-5 mb-5 px-6">
            <Divider
              orientation="horizontal"
              className="w-full opacity-30 h-0.5"
            />
            <div>
              <Pagination
                initialPage={Series.meta.currentPage}
                siblings={SIBLINGS}
                total={Series.meta.totalPages}
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
  const perPage = query?.perPage || 15;
  const sortBy = query?.sortBy || "id";
  const sortOrder = query?.sortOrder || "desc";
  const categoryId = query?.category || null;
  const specialityId = query?.speciality || null;
  const diseaseId = Number(query?.disease) || null;
  const professionId = Number(query?.profil) || null;
  const search = query?.keyWords || null;
  const date = query?.date;

  try {
    const { data, config } = await api.get<{
      items: Note[];
      meta: Meta;
    }>(`/serie`, {
      params: {
        page,
        perPage,
        sortBy,
        sortOrder,
        categoryId,
        specialityId,
        diseaseId,
        search,
        createdAt: date || null,
        professionId,
      },
    });
    return {
      props: {
        Series: {
          data: data.items,
          meta: data.meta,
        },
      },
    };
  } catch (error) {
    return {
      props: {
        Series: {
          data: [],
          meta: null,
        },
      },
    };
  }
};
