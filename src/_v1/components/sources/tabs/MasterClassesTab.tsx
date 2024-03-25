import React, { useState, useEffect, useRef, Fragment } from "react";
import {
  TrialCard,
  ThumbnailCard,
  ExpertCard,
  DocumentsTypeCard,
} from "@/_v1/components";
import parse from "html-react-parser";
import {
  calculateHeight,
  defineImageURI,
  defineVideoURI,
  formatTimeRange,
  isDecimalSecondInRange,
  onDownloadAttachments,
} from "@/_v1/functions";
import { DocumentPDFIcon, DownloadIcon } from "@/_v1/icons";
import useAlerts from "@/_v1/hooks/useAlerts";
import { Switch } from "@mantine/core";
// <<<<<<< HEAD
// import { date, string } from "yup";
// =======
import { string } from "yup";
// >>>>>>> d17c6c949cf9a84ca45f20b754a06f8869b86990

type Props = {
  isJoined: boolean;
  content: any;
  transcription:any,
  isOriginalVideo: boolean;
  handleSwitchToSnippetVideo: (data: any) => void;
  handleInitOriginaVideo: () => void;
  currentSnippetId: number | undefined;
};

const MasterClassesTab = ({
  isJoined,
  content,
  isOriginalVideo,
  transcription,
  handleSwitchToSnippetVideo,
  handleInitOriginaVideo,
  currentSnippetId,
}: Props) => {
  const { onAlert } = useAlerts();
  const [tabId, setTabId] = useState<string | undefined>(undefined);


  const handleTabs = () => {
    if (isJoined) setTabId(content[0].tab);
    else setTabId(content[1].tab);
  };
  useEffect(() => {
    handleTabs();
  }, [isJoined]);

  const defineMaps = (target: string) => {
    return content.find((e: any) => e.tab === target).data;
  };

  const handleDownload = async (path: string) => {
    const { status } = await onDownloadAttachments(path);
    if (status === 200)
      onAlert(
        "Success",
        "You have been download the attachment successfully!",
        "SUCCESS",
        5000
      );
    else onAlert("Error", "Your download has been failed!", "ERROR", 5000);
  };

  //// Replace with your actual elements

  const defineTime = (target: string) => {
    return content.find((e: any) => e.tab === target).time;
  };

  console.log(content)

  const containerRef = useRef<any>(null);
  const itemRef = useRef<any>(null);
  const currentPosition = useRef<any>(0);
  const currentIndex = useRef<any>(undefined);


  function secondsToTimeString(seconds:number) {
    // Calculate hours, minutes, and remaining seconds
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
  
    // Convert to strings and pad with leading zeros
    const hoursString = hours.toString().padStart(2, '0');
    const minutesString = minutes.toString().padStart(2, '0');
    const secondsString = remainingSeconds.toString().padStart(2, '0');
  
    // Create the time string in the "00:00:00" format
    const timeString = `${hoursString}:${minutesString}:${secondsString}`;
  
    return timeString;
  }

  const handleCurrentTranscription = (
    startTime: string,
    endTime: string,
    transcriptionId: any
  ) => {
    let isCurrent = isDecimalSecondInRange(
      defineTime("transcription"),
      startTime,
      endTime
    );
      console.log(isCurrent , "isCurrent")
    if (isCurrent) {
      const targetItem = document.getElementById(transcriptionId);
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

  useEffect(() => {
    handleScrollToTranscription();
  }, [currentPosition?.current, autoScroll]);


  console.log(currentPosition?.current , "cutrrent")

   function formatTimeRange1(start: any, end: any): any {
    const parsedStartTime = new Date(start);
    const parsedEndTime = new Date(end);

// <<<<<<< HEAD
//     const formattedStartTime = parsedStartTime?.toISOString().substr(11, 8);
//     const formattedEndTime = parsedEndTime?.toISOString().substr(11, 8);
// =======
    const formattedStartTime = parsedStartTime.toISOString().substr(11, 8);
    const formattedEndTime = parsedEndTime.toISOString().substr(11, 8);
// >>>>>>> d17c6c949cf9a84ca45f20b754a06f8869b86990
  
    const formattedTimeRange = `${formattedStartTime} - ${formattedEndTime}`;
   
    return formattedTimeRange;
  }

  function formatTimeRange2(start: any): any {

    const parsedStartTime = new Date(start);

    const formattedStartTime = parsedStartTime.toISOString().substr(11, 8);
  
    const formattedTimeRange = `${formattedStartTime}`
   
    return formattedTimeRange;
  }

  return (
    <div className="">
      {/* Tabs Header */}
      <div className="flex mb-[20px]">
          <div
            onClick={() => setTabId("transcription")}
            className={`flex cursor-pointer px-[20px] py-[10px] text-[16px] rounded-[4px] font-bold text-[#ffffff] ${
              tabId === "transcription" &&
              "bg-[#ffffff] !text-[#0056D2] mr-[20px]"
            }`}
          >
            Master class
          </div>
        <div
          onClick={() => setTabId("information")}
          className={`flex cursor-pointer px-[20px] py-[10px] text-[16px] rounded-[4px] font-bold text-[#ffffff] ${
            tabId === "information" && "bg-[#ffffff] !text-[#0056D2] mx-[20px]"
          }`}
        >
          Description
        </div>
        <div
          onClick={() => setTabId("experts")}
          className={`flex cursor-pointer px-[20px] py-[10px] text-[16px] rounded-[4px] font-bold text-[#ffffff] ${
            tabId === "experts" && "bg-[#ffffff] !text-[#0056D2] mx-[20px]"
          }`}
        >
          Speaker
        </div>
        <div
          onClick={() => setTabId("trials")}
          className={`flex cursor-pointer px-[20px] py-[10px] text-[16px] rounded-[4px] font-bold text-[#ffffff] ${
            tabId === "trials" && "bg-[#ffffff] !text-[#0056D2] ml-[20px]"
          }`}
        >
          Extraits de la Master class
        </div>
      </div>
      {/* Tabs Content */}
      <div className="relative pt-[20px] mx-[0px] ml-[0px] px-[20px] border-t-[#0056D2]/20 border-t-[1px]">
        {/* Master Class Tab Content */}
        {tabId === "transcription"  && (
          <>
            <div className="flex justify-between items-center mb-[20px]">
              <h4
                className="font-[600] text-[16px]"
                //ml-[calc(135px+20px)]
              >
                Transcription de la video
              </h4>
              <div className="flex items-center">
                <Switch
                  checked={autoScroll}
                  label={"Auto-Scroll"}
                  sx={{
                    ["input:checked ~ label"]: {
                      background: "#14B8A6",
                      borderColor: "#14B8A6",
                    },
                    [".mantine-Switch-label"]: {
                      color: autoScroll ? "#14B8A6" : "#ffffff50",
                      fontWeight: 500,
                      cursor: "pointer",
                      width: "100%",
                      fontSize: "13px",
                    },
                  }}
                  onChange={(e) => { console.log(e.currentTarget.checked),  setAutoScroll(e.currentTarget.checked)}}
                />
              </div>
            </div>
            <div
              ref={containerRef}
              className="relative flex flex-col gap-[15px] max-h-[300px] overflow-y-auto"
              onWheel={(e) => setAutoScroll(false)}
              onTouchMove={(e) => setAutoScroll(false)}
            >
              {defineMaps("transcription")?.map((item: any, itemId: number) => (
                
                <div
                  key={itemId}
                  id={`transcription--${itemId}`}
                  className={`
                    flex gap-[20px]
                    ${
                      handleCurrentTranscription(
                        formatTimeRange2(item?.startTime),
                        formatTimeRange2( item?.endTime),
                        `transcription--${itemId}`
                      ) || itemId <= currentIndex.current
                        ? "text-[white] font-bold"
                        : "opacity-[0.5] font-normal"
                    }
                  `}
                >
                  <div className="basis-[135px]">
                    {`${formatTimeRange1(item?.startTime, item?.endTime)}`}

                  </div>
                  <div className="flex-[1]">{item?.text}</div>
                </div>
              ))}
            </div>
            {!isOriginalVideo && (
              <div
                className={`
              absolute top-[0px] right-[0px] backdrop-blur-[4px] z-[10]
              bg-[rgb(30 31 37 / 30%)] w-[100%] h-[100%] flex justify-center items-center flex-col gap-[10px]
              pt-[20px]
            `}
              >
                <div className="max-w-[400px] w-[100%] text-center flex flex-col gap-[20px] justify-center items-center">
                  <p className="text-[13px]">
                    Si vous souhaitez passer à la vidéo originale
                    <br />
                    (Master Class), cliquez sur le bouton ci-dessous.
                  </p>
                  <button
                    className="py-[7px] px-[14px] bg-[#0049E0] text-[13px] text-[#ffffff] rounded-[4px]"
                    onClick={() => handleInitOriginaVideo()}
                  >
                    Cliquez ici
                  </button>
                </div>
              </div>
            )}
          </>
        )}
        {/* Description Tab Content */}
        {tabId === "information" && (
          <>
            <div className="flex flex-col gap-[40px]">
              <div className="flex flex-col">
                <h4 className="font-[600] text-[18px] mb-[20px]">
                  Description de la video
                </h4>
                <div className="paragraph text-[16px] leading-[1.75em]">
                  {parse(defineMaps("information")?.description || "")}
                </div>
              </div>
              <div className="flex flex-col">
                <h4 className="font-[600] text-[18px] mb-[20px]">Objectifs</h4>
                <div className="paragraph text-[16px] leading-[1.75em]">
                  {parse(defineMaps("information")?.objective || "")}
                </div>
              </div>
              <div className="flex flex-col">
                <h4 className="font-[600] text-[18px] mb-[20px]">Ressources</h4>
                <div className="flex flex-wrap gap-[15px]">
                  {/* MAPPING HERE */}
                  {defineMaps("information")?.attachement?.map(
                    (item: any, _: number) => (
                      <Fragment key={_}>
                        <div className="flex items-center justify-between gap-[15px] max-w-[225px] w-[100%] bg-[#1E1F25] border-[#D9D9D966] border-[1px] rounded-[8px] p-[12px] pl-[8px]">
                          {/* <DocumentPDFIcon width={45} height={45} /> */}
                          <DocumentsTypeCard type={item?.type || ""} />
                          <div className="relative ml-[-5px] w-[calc(100%-100px)]">
                            <h6 className="font-[600] text-[14px]">
                              {item?.name}
                            </h6>
                            <span className="text-[#AAAAAA] text-[12px]">
                              {item?.size}
                            </span>
                          </div>
                          <button onClick={() => handleDownload(item?.path)}>
                            <DownloadIcon
                              width={40}
                              height={40}
                              color="#0049E0"
                            />
                          </button>
                        </div>
                      </Fragment>
                    )
                  )}
                </div>
              </div>
              <div className="flex flex-col">
                <h4 className="font-[600] text-[18px] mb-[20px]">Mots clés</h4>
                <div className="flex flex-wrap gap-[15px]">
                  {/* MAPPING HERE */}

                  {defineMaps("information")?.tags?.map(
                    (item: any, _: number) => (
                      <Fragment key={_}>
                        <div className="text-[#14B8A6] text-[14px] bg-[#14B8A6]/20 border-current border-[1px] rounded-[4px] px-[25px] py-[7px]">
                          {item?.hashTag?.name}
                        </div>
                      </Fragment>
                    )
                  )}
                </div>
              </div>
            </div>
          </>
        )}
        {/* Speakers Tab Content */}
        {tabId === "experts" && (
          <>
            <div className="flex flex-wrap gap-[15px] mr-[-35px]">
              {defineMaps("experts")?.map((item: any, _: number) => (
                <Fragment key={_}>
                  <ExpertCard
                    lastName={`${item?.expert?.lastName}`}
                    firstName={`${item?.expert?.firstName}`}
                    photo={defineImageURI(item?.expert?.imagePath)}
                    note={item?.expert?.note}
                    slug={item?.expert?.slug}
                    typeStyle="masterClasse"
                    expertises={
                      item?.expert?.ExpertSpeciality.map((e: any) => ({
                        name: e?.speciality?.name,
                      })) || []
                    }
                  />
                </Fragment>
              ))}
            </div>
          </>
        )}
        {/* Extraits de la Master Class Tab Content */}
        {tabId === "trials" && (
          <>
            <div className="flex flex-wrap gap-[30px] mr-[-35px]">
              {defineMaps("trials")?.map((item: any, _: number) => (
                <Fragment key={_}>
                  <TrialCard
                    id={1}
                    title={item?.name}
                    thunbnail={defineImageURI(item?.thumbnail)}
                    payload={() =>
                      handleSwitchToSnippetVideo({
                        id: item?.id,
                        title: item?.name,
                        src: defineVideoURI(item?.videoPath),
                        thumbnail: defineImageURI(item?.thumbnail),
                      })
                    }
                    isActive={currentSnippetId === item?.id}
                  />
                </Fragment>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MasterClassesTab;
