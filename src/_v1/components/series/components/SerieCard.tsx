import { Bookmark_Serie, Serie } from "@/_v1/api/serie";
import Badge from "@/_v1/components/badges/Badge";
import { scrollToTop } from "@/_v1/functions";
import {
  BookMarkedIcon,
  CertificationBadge,
  FavouriteCircledIcon,
  FavouriteCircledIconWhite,
  PathIcon,
} from "@/_v1/icons";
import { FullPath, secondsToHHMMSS } from "@/_v1/lib/utils";
import { Tooltip } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconPlayerPlayFilled, IconStarFilled } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function SerieCard(serie: Serie) {
  const { push, query } = useRouter();
  const [isMarked, setIsMarked] = useState<boolean>(serie.isBookmarked);
  const router = useRouter();
  const handleBookMarking = async () => {
    try {
      await Bookmark_Serie(serie.slug);
      setIsMarked(!isMarked);
      notifications.show({
        id: "load-data",
        // color: "#1DCB24",
        title: (
          <span className="font-bold">
            {isMarked
              ? "This note has been removed from bookmark successfully!"
              : "This note is bookmared successfully!"}
          </span>
        ),

        message: (
          <span>
            {isMarked
              ? "Your organization system is now updated, providing a streamlined and personalized experience. "
              : "You can now easily access and revisit this important information whenever you need"}
          </span>
        ),
        icon: isMarked ? (
          <FavouriteCircledIcon className="w-[40px] text-white" />
        ) : (
          <BookMarkedIcon className="w-[40px] text-white" />
        ),
        autoClose: 3000,
        styles: {
          icon: {
            width: "2.75rem",
            height: "2.75rem",
            background: isMarked ? "#0049E0" : "#1DCB24",
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  ("");
  return (
    <div
      style={{ boxShadow: "0px 1px 2px 0px #1018280D" }}
      className="flex flex-col rounded-lg bg-white transition-all overflow-hidden hover:shadow-note"
    >
      <div
        style={{
          backgroundImage: `url(${FullPath(serie?.imagePath)})`,
        }}
        className="relative image-container  h-[220px] px-2 py-2 w-full bg-cover bg-center"
      >
        <Link
          href={"/series/" + serie.slug}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 "
        >
          <div className="w-[50px] h-[50px] rounded-full bg-white/50 flex justify-center items-center ">
            <IconPlayerPlayFilled className="w-[20px] text-white" />
          </div>
        </Link>
        <div className="relative flex items-start justify-between">
        <Tooltip
            onClick={handleBookMarking}
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
                  ? "hover:border-[#1DCB2440]"
                  : "hover:border-primary-normal/30"
              )}
            >
              {isMarked ? (
                <BookMarkedIcon className="w-[31px]" />
              ) : (
                <FavouriteCircledIcon className="w-[31px]" />
              )}
            </div>
          </Tooltip>
          <div className="flex flex-col items-end gap-1">
            <Badge className="bg-primary-normal  text-white border-primary-normal">
              {serie._count.SerieModule} Modules
            </Badge>

            {serie.certification && (
              <Badge className="flex !p-[1px] !px-2 items-center bg-primary-normal text-white border-primary-normal">
                <CertificationBadge className="w-[20px] h-[25px]" /> Certified
              </Badge>
            )}
          </div>
        </div>
        <Badge className="bg-black/40 absolute bottom-2 text-white border-transparent">
          {secondsToHHMMSS(serie.duration)}
        </Badge>
      </div>
      <div className="details w-full  bg-white  px-3 py-3 flex flex-col gap-4">
        <div className="flex flex-wrap gap-2">
          <Badge
            onClick={() => {
              push({
                query: {
                  ...query,
                  speciality: serie.speciality.id,
                  page: 1,
                },
              });
            }}
            style={{
              background: serie.speciality.color + "15",
              color: serie.speciality.color,
              borderColor: serie.speciality.color + "10",
            }}
          >
            {serie.speciality.name}
          </Badge>

          <Badge
            onClick={() => {
              push({
                query: {
                  ...query,
                  disease: serie?.disease.id,
                  page: 1,
                },
              });
            }}
            style={{
              background: serie.disease?.color + "15",
              color: serie.disease?.color,
              borderColor: serie.disease?.color + "10",
            }}
          >
            <PathIcon className="w-[20px]" />
            <span className="text-sm">{serie.disease?.name}</span>
          </Badge>
        </div>
        <div className="flex flex-col gap-2">
          <Link
            href={"/series/" + serie.slug}
            onClick={(e) => scrollToTop(e, "/series/" + serie.slug, router)}
            className="line-clamp-1 leading-6 text-[17px] font-[500]  hover:underline "
          >
            {serie.title}
          </Link>
        </div>
        <div className="rating flex items-center gap-2">
          <div className="flex items-center gap-2">
            <b className="text-[17px]">{serie?.reviews?.toFixed(1)}</b>
            <IconStarFilled className="w-[18px] mb-[3px] text-primary-normal" />
          </div>
          <div className="text-[#636363] mb-[2.5px] ">{`(${serie?.reviewsCount} reviews)`}</div>
        </div>
      </div>
    </div>
  );
}
