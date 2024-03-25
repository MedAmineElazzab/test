
export function TimeFormatHM(seconds: number): string {
  const [hours, minutes] = [(seconds / 3600) | 0, ((seconds % 3600) / 60) | 0];
  return `${String(hours).padStart(2, "0")}h ${String(minutes).padStart(
    2,
    "0"
  )}min`;
}

export function formatDateToCustomString(dateString: string) {
  const options: any = {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  const date = new Date(dateString);
  if (date) {
    return `${date.toLocaleDateString("fr-FR", options)}`;
  } else {
    return dateString;
  }
}

export function convertMillisecondsToMMSS(milliseconds: number): string {
  if (milliseconds < 0) {
    throw new Error("Milliseconds should be a non-negative integer");
  }

  const seconds: number = Math.floor(milliseconds / 1000);
  const minutes: number = Math.floor(seconds / 60);
  const remainingSeconds: number = seconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds
  ).padStart(2, "0")}`;
}

export const formatDate = (date: any) =>
  new Date(date).toLocaleDateString("en-GB");

export const formatDateMMDDYYYHHMM = (date: any) => {
  const options = {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  const formattedDate = new Date(date).toLocaleDateString(
    "en-US",
    options as any
  );
  return `${formattedDate}`;
};
