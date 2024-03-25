import {
  BookMarkedIcon,
  CalendarIcon,
  DurationIcon,
  FavoriteIcon,
  FavouriteCircledIcon,
  PathIcon,
  StarBadgeIcon,
} from "@/_v1/icons";
import React, { useState, SVGProps } from "react";
import moment from "moment-timezone";
import Link from "next/link";
import {
  calculateHeight,
  convertTimeToHours,
  defineImageURI,
  formatTimeStringToDuration,
  parseDurationString,
  scrollToTop,
} from "@/_v1/functions";
import { useRouter } from "next/router";
import { onBookMarkMasterClassesBySlug } from "@/_v1/services/master-classes";
import useAlerts from "@/_v1/hooks/useAlerts";
import { Tooltip } from "@mantine/core";
import Badge from "../badges";
import ImageCard from "./ImageCard";
import ThumbnailCard from "./ThumbnailCard";
import { onBookMarkModulesBySlug } from "@/_v1/services/modules";
import VerifiedIcon from "@/_v1/icons/sources/VerifiedIcon";
import SaveModuleIcon from "@/_v1/icons/SaveModuleIcon";

type Props = {
  id: number | string;
  title: string;
  slug: string;
  publishedAt: string;
  duration: string;
  thunbnail: string;
  isBookmarked: boolean;
  paddingBottom: string;
  expert: { name: string; picture: string ; slug:String };
  partner: { name: string; picture: string ; slug:String};
  reviews: { value: number; count: number };
  tags: any[];
  pathology: any;
  className?: string;
};

