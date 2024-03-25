import { Bookmark_Serie, Enroll_Serie, Flag_Serie, Serie } from "@/_v1/api/serie";
import Button from "@/_v1/components/Buttons/Button";
import { SuccessIcon } from "@/_v1/hooks/useAlerts/icons";
import {
  BookMarkedIcon,
  DateIcon,
  FavouriteCircledIcon,
  ReportFilled,
} from "@/_v1/icons";
import ReportIcon from "@/_v1/icons/sources/Report";
import ShareIcon from "@/_v1/icons/sources/ShareIcon";
import { formatTimestamp } from "@/_v1/lib/utils";
import { CheckIcon, Divider, Tooltip } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconEye, IconMessageCircle2 } from "@tabler/icons-react";
import { useState } from "react";

export default function Header({
  serie,
  scrollToComments,
}: {
  serie: Serie;
  scrollToComments: () => void;
}) {
  console.log(serie);
  const [isReported, setisReported] = useState<boolean>(serie?.isFlagged);
  const [isMarked, setIsMarked] = useState<boolean>(serie.isBookmarked);
  const [isEnrolled, setIsEnrolled] = useState<boolean>(serie.isEnrolled);

  const handleBookMarking = async () => {
    try {
      await Bookmark_Serie(serie.slug);
      setIsMarked(!isMarked);
      notifications.show({
        id: "load-data",
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
  const handleReporting = async () => {
    try {
      await Flag_Serie(serie.slug);
      setisReported(!isReported);
      notifications.show({
        id: "load-data",

        title: (
          <span className="font-bold">
            {!isReported
              ? "Note Flagged Successfully!"
              : "Note unFlagged Successfully!"}
          </span>
        ),
        message: (
          <span>
            {!isReported
              ? "Thanks for flagging. We'll review and take action to maintain a safe and valuable environment."
              : "The note has been successfully unflagged. Thank you for helping us maintain a safe and valuable environment."}
          </span>
        ),
        icon: !isReported ? (
          <ReportIcon className="w-[25px] text-white" />
        ) : (
          <CheckIcon className="w-[22px] text-white" />
        ),
        autoClose: 3000,
        styles: {
          icon: {
            width: "2.75rem",
            height: "2.75rem",
            background: !isReported ? "#D80027" : "#1DCB24",
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleEnrolling = async () => {
    try {
      await Enroll_Serie(serie.slug);
      setIsEnrolled(!isEnrolled);
      notifications.show({
        id: "load-data",
        title: (
          <span className="font-bold">This note is Enrolled successfully!</span>
        ),
        message: (
          <span>
            You can now easily access and revisit this important information
            whenever you need
          </span>
        ),
        icon: <SuccessIcon className="w-[40px] text-white" />,
        autoClose: 3000,
        styles: {
          icon: {
            width: "2.75rem",
            height: "2.75rem",
            background: "#0049E0",
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="header flex flex-col py-[20px] gap-5">
      <h1 className="note-title text-[27px] font-[500]">{serie?.title}</h1>
      <div className="flex flex-col gap-5">
        <div className="dt-section flex items-center w800:flex-col w800:items-start  w800:gap-3 w800:w-full">
          <div className="flex items-center gap-2">
            <DateIcon className="w-[27px] h-[27px] text-primary-normal" />
            <span>{formatTimestamp(serie?.createdAt)} </span>
            <div className="ml-3">
              <Divider
                orientation="vertical"
                size={"sm"}
                className="h-[20px]"
              />
            </div>
            <div className="flex  items-center gap-2">
              <Tooltip
                onClick={handleReporting}
                styles={{
                  tooltip: {
                    background: "#191c1f",
                  },
                }}
                label={isReported ? "unflag this Note" : "flag this note"}
                withArrow
                position="top"
              >
                <div
                  className={
                    "cursor-pointer  transition-all text-[#D80027] hover:bg-[#D8002715] w-[35px] h-[35px] border border-transparent hover:border-[#D8002705] hover:shadow flex justify-center items-center rounded-full"
                  }
                >
                  {isReported ? (
                    <ReportFilled className="w-[24px] " />
                  ) : (
                    <ReportIcon className="w-[24px] " />
                  )}
                </div>
              </Tooltip>
              <div className="">
                <Divider
                  orientation="vertical"
                  size={"sm"}
                  className="h-[20px]"
                />
              </div>
              <Tooltip
                styles={{
                  tooltip: {
                    background: "#191c1f",
                  },
                }}
                label={"Share this note"}
                withArrow
                position="top"
              >
                <a
                  target="_blank"
                  className={
                    "cursor-pointer  transition-all text-primary-normal hover:bg-primary-light w-[35px] h-[35px] border border-transparent hover:border-primary-normal/5 hover:shadow flex justify-center items-center rounded-full"
                  }
                  href="mailto:someone@gmail.com"
                >
                  <ShareIcon className="w-[29px]" />
                </a>
              </Tooltip>
              <div className="">
                <Divider
                  orientation="vertical"
                  size={"sm"}
                  className="h-[20px]"
                />
              </div>
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
                  className={"cursor-pointer flex justify-center items-center  border-2 transition-all p-[1px] border-transparent  rounded-full".concat(
                    " ",
                    isMarked
                      ? "hover:border-green-300"
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
            </div>
          </div>
          <div className="flex items-center gap-1 ml-1">
            <div className="flex items-center gap-4 ml-4 text-gray-600 w800:ml-0">
              <span className="flex items-center gap-3">
                <IconEye stroke={1.5} className="w-[24px]" /> {serie.views || 0}
                {" Views"}
              </span>
              <Tooltip withArrow position="bottom" label={"Comments"}>
                <span
                  onClick={scrollToComments}
                  className="flex items-center gap-3 cursor-pointer hover:text-primary-normal hover:underline"
                >
                  <IconMessageCircle2 stroke={1.5} className="w-[21px]" />
                  <span>
                    {serie.reviewsCount || 0} {" Comments"}
                  </span>
                </span>
              </Tooltip>
            </div>
          </div>
        </div>
        <div className="dt-section-2 flex flex-col gap-3 ">
          <p className="text-slate-900 w-[93%] leading-7 w1500:w-full text-justify ">
            {serie.subtitle}
          </p>
          {!isEnrolled && (
            <div className="flex items-center gap-5 mt-4">
              <Button
                onClick={handleEnrolling}
                className="px-8 hover:bg-primary-normal/90"
              >
                Enroll now
              </Button>
              <div className="flex flex-col justify-between font-[400]">
                <span className="text-sm">
                  Try for Free: Enroll to start full access free trial
                </span>
                <span className="text-sm">Medical aid available</span>
              </div>
            </div>
          ) }
        </div>
      </div>
    </div>
  );
}
