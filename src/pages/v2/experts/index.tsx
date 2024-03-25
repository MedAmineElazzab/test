import { Meta } from "@/@types";
import { Expert, api, setContext } from "@/api";
import { PER_PAGE } from "@/common/constants";
import { ExpertCard, GlobalModuleLayout } from "@/components";
import { BACKEND_ROUTES, ModulesPathnames, ModulesTitles } from "@/enum";
import { GetServerSideProps } from "next";
const FILTER_NUM = 4;
interface ExpertsIndexProps {
  experts: { data: Expert[]; meta: Meta };
}
export default function ExpertsIndex({ experts }: ExpertsIndexProps) {
  const items = [
    { title: ModulesTitles.EXPERTS, href: ModulesPathnames.EXPERT },
  ];
  if (experts) {
    return (
      <GlobalModuleLayout
        breadcrumbsItems={items}
        dataLength={experts.data.length}
        meta={experts.meta}
        moduleType={ModulesTitles.EXPERTS}
        filters={{
          num: FILTER_NUM,
          withKeywords: true,
          withSpecialities: true,
          withPathologies: true,
          withDate: true,
        }}
      >
        {experts.data.map((expert) => {
          return <ExpertCard key={expert.slug} {...expert} />;
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
      perPage: perPage = PER_PAGE.EXPERT,
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
    const { data } = await api.get<{ items: Expert[]; meta: Meta }>(
      BACKEND_ROUTES.EXPERT,
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
        experts: {
          data: data.items,
          meta: data.meta,
        },
      },
    };
  } catch (error) {
    return {
      props: {
        experts: {
          data: [],
          meta: {},
        },
      },
    };
  }
};
