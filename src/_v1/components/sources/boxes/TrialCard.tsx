import {
  BookMarkedIcon,
  CalendarIcon,
  DurationIcon,
  FavoriteIcon,
} from "@/_v1/icons";
import moment from "moment-timezone";
import Link from "next/link";
import {
  calculateHeight,
  defineImageURI,
  parseDurationString,
} from "@/_v1/functions";
import { Fragment, useState } from "react";
import ThumbnailCard from "./ThumbnailCard";
import { Tooltip } from "@mantine/core";
import SaveModuleIcon from "@/_v1/icons/SaveModuleIcon";
import ImageCard from "./ImageCard";
import { FullPath } from "@/_v1/lib/utils";

type Props = {
  id: number | string;
  title: string;
  thunbnail: string;
  payload: () => void;
  slug?: string;
  place?: string;
  tags?: string[];
  publishedAt?: string;
  isActive: boolean;
};

const TrialCard = ({
  id,
  title,
  slug,
  place,
  payload,
  tags,
  thunbnail,
  publishedAt,
  isActive,
}: Props) => {
  const [isAdded, setIsAdded] = useState(false);
  {
    console.log(thunbnail , "thunbnail")
  }
  return (
    <>
      <div
        className={`
          bg-[#282C38] rounded-[6px] overflow-hidden cursor-pointer
          w-[100%] max-w-[calc(100%-30px)] 
          2xl:max-w-[calc(33.33%-30px)] xl:max-w-[calc(33.33%-30px)] min-h-[307px] lg:max-w-[calc(50%-30px)] md:max-w-[calc(50%-30px)] sm:max-w-[calc(50%-30px)]
          ${isActive && "pointer-events-none cursor-not-allowed"}
          relative
        `}
        onClick={payload}
      >
        {isActive && (
          <>
            <span className="absolute z-[10] top-[10px] text-[12px] leading-[1.1em] right-[10px] bg-[#0049e0] text-[#ffffff] rounded-[4px] px-[4px] py-[4px]">
              Selected Video
            </span>
          </>
        )}
        <div className={`${isActive && "opacity-[0.5]"}`}>
          <div className="flex w-[100%] overflow-hidden relative">
            <div
              className="relative w-[100%] min-h-[160px] "
              style={{ paddingBottom: calculateHeight(295, 165) }}
            >
              <ImageCard
                  height="100%"
                  path={thunbnail}
                  // path="https://res.cloudinary.com/dxjh2x7jn/image/upload/v1699357120/images/cheerful-ethnic-doctor-with-arms-crossed_1_y3qtup.jpg"
                  iconSize="small"
                  link={`/master-class/${slug}`}
              />
            </div>
            <Tooltip
              styles={{
                tooltip: {
                  background: "#191C1F",
                },
              }}
              label={isAdded ? "unBookmark Note" : "Bookmark Note"}
              withArrow
              position="left"
            >
              <div
                // onClick={() => handleBbookmark()}
                className={`
                absolute top-[11.5px] left-[16px] cursor-pointer z-[6] border-2 transition-all p-[2px] 
                border-transparent 
                ${isAdded ? "hover:border-green-300/30" : ""}
              `}
              // ${isAdded > 0 && "opacity-[0.5] pointer-events-none"}
              >
                <div className="mt-[-5px] ml-[-2px]">
                  {isAdded ? (
                    <BookMarkedIcon className="w-[30px] mt-[-6px] ml-[-8px] text-white" />
                  ) : (
                    <SaveModuleIcon className="w-[30px] mt-[-6px] ml-[-8px]" />
                  )}
                </div>
              </div>
            </Tooltip>
          </div>
          <div className="px-[12px] py-[20px]">
            <h4 className="text-[16px] tracking-[0.5px] font-[500] leading-[23px]">{title}</h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default TrialCard;
