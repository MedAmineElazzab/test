import { Transcription } from "@/services/types";
import { Box, ScrollArea } from "@mantine/core";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { ModuleTranscriptChild } from ".";

export function ModuleTranscript({
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
    <div >
      <ScrollArea
        viewportRef={scrollContainerRef}
        h={500}
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
              className="absolute active-bg bg-[#F2F4F7] z-[1]  transition-all duration-500  w-full rounded-[3px] "
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
              <ModuleTranscriptChild
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
      </ScrollArea>
    </div>
  );
}
