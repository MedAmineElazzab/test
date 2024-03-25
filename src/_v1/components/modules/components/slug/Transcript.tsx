import { Transcription } from "@/_v1/api/module";
import LottieAnimation from "@/_v1/components/Animation/LottieAnimation";
import { Box, ScrollArea } from "@mantine/core";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import TranscriptChild from "./components/TranscriptChild";
const EmptyCaptions = require("@assets/animations/captions.json");

export default function Transcript({
  transcript,
  currentTime,
  videoRef,
  lang,
}: {
  transcript: Transcription[];
  currentTime: number;
  videoRef: HTMLVideoElement | null;
  lang: string;
}) {
  const { asPath, query } = useRouter();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [userIsScrolling, setUserIsScrolling] = useState<boolean>(false);
  const [activeElement, setActiveElement] = useState<HTMLDivElement | null>(
    null
  );
  const [currentTranscript, setCurrentTranscript] =
    useState<Transcription | null>(null);
  useEffect(() => {
    if (scrollContainerRef.current && currentTranscript) {
      currentTranscript?.transcriptionJson.forEach((el, index) => {
        if (
          currentTime >= el.startTime / 1000 &&
          currentTime <= el.endTime / 1000
        ) {
          setActiveIndex(index);
        }
      });
      if (activeIndex !== -1) {
        const activeElement: HTMLDivElement | null =
          scrollContainerRef.current?.querySelector(
            `#transcript-child-${activeIndex}`
          );
        if (activeElement) {
          setActiveElement(activeElement);
          let currentElementPositionY = activeElement
            ?.getBoundingClientRect()
            .y.toFixed(0);
          let currentScrollY = scrollContainerRef.current
            .getBoundingClientRect()
            .y.toFixed(0);
          if (
            Number(currentElementPositionY) - Number(currentScrollY) > 350 ||
            Number(currentElementPositionY) - Number(currentScrollY) < 0
          ) {
            if (!userIsScrolling) {
              scrollContainerRef.current.scrollTo({
                top:
                  activeElement.offsetTop -
                  scrollContainerRef.current.offsetTop,
                behavior: "smooth",
              });
            }
          }
        }
      }
    }
  }, [
    currentTranscript,
    currentTime,
    query?.slug?.[0],
    activeElement,
    setActiveElement,
    activeIndex,
    lang,
  ]);
  useEffect(() => {
    setCurrentTranscript(null);
    setActiveElement(
      scrollContainerRef.current?.querySelector(
        `#transcript-child-${-1}`
      ) as HTMLDivElement
    );
    setActiveIndex(-1);
    if (lang) {
      setCurrentTranscript(
        transcript?.find((el) => el.language === lang) || null
      );
      scrollContainerRef?.current?.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [query?.slug?.[0], lang]);
  return (
    <div className="relative">
      <ScrollArea
        viewportRef={scrollContainerRef}
        h={400}
        styles={{
          viewport: {
            padding: currentTranscript ? "10px 20px" : "",
            position: "relative",
          },
        }}
        className="relative"
        onMouseEnter={() => {
          setUserIsScrolling(true);
        }}
        onMouseLeave={() => {
          setUserIsScrolling(false);
        }}
      >
        <Box className="flex relative flex-col gap-3 w-full">
          {activeElement && (
            <div
              className="absolute active-bg bg-primary-normal/10 z-[1] shadow transition-all duration-500  w-full rounded-[3px] border-2 border-primary-light"
              style={{
                width: `${activeElement?.clientWidth}px`,
                height: `${activeElement?.clientHeight}px`,
                top: `${activeElement?.offsetTop}px`,
                left: `${activeElement?.offsetLeft}px`,
              }}
            ></div>
          )}
          {currentTranscript &&
            currentTranscript?.transcriptionJson.map((el, index) => (
              <TranscriptChild
                handleClick={() => {
                  if (videoRef) {
                    // the +10 is to avoid any doubling of tracks
                    videoRef.currentTime = (el.startTime + 10) / 1000;
                    videoRef.play();
                  }
                }}
                key={index}
                id={index}
                active={index == activeIndex}
                content={el.text}
                time={{
                  end: el.endTime,
                  start: el.startTime,
                }}
                lang={currentTranscript.language}
              />
            ))}
        </Box>
        {!currentTranscript && (
          <div className="flex absolute w-full h-full   flex-col justify-center items-center">
            <div className="pointer-events-none w-[200px] h-[160px]">
              <LottieAnimation loop animationData={EmptyCaptions} />
            </div>
            <div className="flex items-center flex-col gap-4">
              <div className="flex flex-col justify-center items-center gap-2">
                <h2 className="text-[25px] text-center font-[600] w-full">
                  Try to enable captions to display transcript
                </h2>
                <p className="text-center text-[#484f59]">
                  Explore additional features by turning on captions <br /> and
                  accessing the video transcript.
                </p>
              </div>
            </div>
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
