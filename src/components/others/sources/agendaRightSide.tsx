import { Agenda } from "@/api";
import {
  AddToAgenda,
  AgendaDate,
  AgendaKeywords,
  AgendaPartners,
  AgendaTags
} from "@/components";

interface AgendaRightSideProps
  extends Pick<
  Agenda,
    | "timeSlot"
    | "joinLink"
    | "eventType"
    | "duration"
    | "city"
    | "isEnded"
    | "isStarted"
    | "description"
    | "title"
  > {
  eventOrganization: Agenda["EventOrganization"];
  eventHashTag: Agenda["EventHashTag"];
  eventSpeciality: Agenda["EventSpeciality"];
  eventDisease: Agenda["EventDisease"];
}
export function AgendaRightSide(props: AgendaRightSideProps) {
  return (
    <div className="flex flex-col gap-3">
      {props.isStarted && (
        <>
          <AgendaDate
            city={props.city}
            duration={props.duration}
            isEnded={props.isEnded}
            isStarted={props.isStarted}
            joinLink={props.joinLink}
            timeSlot={props.timeSlot}
          />
          <AddToAgenda
            city={props.city}
            description={props.description}
            timeSlot={props.timeSlot}
            title={props.title}
          />
        </>
      )}
      <AgendaPartners eventOrganization={props.eventOrganization} />
      <AgendaTags
        eventDisease={props.eventDisease}
        eventSpeciality={props.eventSpeciality}
        eventType={props.eventType}
      />
      <AgendaKeywords eventHashTag={props.eventHashTag} />
    </div>
  );
}
