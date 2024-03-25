import moment from "moment-timezone";
import fileDownload from "js-file-download";
import axios, { AxiosResponse } from "axios";
import { parseCookies } from "nookies";
import { useRouter } from 'next/router';

/**
 * The function `defineImageURI` takes a path as input and returns a complete image URI by appending
 * the path to the `NEXT_PUBLIC_API_URL` environment variable.
 * @param {string} path - The `path` parameter is a string that represents the path or filename of an
 * image.
 */
export const defineImageURI = (path: string) => {
  if (!path)
    return "https://res.cloudinary.com/dxjh2x7jn/image/upload/v1699967678/images/noImage_4_yozuxs.jpg";
  return `${process.env.NEXT_PUBLIC_API_URL}${path}`;
};

/**
 * The function `defineVideoURI` takes a path as input and returns a complete video URI by appending
 * the path to the `NEXT_PUBLIC_API_URL` environment variable.
 * @param {string} path - The `path` parameter is a string that represents the path to a video file.
 */
export const defineVideoURI = (path: string) =>
  `${process.env.NEXT_PUBLIC_API_URL}${path}`;

/**
 * The function `parseDurationString` takes a string representing a duration in the format "HH:MM:SS"
 * and returns the number of hours in the duration.
 * @param {string} durationString - The `durationString` parameter is a string representing a duration
 * in the format "HH:MM:SS", where HH represents hours, MM represents minutes, and SS represents
 * seconds.
 * @returns a string that represents the number of hours in the given duration string.
 */
//
export function parseDurationString(durationString: string) {
  const parts = durationString?.split(":");

  if (parts?.length === 3) {
    const hours = parseInt(parts[0]);
    const minutes = parseInt(parts[1]);
    const seconds = parseInt(parts[2]);

    // Calculate the duration in milliseconds
    const durationInMilliseconds =
      (hours * 3600 + minutes * 60 + seconds) * 1000;

    // You can also calculate it in seconds, minutes, or hours if needed
    const durationInSeconds = hours * 3600 + minutes * 60 + seconds;
    const durationInMinutes = hours * 60 + minutes + seconds / 60;

    return `${hours} hours`;
  } else {
    return "Invalid Date";
  }
}

/**
 * The function "defineDatetime" takes a Date or string and a format string as input, and returns the
 * formatted datetime string using the moment library.
 * @param {Date | string} datetime - The `datetime` parameter can be either a `Date` object or a string
 * representing a date and time.
 * @param {string} format - The `format` parameter is a string that specifies the desired format for
 * the datetime value. It can include various placeholders and formatting options to customize the
 * output. For example, "YYYY-MM-DD" represents the year, month, and day in a specific order, while
 * "HH:mm:ss" represents the
 * @returns a formatted string representation of the given datetime value, according to the specified
 * format.
 */
export function defineDatetime(datetime: Date | string, format: string) {
  return moment(datetime).format(format);
}

/**
 * The function calculates the height percentage based on the width and height values provided.
 * @param {number} w - The parameter `w` represents the width of an element or object.
 * @param {number} h - The height of the element in pixels.
 */
export const calculateHeight = (w: number, h: number) =>
  ((h * 100) / w).toFixed(2) + "%";

/**
 * The `truncate` function takes a string input and an optional length parameter, and returns a
 * truncated version of the input string with ellipsis (...) if the length exceeds the specified
 * length.
 * @param {string} input - The `input` parameter is a string that represents the text that you want to
 * truncate.
 * @param {number} [len=100] - The `len` parameter is the maximum length of the string after
 * truncation. If the length of the `input` string is greater than `len`, the function will truncate
 * the string and add ellipsis ("...") at the end. If the length of the `input` string is less than
 * @returns The function `truncate` returns a truncated version of the input string if its length is
 * greater than the specified length (`len`). If the input string is shorter than or equal to the
 * specified length, the function returns the input string as is.
 */
export const truncate = (input: string, len: number = 100) => {
  if (input?.length > len) {
    return input.substring(0, len).trim() + "...";
  }
  return input;
};

