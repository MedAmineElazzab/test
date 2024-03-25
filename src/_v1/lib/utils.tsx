import { baseURL } from "@/_v1/api/api";
import { notifications } from "@mantine/notifications";
import { IconX } from "@tabler/icons-react";
import { AxiosError } from "axios";

export const IsSSR = () => typeof window === "undefined";

export function toFrenchNumber(number: number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const formatDateToFrench = (inputDate: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const frenchDate = new Date(inputDate).toLocaleDateString("fr-FR", options);
  return frenchDate;
};

export const formatDateAndTimeToFrench = (inputDate: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  };
  const frenchDate = new Date(inputDate).toLocaleDateString("fr-FR", options);
  return frenchDate;
};

export const Limit = (str: string) => {
  if (str.length <= 300) {
    return str;
  } else {
    return str.substring(0, 300);
  }
};

export const removeHTMLTags = (str: string) => {
  return str.replace(/<[^>]*>/g, " ");
};

export function hexToRgba(hex: string, alpha: number): string | null {
  // Remove the hash at the beginning if present
  hex = hex?.replace(/^#/, "");

  // Parse the hex color components
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  // Validate alpha value
  if (alpha < 0 || alpha > 1) {
    console.error("Alpha value should be between 0 and 1");
    return null;
  }

  // Return the RGBA color in the format "rgba(r, g, b, alpha)"
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
export function formatTimestamp(timestamp: string): string {
  try {
    const date = new Date(timestamp);
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      timeZone: "UTC",
      timeZoneName: "short",
    })?.format(date);

    return formattedDate
      ? formattedDate.replace("UTC", "GMT+1")
      : "Invalid Date";
  } catch (error) {
    return "Invalid Date";
  }
}

export function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds
  ).padStart(2, "0")}`;
}

export function FullPath(path: string) {
  if (path) {
    return baseURL + path;
  } else {
    return "/assets/images/placeholder.png";
  }
}
export function FullPathWithCurrentDomain(path: string) {
  const currentDomain =
    typeof window != undefined && !IsSSR() ? window?.location?.origin : "";
  if (currentDomain) {
    return currentDomain + path;
  }
  else {
    return  ""
  }
}

export const showErrorNotification = (error?: AxiosError) => {
  notifications.show({
    id : "load-data",
    color: "red",
    title: (
      <span className="font-bold">
        Something went wrong{" "}
        {(process.env.NEXT_ENV != "PRODF" &&
          "• " + error?.response?.statusText) ||
          String(error)}
      </span>
    ),
    message: <span>Please try again later...</span>,
    icon: <IconX className="w-[25px] text-white" />,
    autoClose: 4000,
    styles: {
      icon: {
        width: "2.75rem",
        height: "2.75rem",
      },
      root: {
        boxShadow:
          "0px 0px 0px 0px rgba(0, 0, 0, 0.04), 0px 1px 2px 0px rgba(0, 0, 0, 0.04), 0px 3px 3px 0px rgba(0, 0, 0, 0.03), 0px 7px 4px 0px rgba(0, 0, 0, 0.02);",
        border: "1px solid #e5e7eb",
      },
    },
  });
};

export const showLoadingNotification = () => {
  notifications.clean();
  notifications.show({
    id : "load-data",  
    color: "rgb(0, 73, 224)",
    loading: true,
    title: <span className="font-bold">Your request is being treated</span>,
    message: <span>Your data is being loaded. Please wait...</span>,
    icon: <IconX className="w-[25px] text-white" />,
    autoClose: 4000,
    styles: {
      icon: {
        width: "2.75rem",
        height: "2.75rem",
      },
      root: {
        boxShadow:
          "0px 0px 0px 0px rgba(0, 0, 0, 0.04), 0px 1px 2px 0px rgba(0, 0, 0, 0.04), 0px 3px 3px 0px rgba(0, 0, 0, 0.03), 0px 7px 4px 0px rgba(0, 0, 0, 0.02);",
        border: "1px solid #e5e7eb",
      },
    },
  });
};


export function secondsToHMS(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');
  // const formattedSeconds = String(remainingSeconds).padStart(2, '0');
  return `${formattedHours}:${formattedMinutes}`;
}



export function convertMillisecondsToHHMMSS(milliseconds: number): string {
  // Ensure the input is a non-negative number
  
  if (milliseconds < 0 || isNaN(milliseconds)) {
    throw new Error("Invalid input. Please provide a non-negative number of milliseconds.");
  }

  // Convert milliseconds to seconds
  const totalSeconds = Math.floor(milliseconds / 1000);

  // Calculate hours, minutes, and remaining seconds
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  // Format the result as "hh:mm:ss"
  const formattedTime = `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;

  return formattedTime;
}

// Helper function to pad single-digit numbers with leading zero
function padZero(num: number): string {
  return num < 10 ? `0${num}` : `${num}`;
}

export function secondsToHHMMSS(seconds: number): string {
  const pad = (num: number) => num.toString().padStart(2, '0');
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.round(seconds % 60); // Round to the nearest whole second
  return `${pad(hours)}:${pad(minutes)}:${pad(remainingSeconds)}`;

}
