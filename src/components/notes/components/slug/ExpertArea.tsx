import { Expert, FollowExpert } from "@/_v1/api/expert";
import { Bookmark_Note_Expert } from "@/_v1/api/note";
import Button from "@/_v1/components/Buttons/Button";
import AudioPlayer from "@/_v1/components/audio/Audio";
import { FavoriteIcon, FollowIcon, UnFollowIcon } from "@/_v1/icons";
import VerifiedIcon from "@/_v1/icons/sources/VerifiedIcon";
import { FullPath } from "@/_v1/lib/utils";
import { Avatar, Group, HoverCard, Stack, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

type Props = {
  NoteExpert: {
    noteId: number;
    expertId: number;
    type: string;
    expert: Expert;
    isBookmarked: boolean;
    audioSrc: string;
    Attatchement: {
      id: number;
      name: string;
      size: number;
      path: string;
      type: "AUDIO" | "VIDEO";
      noteId: number;
      noteExpertNoteId: number;
      noteExpertExpertId: number;
      createdAt: string;
      updatedAt: string;
      masterClassId: number;
      userId: number;
      serieId: number;
      moduleId: number;
    };
  };
  noteSlug: string;
};

export function ExpertArea({ NoteExpert, noteSlug }: Props) {
  const { user } = useSelector((state: any) => state.user);
  const [isFollowed, setIsFollowed] = useState<boolean>(
    NoteExpert?.expert?.ExpertsFollowers.filter((el) => el.userId === user?.id)
      .length > 0
  );
  const [isSavedExpert, setIsSavedExpert] = useState<boolean>(
    NoteExpert?.isBookmarked
  );
  const [ExpertFollowers, setExpertFollowers] = useState<number>(
    NoteExpert?.expert._count.ExpertsFollowers
  );

  console.log(
     NoteExpert?.audioSrc,
    "NoteExpert?.audioSrc"
  );

  const handleFollowUnfollowExpert = async () => {
    try {
      await FollowExpert(NoteExpert?.expertId);
      setIsFollowed(!isFollowed);
      notifications.show({
        title: (
          <span className="font-bold">
            {isFollowed
              ? "Unfollowed Expert Successfully!"
              : "Followed Expert Successfully!"}
          </span>
        ),
        message: (
          <span>
            {isFollowed
              ? "You will no longer receive updates from this expert. Your feed has been updated accordingly."
              : "You'll now receive updates from this expert. Stay tuned for valuable insights."}
          </span>
        ),
        icon: isFollowed ? (
          <UnFollowIcon className="w-[20px] text-white" />
        ) : (
          <FollowIcon className="w-[20px] text-white" />
        ),
        autoClose: 3000,
        styles: {
          icon: {
            width: "2.75rem",
            height: "2.75rem",
            background: isFollowed ? "#FF2147" : "#1DCB24",
          },
        },
      });
      isFollowed
        ? setExpertFollowers(ExpertFollowers - 1)
        : setExpertFollowers(ExpertFollowers + 1);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSavingExpert = async () => {
    try {
      await Bookmark_Note_Expert(noteSlug);
      setIsSavedExpert(!isSavedExpert);
      notifications.show({
        title: (
          <span className="font-bold">
            {!isSavedExpert
              ? "Saved Expert Note Successfully!"
              : "unSaved Expert Note Successfully!"}
          </span>
        ),
        message: (
          <span>
            {!isSavedExpert
              ? "You will no longer receive updates from this expert. Your feed has been updated accordingly."
              : "You'll now receive updates from this expert. Stay tuned for valuable insights."}
          </span>
        ),
        icon: isSavedExpert ? (
          <IconCheck className="w-[20px] text-white" />
        ) : (
          <IconCheck className="w-[20px] text-white" />
        ),
        autoClose: 3000,
        styles: {
          icon: {
            width: "2.75rem",
            height: "2.75rem",
            background: isSavedExpert ? "#FF2147" : "#1DCB24",
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setIsFollowed(
      NoteExpert?.expert.ExpertsFollowers.filter((el) => el.userId === user?.id)
        .length > 0
    );
  }, [user]);
  return (

    // <div className="expert text-[#1E293B] flex items-center justify-between  mt-4 w-full py-6 px-6 border rounded-[4px]">
    <div className="expert  text-[#1E293B] flex items-end justify-between  mt-4 w-full py-6 px-6 border rounded-[4px] toHide">
      <div className="flex flex-col gap-5 ">
        <h2 className="text-[21px] font-[600]">Avis d’Expert</h2>
        <div className="flex items-center gap-5">
          <Avatar
            size={"120px"}
            src={
              NoteExpert?.expert.imagePath != null
                ? FullPath(NoteExpert?.expert.imagePath)
                : null
            }
            sx={{
              [".mantine-Avatar-placeholder"]: {
                color: "#0049e0",
                background: "#0049e010",
              },
            }}
            radius={"50%"}
            styles={{
              image: {
                objectPosition: "center",
              },
            }}
          >
            {NoteExpert?.expert.firstName.slice(0, 1) +
              NoteExpert?.expert.lastName.slice(0, 1)}
          </Avatar>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Group>
                <HoverCard
                  width={320}
                  shadow="md"
                  withArrow
                  openDelay={200}
                  closeDelay={400}
                >
                  <HoverCard.Target>
                    <Link
                      href={"/experts/" + NoteExpert?.expert.slug}
                      className="text-[19px] flex items-center gap-2 hover:underline font-[600]"
                    >
                      <span>
                        {NoteExpert?.expert.firstName +
                          " " +
                          NoteExpert?.expert.lastName}
                      </span>
                      <VerifiedIcon className="w-[22px] mb-[1px] text-primary-normal" />
                    </Link>
                  </HoverCard.Target>
                  <HoverCard.Dropdown>
                    <Group>
                      <Avatar
                        radius="xl"
                        src={
                          NoteExpert?.expert.imagePath != null
                            ? FullPath(NoteExpert?.expert.imagePath)
                            : null
                        }
                        sx={{
                          [".mantine-Avatar-placeholder"]: {
                            color: "#0049e0",
                            background: "#0049e010",
                          },
                        }}
                      >
                        {NoteExpert?.expert.firstName.slice(0, 1) +
                          NoteExpert?.expert.lastName.slice(0, 1)}
                      </Avatar>
                      <Stack spacing={5}>
                        <Text
                          className="flex items-center gap-1"
                          size="sm"
                          weight={700}
                          sx={{ lineHeight: 1 }}
                        >
                          <span>
                            {NoteExpert?.expert.firstName +
                              " " +
                              NoteExpert?.expert.lastName}
                          </span>
                          <VerifiedIcon className="w-[14px] mb-[2.5px] text-primary-normal" />
                        </Text>
                        <Text
                          // href={"/expert/" + NoteExpert?.expertId}
                          color="dimmed"
                          size="xs"
                          sx={{ lineHeight: 1 }}
                        >
                          {NoteExpert?.expert.note}
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
                        __html: NoteExpert?.expert.resume,
                      }}
                    />

                    <Group mt="md" spacing="md">
                      <Text size="sm">
                        <b>{NoteExpert?.expert._count.NoteExpert}</b> Notes
                      </Text>
                      <Text size="sm">
                        <b>{NoteExpert?.expert._count.ModuleExpert}</b> Modules
                      </Text>
                      <Text size="sm">
                        <b>{ExpertFollowers}</b> Followers
                      </Text>
                    </Group>
                  </HoverCard.Dropdown>
                </HoverCard>
              </Group>

              <p>{NoteExpert?.expert.note} </p>
            </div>
            <div className="actions flex items-center gap-2">
              <Button
                onClick={handleFollowUnfollowExpert}
                className={
                  isFollowed
                    ? ` bg-primary-normal/20 text-primary-normal hover:border-primary-normal hover:bg-primary-normal/20   !h-[40px] text-base`
                    : ` hover:bg-primary-normal/20  hover:text-primary-normal !h-[40px] text-base`
                }
              >
                {isFollowed ? "Following" : "Follow"}
                {/* {isFollowed && <CheckIcon strokeWidth={"1px"} className="w-[13px] ml-2 "/>} */}
              </Button>
              <Button
                onClick={handleSavingExpert}
                className={
                  isSavedExpert
                    ? ` bg-primary-normal/20 px-[4px] text-primary-normal hover:border-primary-normal hover:bg-primary-normal/20   !h-[40px] text-base`
                    : ` hover:bg-primary-normal/20  hover:text-primary-normal px-[4px] !h-[40px] text-base`
                }
              >
                <FavoriteIcon className="w-[27px]" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="audio-player h-[180px] w-[300px] rounded-[5px] overflow-hidden">
        {/* <div className="audio-player  rounded-[5px] overflow-hidden"> */}

        <AudioPlayer
          placeholder={FullPath(NoteExpert?.expert.imagePath)}
          src={FullPath("/note/audio/" + NoteExpert?.audioSrc)}
          withControl
        />
        <audio
          controls
          src={FullPath("/note/audio/" + NoteExpert?.audioSrc)}
        ></audio>
      </div>
    </div>
  );
}
