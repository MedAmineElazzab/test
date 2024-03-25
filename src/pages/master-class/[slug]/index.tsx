import api, { setContext } from "@/_v1/api/api";
import { MasterClassesTab, ThumbnailCard, VideoPlayer } from "../../../_v1/components";
import VideoPlayerNative from "@/_v1/components/video/AdvancedVideoPlayer";
import {
  calculateHeight,
  convertTimeToHours,
  defineDatetime,
  defineImageURI,
  defineVideoURI,
  onStreamVideo,
  parseDurationString,
} from "../../../_v1/functions";
import useAlerts from "@/_v1/hooks/useAlerts";
import useProgress, { CustomButton } from "@/_v1/hooks/useProgress";
import { CalendarIcon, HoursPlayIcon } from "../../../_v1/icons";
import {
  getMasterClassesBySlug,
  onJoinToMasterClassesBySlug,
} from "@/_v1/services/master-classes";
import { useQuery } from "@tanstack/react-query";
import moment from "moment-timezone";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type Props = {
  content: any;
  stream: any;
  currentSlug: string;
};

type SnippetProps = {
  id: number;
  title: string;
  src: string;
  thumbnail: string;
};

const Page = ({ content, stream, currentSlug }: Props) => {
  const { push } = useRouter();
  const { onAlert, onThemeAlert } = useAlerts();
  const { progress, setProgress } = useProgress();
  const { query } = useRouter();

  const defineTags = (entries: any) =>
    entries?.flatMap((ee: any) =>
      ee?.data?.map((e: any) => ({
        value: e[ee.key]?.name,
        color: e[ee.key]?.color,
      }))
    ) || [];

  //
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState<number>(0);
  const handleCurrentTime = (time: number) => {
    setCurrentTime(time);
    // if (duration !== 0 && Math.ceil(time) === Math.ceil(+duration)) {
    //   console.log(
    //     "Your video duration is complete; redirect-user to any functionality or page."
    //   );
    //   setDuration(0);
    // }
  };

  const [updatedAt, setUpdatedAt] = useState(String(new Date()));
  const [video, setVideo] = useState<any>(undefined);
  const [thumbnail, setThumnmail] = useState<any>(undefined);
  const [transcription, setTranscription] = useState<any>(undefined);
  const [subtitles, setSubtitles] = useState<any>(undefined);
  const [chapters, setChapters] = useState<any>(undefined);
  const [tracks, setTracks] = useState<any>(undefined);
  const [selectedLang, setSelectedLang] = useState<string | undefined>(
    undefined
  );

  const defineStates = () => {
    if (stream) {
      // setVideo(stream?.video_path);
      setVideo(defineVideoURI(`/masterclass/video/${stream?.video_token}`));
      setThumnmail(stream?.video_thumbnail);
      setTranscription(stream?.video_transcription);
      setTracks([...stream?.video_subtitles, ...stream?.video_chapters]);
      setIsJoined(stream?.data?.isJoined);
    }
  };

  useEffect(() => {
    setTranscription(stream?.video_transcription);
  }, [stream]);

  useEffect(() => {
    defineStates();
  }, []);

  useEffect(() => {
    push({
      pathname: "",
      query: {
        ...query,
        lang: selectedLang,
      },
    });
    document?.getElementById("header-id")?.scrollIntoView(); //{ behavior: "smooth" }
  }, [selectedLang]);

  const [isJoined, setIsJoined] = useState(content?.isJoined);

  useEffect(() => {
    const handleJoinToClass = async () => {
      try {
        if (!isJoined) {
          setProgress(true);
          await onJoinToMasterClassesBySlug(currentSlug);
          const { data, status } = await getMasterClassesBySlug(
            currentSlug,
            selectedLang
          );

          setVideo(
            defineVideoURI(`/masterclass/video/${data?.data?.videoPathToken}`)
          );
          setThumnmail(defineImageURI(data?.data?.thumbnailVideo));
          setIsJoined(true);

          onThemeAlert(
            "Success",
            `you have been joined the master class successfully`,
            "SUCCESS",
            "DARK",
            5000
          );
        }
      } catch (error) {
        console.log("error : ", error);
      } finally {
        setProgress(false);
      }
    };
    handleJoinToClass();
  }, []);

  const [snippetVideo, setSnippetVideo] = useState<SnippetProps | undefined>(
    undefined
  );
  const [pauseOriginal, setPuaseOriginal] = useState<boolean | undefined>(
    false
  );

  const handleSwitchToSnippetVideo = (data: SnippetProps) => {
    setPuaseOriginal(true);
    setSnippetVideo(data);
    onThemeAlert(
      "Success",
      `L'extrait vidéo a été transitionné avec succès.`,
      "SUCCESS",
      "DARK",
      5000
    );
    document
      ?.getElementById("multimedia-id")
      ?.scrollIntoView({ block: "start", behavior: "smooth" });
  };

  const handleInitOriginaVideo = () => {
    setPuaseOriginal(undefined);
    setSnippetVideo(undefined);
    document
      ?.getElementById("multimedia-id")
      ?.scrollIntoView({ block: "start", behavior: "smooth" });
  };

  const router = useRouter();

  useEffect(() => {
    const exitingFunction = () => {
      setPuaseOriginal(true);
    };

    router.events.on("routeChangeStart", exitingFunction);

    return () => {
      console.log("unmounting component...");
      router.events.off("routeChangeStart", exitingFunction);
    };
  }, []);



  console.log(content , "content")

  return (
    <div className="bg-[#141518] text-white min-h-[calc(100vh-120px)] flex flex-col p-[30px] py-[40px]">
      <>
        <div className=" max-w-[1600px] w-[100%] mx-auto flex flex-col lg:flex-row gap-[20px]">
          <div className="basis-[350px] flex flex-col gap-[20px] relative lg:sticky lg:top-[105px] h-auto lg:self-start">
            <div className="bg-[#1E1F25] rounded-[8px] p-[15px]">
              <div className="flex flex-1 w-[100%] overflow-hidden rounded-[8px]">
                <div
                  className="relative w-[100%] overflow-hidden rounded-[8px]"
                  style={{ paddingBottom: calculateHeight(351, 219) }}
                >
                  {content?.imagePath && (
                    <ThumbnailCard
                      height="100%"
                      path={defineImageURI(content?.imagePath)}
                    />
                  )}
                </div>
              </div>
              <div className="flex gap-[20px] border-b-[1px] border-[#C4C4C430] py-[20px]">
                <div className="flex gap-[10px] items-center">
                  <span className="w-[28px] h-[28px] rounded-full bg-[#0049E0] flex items-center justify-center">
                    <CalendarIcon width={16} height={16} color="#ffffff" />
                  </span>
                  {defineDatetime(content?.publishedAt, "DD/MM/YYYY")}
                </div>
                <div className="flex gap-[10px] items-center">
                  <span className="w-[28px] h-[28px] rounded-full bg-[#0049E0] flex items-center justify-center">
                    <HoursPlayIcon width={16} height={16} color="#ffffff" />
                  </span>
                  {moment(content?.publishedAt).format("HH[H]mm")}
                </div>
              </div>
              <div className="flex flex-wrap gap-[15px] py-[20px]">
                {defineTags([
                  { key: "speciality", data: content?.MasterClassSpeciality },
                  { key: "pathology", data: content?.MasterClassPathology },
                  { key: "label", data: content?.MasterClassLabel },
                ]).map((item: any, _: number) => (
                  <>
                    <div
                      className={`text-[14px] border-current border-[1px] rounded-[4px] px-[20px] py-[7.5px]`}
                      style={{
                        color: item?.color,
                        backgroundColor: `${item?.color}15`,
                      }}
                    >
                      {item?.value}
                    </div>
                  </>
                ))}
              </div>
              <div>
                <h4 className="text-[18px] mb-[20px]">
                  Master class organisé par: {content?.organization?.name}
                </h4>
                <div className="flex flex-col gap-[15px]">
                  {/* <CustomButton
                    className={`
                        w-[100%] h-[40px] flex items-center justify-center text-white bg-[#0049E0] border-[#0049E0] border-[1px] rounded-[4px]
                        ${isJoined ? "pointer-events-none opacity-[0.5]" : ""}
                      `}
                    type="button"
                    name={isJoined ? "j'ai participé" : "Je participe"}
                    progress={progress}
                    //
                    payload={() => handleJoinToClass()}
                  /> */}
                  {/* <Link
                    href={`/master-class/${currentSlug}/question`}
                    className="w-[100%] h-[40px] flex items-center justify-center text-white bg-[#282C38] rounded-[4px]"
                    //border-[#475569] border-[1px]
                  >
                    Je pose une question
                  </Link> */}
                </div>
              </div>
            </div>
            <div className="bg-[#1E1F25] rounded-[8px] p-[15px]">
              <h4 className="text-[600] text-[18px] mb-[13px]">Partenaire</h4>
              <div className="flex flex-col gap-[15px]">
                {content?.MasterClassPartner.map((item: any, _: number) => (
                  <>
                    <div className="flex justify-start gap-[10px] border-b-[1px] py-[10px] border-[#94A3B857] last:border-[0] last:pb-[0px]">
                      <div className="bg-[#ffffff] w-[36px] h-[36px] flex justify-center items-center rounded-full relative overflow-hidden mt-[4px] ">
                        <ThumbnailCard
                          height="100%"
                          path={defineImageURI(item?.organization?.imagePath)}
                          withOverflow={false}
                        />
                      </div>
                      <div className="flex flex-col justify-start items-start gap-[2px]">
                        <h5 className="text-[16px] font-[400] leading-[24px] ">
                          Partenaire: {item?.organization?.name}
                        </h5>
                        <span className="text-[#14B8A6] bg-[#14B8A6]/20 border-[#14B8A6] border-[1px] text-[14px] px-[5px] p-[2px] leading-[20px] rounded-[4px]">
                          Top Partenaire
                        </span>
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
          <div
            className="relative flex-[2] flex flex-col"
            id="multimedia-id"
            style={{ scrollMarginTop: 100 }}
          >
            <div className="">
              <div className="w-[100%]">
                <h2 className="font-[600] text-[24px] text-[#ffffff] mb-[15px]">
                  {content?.title}
                </h2>
              </div>
              <div id="video-player">
                <VideoPlayer
                  title={content?.title}
                  video={video} //"https://stream.mux.com/VZtzUzGRv02OhRnZCxcNg49OilvolTqdnFLEqBsTwaxU/low.mp4" // content?.
                  thumbnail={thumbnail} //"https://image.mux.com/VZtzUzGRv02OhRnZCxcNg49OilvolTqdnFLEqBsTwaxU/thumbnail.webp?time=268&width=1200"
                  alt={content?.title} //"Girl walks into campfire with gnomes surrounding her friend ready for their next meal!"
                  handleCurrentTime={handleCurrentTime}
                  tracks={tracks}
                  className={snippetVideo ? "hidden" : ""}
                  pauseOriginal={pauseOriginal}
                  setDuration={setDuration}
                  setSelectedLang={setSelectedLang}
                />

                {snippetVideo && (
                  <VideoPlayer
                    title={snippetVideo?.title}
                    video={video} //"https://stream.mux.com/VZtzUzGRv02OhRnZCxcNg49OilvolTqdnFLEqBsTwaxU/low.mp4" // content?.
                    thumbnail={snippetVideo?.thumbnail} //"https://image.mux.com/VZtzUzGRv02OhRnZCxcNg49OilvolTqdnFLEqBsTwaxU/thumbnail.webp?time=268&width=1200"
                    alt={snippetVideo?.title}
                    setSelectedLang={setSelectedLang}
                  />
                )}
              </div>
            </div>
            <div className="bg-[#1E1F25] p-[20px]">
              <div id="tabs">
                {/* {JSON.stringify(transcription)} */}
                <MasterClassesTab
                  isJoined={isJoined}
                  transcription={transcription}
                  content={[
                    {
                      tab: "transcription",
                      data: transcription,
                      time: currentTime,
                    },
                    {
                      tab: "information",
                      data: {
                        description: content?.description,
                        objective: content?.objective,
                        attachement: content?.Attachement,
                        tags: content?.MasterClassHashTag,
                      },
                    },
                    { tab: "experts", data: content?.MasterClassExperts },
                    { tab: "trials", data: content?.Snippets },
                  ]}
                  isOriginalVideo={!snippetVideo ? true : false}
                  handleSwitchToSnippetVideo={handleSwitchToSnippetVideo}
                  handleInitOriginaVideo={handleInitOriginaVideo}
                  currentSnippetId={snippetVideo?.id || undefined}
                />
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export async function getServerSideProps(context: any) {
  setContext(context);
  const { query } = context;
  const { slug } = query;
  const { lang } = query;

  const { data, status } = await getMasterClassesBySlug(slug, lang);

  if (status === 404) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      content: data?.data,
      stream: data,
      currentSlug: slug,
    },
  };
}

export default Page;