export const onlyTextWithTruncate = (str: string, len: number = 300) =>
  truncate(str?.replace(/<[^>]*>/g, " "), len);

/**
 * The function `megabytesToBytes` converts a given number of megabytes to bytes.
 * @param {number} megabytes - The `megabytes` parameter is a number that represents the amount of data
 * in megabytes that you want to convert to bytes.
 * @returns the number of bytes equivalent to the given number of megabytes.
 */
export function megabytesToBytes(megabytes: number): number {
  // 1 megabyte is equal to 1,048,576 bytes
  const bytesInOneMegabyte = 1024 * 1024;
  const bytes = megabytes * bytesInOneMegabyte;
  return bytes;
}

/**
 * The function `onDownloadAttachments` downloads a file from a given file path and returns a status
 * indicating whether the download was successful or not.
 * @param {string} filePath - The `filePath` parameter is a string that represents the path to the file
 * that you want to download.
 * @returns an object with a "status" property. If the file download is successful, the status will be
 * "SUCCESS". If there is an error, the status will be "FAIL".
 */
export const onDownloadAttachments = async (filePath: string) => {
  let name = filePath.split("/").pop();
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/${filePath}`,
      {
        responseType: "blob",
      }
    );
    await fileDownload(res.data, `${name}`);

    return { status: 200 };
  } catch (error) {
    return { status: 400 };
  }
};

export const onStreamVideo = async (slug: string) => {
  try {
    const cookies = parseCookies();
    const token = cookies["token"];
    const response: AxiosResponse<Blob> = await axios({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      method: "get",
      url: `/masterclass/video/${slug}`,
      responseType: "blob",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status !== 200) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const videoBlob: Blob = response.data;
    return URL.createObjectURL(new Blob([videoBlob]));
  } catch (error: any) {
    console.error("Error fetching video stream:", error.message);
  }
};

/*** DETECTIONS OF CURRENT TRANSCRIPTION */
export const isDecimalSecondInRange = (
  decimalSecond: number,
  startTime: string,
  endTime: string
): boolean => {
  const startSeconds = convertTimeToDecimalSeconds(startTime);
  const endSeconds = convertTimeToDecimalSeconds(endTime);
   console.log(startSeconds , endSeconds )
  return decimalSecond >= startSeconds && decimalSecond <= endSeconds;
};


function convertTimeToDecimalSeconds(timeString: string): number {
  const [hours, minutes, seconds] = timeString.split(":").map(Number);
  return hours * 3600 + minutes * 60 + seconds;
}

export function formatTimeRange(startTime: string, endTime: string): string {
  // Parse the input time strings
  const parsedStartTime = new Date(`1970-01-01T${startTime}Z`);
  const parsedEndTime = new Date(`1970-01-01T${endTime}Z`);

  // Format the times as HH:mm:ss
  const formattedStartTime = parsedStartTime.toISOString().substr(11, 8);
  const formattedEndTime = parsedEndTime.toISOString().substr(11, 8);

  // Create the formatted time range string
  const formattedTimeRange = `${formattedStartTime} - ${formattedEndTime}`;

  return formattedTimeRange;
}

export const convertTimeToHours = (timeString: string) => {
  if (timeString) {
    let decimalPlaces;
    // Parse the time string into hours, minutes, and seconds
    const [hours, minutes, seconds] = ("78:80")?.split(":")?.map(Number);

    // Check if the duration is less than an hour
    if (hours === 0) {
      // Calculate the total duration in minutes
      const totalMinutes = minutes + seconds / 60;
      decimalPlaces = totalMinutes.toString().length > 2 ? 1 : 0;
      return totalMinutes.toFixed(decimalPlaces) + " minutes";
    }

    // Calculate the total duration in hours
    const totalHours = hours + minutes / 60 + seconds / 3600;
    decimalPlaces = totalHours.toString().length > 2 ? 1 : 0;
    return totalHours.toFixed(decimalPlaces) + " hours";
  }
};



export function formatTimeStringToDuration(timeString: string): string {
  const [hoursStr, minutesStr, secondsStr] = timeString.split(":");
  const hours = parseInt(hoursStr, 10);
  const minutes = parseInt(minutesStr, 10);
  const seconds = parseInt(secondsStr, 10);

  const durationInMilliseconds =
    hours * 60 * 60 * 1000 + minutes * 60 * 1000 + seconds * 1000;

  let result = "";

  if (hours > 0) {
    result += hours + "h";
  }

  if (minutes > 0 || (hours === 0 && minutes === 0)) {
    if (result.length > 0) {
      result += " ";
    }
    result += minutes + "min";
  }

  if (result === "") {
    result = "0min";
  }

  return result;
}
/*** END HERE */

//
export const reformatLangauges = (key: string) => {
  switch (key) {
    case "FR":
      return "fr-FR";

    case "ES":
      return "es-ES";

    case "AR":
      return "ar-AR";

    case "EN":
      return "en-US";

    default:
      return "en-US"
  }
};

export const reformatLabels = (key: string) => {
  console.log(key)
  switch (key) {
    case "FR":
      return "French";

    case "ES":
      return "Spanish";

    case "AR":
      return "Arabic";

    case "EN":
      return "English";

    default:
      return "English"
  }
};
export const reformatSubtitles = (data: any) => {
  return data.map((e: any, i: number) => ({
    src: defineImageURI(e?.filePath),
    label: reformatLabels(e?.language) ?? "English", //i === 0 ? "English" : "Spanish",
    language: reformatLangauges(e?.language) ?? "English", // i === 0 ? "en-US" : "es-ES",
    kind: "subtitles",
    default: i === 0 ? true : false,
  }));
};

export const reformatChapters = (data: any) => {
  return data.map((e: any, i: number) => ({
    src: defineImageURI(e?.filePath),
    kind: "chapters",
    language: "en-US",
    default: i === 0 ? true : false,
  }));
};
//

export const createGoogleCalendarEvent = (
  startDate: string,
  endDate: string,
  details: string,
  location: string,
  eventText: string
) => {
  // Encode details and location for the URL
  const encodedDetails = encodeURIComponent(details);
  const encodedLocation = encodeURIComponent(location);

  // Construct the Google Calendar event link
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&dates=${startDate}/${endDate}&details=${encodedDetails}&location=${encodedLocation}&text=${encodeURIComponent(
    eventText
  )}`;
};

