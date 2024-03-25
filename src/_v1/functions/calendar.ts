export const generateGoogleCalendarLink = (eventDetails: {
  action: string;
  dates: string;
  details: string;
  location: string;
  text: string;
}) => {
  const baseUrl = "https://calendar.google.com/calendar/render";

  // Build the query parameters
  const queryParams = new URLSearchParams();
  Object.entries(eventDetails).forEach(([key, value]) => {
    queryParams.append(key, value);
  });

  // Construct the final URL
  return `${baseUrl}?${queryParams.toString()}`;
};

export const generateOutlookCalendarLink = (eventDetails: {
  allday: boolean;
  body: string;
  enddt: string;
  location: string;
  startdt: string;
  subject: string;
}) => {
  const baseUrl = "https://outlook.live.com/calendar/0/action/compose";

  // Build the query parameters
  const queryParams = new URLSearchParams();
  Object.entries(eventDetails).forEach(([key, value]) => {
    queryParams.append(key, value as string);
  });

  // Construct the final URL
  return `${baseUrl}?${queryParams.toString()}`;
};

export const generateYahooCalendarLink = (eventDetails: {
  desc: string;
  dur: string;
  et: string;
  in_loc: string;
  st: string;
  title: string;
  v: string;
}) => {
  const baseUrl = "https://calendar.yahoo.com/";

  // Build the query parameters
  const queryParams = new URLSearchParams();
  Object.entries(eventDetails).forEach(([key, value]) => {
    queryParams.append(key, value);
  });

  // Construct the final URL
  return `${baseUrl}?${queryParams.toString()}`;
};

export const downloadICSFile = () => {
  const icsContent = `BEGIN:VCALENDAR
    VERSION:2.0
    BEGIN:VEVENT
    DTSTART:20231215T080000Z
    DTEND:20231218T043000Z
    SUMMARY:Carl Cox Invites Brooklyn in project medical Takeover all Night
    DESCRIPTION:Influential media, entertainment & technology show inspirational speakers including game changing not just a large-scale conference, but a large educational hub on digital technologies for business, where people communicate, get inspired and find ready-made solutions or business...
    LOCATION:IAC Building, USA
    END:VEVENT
    END:VCALENDAR
  `;

  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "event.ics";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  // Clean up the URL.createObjectURL
  URL.revokeObjectURL(url);
};
