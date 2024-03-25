import { Meta } from "@/@types";
import { Organization, api, setContext } from "@/api";
import { PER_PAGE } from "@/common/constants";
import { GlobalModuleLayout, InstitutionCard } from "@/components";
import { BACKEND_ROUTES, ModulesPathnames, ModulesTitles } from "@/enum";
import { GetServerSideProps } from "next";
const FILTER_NUM = 4;
interface InstitutionsIndexProps {
  institutions: { data: Organization[]; meta: Meta };
}
export default function InstitutionsIndex({
  institutions,
}: InstitutionsIndexProps) {
  const items = [
    { title: ModulesTitles.INSTITUTIONS, href: ModulesPathnames.INSTITUTION },
  ];
  if (institutions) {
    return (
      <GlobalModuleLayout
        breadcrumbsItems={items}
        dataLength={institutions.data.length}
        meta={institutions.meta}
        moduleType={ModulesTitles.INSTITUTIONS}
        filters={{
          num: FILTER_NUM,
          withKeywords: true,
          withSpecialities: true,
          withPathologies: true,
          withDate: true,
        }}
      >
        {institutions.data.map((institution,index) => {
          return <InstitutionCard key={institution.slug + index} {...institution} />;
        })}
      </GlobalModuleLayout>
    );
  }
  return null;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  setContext(context);

  const {
    query: {
      page: page,
      perPage: perPage = PER_PAGE.INSTITUTION,
      sortBy: sortBy,
      sortOrder: sortOrder,
      speciality: specialityId,
      pathology: pathologyId,
      profil: professionId,
      keyWords: search,
      date: createdAt,
      disease: diseaseId,
    },
  } = context;

  try {
    const { data } = await api.get<{ items: Organization[]; meta: Meta }>(
      BACKEND_ROUTES.INSTITUTION,
      {
        params: {
          page,
          perPage,
          sortBy,
          sortOrder,
          specialityId,
          pathologyId,
          professionId,
          search,
          createdAt,
          diseaseId,
        },
      }
    );

    return {
      props: {
        institutions: {
          data: data.items,
          meta: data.meta,
        },
      },
    };
  } catch (error) {
    return {
      props: {
        institutions: {
          data: [],
          meta: {},
        },
      },
    };
  }
};
