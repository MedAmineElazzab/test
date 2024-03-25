import { formatTime } from "@/_v1/lib/utils";
import { Slider } from "@mantine/core";
import {
  IconPlayerPauseFilled,
  IconPlayerPlayFilled,
  IconVolume,
  IconVolumeOff,
} from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import classes from "../audio/styles/player.module.css";

interface VideoProps {
  src: string;
  placeholder?: string;
  withControl?: boolean;
}

export const waves = require("@assets/animations/waves.json");

export default function VideoPlayer({
  src,
  placeholder,
  withControl,
}: VideoProps) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [sliderValue, setSliderValue] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isValidSource, setIsValidSource] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    setIsValidSource(!!src);
  }, [src]);

  function handlePlayStop() {
    const video = videoRef.current;

    if (video && isValidSource) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }

      setIsPlaying(!isPlaying);
    }
  }

  function handleSliderChange(value: number) {
    const video = videoRef.current;

    if (video) {
      const newPosition = (value / 100) * video.duration;
      video.currentTime = newPosition;
    }
  }

  function handleTimeUpdate() {
    const video = videoRef.current;

    if (video) {
      setCurrentTime(video.currentTime);
      setDuration(video.duration);
      setSliderValue((video.currentTime / video.duration) * 100);
    }
  }

  function handleMuteToggle() {
    const video = videoRef.current;

    if (video) {
      video.muted = !video.muted;
      setIsMuted(video.muted);
    }
  }

  return (
    <div
      onClick={
        withControl ? () => {} : isValidSource ? handlePlayStop : () => {}
      }
      className="w-full h-full cursor-pointer flex justify-center items-center relative group rounded-sm"
    >
      {isValidSource ? (
        <video
          className="w-full h-full object-cover"
          ref={videoRef}
          src={src}
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
        ></video>
      ) : (
        <div className="text-red-500">Invalid video source</div>
      )}

      <div className="absolute w-full h-full bg-cover blur-[1.5px] bg-black/30 "></div>
      <div
        className={`absolute audio-clip-btn z-[20] ${isPlaying ? "opacity-0" : "opacity-100"} transition-all  top-1/2 left-1/2 block -translate-x-1/2 border-[4px] border-white rounded-full -translate-y-1/2 profile w-[90px] h-[90px]`}
      >
        <img
          className="absolute z-[21] h-full w-full object-cover object-center rounded-full"
          src={placeholder || "/assets/images/emptyuser.png"}
          alt=""
        />
      </div>
      {withControl && (
        <div
          className={`controls z-[40] absolute transition-all bottom-[-30px] playing group-hover:bottom-1 flex gap-3 justify-between items-center w-[95%] h-[auto]`}
        >
          <div
            className="play-stop w-[20px] h-[20px] cursor-pointer bg-white/40 flex justify-center items-center rounded-sm"
            onClick={isValidSource ? handlePlayStop : () => {}}
          >
            {isPlaying ? (
              <IconPlayerPauseFilled className="text-white w-[18px]" />
            ) : (
              <IconPlayerPlayFilled className="text-white w-[18px]" />
            )}
          </div>
          <div className="text-xs text-white w-[120px]">
            {formatTime(currentTime as number)} /{" "}
            {formatTime(duration as number)}
          </div>
          <div className="progress-bar w-[calc(100%-48px)]">
            <Slider
              value={sliderValue}
              onChange={handleSliderChange}
              label={formatTime(currentTime as number)}
              styles={{
                bar: {
                  background: "white",
                },
              }}
              sx={{
                [".mantine-Slider-thumb"]: {
                  borderColor: "white",
                  color: "white",
                },
                [".mantine-Slider-thumb:hover"]: {
                  transform: "translate(-50%, -50%) scale(1.4)",
                },
              }}
              size={3}
              classNames={classes}
              showLabelOnHover={false}
            />
          </div>
          <div onClick={handleMuteToggle} className="play-stop">
            {!isMuted ? (
              <IconVolume className="text-white w-[20px]" />
            ) : (
              <IconVolumeOff className="text-white w-[20px]" />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
