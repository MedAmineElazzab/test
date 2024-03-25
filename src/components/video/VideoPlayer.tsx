import { TrackVideo, Transcription } from "@/api";
import {
  SEC_10,
  SEC_MIN,
  VIDEO_SAVING_LOOP_DURATION,
} from "@/common/constants";
import { FullPath, handleJWTDecode } from "@/lib";
import imagePoster from "@assets/images/meducate.png";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";

interface VideoProps {
  videoSrc: string;
  path: string;
  poster?: string | null;
  onTimeUpdate?: (
    currentTime: number,
    isVideoFinished: boolean,
    mainVideoRef: HTMLVideoElement
  ) => void;
  onTrackChanged?: (language: string) => void;
  subtitles?: Transcription[];
  onTokenExpired?: () => Promise<string>;
  onError?: () => Promise<string>;
  videotrakingPath?: string;
  defaultTime?: number;
}

export const VideoPlayer: React.FC<VideoProps> = ({
  videoSrc,
  onTimeUpdate,
  subtitles,
  onTokenExpired,
  poster,
  onTrackChanged,
  path,
  onError,
  videotrakingPath,
  defaultTime,
}) => {
  const { query } = useRouter();
  const Slug = query.slug && query.slug != "" ? query.slug[0] : null;
  const [currentTimeStored, setCurrentTimeStored] = useState<number>(0);
  const [videoSrcToken, setVideoSrcToken] = useState<string | null>(videoSrc);
  const [IsExipredOnce, setIsExipredOnce] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const defaultTimeFixed =
    query?.t && query?.t != null && Number(query?.t)
      ? query?.t
      : defaultTime
      ? (defaultTime / SEC_MIN).toFixed(0)
      : 0;
  const refetchTokenAndSetInterval = () => {
    if (videoSrcToken) {
      const { tokenLifeSpan, currentTokenSpan } =
        handleJWTDecode(videoSrcToken);
      const tokenCheckInterval = setInterval(() => {
        if (
          tokenLifeSpan * SEC_MIN - currentTokenSpan * SEC_MIN <= SEC_10 &&
          videoRef.current
        ) {
          setIsExipredOnce(true);
          setCurrentTimeStored(videoRef.current.currentTime);
          onTokenExpired?.().then((newToken) => {
            setVideoSrcToken(newToken);
            setTimeout(() => {
              if (videoRef.current) {
                videoRef.current.play();
              }
            }, 0);
          });
        }
      }, tokenLifeSpan * SEC_MIN - SEC_10);
      return () => {
        setCurrentTimeStored(0);
        setVideoSrcToken(null);
        clearInterval(tokenCheckInterval);
      };
    }
  };
  const SaveCurrentTimeInterval = () => {
    return setInterval(async () => {
      if (videoRef.current && videotrakingPath) {
        var isPaused = videoRef.current?.paused;
        var currentTime = videoRef.current.currentTime * SEC_MIN;
        if (!isPaused && currentTime) {
          await TrackVideo(
            videotrakingPath,
            currentTime,
            videoRef.current.currentTime === videoRef.current.duration
          );
        }
      }
    }, VIDEO_SAVING_LOOP_DURATION);
  };
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const isVideoFinished =
        videoRef.current.currentTime === videoRef.current.duration;
      onTimeUpdate?.(
        videoRef.current.currentTime,
        isVideoFinished,
        videoRef.current
      );
    }
  };
  const handleLoadedData = (
    e: React.SyntheticEvent<HTMLVideoElement, Event>
  ) => {
    if (IsExipredOnce) {
      e.currentTarget.currentTime = currentTimeStored;
    }
  };
  const handleLoadedMetadata = (
    e: React.SyntheticEvent<HTMLVideoElement, Event>
  ) => {
    for (let index = 0; index < e.currentTarget.textTracks.length; index++) {
      const track = e.currentTarget.textTracks[index];
      if (track.language === query?.lang) {
        track.mode = "showing";
      } else {
        track.mode = "disabled";
      }
    }
  };
  const handleErrorCapture = () => {
    onError?.().then((newToken) => {
      setVideoSrcToken(newToken);
      refetchTokenAndSetInterval();
      setTimeout(() => {
        videoRef.current?.play();
      }, 0);
      return;
    });
  };

  useEffect(() => {
    if (videoRef.current && subtitles) {
      videoRef.current.textTracks.addEventListener("change", (e) => {
        if (e.target && typeof e.target === "object") {
          let target = Object(e.target);
          for (let i = 0; i < subtitles.length; i++) {
            const key = i.toString();
            if (key in target && target[key].mode === "showing") {
              onTrackChanged?.(target[key].language);
              break;
            }
          }
        }
      });
    }
  }, [videoSrcToken, videoSrc]);

  useEffect(() => {
    refetchTokenAndSetInterval();
    const Interval = SaveCurrentTimeInterval();
    if (videoRef.current) {
      setVideoSrcToken(videoSrc);
      videoRef.current.setAttribute("controlsList", "nodownload");
    }
    return () => {
      clearInterval(Interval);
      setVideoSrcToken(null);
    };
  }, [Slug, videoSrcToken, videoSrc]);
  return (
    <div className="relative group overflow-hidden w-full h-500">
      <img
        src={imagePoster.src}
        className="absolute z-[1] w-full h-full object-contain"
        alt=""
      />
      {videoSrc && (
        <video
          src={FullPath(`${path}/${videoSrcToken}#t=${defaultTimeFixed}`)}
          crossOrigin="anonymous"
          ref={videoRef}
          className="relative w-full h-full rounded-t z-[2]"
          controls
          onTimeUpdate={handleTimeUpdate}
          onLoadedData={handleLoadedData}
          poster={poster || imagePoster.src}
          onLoadedMetadata={handleLoadedMetadata}
          onErrorCapture={handleErrorCapture}
        >
          {subtitles
            ?.filter((el) => el.type === "VIDEO")
            .map((el, index) => (
              <track
                key={index}
                label={el.language}
                kind="captions"
                srcLang={el.language}
                src={FullPath(el.filePath)}
                default={el.language === query?.lang}
              />
            ))}
        </video>
      )}
    </div>
  );
};