const ModuleCard = ({
  id,
  title,
  slug,
  publishedAt,
  duration,
  thunbnail,
  isBookmarked,
  paddingBottom,
  expert,
  partner,
  reviews,
  tags,
  pathology,
  className = "",
}: Props) => {
  const { push, query } = useRouter();
  const { onThemeAlert } = useAlerts();
  const [isAdded, setIsAdded] = useState(isBookmarked);
  const router = useRouter()
  const handleBbookmark = async () => {
    try {
      setIsAdded(!isAdded);
      await onBookMarkModulesBySlug(slug);

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

  return (
    <>
      <div
        className={`
        bg-[#FFFFFF] rounded-[8px] overflow-hidden relative
          2xl:max-w-[calc(25%-35px)] xl:max-w-[calc(25%-25px)] lg:max-w-[calc(33.33%-35px)] md:max-w-[calc(50%-35px)] sm:max-w-[calc(100%-35px)] w-[calc(100%-35px)]
          ${className}
          min-w-[auto]
          group
        `}
      >
        {/* <Image */}
        <div
          className="flex w-[100%] overflow-hidden relative"
          style={{ paddingBottom }}
        >
          <div className="text-white">
            <ImageCard
              height="100%"
              // path={defineImageURI(thunbnail)}
              path="https://res.cloudinary.com/dxjh2x7jn/image/upload/v1699967678/images/noImage_4_yozuxs.jpg"
              iconSize="small"
              link={`/modules/${slug}`}
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
            position="left"
          >
            <div
              onClick={() => handleBbookmark()}
              className={`
                absolute top-[11.5px] left-[16px] cursor-pointer z-[6] border-2 transition-all p-[2px] 
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
                <BookMarkedIcon className="w-[30px] mt-[-5px] ml-[-5px] text-white" />
              ) : (
                <SaveModuleIcon className="w-[30px]  " />
              )}
            </div>
          </Tooltip>

          <div
            className="absolute top-[11.5px] right-[7px] rounded-[4px] z-[10px] text-[black] px-[6px] pr-[10px]
                         py-[4px] text-[11.5px] !leading-[1em] flex gap-[4px] items-center
                          max-w-[72%] font-[400]
                         "
            style={{ backgroundColor: "white" }}
          >
            <PathIcon className="w-[18px]" />
            {pathology?.name}
          </div>

          <div className="bottom-[8.5px] h-[20px] right-[8.5px] px-[8px] font-[500] py-[4px] bg-[#242730]/50 text-[#ffffff] z-[10] absolute rounded-[4px] overflow-hidden !leading-[1em] text-[10px]">
            {formatTimeStringToDuration("02:07:00")}
          </div>
        </div>

        {/*  */}
        <div className="px-[17px] py-[20px] flex flex-col justify-between">
          <div className="relative pb-[12.5px] flex mb-[-45px] top-[-45px] gap-[7px]">
            <div className="relative">
              <div className="border-[3px] border-[#ffffff]/50 p-[6px] rounded-full">
                <div className="relative w-[45px] h-[45px] overflow-hidden rounded-full">
                  <ThumbnailCard
                    path={expert?.picture}
                    height="100%"
                    withOverflow={false}
                  />
                </div>
              </div>
              {/* <VerifyIcon className="absolute bottom-[0] right-[0] w-[24px] h-[24px]" />
               */}
              <VerifiedIcon className="text-primary-normal absolute bottom-[0] right-[0] w-[24px] h-[24px] bg-[#ffffff] border-[0.5px] border-[#ffffff] rounded-full " />
            </div>
            <div>
              <h4 className="mt-[30px]">
                <span className="font-[600] text-[15.5px] text-[#2B2C34] leading-[22px] "  >Doctor : 
                   <span className="font-[400] hover:underline cursor-pointer"
                     onClick={(e) => scrollToTop(e , `/experts/${expert.slug}` , router) }
                         > {expert?.name}
                   </span>  
                 </span>
              </h4>
            </div>
          </div>

          <div className="flex gap-[10px] items-center">
            <div className="relative w-[37px] h-[33px] overflow-hidden rounded-[4px]">
              <ThumbnailCard
                path={partner?.picture}
                height="34px"
                withOverflow={false}
              />
            </div>
            <h5 className="w-[calc(100%-34px)] text-[15.5px] text-[#1F1F1F] font-[400]  ">
              <b className="font-[600]" >Partenaire : </b> 
              <span className="font-[400] hover:underline cursor-pointer"
                     onClick={(e) => scrollToTop(e , `/institutions/${partner?.slug}` , router) } >
                         {partner?.name} 
                   </span>  
            </h5>
          </div>

          <Link href={`/modules/${slug}`} onClick={(e) =>   scrollToTop(e ,`/modules/${slug}` , router ) } >
            <h4 className="mt-[10px] text-[14.5px] leading-[22px] font-[600] group-hover:underline px-[3px]">
              {title}
            </h4>
          </Link>

          <div className="tags-details mt-[15px] gap-[12px] flex flex-wrap pb-[30px]   ">
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
                    {/* {index === tags?.length - 1 && (
                        <>
                          <PathIcon className="w-[20px]" />
                        </>
                      )} */}
                    {item?.name}
                  </Badge>
                </Tooltip>
              </>
            ))}
          </div>
        </div>
        <div className="flex gap-[7.5px] items-center text-[14px] pt-[14.5px] absolute bottom-[15px] left-[15px]">
          <div className="text-[15.5px] font-[600] leading-[27px]">
            {reviews?.value}
          </div>
          <StarBadgeIcon
            color="#FFCC00"
            className="mt-[-2px] w-[15px] h-[15px]"
          />
          <span className="text-[#636363] font-[400] text-[13.5px] leading-[20px]">
            ({reviews?.count} reviews)
          </span>
        </div>
      </div>
    </>
  );
};

const VerifyIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 15 15"
    fill="none"
    {...props}
  >
    <rect
      width={12.401}
      height={12.401}
      x={1.035}
      y={1.333}
      fill="#0049E0"
      stroke="#fff"
      strokeWidth={1.772}
      rx={2.657}
    />
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.063}
      d="M5.617 7.825v0a1.772 1.772 0 0 0 2.505 0l1.253-1.253"
    />
  </svg>
);

export default ModuleCard;
