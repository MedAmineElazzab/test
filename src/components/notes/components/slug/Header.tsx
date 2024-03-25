import { Bookmark_Note, Flag_Note, Review } from "@/_v1/api/note";
import { ScrollIntoViewAnimation } from "@/_v1/common/types";
import { Badge } from "@/_v1/components";
import {
  BookMarkedIcon,
  DateIcon,
  FavouriteCircledIcon,
  LinkedInnIcon,
  PDFIconRounded,
  ReportFilled,
  WhatsappIcon,
} from "@/_v1/icons";
import ReportIcon from "@/_v1/icons/sources/Report";
import ShareIcon from "@/_v1/icons/sources/ShareIcon";
import { FullPathWithCurrentDomain, formatTimestamp } from "@/_v1/lib/utils";
import { CheckIcon, Divider, Tooltip } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconEye, IconMessageCircle2 } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { useState } from "react";
import { LinkedinShareButton, WhatsappShareButton } from "react-share";
interface HeaderProps {
  slug: string;
  isBookmarked: boolean;
  isFlagged: boolean;
  title: string;
  createdAt: string;
  id: number;
  reviews: {
    noteId: number;
    review: Review;
    reviewId: number;
  }[];
  views: number;
  scrollToComments: ({ alignment  }?: ScrollIntoViewAnimation) => void;
  summary: string;
  onPdfPrintClick: () => void;
}
export  function Header({
  slug,
  isBookmarked,
  title,
  createdAt,
  id,
  reviews,
  views,
  scrollToComments,
  isFlagged,
  summary,
  onPdfPrintClick,
}: HeaderProps) {
  const [isMarked, setIsMarked] = useState<boolean>(isBookmarked);
  const [isReported, setisReported] = useState<boolean>(isFlagged);
  const { asPath } = useRouter();
  const handleBookMarking = async () => {
    try {
      await Bookmark_Note(slug);
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
      await Flag_Note(slug);
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
  return (
    <div className="header flex flex-col py-[20px] gap-5">
      <h1 className="note-title text-[27px] font-[500]">{title}</h1>
      <div className="flex flex-col gap-5">
        <div className="dt-section flex  flex-col items-start gap-3 w800:w-full">
          <div className="flex items-center gap-2">
            <DateIcon className="w-[27px] h-[27px] text-primary-normal" />
            <span>{formatTimestamp(createdAt)} </span>
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
          <div className="flex items-center gap-1">
            <Badge className="speciality w-fit cursor-pointer group text-sm mr-2  gap-2 flex items-center py-1 border hover:shadow transition-all px-2 rounded-[5px]  font-[600] !border-opacity-5 bg-primary-normal border-primary-normal text-white ">
              Note N°11
            </Badge>
            <div className="flex items-center gap-4  text-gray-600 w800:ml-0">
              <span className="flex items-center gap-3">
                <IconEye stroke={1.5} className="w-[24px]" /> {views || 0}
                {" Views"}
              </span>
              <Tooltip withArrow position="bottom" label={"Comments"}>
                <span
                  onClick={() =>
                    scrollToComments({
                      alignment: "center",
                    })
                  }
                  className="flex items-center gap-3 cursor-pointer hover:text-primary-normal hover:underline"
                >
                  <IconMessageCircle2 stroke={1.5} className="w-[21px]" />
                  <span>
                    {reviews.length || 0} {" Comments"}
                  </span>
                </span>
              </Tooltip>
              <div className="ml-3">
                <Divider
                  orientation="vertical"
                  size={"sm"}
                  className="h-[20px]"
                />
              </div>
              <div className="flex items-center gap-4">
                <span>Partager : </span>
                <div className="flex gap-2 items-center ">
                  <WhatsappShareButton
                    title={title}
                    url={FullPathWithCurrentDomain(asPath)}
                    windowHeight={800}
                    windowWidth={800}
                  >
                    <WhatsappIcon className="text-[#34A853]" />
                  </WhatsappShareButton>
                  <div className="">
                    <Divider
                      orientation="vertical"
                      size={"sm"}
                      className="h-[20px]"
                    />
                  </div>
                  <LinkedinShareButton
                    url={FullPathWithCurrentDomain(asPath)}
                    source={FullPathWithCurrentDomain(asPath)}
                    windowHeight={800}
                    windowWidth={800}
                    title={title}
                    summary={summary}
                  >
                    <LinkedInnIcon className="text-[#1976D2]" />
                  </LinkedinShareButton>
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
                    label={"Export PDF"}
                    withArrow
                    position="right"
                    onClick={onPdfPrintClick}
                  >
                    <div className="cursor-pointer">
                      <PDFIconRounded className="text-[#E5252A]" />
                    </div>
                  </Tooltip>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
