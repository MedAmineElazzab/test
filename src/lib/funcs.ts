import { CalendarEvent, CalendarTypes, counterType } from "@/@types";
import { HOURS_PER_DAY, MIN_PER_HOUR, SEC_MIN } from "@/common/constants";
import { Calendar, ModuleTitles, ModulesPathnames } from "@/enum";
import { format, formatDuration, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import dayjs from "dayjs";
import { jwtDecode } from "jwt-decode";

export function separateNumbersAndStrings(
  arr: (number | string)[]
): [number[], string[]] {
  const numbers: number[] = [];
  const strings: string[] = [];

  for (const item of arr) {
    if (typeof item === "number") {
      numbers.push(item);
    } else if (typeof item === "string" && /^\d+$/.test(item)) {
      numbers.push(parseInt(item, 10));
    } else {
      strings.push(item);
    }
  }

  return [numbers, strings];
}

export const generateReviewURL = (type: ModuleTitles, id: number) => {
  switch (type) {
    case ModuleTitles.NOTE:
      return ModulesPathnames.REVIEW_NOTE + "/" + id;
    case ModuleTitles.MODULE:
      return ModulesPathnames.REVIEW_MODULE + "/" + id;
    case ModuleTitles.SERIE:
      return ModulesPathnames.REVIEW_SERIE + "/" + id;
    default:
      return null;
  }
};

export function RangeDate(range: any): {
  startDate: string | null;
  endDate: string | null;
} {
  if (
    range !== null &&
    range !== "" &&
    typeof range === "string" &&
    range.split(",").length === 2
  ) {
    const [startDate, endDate] = range.split(",");
    return { startDate, endDate };
  } else {
    return { startDate: null, endDate: null };
  }
}

export const handleJWTDecode = (token: string) => {
  try {
    const decodedToken = jwtDecode(token);
    const { iat, exp } = decodedToken;
    if (iat && exp) {
      const currentTime = Math.floor(Date.now() / SEC_MIN);
      const tokenLifeSpan = exp - iat;
      const currentTokenSpan = currentTime - exp;
      return { tokenLifeSpan, currentTokenSpan };
    }
  } catch (error) {
    console.error("Error decoding JWT:", error);
  }
  return { tokenLifeSpan: 0, currentTokenSpan: 0 };
};

function isDate(data: any): boolean {
  return data instanceof Date && !isNaN(data.getTime());
}

export function isValidDateString(dateString: string): boolean {
  const date = new Date(dateString);
  return isDate(date);
}
const MS_IN_SEC = 1000;
const SEC_IN_MIN = 60;
const SEC_IN_HOUR = 3600;
export function formatMilliseconds(milliseconds: number): string | null {
  if (milliseconds != null && typeof milliseconds == "number") {
    const seconds = milliseconds / MS_IN_SEC;
    const hours = Math.floor(seconds / SEC_IN_HOUR);
    const remainingSeconds = seconds % SEC_IN_HOUR;
    const minutes = Math.floor(remainingSeconds / SEC_IN_MIN);
    const duration = {
      hours: hours,
      minutes: minutes,
    };
    return formatDuration(duration, { locale: fr });
  }
  return null;
}
export function formatSeconds(seconds: number): string | null {
  if (seconds != null && typeof seconds == "number") {
    const hours = Math.floor(seconds / SEC_IN_HOUR);
    const remainingSeconds = seconds % SEC_IN_HOUR;
    const minutes = Math.floor(remainingSeconds / SEC_IN_MIN);
    const duration = {
      hours,
      minutes,
      seconds,
    };
    return formatDuration(duration, { locale: fr });
  }
  return null;
}

export const generateAddToCalendarURL = (
  type: CalendarTypes,
  details: CalendarEvent
) => {
  const detailsEncoded: CalendarEvent = {
    title: encodeURIComponent(details.title),
    startDate: encodeURIComponent(details.startDate),
    endDate: encodeURIComponent(details.endDate),
    description: encodeURIComponent(details.description),
    location: encodeURIComponent(details.location),
  };
  switch (type) {
    case Calendar.GOOGLE:
      return `https://www.google.com/calendar/render?action=TEMPLATE&text=${detailsEncoded.title}&dates=${detailsEncoded.startDate}/${detailsEncoded.endDate}&details${detailsEncoded.description}&location=${detailsEncoded.location}`;
    case Calendar.APPLE:
      return "https://www.icloud.com/calendar";
    case Calendar.OUTLOOK:
      return `https://outlook.office.com/calendar/0/deeplink/compose?subject=${detailsEncoded.title}&startdt=${detailsEncoded.startDate}&enddt=${detailsEncoded.endDate}&body=${detailsEncoded.description}&location=${detailsEncoded.location}`;
    case Calendar.YAHOO:
      return `https://calendar.yahoo.com/?v=60&view=d&type=20&title=${detailsEncoded.title}&st=${detailsEncoded.startDate}&et=${detailsEncoded.endDate}&desc=${detailsEncoded.description}&in_loc=${detailsEncoded.location}`;

    default:
      return null;
  }
};

export const formatDateGoogle = (isoDateString: string) => {
  if (isoDateString != null && typeof isoDateString === "string") {
    return dayjs(isoDateString).format("YYYYMMDDTHHmmss[Z]");
  }
  return null;
};

export const calculateTimeLeft = (dateTimeTo: string): counterType => {
  if (isValidDateString(dateTimeTo)) {
    const now = dayjs();
    const endDate = dayjs(dateTimeTo);
    const difference = endDate.diff(now, "second");
    if (difference > 0) {
      const days = endDate.diff(now, "day");
      const hours = endDate.diff(now, "hour") % HOURS_PER_DAY;
      const minutes = endDate.diff(now, "minute") % MIN_PER_HOUR;
      const seconds = endDate.diff(now, "second") % MIN_PER_HOUR;

      return { days, hours, minutes, seconds };
    }
  }

  return { days: 0, hours: 0, minutes: 0, seconds: 0 };
};

export const formatDateDDMMMYYYY = (startDate: string) => {
  if (startDate != null) {
    const parsedDate = parseISO(startDate);
    const formattedDate = format(parsedDate, "dd MMM yyyy", { locale: fr });
    return formattedDate;
  }
};
