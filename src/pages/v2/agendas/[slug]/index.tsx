import { Agenda, api, setContext } from "@/api";
import { AgendaLeftSide, AgendaRightSide } from "@/components";
import { GlobalModuleDetailedLayout } from "@/components/global";
import { BACKEND_ROUTES, ModulesPathnames, ModulesTitles } from "@/enum";
import { Wording } from "@/lib";
import Error from "@/pages/_error";
import { GetServerSideProps } from "next";

interface AgendaDetailedIndexProps {
  agenda: Agenda;
}
export default function AgendaDetailedIndex({
  agenda,
}: AgendaDetailedIndexProps) {
  if (agenda) {
    const items = [
      { title: ModulesTitles.EVENTS, href: ModulesPathnames.EVENT },
      { title: agenda.title, href: ModulesPathnames.SERIE + agenda.slug },
    ];
    return (
      <GlobalModuleDetailedLayout
        breadcrumbsItems={items}
        moduleType={ModulesTitles.AGENDAS}
        title={agenda.title}
        leftSection={
          <AgendaLeftSide
            city={agenda.city}
            description={agenda.description}
            id={agenda.id}
            imagePath={agenda.imagePath}
            isBookmarked={agenda.isBookmarked}
            isFlagged={agenda.isFlagged}
            isStarted={agenda.isStarted}
            organizerWord={agenda.organizerWord}
            slug={agenda.slug}
            timeSlot={agenda.timeSlot}
            title={agenda.title}
            videoSrc={agenda.videoSrc}
          />
        }
        rightSection={
          <AgendaRightSide
            eventOrganization={agenda.EventOrganization}
            eventHashTag={agenda.EventHashTag}
            eventDisease={agenda.EventDisease}
            city={agenda.city}
            description={agenda.description}
            duration={agenda.duration}
            eventSpeciality={agenda.EventSpeciality}
            eventType={agenda.eventType}
            isEnded={agenda.isEnded}
            isStarted={agenda.isStarted}
            joinLink={agenda.joinLink}
            timeSlot={agenda.timeSlot}
            title={agenda.title}
          />
        }
      />
    );
  }
  return (
    <Error
      message={Wording.agendaNotfound}
      description={Wording.notfoudnDESC}
    />
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  setContext(context);
  const { query } = context;
  try {
    const { data: agenda } = await api.get<Event>(
      BACKEND_ROUTES.EVENT + "/" + query?.slug
    );
    return {
      props: {
        agenda,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        agenda: null,
      },
    };
  }
};
