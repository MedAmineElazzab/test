import api, { setContext } from "@/_v1/api/api";
import { Breadcrumb, EventsTab, VideoPlayer } from "../../../_v1/components";
import VideoQualitySubmenu from "@/_v1/components/sources/video-player/test";
import { defineVideoURI } from "../../../_v1/functions";
import useAlerts from "@/_v1/hooks/useAlerts";
import {
  BookMarkedIcon,
  FavouriteCircledIcon,
  LikeIcon,
  LikeIconFilled,
  OrganizationIcon,
  ReportFilled,
} from "../../../_v1/icons";
import Dislike from "@/_v1/icons/sources/Dislike";
import DislikeFilled from "@/_v1/icons/sources/DislikeFilled";
import FlagBlueOutline from "@/_v1/icons/sources/FlagBlueOutline";
import FlagIcon from "@/_v1/icons/sources/FlagIcon";
import ReportIcon from "@/_v1/icons/sources/Report";
import ShareIcon from "@/_v1/icons/sources/ShareIcon";
import {
  getEventBySlug,
  getEventDetailBySlug,
  getVideoEventDetailByToken,
} from "@/_v1/services/events";
import { CheckIcon, Divider, Tooltip } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import {
  MediaPlayer,
  MediaPlayerInstance,
  useMediaStore,
} from "@vidstack/react";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";

type Props = {
  content: any;
  video: any;
  stream: any;
};

