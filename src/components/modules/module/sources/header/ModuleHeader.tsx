import { api } from "@/api";
import {
  FlagButton,
  ModuleHeaderBottomSection,
  SaveButton,
  VideoPlayer,
} from "@/components";
import { handleModuleBokmarking, handleModuleFlagging } from "@/services";
import { Transcription } from "@/services/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface ModuleHeaderProps {
  title: string;
  id: number;
  isFlagged: boolean;
  isBookmarked: boolean;
  slug: string;
  reviewsCount: number;
  createdAt: string;
  views: number;
  videoSrc: string;
  Transcription: Transcription[];
  VideoTrack: {
    videoProgress: number;
  };
  imagePath: string;
  onLoadedVideoRef: (videoRef: HTMLVideoElement, currentTime: number) => void;
  onLangChange: (lang: string) => void;
}
export function ModuleHeader(props: ModuleHeaderProps) {
  const { asPath, push, query } = useRouter();
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [videoTranscript, setVideoTranscript] = useState<
    Transcription[] | null
  >(null);
  const [videoCaptionLanguage, setVideoCaptionLanguage] = useState<string>("");
  const [video, setVideo] = useState<HTMLVideoElement | null>(null);
  useEffect(() => {
    setVideoSrc(props.videoSrc);
    setVideoTranscript(props.Transcription);
    return () => {
      setVideoSrc(null);
      setVideoTranscript(null);
    };
  }, [props.id]);
  return (
    <div className="w-full bg-white p-4 shadow-header-module-single  rounded-lg ">
      <div className="top-header flex flex-col gap-4">
        <div className="flex flex-col ">
          <div className="flex items-start justify-between gap-4">
            <div className="py-2 px-4">
              <h1 className="text-gray-900 text-2xl font-bold leading-normal">
                {props.title}
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <FlagButton
                isFlagged={props.isFlagged}
                onClick={(isFlagged) => {
                  handleModuleFlagging(props.slug, isFlagged);
                }}
              />
              <SaveButton
                isBookmarked={props.isBookmarked}
                onClick={(isSaved) => {
                  handleModuleBokmarking(props.slug, isSaved);
                }}
              />
            </div>
          </div>
          <div className="flex items-center gap-3 px-4">
            <ModuleHeaderBottomSection
              comments={props.reviewsCount}
              date={props.createdAt}
              vues={props.views || 0}
            />
          </div>
        </div>
        <div
          id={"video-player"}
          className="relative rounded-t h-[500px]  w-full "
        >
          {videoSrc && videoTranscript && (
            <VideoPlayer
              onError={async () => {
                try {
                  const { data } = await api.get(
                    "/module/refresh/" + props.slug
                  );
                  return data;
                } catch (error) {
                  console.log(error);
                  push("/v2/modules");
                }
              }}
              defaultTime={props?.VideoTrack?.videoProgress || 0}
              videotrakingPath={"/videoTracking/module/" + props.id}
              path="/module/video"
              onTrackChanged={(lang) => {
                props.onLangChange(lang);
                setVideoCaptionLanguage(lang);
              }}
              onTimeUpdate={(currentTime, isVideoFinished, video) => {
                setCurrentTime(currentTime);
                setVideo(video);
                props.onLoadedVideoRef(video, currentTime);
              }}
              videoSrc={videoSrc}
              subtitles={videoTranscript}
              onTokenExpired={async () => {
                try {
                  const { data } = await api.get(
                    "/module/refresh/" + props.slug
                  );
                  return data;
                } catch (error) {
                  push("/v2/modules");
                }
              }}
              poster={props.imagePath}
            />
          )}
        </div>
      </div>
    </div>
  );
}
