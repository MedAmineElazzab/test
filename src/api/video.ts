import { ErrorNotification } from "@/hooks";
import { Wording } from "@/lib";
import api from "./api";

export const TrackVideo = async (
  videotrakingPath: string,
  currentTime: number,
  isFinished: boolean
) => {
  try {
    await api.patch(videotrakingPath, {
      progress: currentTime,
      isFinished,
    });
  } catch (error) {
    ErrorNotification({
      message: Wording.error,
    });
  }
};
