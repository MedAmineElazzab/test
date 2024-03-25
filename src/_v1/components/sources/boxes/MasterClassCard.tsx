import {
  BookMarkedIcon,
  CalendarIcon,
  DurationIcon,
  FavoriteIcon,
  FavouriteCircledIcon,
} from "@/_v1/icons";
import React, { useEffect, useState } from "react";
import moment from "moment-timezone";
import Link from "next/link";
import {
  calculateHeight,
  convertTimeToHours,
  defineImageURI,
  parseDurationString,
  truncate,
} from "@/_v1/functions";
import { useRouter } from "next/router";
import { onBookMarkMasterClassesBySlug } from "@/_v1/services/master-classes";
import useAlerts from "@/_v1/hooks/useAlerts";
import { Tooltip } from "@mantine/core";
import ImageCard from "./ImageCard";
import SaveModuleIcon from "@/_v1/icons/SaveModuleIcon";

type Props = {
  id: number | string;
  title: string;
  slug: string;
  summary: string;
  publishedAt: string;
  duration: string;
  thunbnail: string;
  bookmarked: boolean;
  paddingBottom: string;
};

const MasterClassCard = ({
  id,
  title,
  slug,
  summary,
  publishedAt,
  duration,
  thunbnail,
  bookmarked,
  paddingBottom,
}: Props) => {
  const { onThemeAlert } = useAlerts();
  const [isAdded, setIsAdded] = useState(bookmarked);

  const handleBbookmark = async () => {
    try {
      await onBookMarkMasterClassesBySlug(slug);
      setIsAdded(!isAdded);

      // update...

      let title = !isAdded ? "Success" : "Info";

      let msg = !isAdded
        ? "You've successfully added this master class to your bookmarks. Thank you."
        : "You've successfully remove this master class from your bookmarks. Thank you.";

      let status: "SUCCESS" | "ERROR" | "WARN" | "INFO" = !isAdded
        ? "SUCCESS"
        : "INFO";

      onThemeAlert(title, msg, status, "DARK", 5000);
    } catch (err) {}
  };

  useEffect(() => {
    setIsAdded(bookmarked);
  }, [id]);
  {console.log(publishedAt , "here")}


  return (
    <>
      <div
        className={`
        bg-[#282C38] rounded-[8px] overflow-hidden
         2xl:max-w-[calc(25%-24px)] xl:max-w-[calc(25%-24px)] lg:max-w-[calc(33.33%-24px)] md:max-w-[calc(50%-24px)] sm:max-w-[calc(100%-24px)] w-[calc(100%-24px)]
      `}
      >
        {/* <Image */}
        <div
          className="flex w-[100%] overflow-hidden relative"
          style={{ paddingBottom }}
        >
          <ImageCard
            height="100%"
            path={defineImageURI(thunbnail)}
            // path="https://res.cloudinary.com/dxjh2x7jn/image/upload/v1699357120/images/cheerful-ethnic-doctor-with-arms-crossed_1_y3qtup.jpg"
            iconSize="small"
            link={`/master-class/${slug}`}
          />
          {/* <button
            className={`
              absolute h-[27.5px] w-[27.5px] bg-[#0049E0] top-[15px] left-[15px] flex items-center justify-center rounded-full cursor-pointer
              ${isAdded > 0 && "opacity-[0.5] pointer-events-none"}
            `}
            onClick={() => handleBbookmark()}
          >
            <FavoriteIcon
              width={20}
              height={20}
              color="#ffffff"
              className="font-bold"
            />
          </button> */}
          <Tooltip
            styles={{
              tooltip: {
                background: "#191C1F",
              },
            }}
            label={isAdded ? "unBookmark Note" : "Bookmark Note"}
            withArrow
            position="right"
          >
            <div
              onClick={() => handleBbookmark()}
              className={`
                absolute top-[7px] left-[7px] cursor-pointer z-[6] border-2 transition-all p-[2px] 
                border-transparent 
                ${
                  isAdded
                    ? "hover:border-green-300/30"
                    : ""
                }
              `}
              // ${isAdded > 0 && "opacity-[0.5] pointer-events-none"}
            >
              {isAdded ? (
                <BookMarkedIcon className="w-[30px] text-white" />
              ) : (
                <SaveModuleIcon className="w-[30px]" />
              )}
            </div>
          </Tooltip>
        </div>
        <div className="px-[15px] py-[20px]">
          <div className="flex gap-[36px] items-center">
            <span className="flex items-center gap-[7.5px]">
              <CalendarIcon color="#94A3BB" width={18} height={18} />
              <span className=" text-[#94A3BB] font-[400] leading-[16px] text-[15px] ">
                {/* {moment(publishedAt).format("MMM DD, YYYY")} */}
                {moment(publishedAt).format('DD/MM/YYYY')}
              </span>
            </span>
            <span className="flex items-center gap-[7.5px]">
              <DurationIcon color="#94A3BB" width={18} height={18} />
              <span className=" text-[#94A3BB] font-[400] leading-[16px] text-[15px] ">
                {moment(publishedAt).format('HH[H]mm')}
              </span>
            </span>
          </div>
          <Link href={`/master-class/${slug}`}>
            <h4 className="mt-[16px] text-[16px] font-[600] leading-[25px]">{title}</h4>
          </Link>
          <p className="text-[15px] text-[#94A3BB] mt-[10px] line-clamp-2 ">
            {summary}
          </p>
        </div>
      </div>
    </>
  );
};

export default MasterClassCard;
