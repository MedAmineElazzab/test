import { Agenda } from "@/api";
import { HeaderAgenda, TabsAgenda } from "./";

interface AgendaLeftSideProps
  extends Pick<
  Agenda,
    | "timeSlot"
    | "id"
    | "description"
    | "title"
    | "city"
    | "isBookmarked"
    | "isStarted"
    | "isFlagged"
    | "slug"
    | "imagePath"
    | "videoSrc"
    | "organizerWord"
  > {}
export const AgendaLeftSide = (props: AgendaLeftSideProps) => {
  return (
    <div className="flex flex-col gap-4">
      {props.timeSlot && (
        <HeaderAgenda
          startDate={props.timeSlot.dateTimeFrom}
          city={props.city}
          imagePath={props.imagePath}
          isBookmarked={props.isBookmarked}
          isFlagged={props.isFlagged}
          slug={props.slug}
          title={props.title}
          videoSrc={props.videoSrc}
        />
      )}
      <div className="bg-white p-4 rounded-lg">
        <TabsAgenda
          description={props.description}
          id={props.id}
          isStarted={props.isStarted}
          organizerWord={props.organizerWord}
        />
      </div>
    </div>
  );
};
