import React, { useEffect, useState } from "react";
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
import TagCard from "./TagCard";
import SaveModuleIcon from "@/_v1/icons/SaveModuleIcon";
import SaveModuleIconBlue from "@/_v1/icons/sources/SaveModuleIconBlue";
import { scrollToTop } from "@/_v1/functions";
import LottieAnimation from "@/_v1/components/Animation/LottieAnimation";
import SaveIconBlue from "@/_v1/icons/sources/SaveIconBlue";
import SaveIconSolid from "@/_v1/icons/sources/SaveIconSolid";
import SaveIconOutline from "@/_v1/icons/sources/SaveIconOutline";
import Tags from "../tags";
export const Alert = require("@assets/animations/RedAlert.json");

// expertType
type ExpertType = {
  id: number;
  firstName: string;
  lastName: string;
  language: string;
  professionId: number;
  note: string;
};
// props type for the component
type Props = {
  id: number;
  title: string;
  slug: string;
  date: string;
  content: string;
  isBookmarked: boolean;
  tags?: any;
  disease?: [];
  noteLevel?: string;
  noteType?: string;
  expert?: any;
  noteExpert: ExpertType;
};

// proprs of note Card
const NoteCard = ({
  id,
  title,
  slug,
  date,
  content,
  isBookmarked,
  tags,
  disease,
  noteLevel,
  expert,
  noteExpert,
}: Props) => {
  const { push, query } = useRouter();
  const { onThemeAlert } = useAlerts();
  const [isMarked, setIsMarked] = useState<boolean>(isBookmarked);
  const router = useRouter();
  const handleBookMark = async () => {
    try {
      setIsMarked(!isMarked);
      await onBookMarkNotesBySlug(slug);

      let title = !isMarked ? "Success" : "Info";
      let msg = !isMarked
        ? "You've successfully added this master class to your bookmarks. Thank you."
        : "You've successfully remove this master class from your bookmarks. Thank you.";

      let status: "SUCCESS" | "ERROR" | "WARN" | "INFO" = !isMarked
        ? "SUCCESS"
        : "INFO";

      onThemeAlert(title, msg, status, "LIGHT", 5000);
    } catch (err) {
      setIsMarked(isMarked);
    }
  };

  useEffect(() => {
    setIsMarked(isBookmarked);
  }, [id]);

  return (
    <div
      className="Note flex flex-col   w1100:w-[calc(50%-16px)!important] w1500:w-[calc(25%-16px)!important] w1900:w-[calc(25%-16px)]  justify-between p-[16px] rounded-[8px]  bg-white hover:shadow-note transition-all 
                      gap-[24px] "
    >
      <div className="flex flex-col justify-between h-[100%] gap-[16px] ">
        <div className="flex flex-col gap-[16px] ">
          <div className="flex items-center justify-between">
            <span className=" text-[#667085] text-[14px] font-[400] ">
              Jan 10, 2024
            </span>
            <div className="flex gap-[5px] items-center">
              <div className="w-[35px] h-[35px]">
                {noteLevel == "Danger" && (
                  <LottieAnimation loop animationData={Alert} />
                )}
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
          <Link href={`/notes/${slug}`}>
            <h2 className=" capitalize-first cursor-pointer hover:underline text-[#101828] leading-[20px] max-w-[90%] font-[600] text-[16px]">
              {title}
            </h2>
          </Link>
        </div>
        <div className="flex flex-col gap-[8px]">
          <span className="text-[#667085] text-[12px] font-[600] leading-[15px]">
            Avis d’expert :
          </span>
          <div className="flex items-center gap-[10px]">
            <div className=" relative w-[32px] h-[32px] rounded-full text-[#0049E0] text-[14px] font-[600] flex items-center justify-center bg-[#E6EDFC]">
              {noteExpert?.firstName[0]} {noteExpert.lastName[0]}
            
            </div>
            <div className="flex flex-col ">
              <Link href={`/expert/${slug}`}>
                <h3 className="text-[14px] hover:underline cursor-pointer font-[600] text-[#344054] leading-[20px]">
                  {noteExpert?.firstName} {noteExpert.lastName}
                </h3>
              </Link>
              <span className="leading-[18px] max-w-[136px] truncate  text-[#667085] font-[400] text-[12px]">
                {noteExpert.note}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-t-[#F2F4F7]">
        <Tags tags={tags} disease={disease} />
      </div>
    </div>
  );
};

export default NoteCard;
