import React, { useState, Fragment, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  BookMarkedIcon,
  DateIcon,
  FavouriteCircledIcon,
  PathIcon,
} from "@/_v1/icons";
import { Tooltip } from "@mantine/core";
import Badge from "../badges";
import moment from "moment-timezone";
import useAlerts from "@/_v1/hooks/useAlerts";
import { onBookMarkNotesBySlug } from "@/_v1/services/notes";
import { MoroccoFlag } from "@/_v1/icons/sources/flags";
import { onBookMarkEventBySlug } from "@/_v1/services/events";
import SaveModuleIcon from "@/_v1/icons/SaveModuleIcon";
import SaveIconBlue from "@/_v1/icons/sources/SaveIconBlue";
import { scrollToTop } from "@/_v1/functions";



type Props = {
  id: number;
  title: string;
  slug: string;
  date: string | Date;
  content: string;
  isBookmarked: boolean;
  organizations?: any[];
  tags?: any[];
  //
  city: string;
  country: string;
  flag: string;
};

const CongresCard = ({
  id,
  title,
  slug,
  date,
  content,
  isBookmarked,
  organizations,
  tags,
  city,
  country,
  flag,
}: Props) => {
  const { push, query } = useRouter();
  const { onThemeAlert } = useAlerts();
  const [isMarked, setIsMarked] = useState<boolean>(isBookmarked);
  const router = useRouter()
  const handleBookMark = async () => {
    try {
      setIsMarked(!isMarked);
      await onBookMarkEventBySlug(slug);

      let title = !isMarked ? "Success" : "Info";

      let msg = !isMarked
        ? "You've successfully added this master class to your bookmarks. Thank you."
        : "You've successfully remove this master class from your bookmarks. Thank you.";

      let status: "SUCCESS" | "ERROR" | "WARN" | "INFO" = !isMarked
        ? "SUCCESS"
        : "INFO";

      onThemeAlert(title, msg, status, "LIGHT", 5000);
    } catch (err) {}
  };

  useEffect(() => {
    setIsMarked(isBookmarked);
  }, [id]);

  console.log(tags , "tags")


  return (
    <div
      className={`
        Congres flex flex-col justify-between gap-2 px-[15px] pl-[27px]  py-[21px] rounded-[4px] border bg-white hover:shadow-note transition-all
        2xl:max-w-[calc(25%-18px)] xl:max-w-[calc(33.33%-18px)] lg:max-w-[calc(33.33%-18px)] md:max-w-[calc(50%-18px)] sm:max-w-[calc(100%-18px)] w-[calc(100%-18px)]
      `}
    >
      <div>
        <div className="head-text flex  gap-2 justify-between  items-center">
          <div className="flex items-center gap-[15px] font-[600] lg:gap-[10px]" style={{width:"calc(100% - 55px)"}} >
            {/* border-primary-normal px-[5px] py-[3px] bg-primary-normal/10 border border-opacity-5 */}
            <div className="date group text-sm flex-[1] truncate gap-1 text-primary-normal flex items-center transition-all   text-[13px]  " style={{minWidth:"max-content"}} >
              <DateIcon />
              <span className="text-[#2B2C34] font-[400] ml-[3px] mt-[2.5px] text-[16px]">
                {moment(date).tz("Africa/Casablanca").format("MMM DD, YYYY")}
              </span>
            </div>
              <div className="flex gap-[6px] flex-[1.4] items-center ">
                {/* <MoroccoFlag width={24} height={16} /> */}
                <img
                  src={flag}
                  alt={`${country}, ${city}`}
                  className="w-[23px] h-[23px] rounded-full object-cover"
                />
                  <Tooltip label={city} withArrow position="top">
                    <span 
                        className="text-[#2B2C34] font-[400] text-[16px] mt-[2.5px]  w-[70%] lg:w-[60%] 2xl:w-[80%] truncate"
                        style={{maxWidth:"max-content"}}
                      >
                        {/* {country}, */}
                        {city}
                    </span>
                </Tooltip>

              </div>
          </div>
          <Tooltip
            onClick={() => handleBookMark()}
            styles={{
              tooltip: {
                background: "#191c1f",
              },
            }}
            label={isMarked ? "unBookmark Note" : "Bookmark Note"}
            withArrow
            position="top"
          >
            <div
              className={"cursor-pointer flex  border-2 transition-all p-[2px] border-transparent  rounded-full".concat(
                " ",
                isMarked
                  ? "hover:border-green-300"
                  : "hover:border-primary-normal/30"
              )}
            >
              {isMarked ? (
                <BookMarkedIcon className="w-[31px]" />
              ) : (
                <SaveIconBlue  />
              )}
            </div>
          </Tooltip>
        </div>
        <div className="mt-[17px]">
        
          <div
            className="content text-[17px] hover:underline leading-[26px]  text-[#292d33] max-w-[90%] font-semibold mt-[15px] cursor-pointer flex"
            onClick={(e) =>  {
              document?.getElementById("header-id")?.scrollIntoView(); //{ behavior: "smooth" }
              scrollToTop(e , `/congres/${slug}` , router)}
            }
          >
            {title}
          </div>
          <p className="mt-2 text-sm text-[#546E7A] font-[400] leading-[26px] text-[16px] max-w-[90%] line-clamp-2 ">{content}</p>
          <div className="flex flex-wrap gap-[10px] mt-[15px]">
            {/* <Fragment key={_}>
                <span className="bg-[#0049E01A] px-[8px] py-[3px] rounded-[4px] text-[#0049E0] text-[12px]">
                  {item?.name}
                </span>
              </Fragment> */}
            {tags?.map((item: any, index: number) => (
              <>
                <Tooltip label={item?.type} withArrow position="top">
                  <Badge
                    onClick={() => {
                      push({
                        pathname: "/congres",
                        query: {
                          ...query,
                          [item.type]: item?.id,
                          page: 1,
                        },
                      });
                    }}
                    style={{
                      background: `${item?.color}15`,
                      color: `${item?.color}`,
                      borderColor: `${item?.color}10`,
                    }}
                  >
                    {index === tags?.length - 1 && (
                      <>
                        <PathIcon className="w-[20px]" />
                      </>
                    )}
                    {item?.name}
                  </Badge>
                </Tooltip>
              </>
            ))}
          </div>
          <div className="flex flex-wrap gap-[13px] mt-[15px]  items-center  " style={{rowGap:"0px"}}>
            <span className="text-[16px] text-[#1E293D]  leading-[26px] font-[600] ">Organisateurs :</span>

            {organizations?.map((item: any, index: number) => (
              <>
                <Link
                  className="text-[#0049E0] text-[14px] leading-[26px] font-[400] hover:underline truncate max-w-[55%]"
                  href={`/institutions/${item?.slug}`}
                  onClick={(e) => scrollToTop(e , `/institutions/${item?.slug}` , router)}
                >
                  {item?.name}
                </Link>
              </>
            ))}
          </div>
        </div>
      </div>
      {/* <div className="tags-details mt-5 gap-2 flex flex-wrap">
        {tags?.map((item: any, index: number) => (
          <>
            <Tooltip label={item?.type} withArrow position="top">
              <Badge
                onClick={() => {
                  push({
                    query: {
                      ...query,
                      speciality: 1,
                      page: 1,
                    },
                  });
                }}
                style={{
                  background: `${item?.color}15`,
                  color: `${item?.color}`,
                  borderColor: `${item?.color}10`,
                }}
              >
                {index === tags?.length - 1 && (
                  <>
                    <PathIcon className="w-[15px]" />
                  </>
                )}
                {item?.name}
              </Badge>
            </Tooltip>
          </>
        ))}
      </div> */}
    </div>
  );
};

export default CongresCard;
