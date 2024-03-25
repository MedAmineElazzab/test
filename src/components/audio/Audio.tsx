import { formatTime } from "@/_v1/lib/utils";
import { Slider } from "@mantine/core";
import {
  IconPlayerPauseFilled,
  IconPlayerPlayFilled,
  IconVolume,
  IconVolumeOff,
} from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import classes from "./styles/player.module.css";
import { LottieAnimations } from "../Animation";
interface AudioProps {
  src: string;
  placeholder?: string;
  withControl?: boolean;
}

export const waves = require("@assets/animations/waves.json");

export function AudioPlayer({ src, placeholder, withControl }: AudioProps) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [sliderValue, setSliderValue] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isValidSource, setIsValidSource] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  useEffect(() => {
    setIsValidSource(!!src);
  }, [src]);

  function handlePlayStop() {
    const audio = audioRef.current;
    console.log(isValidSource);
    if (audio && isValidSource) {
      if (isPlaying) {
        audio.pause();
        audio.muted;
      } else {
        audio.play();
      }

      setIsPlaying(!isPlaying);
    }
  }
  function handleSliderChange(value: number) {
    const audio = audioRef.current;

    if (audio) {
      const newPosition = (value / 100) * audio.duration;
      audio.currentTime = newPosition;
    }
  }
  function handleTimeUpdate() {
    const audio = audioRef.current;

    if (audio) {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration);
      setSliderValue((audio.currentTime / audio.duration) * 100);
    }
  }
  function handleMuteToggle() {
    const audio = audioRef.current;

    if (audio) {
      if (isMuted) {
        audio.volume = 1; // Restore previous volume
      } else {
        audio.volume = 0; // Mute
      }

      setIsMuted(!isMuted);
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
        <audio
          ref={audioRef}
          src={src}
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
        ></audio>
      ) : (
        <div className="text-red-500">Invalid audio source</div>
      )}

      <div
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('${placeholder}')`,
          backgroundPosition: "center center",
        }}
        className="absolute w-full h-full bg-cover  blur-[1.5px] bg-primary-normal"
      ></div>
      <div
        className={`absolute z-[8] w-[260px] transition-all opacity-30  pointer-events-none`}
      >
        <LottieAnimations isPaused={!isPlaying} loop animationData={waves} />
      </div>
      <div
        className={`absolute audio-clip-btn z-[20] ${
          isPlaying ? "playing" : "off"
        } top-1/2 left-1/2 block -translate-x-1/2 border-[4px] border-white rounded-full -translate-y-1/2 profile w-[70px] h-[70px]`}
      >
        <img
          className="absolute z-[21] h-full w-full object-cover object-center rounded-full"
          src={placeholder || "/assets/images/emptyuser.png"}
          alt=""
        />
        <div className="circle-wave h-full w-full rounded-full"></div>
        <div className="circle-wave h-full w-full rounded-full"></div>
        <div className="circle-wave h-full w-full rounded-full"></div>
        <div className="circle-wave h-full w-full rounded-full"></div>
      </div>
      {withControl && (
        <div
          className={`controls z-[40] absolute transition-all bottom-[-30px] playing group-hover:bottom-1 flex gap-3 justify-between items-center w-[95%] h-[auto]`}
        >
          <div
            className="play-stop w-[30px] h-[18px] cursor-pointer bg-white/40 flex justify-center items-center rounded-sm"
            onClick={isValidSource ? handlePlayStop : () => {}}
          >
            {isPlaying ? (
              <IconPlayerPauseFilled className="text-white w-[15px]" />
            ) : (
              <IconPlayerPlayFilled className="text-white w-[15px]" />
            )}
          </div>
          <div className="text-[10px] text-white w-[120px]">
            {`${formatTime(currentTime as number)}/${formatTime(
              duration || 0
            )}`}
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
