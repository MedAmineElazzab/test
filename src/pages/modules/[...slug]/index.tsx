import api, { setContext } from "@/_v1/api/api";
import { Module, Transcription } from "@/_v1/api/module";
import { Badge } from "../../../_v1/components";
import Breadcrumb from "@/_v1/components/breadcrumb/Breadcrumb";
import QuizIndex from "@/_v1/components/modules/components/quiz";
import {
  Description,
  Documents,
  Header,
  Notes,
  Transcript,
} from "@/_v1/components/modules/components/slug";
import { Tabs } from "@/_v1/components/series/components/slug";
import VideoPlayerNative from "@/_v1/components/video/AdvancedVideoPlayer";
import VerifiedIcon from "@/_v1/icons/sources/VerifiedIcon";
import { FullPath, secondsToHHMMSS } from "@/_v1/lib/utils";
import Error from "@/pages/_error";
import {
  Avatar,
  Group,
  HoverCard,
  ScrollArea,
  Stack,
  Text,
} from "@mantine/core";
import { getHotkeyHandler, useDisclosure } from "@mantine/hooks";
import { IconPlayerPlayFilled, IconX } from "@tabler/icons-react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

export default function Index({
  Module,
  errorCode,
}: {
  Module: Module;
  errorCode: number | null;
}) {
  const { asPath, push, query } = useRouter();
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [videoSrc, setVideoSrc] = useState<string>(Module?.videoSrc);
  const [videoTranscript, setVideoTranscript] = useState<Transcription[]>(
    Module?.Transcription
  );
  const [videoCaptionLanguage, setVideoCaptionLanguage] = useState<string>("");
  const [video, setVideo] = useState<HTMLVideoElement | null>(null);
  const [opened, { open, close }] = useDisclosure(
    (query?.slug as []).length > 1
  );
  const quizRef = useRef<HTMLDivElement>(null);
  const items: any = [
    { title: "Modules", href: "/modules" },
    { title: Module?.title, href: asPath },
  ].map((item, index) => (
    <Link className="hover:underline" href={item.href} key={index}>
      {item.title}
    </Link>
  ));

  useEffect(() => {
    if (asPath.endsWith("/quiz")) {
      open();
    }
    if (quizRef.current) {
      quizRef.current.focus();
      quizRef.current.onkeydown = getHotkeyHandler([
        [
          "Escape",
          () => {
            close();
            push({
              pathname: "/modules/" + Module.slug,
            });
          },
        ],
      ]);
    }
  }, [query?.slug?.length]);
  if (errorCode) {
    return (
      <Error
        message={`The requested Module is not available.`}
        description={`Please update your search or filters, or explore other options below.`}
      />
    );
  }
  console.log(opened);
  return (
    <>
      <Head>
        <title>{Module.title} • Meducate Modules </title>
      </Head>
      <div className="relative pt-[10px]">
        {(query?.slug as []).length > 1 && (
          <div
            ref={quizRef}
            tabIndex={-1}
            className={"fixed top-0 left-0 z-[200] h-[100vh] w-[100vw]  transition-all  ".concat(
              " ",
              opened ? "opacity-100 bg-black/80 delay-0" : "opacity-0 "
            )}
          >
            <div
              className="absolute close-btn flex justify-end items-center w-full h-[5%] top-0 cursor-pointer"
              onClick={() => {
                close();
                push({
                  pathname: "/modules/" + Module.slug,
                });
              }}
            >
              <div className="flex items-center gap-2 flex-row-reverse  mr-3">
                <IconX className="text-white text-opacity-70 w-[30px] hover:text-opacity-100 " />
              </div>
            </div>

            <div
              className={"bg-white absolute  left-1/2 -translate-x-1/2 transition-all duration-500 bottom-0  rounded-tl-lg  h-[95%]".concat(
                " ",
                opened
                  ? "translate-y-0 opacity-100 w-full"
                  : "w-[90%] opacity-0 translate-y-[90%]"
              )}
            >
              <QuizIndex closeAction={close} />
            </div>
          </div>
        )}
        <Breadcrumb items={items} />
        <Header {...Module} />
        <div className="relative px-4 Note-container w-full min-h-[1000px] mb-5 flex  gap-[30px] ">
          <div className="w-[calc(100%-500px)] mt-4">
            <div className="w-full bg-white rounded-[6px] border">
              <div id="video-player" className="relative rounded-t">
                <VideoPlayerNative
                  path="/module/video"
                  onTrackChanged={setVideoCaptionLanguage}
                  onTimeUpdate={(currentTime, isVideoFinished, video) => {
                    setCurrentTime(currentTime);
                    setVideo(video);
                  }}
                  videoSrc={videoSrc}
                  subtitles={videoTranscript}
                  onTokenExpired={async () => {
                    try {
                      const { data } = await api.get(
                        "/module/refresh/" + Module.slug
                      );
                      return data;
                    } catch (error) {
                      push("/modules");
                    }
                  }}
                  poster={Module.imagePath}
                  onError={async () => {
                    try {
                      const { data } = await api.get(
                        "/module/refresh/" + Module.slug
                      );
                      return data;
                    } catch (error) {
                      console.log(error);
                      push("/modules");
                    }
                  }}
                />
              </div>
              <Tabs
                tabs={[
                  {
                    label: "Description",
                    content: <Description {...Module} />,
                    value: "Description",
                  },
                  {
                    label: "Notes",
                    content: <Notes ModuleNote={Module.note} />,
                    // content: <div></div>,
                    value: "Notes",
                  },
                  {
                    label: "Transcript",
                    content: (
                      <Transcript
                        videoRef={video}
                        currentTime={currentTime}
                        transcript={Module.Transcription}
                        lang={videoCaptionLanguage}
                      />
                    ),
                    value: "Transcript",
                  },
                  {
                    label: "Documents",
                    content: (
                      <Documents ModuleAttachements={Module.Attachement} />
                    ),
                    // content: <div></div>,
                    value: "Documents",
                  },
                ]}
              />
            </div>
          </div>
          <div className="relative h-auto mt-4">
            <div className="w-[450px] sticky top-[80px] transition-all ">
              <div className="sticky-container w-full flex flex-col gap-3">
                <div className="bg-white px-4 py-4 gap-3 border border-[#E2E8F0] flex items-center  rounded-[6px] ">
                  <Avatar
                    size={"xl"}
                    src={
                      Module.imagePath != null
                        ? FullPath(Module.imagePath)
                        : null
                    }
                    sx={{
                      [".mantine-Avatar-placeholder"]: {
                        color: "#0049e0",
                        background: "#0049e010",
                      },
                    }}
                    radius={"50%"}
                  >
                    {Module.moduleExpert.expert?.firstName.slice(0, 1)} +
                    {Module.moduleExpert.expert?.lastName.slice(0, 1)}
                  </Avatar>
                  <div className="">
                    <div className="flex items-center gap-2">
                      <Group>
                        <HoverCard
                          width={320}
                          shadow="md"
                          withArrow
                          openDelay={200}
                          closeDelay={400}
                        >
                          <HoverCard.Target>
                            <div className="flex items-center gap-1 font-[500]">
                              <Link
                                href={
                                  "/experts/" + Module.moduleExpert.expert?.slug
                                }
                                className=" flex items-center gap-2 text-[18px] hover:underline "
                              >
                                {Module.moduleExpert.expert?.firstName}{" "}
                                {Module.moduleExpert.expert?.lastName}
                              </Link>
                            </div>
                          </HoverCard.Target>
                          <HoverCard.Dropdown>
                            <Group>
                              <Avatar
                                size={"md"}
                                sx={{
                                  [".mantine-Avatar-placeholder"]: {
                                    color: "#0049e0",
                                    background: "#0049e010",
                                  },
                                }}
                                radius={"50%"}
                              >
                                {Module.moduleExpert?.expert?.firstName?.slice(
                                  0,
                                  1
                                )}{" "}
                                +
                                {Module.moduleExpert?.expert?.lastName?.slice(
                                  0,
                                  1
                                )}
                              </Avatar>{" "}
                              <Stack spacing={2}>
                                <Text
                                  className="flex items-center gap-1 font-[500]"
                                  size="sm"
                                  weight={700}
                                  sx={{ lineHeight: 1 }}
                                >
                                  <span>
                                    {Module.moduleExpert.expert?.firstName}{" "}
                                    {Module.moduleExpert.expert?.lastName}
                                  </span>
                                  <VerifiedIcon className="w-[14px] mb-[2.5px] text-primary-normal" />
                                </Text>
                                <Text
                                  color="dimmed"
                                  size="xs"
                                  sx={{ lineHeight: 1 }}
                                >
                                  {Module.moduleExpert.expert?.note}
                                </Text>
                              </Stack>
                            </Group>
                            <Text
                              sx={{
                                a: {
                                  color: "#0049e0",
                                  fontWeight: 500,
                                },
                                ["a:hover"]: {
                                  textDecoration: "underline",
                                },
                              }}
                              size="sm"
                              mt="md"
                              dangerouslySetInnerHTML={{
                                __html:
                                  Module.moduleExpert.expert?.resume || "",
                              }}
                            />

                            <Group mt="md" spacing="md">
                              <Text size="sm">
                                <b>
                                  {
                                    Module.moduleExpert.expert?._count
                                      ?.NoteExpert
                                  }
                                </b>{" "}
                                Notes
                              </Text>
                              <Text size="sm">
                                <b>
                                  {
                                    Module.moduleExpert.expert?._count
                                      ?.ModuleExpert
                                  }
                                </b>{" "}
                                Modules
                              </Text>
                              <Text size="sm">
                                <b>
                                  {
                                    Module.moduleExpert.expert?._count
                                      ?.ExpertsFollowers
                                  }
                                </b>{" "}
                                Followers
                              </Text>
                            </Group>
                          </HoverCard.Dropdown>
                        </HoverCard>
                      </Group>
                      <VerifiedIcon className="w-[17px] mb-[2.5px] text-primary-normal" />
                    </div>
                    <p className="text-[#33333390]">
                      {Module.moduleExpert.expert?.note}
                    </p>
                  </div>
                </div>
                <div className="bg-white border border-[#E2E8F0] rounded-[6px] py-4 ">
                  <h2 className="text-[18px] font-[500] mx-4">Partenaire </h2>
                  <div className="partners px-4 flex flex-col">
                    {Module.ModulePartner.map((el, index) => {
                      return (
                        <div
                          key={index}
                          className="flex gap-5 organisation-note-detailed-v2 py-4"
                        >
                          <div className="w-[50px] h-[50px] flex justify-center items-center border border-[#E2E8F0] rounded-full ">
                            <img
                              className="w-[32px] object-cover"
                              src={
                                el.organization.imagePath != null
                                  ? FullPath(el.organization.imagePath)
                                  : "/assets/shape-meducate-logo.svg"
                              }
                              alt=""
                            />
                          </div>
                          <div className="flex flex-col gap-[2px]">
                            <Link
                              href={"/institutions/" + el.organization.slug}
                              className="text-[15px] hover:underline font-[400] line-clamp-1"
                            >
                              {el.organization.name}
                            </Link>
                            <Badge
                              style={{ background: "#0049e015" }}
                              className=" border-primary-normal py-[2px] text-primary-normal"
                            >
                              Partenaire
                            </Badge>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="bg-white px-4 py-4 gap-3 border border-[#E2E8F0] flex items-center  rounded-[6px] ">
                  <div className="header flex flex-col gap-3">
                    <h1 className="text-[22px] font-[500]">
                      {Module.serie.title}
                    </h1>
                    <p className="line-clamp-2 text-[15px] text-slate-600">
                      {Module.serie.description}
                    </p>
                    <ScrollArea
                      h={415}
                      type="always"
                      className="w-full flex justify-center items-center  border-[1px] rounded-[4px] p-1"
                    >
                      <div className="raltive series-modules flex flex-col gap-2 h-full">
                        {Module.serie.SerieModule.map((el, index) => {
                          return (
                            <div
                              key={index}
                              className="relative module flex items-center gap-3 mr-1 hover:bg-primary-normal/5 transition-all"
                            >
                              <h2 className="relative left-section w-[170px] h-[100px] group">
                                <img
                                  src={FullPath(el.imagePath)}
                                  alt=""
                                  className="absolute rounded-sm w-full h-full object-cover"
                                />
                                <Link
                                  className="w-[40px] h-[40px] transition-all opacity-0 group-hover:scale-110 group-hover:opacity-100 rounded-full absolute top-1/2 left-1/2   z-10 -translate-x-1/2 -translate-y-1/2 bg-white/50 flex justify-center items-center"
                                  href={"/modules/" + el.slug}
                                >
                                  <IconPlayerPlayFilled className="w-[20px] text-white" />
                                </Link>
                                <Badge className="bg-black/40 !text-[11px] !px-1 !py-[1px]  absolute left-[6px] bottom-[6px] text-white border-transparent">
                                  {secondsToHHMMSS(el.duration)}
                                </Badge>
                              </h2>
                              <div className="description w-[calc(100%-170px)] relative flex flex-col gap-1">
                                <Link
                                  href={"/modules/" + el.slug}
                                  className="text-[16px] font-[500] hover:underline line-clamp-2 "
                                >
                                  {el.title}
                                </Link>
                                <p className="text-slate-600 line-clamp-2 text-sm ">
                                  {el.description}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </ScrollArea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  setContext(context);
  const { query } = context;
  try {
    const { data } = await api.get<Module>(`/module/${query?.slug?.[0]}`);
    return {
      props: {
        Module: data,
        errorCode: null,
      },
    };
  } catch (error: any) {
    if ((error.response && error.response.status === 400) || 404) {
      return {
        props: {
          Serie: {},
          errorCode: error.response.status,
        },
      };
    }
    return {
      props: {
        Module: {},
        errorCode: null,
      },
    };
  }
};
