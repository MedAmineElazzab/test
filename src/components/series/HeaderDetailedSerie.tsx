import {
  CertifIcon,
  FlagButton,
  Flex,
  ModuleHeaderBottomSection,
  SaveButton,
  SectionCardLayout,
  Text,
  VideoPlayer,
} from "@/components";
import { ModuleTitles, VIDEO_PATHS } from "@/enum";
import { FullPath } from "@/lib";
import { handleSerieBokmarking, handleSerieFlagging } from "@/services";

interface HeaderDetailedSerieProps {
  id: number;
  slug: string;
  isBookmarked: boolean;
  isFlagged: boolean;
  title: string;
  createdAt: string;
  reviews: number;
  views: number;
  subtitle: string;
  certified: boolean;
  imagePath: string | null;
  videoSrc?: string | null;
}
export function HeaderDetailedSerie({
  slug,
  isBookmarked,
  title,
  createdAt,
  reviews,
  views,
  isFlagged,
  subtitle,
  certified,
  imagePath,
  videoSrc,
  id,
}: HeaderDetailedSerieProps) {
  const HandleSavingClick = (isSaved: boolean) => {
    handleSerieBokmarking(slug, isSaved);
  };
  const HandleFlagingClick = (isFlagged: boolean) => {
    handleSerieFlagging(slug, isFlagged);
  };
  return (
    <SectionCardLayout title={ModuleTitles.SERIE}>
      <div className="px-3 flex flex-col gap-1 relative w-full ">
        <div className="h-12 relative pt-2 flex  justify-between items-center">
          <div className="min-h-13 flex items-center">
            <h1 className="capitalize-first leading-29 text-2xl text-primary-darker font-bold">
              {title}
            </h1>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <FlagButton isFlagged={isFlagged} onClick={HandleFlagingClick} />
              <SaveButton
                isBookmarked={isBookmarked}
                onClick={HandleSavingClick}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-10 items-center">
          <ModuleHeaderBottomSection
            comments={reviews}
            date={createdAt}
            vues={views || 0}
          />
        </div>
        {imagePath && (
          <div className="p-1 shadow-sm rounded-sm">
            <img
              className="max-h-300 w-full object-cover rounded-sm"
              src={FullPath(imagePath)}
              alt={title}
            />
          </div>
        )}

        {videoSrc && (
          <div className="p-1 shadow-sm rounded-sm">
            <div className="w-full object-cover rounded-sm">
              <VideoPlayer videoSrc={videoSrc} path={VIDEO_PATHS.SERIE} />
            </div>
          </div>
        )}

        <div className="flex flex-col gap-4">
          <Text className="mt-3 text-sm leading-6 text-gray-500">
            {subtitle}
          </Text>
        </div>

        {certified && (
          <Flex
            direction={"row"}
            align={"center"}
            className="text-primary-normal mt-3 gap-2"
          >
            <CertifIcon className="text-primary-normal" />
            <Text className="text-sm font-medium">
              Cette série est certifiée
            </Text>
          </Flex>
        )}
      </div>
    </SectionCardLayout>
  );
}
