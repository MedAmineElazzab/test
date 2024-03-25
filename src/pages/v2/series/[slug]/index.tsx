import { Serie, api, setContext } from "@/api";
import {
  Breadcrumbs,
  CommentsArea,
  DescriptionIcon,
  Details,
  HeaderDetailedSerie,
  Institutions,
  Keywords,
  ModuleIcon,
  Organisations,
  ResourcesIcon,
  Ressources,
  SerieDescription,
  SerieExperts,
  SerieModules,
  Tabs,
} from "@/components";
import {
  BACKEND_ROUTES,
  ModuleTitles,
  ModulesPathnames,
  ModulesTitles,
} from "@/enum";
import Error from "@/pages/_error";
import { GetServerSideProps } from "next";
import Head from "next/head";

export default function index({ Serie }: { Serie: Serie }) {
  if (!Serie) {
    return (
      <Error
        message={"La Serie demandé n'est pas disponible."}
        description={
          "Veuillez mettre à jour votre recherche ou vos filtres, ou explorez d'autres options ci-dessous en cliquant ci-dessous"
        }
      />
    );
  }
  const items = [
    { title: ModulesTitles.SERIES, href: ModulesPathnames.SERIE },
    { title: Serie.slug, href: ModulesPathnames.SERIE + Serie.slug },
  ];
  console.log(Serie)
  return (
    <>
      <Head>
        <title>{Serie.title} • Meducate Series </title>
      </Head>
      <div className="sticky z-10 top-0 px-6 py-4 bg-gray-100">
        <Breadcrumbs items={items} />
      </div>

      <div className="relative w-full max-w-container left-1/2 -translate-x-1/2 px-6">
        <div className="relative Note-container w-full min-h-1000 mb-5 flex gap-4">
          <div className="w-container-left-section">
            <div className="w-full min-h-1000 flex flex-col pb-5 gap-4">
              <HeaderDetailedSerie
                slug={Serie.slug}
                isBookmarked={Serie.isBookmarked}
                title={Serie.title}
                createdAt={Serie.createdAt}
                reviews={Serie.reviewsCount}
                views={Serie.views}
                isFlagged={Serie.isFlagged}
                subtitle={Serie.subtitle}
                certified={!!Serie.certification}
                imagePath={Serie.imagePath}
                videoSrc={Serie.videoSrc}
                id={Serie.id}
              />
              <div className="bg-white p-4 rounded-lg shadow-expert-card">
                <Tabs
                  defaultValue={"Description"}
                  data={[
                    {
                      component: (
                        <SerieDescription
                          description={Serie.description}
                          objective={Serie.objective}
                        />
                      ),
                      icon: <DescriptionIcon />,
                      name: "Description",
                    },
                    Serie.SerieModule.length != 0
                      ? {
                          component: <SerieModules id={Serie.id} />,
                          icon: <ModuleIcon className="w-5 h-5" />,
                          name: "Modules",
                        }
                      : null,
                    {
                      component: <SerieExperts id={Serie.id} />,
                      icon: <></>,
                      name: "Experts",
                    },
                    {
                      component: <Ressources ressources={Serie.Attachement} />,
                      icon: <ResourcesIcon />,
                      name: "Ressources",
                    },
                  ]}
                />
              </div>
              <div className="w-full p-5">
                <CommentsArea
                  total={Serie.reviewsCount}
                  slug={Serie.slug}
                  id={Serie.id}
                  type={ModuleTitles.SERIE}
                />
              </div>
            </div>
          </div>
          <div className="relative h-auto">
            <div className="w-300 overflow-y-auto transition-all">
              <div className="sticky-container w-full flex flex-col gap-3">
                <Organisations data={Serie.SerieOrganization} />
                <Institutions
                  title="soutien institutionnel"
                  data={Serie.SeriePartner}
                />
                <Details
                  path={ModulesPathnames.SERIE}
                  specialities={
                    Serie.SpecialityOnSerie.map((el) => el.speciality) || []
                  }
                  diseases={Serie.DiseaseOnSerie.map((el) => el.disease) || []}
                />

                <Keywords
                  hashtags={Serie.SerieHashTag}
                  path={ModulesPathnames.SERIE}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  setContext(context);
  const { query } = context;
  var Serie: Serie | null = null;
  try {
    const { data: serie } = await api.get<Serie>(
      BACKEND_ROUTES.SERIE + "/" + query?.slug
    );
    Serie = serie;
  } catch (error) {
    console.log(error);
  }
  return {
    props: {
      Serie,
    },
  };
};
