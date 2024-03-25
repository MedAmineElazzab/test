import { Bookmark_Note, Flag_Note, Review } from "@/_v1/api/note";
import { NoteType } from "@/_v1/enum";
import {
  Badge,
  BookMarkedIcon,
  DateIcon,
  FavouriteCircledIcon,
  LinkedInnIcon,
  PDFIconRounded,
  ReportFilled,
  WhatsappIcon,
} from "@/_v1/icons";
import LinkedInIconOutline from "@/_v1/icons/sources/LinkedInIconOutline";
import MailIconOutline from "@/_v1/icons/sources/MailIconOutline";
import PdfIconOutline from "@/_v1/icons/sources/PdfIconOutline";
import ReportIcon from "@/_v1/icons/sources/Report";
import ReportIconOutline from "@/_v1/icons/sources/ReportIconOutline";
import ReportIconSolid from "@/_v1/icons/sources/ReportIconSolid";
import SaveIconOutline from "@/_v1/icons/sources/SaveIconOutline";
import SaveIconSolid from "@/_v1/icons/sources/SaveIconSolid";
import ShareIcon from "@/_v1/icons/sources/ShareIcon";
import WhatssapIconOutline from "@/_v1/icons/sources/WhatssapIconOutline";
import { FullPathWithCurrentDomain, formatTimestamp } from "@/_v1/lib/utils";
import { CheckIcon, Divider, Tooltip } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconEye, IconMessageCircle2 } from "@tabler/icons-react";
import { $ } from "@vidstack/react/dist/types/vidstack.js";
import { useRouter } from "next/router";
import React, { useState } from "react";
import {
  EmailShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
} from "react-share";

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
  // scrollToComments: ({ alignment  }?: ScrollIntoViewAnimation) => void;
  summary: string;
  noteType: any;
  // onPdfPrintClick: () => void;
}
export default function HeaderNote({
  slug,
  isBookmarked,
  title,
  createdAt,
  id,
  reviews,
  views,
  // scrollToComments,
  isFlagged,
  summary,
  noteType,
}: // onPdfPrintClick,
HeaderProps) {
  const [isMarked, setIsMarked] = useState<boolean>(isBookmarked);
  const [isReported, setisReported] = useState<boolean>(isFlagged);

  const handleBookMark = async () => {
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

  const isNoteTypeValid = Object.values(NoteType).includes(noteType);

  const { asPath } = useRouter();

  return (
    <div
      style={{ boxShadow: "rgba(0, 0, 0, 0.01) 0px 1px 4px" }}
      className="header flex flex-col p-[16px]  bg-[white] gap-[16px] rounded-[8px]  sticky top-[122px] z-[50] "
    >
      <h5
        className="pb-[16px] text-[#667085] text-[12px] leading-[15px] font-[600] uppercase "
        style={{ borderBottom: "1px solid #F2F4F7  " }}
      >
        Notes
      </h5>
      <div className="px-[14px] flex flex-col gap-[4px] ">
        <div className="h-[46px]  pt-[7px] flex  justify-between items-start ">
          <div className="flex items-center gap-[12px]">
            <span className="rounded-[16px] bg-[#F2F4F7] text-[#344054] text-[12px] font-[500] leading-[18px] px-[8px] py-[2px] cursor-default  ">
              Note N°{id}
            </span>
            <span
              className="bg-[white] px-[8px] py-[2px] cursor-pointer text-[12px] font-[500] leading-[18px]  text-[#0049E0] rounded-[16px]   "
              style={{ border: "1px solid #5485EA" }}
            >
              {" "}
              {NoteType[noteType as keyof typeof NoteType]}{" "}
            </span>
          </div>
          <div>
            <div className="flex  items-center gap-2">
              <Tooltip
                onClick={handleReporting}
                styles={{
                  tooltip: {
                    background: "#191c1f",
                  },
                }}
                // label={isReported ? "unflag this Note" : "flag this note"}
                label="unflag this Note"
                withArrow
                position="top"
              >
                <div
                  style={{ boxShadow: "rgba(0, 0, 0, 0.05) 0px 4px 8px" }}
                  className={"cursor-pointer w-[36px] h-[36px] justify-center items-center  flex text-[#0049E0]  transition-all  px-[10px] py-[10px]   bg-[white] rounded-[10px]  border-transparent  ".concat(
                    " ",
                    isReported
                      ? "hover:border-green-300"
                      : "hover:border-primary-normal/30"
                  )}
                >
                  {isReported ? <ReportIconSolid /> : <ReportIconOutline />}
                </div>
              </Tooltip>
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
                  style={{ boxShadow: "rgba(0, 0, 0, 0.05) 0px 4px 8px" }}
                  className={"cursor-pointer w-[36px] h-[36px] justify-center items-center  flex text-[#0049E0] hover:text-[white]  transition-all  px-[11px] py-[10px] hover:bg-[#0049E0]  bg-[white] rounded-[10px]  border-transparent  ".concat(
                    " ",
                    isMarked
                      ? "hover:border-green-300"
                      : "hover:border-primary-normal/30"
                  )}
                >
                  {isMarked ? <SaveIconSolid /> : <SaveIconOutline />}
                </div>
              </Tooltip>
            </div>
          </div>
        </div>
        <div className="min-h-[49px] flex items-center  ">
          <h1 className=" capitalize-first leading-[29px] text-[24px] text-[#101828] font-bold  ">
            {title}
          </h1>
        </div>
        <div className="flex gap-[10px] items-center ">
          <span className="text-[#667085] text-[12px] leading-[15px] font-[400] ">
            {" "}
            Publié le {formatTimestamp(createdAt)}
          </span>
          <Divider orientation="vertical" size={"xs"} className="h-[15px] " />
          <div className="flex items-center gap-[5px] text-[#101828] font-[400] text-[12px] leading-[15px] ">
            {views}
            <span className="text-[#667085]  ">vues</span>
          </div>
          <Divider orientation="vertical" size={"xs"} className="h-[15px]" />
          <div className="flex items-center gap-[5px] text-[#101828] font-[400] text-[12px] leading-[15px] ">
            {reviews.length}
            <span className="text-[#667085]  ">commentaires</span>
          </div>
          <Divider orientation="vertical" size={"xs"} className="h-[15px]" />
          <div className="flex items-center gap-4">
            <span className="text-[#667085] font-[400] text-[12px] leading-[15px] ">
              Partager :{" "}
            </span>
            <div className="flex gap-[14px] items-center ">
            <Tooltip
                styles={{
                  tooltip: {
                    background: "#191c1f",
                  },
                }}
                label={"Share Whatssap"}
                withArrow
                position="right"
                // onClick={onPdfPrintClick}
              >
              <WhatsappShareButton
                url={FullPathWithCurrentDomain(asPath)}
                windowHeight={800}
                windowWidth={800}
              >
                <WhatssapIconOutline />
              </WhatsappShareButton>
              </Tooltip>

              <Tooltip
                styles={{
                  tooltip: {
                    background: "#191c1f",
                  },
                }}
                label={"Share LinkedIn"}
                withArrow
                position="right"
                // onClick={onPdfPrintClick}
              >
              <LinkedinShareButton
                url={"url"}
                source={FullPathWithCurrentDomain(asPath)}
                windowHeight={800}
                windowWidth={800}
                title={"title"}
                summary={"summary"}
              >
                <LinkedInIconOutline />
              </LinkedinShareButton>
              </Tooltip>

              <Tooltip
                styles={{
                  tooltip: {
                    background: "#191c1f",
                  },
                }}
                label={"Export PDF"}
                withArrow
                position="right"
                // onClick={onPdfPrintClick}
              >
                <div className="cursor-pointer">
                  <PdfIconOutline />
                </div>
              </Tooltip>
              <Tooltip
                styles={{
                  tooltip: {
                    background: "#191c1f",
                  },
                }}
                label={"Send e-mail"}
                withArrow
                
                position="right"
                // onClick={onPdfPrintClick}
              >
                <div className="cursor-pointer h-[18px]">
                  <EmailShareButton url={FullPathWithCurrentDomain(asPath)}>
                    <MailIconOutline />
                  </EmailShareButton>
                </div>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}