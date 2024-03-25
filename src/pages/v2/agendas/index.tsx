import { Meta } from "@/@types";
import { Agenda, api, setContext } from "@/api";
import { PER_PAGE } from "@/common/constants";
import { EventCard, GlobalModuleLayout } from "@/components";
import { BACKEND_ROUTES, ModulesPathnames, ModulesTitles } from "@/enum";
import { GetServerSideProps } from "next";
const FILTER_NUM = 4;

interface EventsIndexProps {
  events: { data: Agenda[]; meta: Meta };
}
export default function EventsIndex({ events }: EventsIndexProps) {
  const items = [{ title: ModulesTitles.EVENTS, href: ModulesPathnames.EVENT }];
  if (events) {
    return (
      <GlobalModuleLayout
        breadcrumbsItems={items}
        dataLength={events.data.length}
        meta={events.meta}
        moduleType={ModulesTitles.EXPERTS}
        filters={{
          num: FILTER_NUM,
          withKeywords: true,
          withSpecialities: true,
          withEventsTypes: true,
          withDateRange: true,
        }}
      >
        {events.data.map((event, index) => {
          return (
            <EventCard
              {...event}
              eventOrganizations={event.EventOrganization}
              eventDisease={event.EventDisease}
              eventSpeciality={event.EventSpeciality}
              key={event.slug + index}
            />
          );
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
      perPage: perPage = PER_PAGE.EVENT,
      sortBy: sortBy,
      sortOrder: sortOrder,
      speciality: specialityId,
      pathology: pathologyId,
      profil: professionId,
      keyWords: search,
      date: createdAt,
      disease: diseaseId,
      eventType: eventTypeId,
      startDate,
      endDate,
    },
  } = context;
  try {
    const { data } = await api.get<{ items: Agenda[]; meta: Meta }>(
      BACKEND_ROUTES.EVENT,
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
          eventTypeId,
          startDate,
          endDate,
        },
      }
    );

    return {
      props: {
        events: {
          data: data.items,
          meta: data.meta,
        },
      },
    };
  } catch (error) {
    return {
      props: {
        events: {
          data: [],
          meta: {},
        },
      },
    };
  }
};
