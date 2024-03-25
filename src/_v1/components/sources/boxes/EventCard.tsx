import {
  BookMarkedIcon,
  CalendarIcon,
  DateIcon,
  DurationIcon,
  FavoriteIcon,
  FavouriteCircledIcon,
} from "@/_v1/icons";
import React, { useState, Fragment, useEffect } from "react";
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
import {
  onBookMarkCongresBySlug,
  onBookMarkMasterClassesBySlug,
} from "@/_v1/services/master-classes";
import useAlerts from "@/_v1/hooks/useAlerts";
import { Tooltip } from "@mantine/core";
import ImageCard from "./ImageCard";
import { MoroccoFlag } from "@/_v1/icons/sources/flags";
import SaveModuleIcon from "@/_v1/icons/SaveModuleIcon";
import api from "@/_v1/api/api";
import { co } from "@vidstack/react/dist/types/vidstack-react.js";

type Props = {
  id: number | string;
  title: string;
  slug: string;
  // summary: string;
  publishedAt: string | Date;
  // duration: string;
  thunbnail: string;
  bookmarked: boolean;
  paddingBottom: string;
  //
  country: string;
  city: string;
  isBookmarked: boolean;
  item: any;
};

const MasterClassCard = ({
  id,
  title,
  slug,
  // summary,
  publishedAt,
  // duration,
  thunbnail,
  bookmarked,
  isBookmarked,
  paddingBottom,
  country,
  city,
  item,
}: Props) => {
  const { onThemeAlert } = useAlerts();
  const [isAdded, setIsAdded] = useState<boolean>(isBookmarked);
  const [bookmark, setBookMark] = useState(false);
  const [currentId, setCurrentId] = useState("");

  const handleBookMark = async (slug: any, idCongres: any) => {
    try {
      await api?.patch(`/event/bookmark/detail/${slug}`);
      setIsAdded(!isAdded);
      setCurrentId(idCongres);
      let title = !isAdded ? "Success" : "Info";

      let msg = !isAdded
        ? "You've successfully added this extract to your bookmarks. Thank you."
        : "You've successfully remove this extract from your bookmarks. Thank you.";

      let status: "SUCCESS" | "ERROR" | "WARN" | "INFO" = !isAdded
        ? "SUCCESS"
        : "INFO";

      onThemeAlert(title, msg, status, "DARK", 5000);
      setBookMark(true);
    } catch (error) {
      console.log(error);
      setBookMark(false);
    }
  };

  useEffect(() => {
    console.log("test....", id, isBookmarked);
    setIsAdded(isBookmarked);
  }, [id]);

  return (
    <div
      className={`
        bg-[#FFFFFF] rounded-[8px] overflow-hidden justify-start
         sm:max-w-[calc(100%-15px)]  md:max-w-[calc(50%-15px)] lg:max-w-[calc(33.33%-15px)]  xl:max-w-[calc(25%-15px)] w-[calc(100%-15px)]
      `}
    >
      {/* <Image */}
      <div
        className="flex w-[100%] overflow-hidden relative"
        style={{ paddingBottom }}
      >
        <div className="text-[#ffffff]">
          <ImageCard
            height="100%"
            path={defineImageURI(thunbnail)}
            // path="https://res.cloudinary.com/dxjh2x7jn/image/upload/v1699967678/images/noImage_4_yozuxs.jpg"
            iconSize="small"
            link={`/events/${slug}`}
            withOverflow={false}
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
          position="right"
        >
          <div
            onClick={() => handleBookMark(slug, item.id)}
            className={`
                absolute top-[7px] left-[7px] cursor-pointer z-[6] border-2 transition-all p-[2px] 
                border-transparent rounded-full
                ${
                  isAdded
                    ? "hover:border-green-300/30"
                    : "hover:border-primary-normal/30"
                }
              `}
            // ${isAdded > 0 && "opacity-[0.5] pointer-events-none"}
          >
            {isAdded ? (
              <BookMarkedIcon className="w-[30px] text-white" />
            ) : (
              <SaveModuleIcon />
            )}
          </div>
        </Tooltip>
      </div>
      <div className="px-[13px] py-[20px]">
        <div className="flex gap-[15px] items-center">
          <span className="flex items-center gap-[4px]">
            <DateIcon />
            <span className="text-[#2B2C34]  font-[500] ml-[3px] mt-[2.5px] text-[14px] w-[max-content] ">
              {moment(publishedAt).format("MMM DD, YYYY")}
            </span>
          </span>
          <div className="flex gap-[6px] flex-[1.4] items-center ">
            {/* <MoroccoFlag width={24} height={16} /> */}
            <img
              src={country}
              alt={`flag country`}
              className="w-[23px] h-[23px] rounded-full object-cover"
            />
            <Tooltip label={city} withArrow position="top">
              <span
                className="text-[#2B2C34] font-[500] text-[14px] mt-[2.5px]  w-[80%] lg:w-[70%] 2xl:w-[100%] truncate"
                style={{ maxWidth: "max-content" }}
              >
                {/* {country}, */}
                {city}
              </span>
            </Tooltip>
          </div>
        </div>
        <div className="flex flex-wrap gap-[10px] mt-[17px]">
          {Array(3)
            .fill(undefined)
            .map((item: any, _: number) => (
              <Fragment key={_}>
                <span className="bg-[#0049E01A] px-[8px] py-[3px] rounded-[4px] text-[#0049E0] text-[12px]">
                  Cardiologie
                </span>
              </Fragment>
            ))}
        </div>
        <Link href={`/congres/congres-details/${slug}`}>
          <h4 className="mt-[13px] text-[15px] text-[#2B2C34] font-semibold leading-[23.5px] max-w-[95%] hover:underline">
            {title}
          </h4>
        </Link>
        {/* <p className="text-[15px] text-[#94A3BB] mt-[10px]">
            {truncate(summary, 60)}
          </p> */}
      </div>
    </div>
  );
};

export default MasterClassCard;
