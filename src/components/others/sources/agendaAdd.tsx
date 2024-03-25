import { CalendarTypes } from "@/@types";
import { Agenda } from "@/api";
import { ADD_CALENDAR } from "@/common/constants";
import {
  AppleIcon,
  Button,
  GoogleCalendarIcon,
  MiscrosoftIcon,
  SectionCardLayout,
  YahooIcon,
} from "@/components";
import { Calendar } from "@/enum";
import { formatDateGoogle, generateAddToCalendarURL } from "@/lib";
interface EventAddCalendarProps
  extends Pick<Agenda, "timeSlot" | "title" | "description" | "city"> {}
export function AddToAgenda(props: EventAddCalendarProps) {
  const click = (type: CalendarTypes) => {
    if (
      props.timeSlot != null &&
      props.city != null &&
      props.city.country != null
    ) {
      const calendarHref = generateAddToCalendarURL(type, {
        title: props.title,
        startDate: formatDateGoogle(props.timeSlot.dateTimeFrom) || "",
        endDate: formatDateGoogle(props.timeSlot.dateTimeTo) || "",
        description: props.description || "",
        location: props.city.name + "," + props.city.country.name_fr,
      });

      if (calendarHref != null) {
        const link = document.createElement("a");
        link.href = calendarHref;
        link.target = "_blank";
        link.click();
      }
    }
  };

  return (
    <SectionCardLayout title={ADD_CALENDAR}>
      <div className="flex items-center gap-2 justify-between">
        <Button
          onClick={click.bind(null, Calendar.GOOGLE)}
          color="secondary"
          variant="outline"
        >
          <GoogleCalendarIcon className="w-5 h-5" />
        </Button>
        <Button
          onClick={click.bind(null, Calendar.APPLE)}
          color="secondary"
          variant="outline"
        >
          <AppleIcon className="w-5 h-5" />
        </Button>
        <Button
          onClick={click.bind(null, Calendar.YAHOO)}
          color="secondary"
          variant="outline"
        >
          <YahooIcon className="w-5 h-5" />
        </Button>
        <Button
          onClick={click.bind(null, Calendar.OUTLOOK)}
          color="secondary"
          variant="outline"
        >
          <MiscrosoftIcon className="w-5 h-5" />
        </Button>
      </div>
    </SectionCardLayout>
  );
}
