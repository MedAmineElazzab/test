import { Agenda, api } from "@/api";
import {
  Divider,
  FlagButton,
  SaveButton,
  SectionCardLayout,
  VideoPlayer,
} from "@/components";
import {
  BACKEND_ROUTES,
  ModuleTitles,
  ModulesPathnames,
  VIDEO_PATHS,
} from "@/enum";
import { ErrorNotification } from "@/hooks";
import { FullPath, formatDateDDMMMYYYY } from "@/lib";
import { handleEventBokmarking, handleEventFlagging } from "@/services/event";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const SEC_MILSECS = 1000;
interface headerAgendaProps
  extends Pick<
    Agenda,
    | "title"
    | "city"
    | "isBookmarked"
    | "isFlagged"
    | "slug"
    | "imagePath"
    | "videoSrc"
  > {
  startDate: string;
}

export function HeaderAgenda({
  city,
  isBookmarked = false,
  title,
  slug,
  isFlagged = false,
  imagePath,
  videoSrc = null,
  startDate,
}: headerAgendaProps) {
  const { query, push } = useRouter();
  const [startAt, setStartAt] = useState<number | undefined>();
  const handleSavingClick = (isSaved: boolean) => {
    handleEventBokmarking(slug, isSaved);
  };
  const handleFlagingClick = (isFlagged: boolean) => {
    handleEventFlagging(slug, isFlagged);
  };
  const onTokenExpired = async () => {
    try {
      const { data } = await api.get(BACKEND_ROUTES.REFRESH_EVENT + "/" + slug);
      return data;
    } catch (error) {
      ErrorNotification({
        message: "error loading video",
      });
      push(ModulesPathnames.EVENT);
    }
  };
  useEffect(() => {
    if (query?.startAt != null && typeof query?.startAt === "string") {
      setStartAt(Number(query.startAt) * SEC_MILSECS);
    }
  }, [query?.startAt]);

  return (
    <SectionCardLayout title={ModuleTitles.AGENDA}>
      <div className="px-3 flex flex-col gap-3 relative w-full ">
        <div className="min-h-12 relative pt-2 flex justify-between items-start">
          <div className="min-h-13 flex items-center">
            <h1 className="capitalize-first leading-29 text-2xl text-primary-darker font-bold">
              {title}
            </h1>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <FlagButton isFlagged={isFlagged} onClick={handleFlagingClick} />
              <SaveButton
                isBookmarked={isBookmarked}
                onClick={handleSavingClick}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 text-gray-600 text-sm">
          <span>{startDate != null && formatDateDDMMMYYYY(startDate)}</span>
          <Divider orientation="vertical" className="w-px h-4" />
          <div className="flex items-center gap-2">
            {city != null && city.country != null && (
              <>
                <span className="text-black">{city.country.alpha2_code}</span>
                <span>{city.name}</span>
              </>
            )}
          </div>
        </div>

        {!videoSrc && imagePath && (
          <div className="p-1 shadow-sm rounded-sm">
            <img
              className="max-h-300 w-full object-cover rounded-sm"
              src={FullPath(imagePath)}
              alt={title}
            />
          </div>
        )}
        {videoSrc != null && (
          <div className="p-1 shadow-sm rounded-sm">
            <div className="w-full object-cover rounded-sm">
              <VideoPlayer
                defaultTime={startAt}
                videoSrc={videoSrc}
                path={VIDEO_PATHS.EVENT}
                onTokenExpired={onTokenExpired}
              />
            </div>
          </div>
        )}
      </div>
    </SectionCardLayout>
  );
}
