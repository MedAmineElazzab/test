import { api } from "@/api";
import { notifications } from "@mantine/notifications";
import { ErrorNotification, SuccessNotification } from "@/hooks";

export async function Bookmark_Serie(slug: string) {
  const data = await api.patch(`/serie/bookmark/${slug}`);
  return data;
}
export async function Flag_Serie(slug: string) {
  const data = await api.patch(`/serie/flag/${slug}`);
  return data;
}
export async function Enroll_Serie(slug: string) {
  const data = await api.post(`/serie/enroll/${slug}`);
  return data;
}

export const handleSerieBokmarking = async (slug: string, isSaved: boolean) => {
  try {
    await Bookmark_Serie(slug);
    SuccessNotification({
      message: isSaved
        ? "vous avez correctement supprimer la série de vos signets"
        : "vous avez ajouté cette série à vos signets.",
      color: "green",
    });
  } catch (error: any) {
    ErrorNotification({
      message: error.message,
      color: "red",
    });
  }
};

export const handleSerieFlagging = async (slug: string, isSaved: boolean) => {
  try {
    await Flag_Serie(slug);
    SuccessNotification({
      message: isSaved
        ? "série non signalé avec success"
        : "série signalé avec success",
      color: "green",
    });
  } catch (error: any) {
    ErrorNotification({
      message: error.message,
      color: "red",
    });
  }
};

export const handleSerieEnrolling = async (
  slug: string,
  isEnrolled: boolean
) => {
  try {
    await Enroll_Serie(slug);
    SuccessNotification({
      message: isEnrolled
        ? "série non signalé avec success"
        : "série signalé avec success",
      color: "green",
    });
  } catch (error: any) {
    ErrorNotification({
      message: error.message,
      color: "red",
    });
  }
};