const Page = ({ content, stream, video }: Props) => {
  const { query } = useRouter();
  const { onThemeAlert } = useAlerts();
  const [SrcVideo, setSrcVideo] = useState<any>(undefined);
  const [isMarked, setIsMarked] = useState<any>(true);
  const [Like, setLike] = useState<any>(content.isLiked);
  const [DisLike, setDisLike] = useState<any>(content.isDisliked);
  const [flag, setFlag] = useState<any>(false);
  const [bookMark, setBookMark] = useState<any>(content.isBookmarked);
  const [tracks, setTracks] = useState<any>(undefined);
  const [thumbnail, setThumnmail] = useState<any>(undefined);
  const [selectedLang, setSelectedLang] = useState<string | undefined>(
    undefined
  );
  const [transcription, setTranscription] = useState<any>(undefined);
  const { push } = useRouter();
  const [note , setNote]=useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    push({
      pathname: "",
      query: {
        ...query,
        lang: selectedLang,
      },
    });
    document?.getElementById("header-id")?.scrollIntoView(); //{ behavior: "smooth" }
  }, [selectedLang]);

  useEffect(() => {
    setSrcVideo(defineVideoURI(`/event/detail/video/${video}`));
    setTracks([...stream?.video_subtitles, ...stream?.video_chapters]);
    setTranscription(stream?.video_transcription);
    setThumnmail(stream?.video_thumbnail);
    setNote(content.note)
  }, []);

  useEffect(() => {
    setTranscription(stream?.video_transcription);
  }, [stream]);

  const [currentTime, setCurrentTime] = useState(0);

  const handleCurrentTime = (time: number) => {
    setCurrentTime(time);
  };

  const handleChangeLike = async () => {
    try {
      await api.patch(`/event/like/detail/${content.slug}`);
      setLike(!Like);

      notifications.show({
        id: "load-data",
        title: (
          <span className="font-bold">
            {!Like ? "Liked Successfully! 🌟" : "Removed Like Successfully! 😞"}
          </span>
        ),
        message: (
          <span>
            {!Like
              ? "Your taste is impeccable! Get ready for more recommendations tailored just for you."
              : " We appreciate your honesty. Your feedback helps us improve."}
          </span>
        ),
        icon: !Like ? (
          <LikeIconFilled className="w-[25px] text-white" />
        ) : (
          <LikeIcon className="w-[25px] text-white" />
        ),
        autoClose: 2000,
        styles: {
          icon: {
            width: "2.75rem",
            height: "2.75rem",
            background: !Like ? "#1DCB24" : "#0049e0",
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeDisLike = async () => {
    try {
      await api.patch(`/event/dislike/detail/${content.slug}`);
      setDisLike(!DisLike);

      notifications.show({
        id: "load-data",
        title: (
          <span className="font-bold">
            {!DisLike
              ? "DisLiked Successfully! 🌟"
              : "Removed DisLike Successfully! 😞"}
          </span>
        ),
        message: (
          <span>
            {!DisLike
              ? "We appreciate your honesty. Your feedback helps us improve."
              : " We appreciate your honesty. Your feedback helps us improve."}
          </span>
        ),
        icon: !DisLike ? (
          <DislikeFilled className="w-[25px] text-white" />
        ) : (
          <Dislike className="w-[25px] text-white" />
        ),
        autoClose: 2000,
        styles: {
          icon: {
            width: "2.75rem",
            height: "2.75rem",
            background: !DisLike ? "#EF4836" : "#1DCB24",
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeFlag = async () => {
    try {
      await api.patch(`/event/flag/detail/${content.slug}`);
      setFlag(!flag);

      notifications.show({
        id: "load-data",
        title: (
          <span className="font-bold">
            {!flag
              ? "Event Flagged Successfully!"
              : "Event unFlagged Successfully!"}
          </span>
        ),
        message: (
          <span>
            {!flag
              ? "Thanks for flagging. We'll review and take action to maintain a safe and valuable environment."
              : "The note has been successfully unflagged. Thank you for helping us maintain a safe and valuable environment."}
          </span>
        ),
        icon: !flag ? (
          <ReportIcon className="w-[25px]  text-white" />
        ) : (
          <CheckIcon className="w-[22px] text-white" />
        ),
        autoClose: 2000,
        styles: {
          icon: {
            width: "2.75rem",
            height: "2.75rem",
            background: !flag ? "#EF4836" : "#1DCB24",
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleBookMark = async () => {
    try {
      await api.patch(`/event/bookmark/detail/${content.slug}`);
      setBookMark(!bookMark);

      notifications.show({
        id: "load-data",
        title: (
          <span className="font-bold">
            {!bookMark
              ? "This event is bookmared successfully"
              : "This event has been removed from bookmark successfully!"}
          </span>
        ),
        message: (
          <span>
            {!bookMark
              ? "Thanks for bookMarked this event. We'll review and take action to maintain a safe and valuable environment."
              : "The event has been successfully unflagged. Thank you for helping us maintain a safe and valuable environment."}
          </span>
        ),
        icon: !bookMark ? (
          <FavouriteCircledIcon className="w-[40px] text-white" />
        ) : (
          <BookMarkedIcon className="w-[40px] text-white" />
        ),
        autoClose: 2000,
        styles: {
          icon: {
            width: "2.75rem",
            height: "2.75rem",
            background: !bookMark ? "#0049E0" : "#1DCB24",
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  console.log( "stream" ,  content  )

  return (
    <div className="flex flex-col gap-[17px] max-w-[1600px] w-[100%] m-auto p-[30px] py-[40px] text-[#1F1F1F] !scroll-smooth">
      <div style={{marginBottom:"-5px" , marginLeft:"-5px"}} >
        <Breadcrumb
          items={[
            { name: "Meducate", path: `/congres/` + content.event.title },
            {
              name: `${content.event.title}`,
              path: `/congres/${content.event.title}`,
            },
          ]}
        />
      </div>
      {/* EVENT VIDEO SECTION */}
      <div className="flex flex-col gap-[22px]">
        <div className="w-[100%] flex items-center gap-[20px]">
          <h2 className="font-[600] text-[24px] text-[#1E293D] leading-[36px]">
            mollit-minim-et-pariatur-lorem-cillum-velit-exercitation
          </h2>
          <div className="flex items-center gap-[11px]">
            <Tooltip
              // onClick={handleBookMarking}
              styles={{
                tooltip: {
                  background: "#191c1f",
                },
              }}
              label={!Like ? "Like" : "Remove Like"}
              withArrow
              position="top"
            >
              <div
                onClick={handleChangeLike}
                className={"cursor-pointer flex justify-center items-center  border-2 transition-all p-[1px] border-transparent  rounded-full".concat(
                  " "
                )}
              >
                {Like == false ? (
                  <LikeIcon className="text-[#3EBB70]  cursor-pointer" />
                ) : (
                  <LikeIconFilled className=" text-[#3EBB70]" />
                )}
              </div>
            </Tooltip>
            <Tooltip
              // onClick={handleBookMarking}
              styles={{
                tooltip: {
                  background: "#191c1f",
                },
              }}
              label={!DisLike ? "Dislike" : "Remove Dislike"}
              withArrow
              position="top"
            >
              <div
                onClick={handleChangeDisLike}
                className={"cursor-pointer flex justify-center items-center  border-2 transition-all p-[1px] border-transparent  rounded-full".concat(
                  " "
                )}
              >
                {DisLike == false ? (
                  <Dislike className="text-[#EF4836] cursor-pointer" />
                ) : (
                  <DislikeFilled className="cursor-pointer text-[#EF4836]" />
                )}
              </div>
            </Tooltip>
            <div className="">
              <Divider
                orientation="vertical"
                size={"sm"}
                className="h-[20px] text-[#636363]"
              />
            </div>
            <Tooltip
              // onClick={handleBookMarking}
              styles={{
                tooltip: {
                  background: "#191c1f",
                },
              }}
              label={flag ? "Unflag this event" : "Flag this event"}
              withArrow
              position="top"
            >
              <div
                onClick={handleChangeFlag}
                className={"cursor-pointer flex justify-center items-center  border-2 transition-all p-[1px] border-transparent  rounded-full".concat(
                  " "
                )}
              >
                {!flag ? (
                  <FlagBlueOutline className="cursor-pointer" />
                ) : (
                  <ReportFilled className=" cursor-pointer text-[blue]" />
                )}
              </div>
            </Tooltip>
            <div className="">
              <Divider
                orientation="vertical"
                size={"sm"}
                className="h-[20px] text-[#636363]"
              />
            </div>
            <div className="p-[3px] hover:bg-[#004be02b] w-[30px] h-[30px] rounded-full flex justify-center items-center ">
              <Tooltip
                // onClick={handleBookMarking}
                styles={{
                  tooltip: {
                    background: "#191c1f",
                  },
                }}
                label={"Share this event"}
                withArrow
                position="top"
              >
                <a
                  target="_blank"
                  className={"cursor-pointer flex justify-center items-center  border-2 transition-all p-[1px] border-transparent  rounded-full".concat(
                    " "
                  )}
                  href="mailto:someone@gmail.com"
                >
                  <ShareIcon className="cursor-pointer     text-[#0049E0] ml-[-1px] " />
                </a>
              </Tooltip>
            </div>
            <div className="">
              <Divider
                orientation="vertical"
                size={"sm"}
                className="h-[20px] text-[#636363]"
              />
            </div>
            <Tooltip
              // onClick={handleBookMarking}
              styles={{
                tooltip: {
                  background: "#191c1f",
                },
              }}
              label={bookMark ? "unBookmark Event" : "Bookmark Event"}
              withArrow
              position="top"
            >
              <div
                onClick={handleBookMark}
                className={"cursor-pointer flex justify-center items-center  border-2 transition-all p-[1px] border-transparent  rounded-full".concat(
                  " ",
                  bookMark
                    ? "Your organization system is now updated, providing a streamlined and personalized experience. "
                    : "You can now easily access and revisit this important information whenever you need"
                )}
              >
                {bookMark ? (
                  <BookMarkedIcon className="w-[31px]" />
                ) : (
                  <FavouriteCircledIcon className="w-[31px]" />
                )}
              </div>
            </Tooltip>
          </div>
        </div>
        <div className="w-[100%] h-[541px] ">
          <div id="video-player" className="h-[inherit]">
            <VideoPlayer
              title={content?.title}
              video={SrcVideo} //"https://stream.mux.com/VZtzUzGRv02OhRnZCxcNg49OilvolTqdnFLEqBsTwaxU/low.mp4" // content?.
              thumbnail={thumbnail} //"https://image.mux.com/VZtzUzGRv02OhRnZCxcNg49OilvolTqdnFLEqBsTwaxU/thumbnail.webp?time=268&width=1200"
              alt={
                "Girl walks into campfire with gnomes surrounding her friend ready for their next meal!"
              } //"Girl walks into campfire with gnomes surrounding her friend ready for their next meal!"
              // handleCurrentTime={handleCurrentTime}
              tracks={tracks}
              className={"h-[100%]"}
              classNameVideo={"with-h"}
              styleProps={"p-[0]"}
              handleCurrentTime={handleCurrentTime}
              // pauseOriginal={pauseOriginal}
              // setDuration={setDuration}
              setSelectedLang={setSelectedLang}
            />
          </div>
        </div>
      </div>
      <div className=""></div>
      {/* EVENT DETAILS SECTION */}
      <div className="flex gap-[55px] relative z-50 ">
        <div className="w-[100%] max-w-[calc(100%-325px)]">
          <div id="tabs">
            <EventsTab
              content={[
                {
                  tab: "des",
                  title: "Description",
                  data: {
                    description: content?.description,
                    objective: content?.objective,
                  },
                  isEmpty: true,
                },
                {
                  tab: "transcript",
                  title: "Transcript",
                  data: transcription,
                  time: currentTime,
                },
                {
                  tab: "notes",
                  title: "Notes",
                  data: note,
                  isEmpty: false,
                },
                {
                  tab: "documents",
                  title: "Documents",
                  data: {
                    description: content?.description,
                    objective: content?.objective,
                    attachement: content?.Attachement,
                    tags: content?.MasterClassHashTag,
                  },
                  isEmpty: false,
                },
              ]}
            />
          </div>
        </div>
        <div className="w-[313px] h-[max-content] bg-[white] p-[23px] flex flex-col gap-[25px] rounded-[4px] sticky top-[90px] ">
          <h4 className="text-[#1F1F1F] text-[22px] font-[600] leading-[22px] m-[0] p-[0]">
            Organizers
          </h4>
          <div className="w-[100%] flex flex-col gap-[15px]">
            <div className=" flex items-center gap-[16px] w-[100%] ">
              <OrganizationIcon width={34} className="text-[#0049E0]" />
              <span className="text-[#1F1F1F] mt-[8px] w-[max-content] leading-[21.5px] text-[17px] font-[400]">
                Université Mohammed{" "}
              </span>
            </div>
            <Divider
              orientation="horizontal"
              className="  border-[1.3px] rounded-lg h-[0px] border-[#0049E0] "
            />
            <div className=" flex items-center gap-[16px] w-[100%] ">
              <OrganizationIcon width={34} className="text-[#0049E0]" />
              <span className="text-[#1F1F1F] mt-[8px] w-[max-content] leading-[21.5px] text-[17px] font-[400]">
                Université Mohammed{" "}
              </span>
            </div>
            <Divider
              orientation="horizontal"
              className="  border-[1.3px] rounded-lg h-[0px] border-[#0049E0] "
            />
            <div className=" flex items-center gap-[16px] w-[100%] ">
              <OrganizationIcon width={34} className="text-[#0049E0]" />
              <span className="text-[#1F1F1F] mt-[8px] w-[max-content] leading-[21.5px] text-[17px] font-[400]">
                Université Mohammed{" "}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export async function getServerSideProps(context: any) {
  setContext(context);
  const { query } = context;

  const { slug, id, page, pageExperts, lang } = query;
  console.log(lang, "langg");
  const { data, status } = await getEventDetailBySlug(slug, lang);
  

  return {
    props: {
      content: data?.data,
      currentSlug: slug,
      stream: data,
      video: data?.data?.videoSrc,
    },
  };
}

export default Page;
