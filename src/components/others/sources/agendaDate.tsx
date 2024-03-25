import { Agenda } from "@/api";
import { EVENT_DATE } from "@/common/constants";
import {
  Button,
  ClockIcon,
  DateIcon,
  Divider,
  Flex,
  LocationIcon,
  SectionCardLayout,
} from "@/components";
import { Wording, formatDateDDMMMYYYY, formatMilliseconds } from "@/lib";
import { useRouter } from "next/router";
import { AgendaTimeCounter } from "./agendaTimeCounter";

interface AgendaDateProps
  extends Pick<
    Agenda,
    "timeSlot" | "joinLink" | "city" | "duration" | "isStarted" | "isEnded"
  > {}

export function AgendaDate(props: AgendaDateProps) {
  const { push } = useRouter();
  const handleParticipateClick = () => {
    if (props.joinLink && props.joinLink != "") {
      push({
        pathname: props.joinLink,
      });
    }
  };
  return (
    <SectionCardLayout title={EVENT_DATE}>
      <Flex direction={"column"} className="gap-4">
        {props.timeSlot != null && <AgendaTimeCounter {...props.timeSlot} />}
        <Button
          onClick={handleParticipateClick}
          color="primary"
          variant="filled"
        >
          {Wording.eventParticipate}
        </Button>
      </Flex>
      <Divider className="w-full h-px opacity-30" />
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <span className="font-semibold">{Wording.when}:</span>
          <div className="text-gray-500 flex items-center gap-2">
            <DateIcon />{" "}
            <span className="text-sm">
              {props.timeSlot != null &&
                props.timeSlot.dateTimeFrom != null &&
                formatDateDDMMMYYYY(props.timeSlot.dateTimeFrom)}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-semibold">{Wording.where}:</span>
          <div className="text-gray-500 flex items-center gap-2">
            <LocationIcon />
            {props.city != null && props.city.country != null && (
              <span className="text-sm">
                {`${props.city.name}, ${props.city.country.name_fr}`}
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-semibold">{Wording.duration}:</span>
          <div className="text-gray-500 flex items-center gap-2">
            <ClockIcon />
            <span className="text-sm">
              {props.duration != null && formatMilliseconds(props.duration)}
            </span>
          </div>
        </div>
      </div>
    </SectionCardLayout>
  );
}
