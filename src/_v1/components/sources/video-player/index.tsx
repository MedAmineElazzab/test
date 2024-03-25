//@ts-nocheck
import { useEffect, useRef, useState } from "react";

import {
  useMediaRemote,
  isHLSProvider,
  MediaPlayer,
  MediaProvider,
  Poster,
  Track,
  type MediaCanPlayDetail,
  type MediaCanPlayEvent,
  MediaPlayerInstance,
  type MediaProviderAdapter,
  type MediaProviderChangeEvent,
  useStore,
} from "@vidstack/react";
import {
  DefaultAudioLayout,
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import { Chapter, Subtitle } from "./type";
import { Console } from "console";
import { calculateHeight } from "@/_v1/functions";
import { useRouter } from "next/router";

type Props = {
  title: string;
  video: string;
  thumbnail: string;
  alt: string;
  tracks?: (Subtitle | Chapter)[] | undefined;
  storyboard?: string | undefined;
  handleCurrentTime?: (time: number) => void | undefined;
  className?: string;
  pauseOriginal?: boolean | undefined;
  setDuration?: (data: number) => void;
  setSelectedLang?: any;
  classNameVideo?: String;
  styleProps?: String;
};

const VideoPlayer = ({
  title,
  video,
  thumbnail,
  alt,
  tracks = undefined,
  storyboard = undefined,
  handleCurrentTime = undefined,
  className = "",
  pauseOriginal = undefined,
  setDuration,
  setSelectedLang,
  classNameVideo,
  styleProps,
}: Props) => {
  let player = useRef<MediaPlayerInstance>(null);
  const { duration } = useStore(MediaPlayerInstance, player);

  useEffect(() => {
    // if (setDuration) setDuration(duration);
  }, [duration]);

  useEffect(() => {
    // Subscribe to state updates.
    onPauseOriginVideo();
  }, [pauseOriginal]);

  const onPauseOriginVideo = () => {
    if (pauseOriginal) {
      console.log("PAUSE METHOD...");
      player.current!.paused = true;
    }
  };

  function onProviderChange(
    provider: MediaProviderAdapter | null,
    nativeEvent: MediaProviderChangeEvent
  ) {
    // We can configure provider's here.
    if (isHLSProvider(provider)) {
      provider.config = {};
    }
  }

  // We can listen for the `can-play` event to be notified when the player is ready.
  function onCanPlay(
    detail: MediaCanPlayDetail,
    nativeEvent: MediaCanPlayEvent
  ) {
    // ...
    // console.log(detail, nativeEvent , "native");
  }

  function onTimeUpdate(e: any) {
    if (handleCurrentTime) handleCurrentTime(e.currentTime);
  }

  const [show, setShow] = useState<boolean>(false);
  const handleOnReplay = () => {
    console.log("replay video...");
    setShow(true);
    setTimeout(() => {
      setShow(false);
    }, 100);
  };

  if (!video) return;

  return (
    <>
      <div
        className={` ${className} ${styleProps} `}
        style={{ paddingBottom: "56.25%", position: "relative" }}
      >
        <div
          className={`custom-media-player ${className} h-[100%] w-[100%] absolute top-[0] right-[0] z-[1] ${
            show && "hidden"
          }`}
        >
          <MediaPlayer
            id="video"
            className={`player custom-player ${classNameVideo} `}
            title={title}
            src={{
              src: video,
              type: "video/webm",
            }}
            crossorigin
            onProviderChange={onProviderChange}
            onCanPlay={onCanPlay}
            ref={player}
            onTimeUpdate={onTimeUpdate}
            onReplay={handleOnReplay}
            onTextTrackChange={(track, event) => {
              setSelectedLang(track?.language.split("-")[0]?.toUpperCase());
              console.log(track);
            }}
          >
            <MediaProvider>
              <Poster className="vds-poster" src={thumbnail} alt={alt} />
              {tracks &&
                tracks.map((track) => <Track key={track.src} {...track} />)}
            </MediaProvider>
            {/* Layouts */}
            <DefaultVideoLayout
              icons={defaultLayoutIcons}
              thumbnails={storyboard}
              noScrubGesture={false}
            />
          </MediaPlayer>
        </div>
      </div>
    </>
  );
};

export default VideoPlayer;