export const createOutlookCalendarEvent = (
  startDateTime: string,
  endDateTime: string,
  subject: string,
  body: string,
  location: string
) => {
  // Encode body and location for the URL
  const encodedBody = encodeURIComponent(body);
  const encodedLocation = encodeURIComponent(location);

  // Construct the Outlook Calendar event link
  return `https://outlook.office.com/calendar/0/deeplink/compose?body=${encodedBody}&enddt=${endDateTime}&location=${encodedLocation}&path=%2Fcalendar%2Faction%2Fcompose&rru=addevent&startdt=${startDateTime}&subject=${encodeURIComponent(
    subject
  )}`;
};

export const createYahooCalendarEvent = (
  startDateTime: string,
  endDateTime: string,
  title: string,
  description: string,
  location: string
) => {
  // Encode description and location for the URL
  const encodedDescription = encodeURIComponent(description);
  const encodedLocation = encodeURIComponent(location);

  // Construct the Yahoo Calendar event link
  return `https://calendar.yahoo.com/?desc=${encodedDescription}&dur=&et=${endDateTime}&in_loc=${encodedLocation}&st=${startDateTime}&title=${encodeURIComponent(
    title
  )}&v=60`;
};

export const reformatUsername = (fullName: string) => {
  const [firstName, ...lastName] = fullName.split(" ");
  return `${firstName} ${lastName.join(" ").charAt(0)}.`;
};



export const scrollToTop = (e: any, slug: string, router: any) => {
  e.preventDefault();

  // Scroll to the top of the "header-id" div
  const headerElement = document.getElementById('header-id');
  if (headerElement) {
    setTimeout(() => {
      headerElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 1000);
  }
  // Use the slug parameter directly
  const href = `${slug}`;
  router.push(href);
};