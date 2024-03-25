import {
  Bookmark_Module,
  DisLike_Module,
  Flag_Module,
  Like_Module,
  Module,
} from "@/_v1/api/module";
import {
  BookMarkedIcon,
  DislikeIcon,
  DislikeIconFilled,
  FavouriteCircledIcon,
  LikeIcon,
  LikeIconFilled,
  ReportFilled,
} from "@/_v1/icons";
import DislikeFilled from "@/_v1/icons/sources/DislikeFilled";
import ReportIcon from "@/_v1/icons/sources/Report";
import ShareIcon from "@/_v1/icons/sources/ShareIcon";
import { CheckIcon, Divider, Tooltip } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Header(Module: Module) {
  const [isMarked, setIsMarked] = useState<boolean>(Module.isBookmarked);
  const [isReported, setisReported] = useState<boolean>(Module.isFlagged);
  const [isLiked, setIsLiked] = useState<boolean>(Module.isLiked);
  const [isDisliked, setIsDisliked] = useState<boolean>(Module.isDisliked);
  const { push } = useRouter();
  
  
  const handleBookMarking = async () => {
    try {
      await Bookmark_Module(Module.slug);
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
      await Flag_Module(Module.slug);
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
  const handleLiking = async () => {
    try {
      await Like_Module(Module.slug);
      setIsDisliked(false);
      notifications.show({
        id: "load-data",
        title: (
          <span className="font-bold">
            {!isLiked
              ? "Liked Successfully! 🌟"
              : "Removed Like Successfully! 😞"}
          </span>
        ),
        message: (
          <span>
            {!isLiked
              ? "Your taste is impeccable! Get ready for more recommendations tailored just for you."
              : " We appreciate your honesty. Your feedback helps us improve."}
          </span>
        ),
        icon: !isLiked ? (
          <LikeIconFilled className="w-[25px] text-white" />
        ) : (
          <LikeIcon className="w-[25px] text-white" />
        ),
        autoClose: 3000,
        styles: {
          icon: {
            width: "2.75rem",
            height: "2.75rem",
            background: !isLiked ? "#1DCB24" : "#0049e0",
          },
        },
      });
      setIsLiked(!isLiked);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDisLiking = async () => {
    try {
      await DisLike_Module(Module.slug);
      setIsLiked(false);
      notifications.show({
        id: "load-data",
        title: (
          <span className="font-bold">
            {!isDisliked
              ? "DisLiked Successfully! 😞"
              : "Removed DisLike Successfully! "}
          </span>
        ),
        message: (
          <span>
            {!isDisliked
              ? "We appreciate your honesty. Your feedback helps us improve."
              : "We appreciate your honesty. Your feedback helps us improve."}
          </span>
        ),
        icon: !isDisliked ? (
          <DislikeFilled className="w-[25px] text-white" />
        ) : (
          <DislikeIcon className="w-[25px] text-white" />
        ),
        autoClose: 3000,
        styles: {
          icon: {
            width: "2.75rem",
            height: "2.75rem",
            background: !isDisliked ? "#EF4836" : "#1DCB24",
          },
        },
      });
      setIsDisliked(!isDisliked);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center gap-2 px-4">
      <h1 className="text-[27px]">{Module.title}</h1>
      <div className="reactions mx-5 flex justify-center items-center gap-3">
        <Tooltip
          className="cursor-pointer"
          onClick={handleLiking}
          styles={{
            tooltip: {
              background: "#191c1f",
            },
          }}
          label={isLiked ? "Remove Like" : "Like"}
          withArrow
          position="top"
        >
          <div>
            {isLiked ? (
              <LikeIconFilled className="text-[#3EBB70]" />
            ) : (
              <LikeIcon className="text-[#3EBB70]" />
            )}
          </div>
        </Tooltip>
        <Tooltip
          className="cursor-pointer"
          onClick={handleDisLiking}
          styles={{
            tooltip: {
              background: "#191c1f",
            },
          }}
          label={isDisliked ? "Remove Dislike" : "Dislike"}
          withArrow
          position="top"
        >
          <div>
            {isDisliked ? (
              <DislikeIconFilled className="text-[#EF4836]" />
            ) : (
              <DislikeIcon className="text-[#EF4836]" />
            )}
          </div>
        </Tooltip>
      </div>
      <div className="">
        <Divider orientation="vertical" size={"sm"} className="h-[20px]" />
      </div>
      <div>
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
      </div>
      <div className="">
        <Divider orientation="vertical" size={"sm"} className="h-[20px]" />
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
        <Divider orientation="vertical" size={"sm"} className="h-[20px]" />
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
      <span className="bg-primary-normal cursor-pointer text-white py-[3px] font-[500] text-sm px-[10px] rounded-[3px]" onClick={() => push(`/modules/${Module.slug}/quiz`)}>QUIZ</span>

    </div>
  );
}
