import { Note, api, setContext } from "@/api";
import {
  Breadcrumbs,
  Details,
  Keywords,
  NoteExpert,
  Organisations,
} from "@/components";
import { DataArea } from "@/components/notes/components/slug/DataArea";
import { BACKEND_ROUTES, ModulesPathnames, ModulesTitles } from "@/enum";
import Error from "@/pages/_error";
import { GetServerSideProps } from "next";
import Head from "next/head";

export default function IndexNote({ Note }: { Note: Note }) {
  if (!Note) {
    return (
      <Error
        message={"La Note demandé n'est pas disponible."}
        description={
          "Veuillez mettre à jour votre recherche ou vos filtres, ou explorez d'autres options ci-dessous en cliquant ci-dessous"
        }
      />
    );
  } else {
    const items = [
      { title: ModulesTitles.NOTES, href: ModulesPathnames.NOTE },
      { title: Note.slug, href: ModulesPathnames.SERIE + Note.slug },
    ];
    return (
      <>
        <Head>
          <title>{Note.title} • Meducate Notes </title>
        </Head>
        <div className="sticky z-10 top-0 px-6 py-4 bg-gray-100">
          <Breadcrumbs items={items} />
        </div>
        <div className="relative w-full max-w-container left-1/2 -translate-x-1/2 px-6">
          <div className="relative Note-container w-full min-h-1000 mb-5 flex gap-4">
            <div className="w-container-left-section">
              <div className="w-full min-h-1000 flex flex-col pb-5 gap-4">
                <DataArea note={Note} />
              </div>
            </div>
            <div className="relative h-auto">
              <div className="w-300 transition-all">
                <div className="sticky-container w-full flex flex-col gap-3">
                  <Organisations data={Note.NoteOrganization} />
                  {Note.noteExpert && (
                    <NoteExpert
                      NoteExpert={Note.noteExpert}
                      isFollowed={Note.expertIsFollowed}
                    />
                  )}
                  <Details
                    path={ModulesPathnames.NOTE}
                    specialities={Note.SpecialityOnNote.map(
                      (el) => el.speciality
                    )}
                    diseases={Note.NoteDisease.map((el) => el.disease)}
                    noteLevel={Note.noteLevel}
                  />
                  <Keywords
                    hashtags={Note.NoteHashTag}
                    path={ModulesPathnames.NOTE}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  setContext(context);
  const { query } = context;
  var Note: Note | null = null;
  try {
    const { data: note } = await api.get<Note>(
      BACKEND_ROUTES.NOTE + "/" + query?.slug
    );
    Note = note;
  } catch (error) {
    console.log(error);
  }
  return {
    props: {
      Note,
    },
  };
};
