import { Meta } from "@/@types";
import { Note, api, setContext } from "@/api";
import { SIBLINGS } from "@/common/constants";
import {
  Breadcrumbs,
  Divider,
  HeaderFilters,
  NoResultsFound,
  NoteCard,
  Pagination,
} from "@/components";
import { ModulesPathnames, ModulesTitles } from "@/enum";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
export default function Index({
  Notes,
}: {
  Notes: { data: Note[]; meta: Meta };
}) {
  const { back } = useRouter();
  const items = [{ title: ModulesTitles.NOTES, href: ModulesPathnames.NOTE }];
  return (
    <>
      <Head>
        <title>
          Meducate Notes • Explorez notre base de connaissances médicales
        </title>
      </Head>
      <div className="sticky z-10 top-0 px-6 py-4 bg-gray-100">
        <Breadcrumbs items={items} />
      </div>
      <div className="relative w-full max-w-container left-1/2 -translate-x-1/2">
        <div className="sticky z-10 top-52p px-6 rounded-lg flex flex-col">
          <HeaderFilters
            num={5}
            withDate
            withCategories
            withKeywords
            withPathologies
            withSpecialities
          />
        </div>

        {Notes.data.length === 0 ? (
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
            {Notes.data.map((note: Note) => {
              return (
                <NoteCard
                  noteDisease={note.NoteDisease}
                  specialityOnNote={note.SpecialityOnNote}
                  key={note?.slug}
                  {...note}
                />
              );
            })}
          </div>
        )}

        {Notes.meta && (
          <div className="flex flex-col gap-5 mb-5 px-6">
            <Divider
              className="opacity-30 w-full h-0.5"
              orientation="horizontal"
            />{" "}
            <div>
              <Pagination
                initialPage={Notes.meta.currentPage}
                siblings={SIBLINGS}
                total={Notes.meta.totalPages}
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
  const noteLevelId = query?.level || null;
  const perPage = query?.perPage || 12;
  const sortBy = query?.sortBy || "id";
  const sortOrder = query?.sortOrder || "desc";
  const noteType = query?.category || null;
  const specialityId = query?.speciality || null;
  const diseaseId = Number(query?.disease) || null;
  const search = query?.keyWords || null;
  const date = query?.date;
  try {
    const { data } = await api.get<{
      items: Note[];
      meta: Meta;
    }>(`/note`, {
      params: {
        page,
        perPage,
        sortBy,
        sortOrder,
        noteType,
        specialityId,
        diseaseId,
        noteLevelId,
        search,
        createdAt: date || null,
      },
    });
    return {
      props: {
        Notes: {
          data: data.items,
          meta: data.meta,
        },
      },
    };
  } catch (error) {
    return {
      props: {
        Notes: {
          data: [],
          meta: {},
        },
      },
    };
  }
};
