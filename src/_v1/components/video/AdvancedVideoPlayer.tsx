import { Transcription } from "@/_v1/api/module";
import { FullPath } from "@/_v1/lib/utils";
import imagePoster from "@assets/images/meducate.png";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
// Define the VideoProps interface
interface VideoProps {
  videoSrc: string;
  path: string;
  poster?: string | null;
  onTimeUpdate?: (
    currentTime: number,
    isVideoFinished: boolean,
    mainVideoRef: HTMLVideoElement
  ) => void;
  onTrackChanged: (language: string) => void;
  subtitles: Transcription[];
  onTokenExpired: () => Promise<string>;
  onError: () => Promise<string>;
}

// Define the VideoPlayerNative component
const VideoPlayerNative: React.FC<VideoProps> = ({
  videoSrc,
  onTimeUpdate,
  subtitles,
  onTokenExpired,
  poster,
  onTrackChanged,
  path,
  onError,
}) => {
  const [currentTimeStored, setCurrentTimeStored] = useState<number>(0);
  const [videoSrcToken, setVideoSrcToken] = useState<string>(videoSrc);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { query } = useRouter();

  // Decode JWT token and calculate token lifespan
  const handleJWTDecode = (token: string) => {
    try {
      const decodedToken = jwtDecode(token) as {
        iat: number;
        exp: number;
      };
      const { iat, exp } = decodedToken;
      const currentTime = Math.floor(Date.now() / 1000);
      const tokenLifeSpan = exp - iat;
      const currentTokenSpan = currentTime - exp;
      return { tokenLifeSpan, currentTokenSpan };
    } catch (error) {
      console.error("Error decoding JWT:", error);
      return { tokenLifeSpan: 0, currentTokenSpan: 0 };
    }
  };

  // Refetch token and set interval for token checking
  const refetchTokenAndSetInterval = () => {
    const { tokenLifeSpan, currentTokenSpan } = handleJWTDecode(videoSrcToken);
    const tokenCheckInterval = setInterval(() => {
      if (tokenLifeSpan * 1000 - currentTokenSpan * 1000 <= 10000) {
        setCurrentTimeStored(videoRef.current?.currentTime as number);
        onTokenExpired().then((newToken) => {
          setVideoSrcToken(newToken);
          setTimeout(() => {
            videoRef.current?.play();
          }, 0);
        });
      }
    }, tokenLifeSpan * 1000 - 10000);
    return () => clearInterval(tokenCheckInterval);
  };

  // Effect to run refetchTokenAndSetInterval when the route changes
  useEffect(() => {
    refetchTokenAndSetInterval();
    onTrackChanged("");
  }, [query?.slug?.[0]]);

  useEffect(() => {
    if (videoRef.current && videoRef.current.textTracks) {
      videoRef.current.textTracks.addEventListener("change", (e) => {
        for (let i = 0; i < (e.target as any).length; i++) {
          const key = i.toString();
          if (
            key in (e.target as any) &&
            (e.target as any)[key].mode === "showing"
          ) {
            console.log((e.target as any)[key].language);
            onTrackChanged((e.target as any)[key].language);
            break;
          }
        }
      });
    }
  }, [videoSrcToken]);

  // Function to handle time update
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
  // Effect to handle changes in video source and path
  useEffect(() => {
    setVideoSrcToken(videoSrc);
    if (videoRef.current) {
      videoRef.current?.load();
      videoRef.current.setAttribute("controlsList", "nodownload");
      // setVideoLength(videoRef.current.duration);
    }
  }, [query?.slug?.[0], videoSrc]);

  // Render the VideoPlayerNative component
  return (
    <div className="relative group overflow-hidden">
      <img src={imagePoster.src} className="absolute z-[1]" alt="" />
      <video
        crossOrigin="anonymous"
        ref={videoRef}
        className="relative w-full h-full rounded-t z-[2]"
        controls
        onTimeUpdate={handleTimeUpdate}
        onLoadedData={(e) => {
          e.currentTarget.currentTime = currentTimeStored;
        }}
        poster={poster || imagePoster.src}
        onLoadedMetadata={(e) => {
          for (
            let index = 0;
            index < e.currentTarget.textTracks.length;
            index++
          ) {
            const track = e.currentTarget.textTracks[index];
            track.mode = "disabled";
            // if (track.language === "FR") {
            //   track.mode = "showing";
            // }
            // else {
            //   track.mode = "disabled";
            // }
          }
        }}
        onErrorCapture={(e) => {
          onError().then((newToken) => {
            setVideoSrcToken(newToken);
            refetchTokenAndSetInterval();
            setTimeout(() => {
              videoRef.current?.play();
            }, 0);
            return;
          });
        }}
      >
        <source src={FullPath(`${path}/${videoSrcToken}`)} type="video/mp4" />
        {subtitles
          .filter((el) => el.type === "VIDEO")
          .map((el, index) => (
            <track
              key={index}
              label={el.language}
              kind="captions"
              srcLang={el.language}
              src={FullPath(el.filePath)}
              // default={el.language === "FR"}
            />
          ))}
      </video>

      <style jsx>
        {`
          video::cue {
            color: white;
            font-weight: bold;
            background-color: #00000080;
            font-size: 28px;
            padding: 10px;
          }
        `}
      </style>
    </div>
  );
};

export default VideoPlayerNative;
