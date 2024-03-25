import { BioIcon, DownloadIcon, ModuleIcon, NoteIcon } from "@/_v1/icons";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { fake_notes } from "../fake__data";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import NoteCard from "../boxes/NoteCard";
import ModuleCard from "../boxes/ModuleCard";
import {
  calculateHeight,
  defineImageURI,
  isDecimalSecondInRange,
  onDownloadAttachments,
  onlyTextWithTruncate,
} from "@/_v1/functions";
import { Carousel, DocumentsTypeCard, Slider } from "@/_v1/components";
import { Switch } from "@mantine/core";
import useAlerts from "@/_v1/hooks/useAlerts";
import { Documents } from "@/_v1/components/modules/components/slug";
import LottieAnimation from "@/_v1/components/Animation/LottieAnimation";
const EmptyCaptions = require("@assets/animations/captions.json");
const EmptyAttachment = require("@assets/animations/EmptyAttachements.json");

type Props = {
  content: any;
};

const EventsTab = ({ content }: Props) => {
  const [currentTab, setCurrentTab] = useState(content[0].tab);
  const { onAlert } = useAlerts();

  // Function to handle tab change
  const handleTabChange = (tab: string) => {
    setCurrentTab(tab ? tab : "documents");
  };

  // Rendering the tabs
  const renderTabs = () => {
    return content.map((item: any, index: number) => (
      <div
        key={index}
        className={`
              cursor-pointer
              h-[38px] px-[10px] flex gap-[10px] items-center justify-center rounded-[4px]
              text-[#1F1F1F] font-[600]
              ${
                currentTab === item.tab &&
                "!bg-[#0049E0] h-[32px] !text-[white] !gap-[5px]"
              }
              group hover:bg-[#0049E0]/10
            `}
        onClick={() => handleTabChange(item.tab ? item.tab : "transcript")}
      >
        <span
          className={`
                group-hover:text-[#0049E0] 
                ${currentTab === item.tab && "!text-[#ffffff]"}
              `}
        >
          {item.title}
        </span>
      </div>
    ));
  };

  console.log(content, "content");

  const defineTime = (target: string) => {
    return content.find((e: any) => e.tab === target).time;
  };

  const containerRef = useRef<any>(null);
  const itemRef = useRef<any>(null);
  const currentPosition = useRef<any>(0);
  const currentIndex = useRef<any>(undefined);

  const handleCurrentTranscription = (
    startTime: string,
    endTime: string,
    transcriptionId: any
  ) => {
    let isCurrent = isDecimalSecondInRange(
      defineTime("transcript"),
      startTime,
      endTime
    );

    if (isCurrent) {
      var targetItem = document.getElementById(transcriptionId);
      if (targetItem && itemRef) {
        itemRef.current = targetItem;
        currentPosition.current = itemRef?.current?.offsetTop;
        currentIndex.current = transcriptionId.split("--").pop();
      }
    }

    return isCurrent;
  };

  const [autoScroll, setAutoScroll] = useState(true);
  const handleScrollToTranscription = () => {
    if (autoScroll && containerRef) {
      containerRef?.current?.scrollTo({
        top: currentPosition.current,
        behavior: "smooth",
      });
    }
  };

  function formatTimeRange1(start: any, end: any): any {
    const parsedStartTime = new Date(start);
    const parsedEndTime = new Date(end);

    const formattedStartTime = parsedStartTime.toISOString().substr(11, 8);
    const formattedEndTime = parsedEndTime.toISOString().substr(11, 8);

    const formattedTimeRange = `${formattedStartTime} - ${formattedEndTime}`;

    return formattedTimeRange;
  }

  function formatTimeRange2(start: any): any {
    const parsedStartTime = new Date(start);

    const formattedStartTime = parsedStartTime.toISOString().substr(11, 8);

    const formattedTimeRange = `${formattedStartTime}`;

    return formattedTimeRange;
  }

  useEffect(() => {
    handleScrollToTranscription();
  }, [currentPosition?.current, autoScroll]);

  console.log(content?.find((e: any) => e?.tab == "notes")?.data);

  const renderContent = () => {
    switch (currentTab) {
      case "des":
        return (
          <div className="flex flex-col gap-[30px]">
            <div className="paragraph  text-[#1F1F1F] font-[400] text-[16px] leading-[29px]">
              {
                content?.find((e: any) => e?.tab == currentTab)?.data
                  .description
              }
            </div>
            <h4 className=" text-[#1F1F1F] text-[18px] font-[600] ">
              Objective{" "}
            </h4>
            <div className="paragraph  text-[#1F1F1F] font-[400] text-[16px] leading-[29px]">
              {content?.find((e: any) => e?.tab == currentTab)?.data.objective}
            </div>
          </div>
        );
      case "transcript":
        return (
          <>
            {content
              ?.find((e: any) => e?.tab == "transcript")
              ?.data?.map((item: any, itemId: number) => item).length > 0 ? (
              <>
                <h4 className="text-[#1F1F1F] text-[18px] font-[600] mb-[30px]">
                  Transcript
                </h4>
                <div className="flex items-center justify-end mb-[20px]   ">
                  <Switch
                    checked={autoScroll}
                    label={"Auto-Scroll "}
                    className="cursor-pointer"
                    sx={{
                      ["input:checked ~ label"]: {
                        background: "#0049E0",
                        borderColor: "#0049E0",
                      },
                      [".mantine-Switch-label"]: {
                        color: autoScroll ? "#0049E0" : "black",
                        fontWeight: 500,
                        cursor: "pointer",
                        width: "100%",
                        fontSize: "13px",
                      },
                    }}
                    onChange={(e) => {
                      console.log(e.currentTarget.checked),
                        setAutoScroll(e.currentTarget.checked);
                    }}
                  />
                </div>
                <div
                  ref={containerRef}
                  className="relative flex flex-col gap-[15px] max-h-[300px] overflow-y-auto w-[calc(100% + 10px)] pr-[10px] "
                  onWheel={(e) => setAutoScroll(false)}
                  onTouchMove={(e) => setAutoScroll(false)}
                >
                  {content
                    ?.find((e: any) => e?.tab == "transcript")
                    ?.data?.map((item: any, itemId: number) => (
                      <div
                        key={itemId}
                        id={`transcription--${itemId}`}
                        className={`
                      flex gap-[20px]
                      ${
                        handleCurrentTranscription(
                          formatTimeRange2(item?.startTime),
                          formatTimeRange2(item?.endTime),
                          `transcription--${itemId}`
                        ) || itemId <= currentIndex.current
                          ? " font-bold  p-[20px]  bg-[#004be012] border-solid border-[#004be024] rounded-[5px] text-[#0049E0] "
                          : "opacity-[0.5] font-normal  p-[20px] rounded-[10px]"
                      }
                    `}
                      >
                        <div className="basis-[135px]">
                          {`${formatTimeRange1(
                            item?.startTime,
                            item?.endTime
                          )}`}
                        </div>
                        <div className="flex-[1]">{item?.text}</div>
                      </div>
                    ))}
                </div>
              </>
            ) : (
              <div className="flex  w-full h-full   flex-col justify-center items-center">
                <div className="pointer-events-none w-[200px] h-[160px]">
                  <LottieAnimation loop animationData={EmptyCaptions} />
                </div>
                <div className="flex items-center flex-col gap-4">
                  <div className="flex flex-col justify-center items-center gap-2">
                    <h2 className="text-[25px] text-center font-[600] w-full">
                      Try to enable captions to display transcript
                    </h2>
                    <p className="text-center text-[#484f59]">
                      Explore additional features by turning on captions <br />{" "}
                      and accessing the video transcript.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </>
        );
      case "notes":
        return (
          <div className="w-[100%]">
            {content?.find((e: any) => e?.tab == "notes")?.data ? (
              <>
                <h4 className=" text-[#1F1F1F] text-[18px] font-[600] mb-[30px]">
                  Notes
                </h4>

                <div className="mr-[-15px]">
                  <p className="paragraph  text-[#1F1F1F] font-[400] text-[16px] leading-[29px]">
                    {" "}
                    {content?.find((e: any) => e?.tab == "notes")?.data}{" "}
                  </p>
                </div>
              </>
            ) : (
                <div className="flex  w-full h-full   flex-col justify-center items-center">
                  <div className="pointer-events-none w-[280px] mb-5 h-[160px]">
                    <LottieAnimation loop animationData={EmptyAttachment} />
                  </div>
                  <div className="flex items-center flex-col gap-4">
                    <div className="flex flex-col justify-center items-center gap-2">
                      <h2 className="text-[25px] text-center font-[600] w-full">
                        There is no Notes for this Module
                      </h2>
                      <p className="text-center text-[#484f59]">
                        Sorry, there are no notes available for this video module.
                        Explore more content <br /> and enhance your learning
                        experience!
                      </p>
                    </div>
                  </div>
                </div>
            )}
          </div>
        );
      case "documents":
        return (
          <div>
            <h4 className="text-[#1F1F1F] text-[18px] font-[600] mb-[30px]">
              Documents
            </h4>
            <div className="flex flex-wrap gap-[15px]">
              {/* MAPPING HERE */}
              <Documents
                ModuleAttachements={
                  content?.find((e: any) => e?.tab == "documents")?.data
                    ?.attachement
                }
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="flex items-center gap-[20px] pb-[20px] bg-[transparent] border-b-[2px] border-[#0056D21A]">
        {renderTabs()}
      </div>
      <div className="bg-[transparent] py-[20px]">{renderContent()}</div>
    </>
  );
};

export default EventsTab;
