import { Bookmark_Module, Module } from "@/_v1/api/module";
import Badge from "@/_v1/components/badges/Badge";
import { scrollToTop } from "@/_v1/functions";
import {
  BookMarkedIcon,
  FavouriteCircledIcon,
  FavouriteCircledIconWhite,
  PathIcon,
} from "@/_v1/icons";
import SaveModuleIcon from "@/_v1/icons/SaveModuleIcon";
import VerifiedIcon from "@/_v1/icons/sources/VerifiedIcon";
import { FullPath, secondsToHHMMSS, secondsToHMS } from "@/_v1/lib/utils";
import { Avatar, Group, HoverCard, Stack, Text, Tooltip } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconPlayerPlayFilled, IconStarFilled } from "@tabler/icons-react";
import Link from "next/link";
import { Router, useRouter } from "next/router";
import { useState } from "react";

export default function ModuleCard({ moduleData }: { moduleData: Module }) {
  const [isMarked, setIsMarked] = useState<boolean>(moduleData?.isBookmarked);
  const { push, query } = useRouter();
  const router = useRouter();

  console.log("moduleData", moduleData.moduleExpert);

  const handleBookMarking = async () => {
    try {
      await Bookmark_Module(moduleData.slug);
      setIsMarked(!isMarked);
      notifications.show({
        id: "load-data",
        // color: "#1DCB24",
        title: (
          <span className="font-bold">
            {isMarked
              ? "This Module has been removed from bookmark successfully!"
              : "This Module is bookmared successfully!"}
          </span>
        ),

        message: (
          <span>
            {isMarked
              ? "Your organization system is now updated, providing a streamlined and personalized experience. "
              : "You can now easily access and revisit this important information whenever you need"}
          </span>
        ),
        icon: isMarked ? (
          <FavouriteCircledIcon className="w-[40px] text-white" />
        ) : (
          <BookMarkedIcon className="w-[40px] text-white" />
        ),
        autoClose: 3000,
        styles: {
          icon: {
            width: "2.75rem",
            height: "2.75rem",
            background: isMarked ? "#0049E0" : "#1DCB24",
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex  flex-col rounded-md border bg-white hover:shadow-note  ">
      <div
        style={{
          backgroundImage: `url(${FullPath(moduleData.imagePath)})`,
        }}
        className="relative image-container rounded-t-md h-[220px]  px-2 py-2 w-full bg-cover bg-center"
      >
        <Link
          href={"/modules/" + moduleData.slug}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 "
          onClick={(e) => scrollToTop(e, "/modules/" + moduleData.slug, router)}
        >
          <div className="w-[50px] h-[50px] rounded-full bg-white/50 flex justify-center items-center ">
            <IconPlayerPlayFilled className="w-[20px] text-white" />
          </div>
        </Link>
        <div className="relative flex items-center justify-between">
          <Tooltip
            onClick={handleBookMarking}
            styles={{
              tooltip: {
                background: "#191c1f",
              },
            }}
            label={"Bookmark Note"}
            withArrow
            position="right"
          >
            <div
              className={"cursor-pointer  flex w-fit border-2 transition-all p-[2px] border-transparent rounded-full".concat(
                " ",
                "hover:border-white/50"
              )}
            >
              {isMarked ? (
                <BookMarkedIcon className="w-[31px]" />
              ) : (
                <SaveModuleIcon className="w-[31px]" />
              )}
            </div>
          </Tooltip>
          <div className="flex flex-col items-end gap-1">
            <Badge
              className="!bg-white !text-black border-none"
              onClick={() => {
                push({
                  query: {
                    ...query,
                    disease: moduleData?.disease.id,
                    page: 1,
                  },
                  pathname: "/modules",
                });
              }}
            >
              <PathIcon className="w-[20px]" />
              <span className="text-sm truncate max-w-[120px]">
                {moduleData?.disease?.name}
              </span>
            </Badge>
          </div>
        </div>
        <Badge className="bg-black/40 absolute bottom-2 right-2 text-white border-transparent">
          {secondsToHHMMSS(moduleData.duration)}
        </Badge>
      </div>

      <div className="relative details w-full rounded-b-md bg-white max-h-[300px]  px-3 py-3 flex flex-col gap-4">
        <div className="module-expert absolute flex gap-2 items-end top-0 -translate-y-1/2">
          <div className="relative w-[70px] h-[70px] p-1 border border-white/30 rounded-full">
            <Avatar
              size={"100%"}
              src={
                moduleData.imagePath != null
                  ? FullPath(moduleData.imagePath)
                  : null
              }
              styles={{
                placeholder: {
                  fontSize: "26px",
                },
              }}
              sx={{
                [".mantine-Avatar-placeholder"]: {
                  color: "#0049e0",
                  background: "#e6edfc",
                },
              }}
              radius={"50%"}
              // color={MANTINE_COLORS[Math.floor(Math.random() * MANTINE_COLORS.length)]}
            >
              {moduleData?.moduleExpert?.expert?.firstName?.slice(0, 1)}
              {moduleData.moduleExpert?.expert?.lastName?.slice(0, 1)}
            </Avatar>
            <div className="bdg absolute top-[70%] p-[2px] rounded-full bg-white right-0 ">
              <VerifiedIcon className="w-[20px]  text-primary-normal" />
            </div>
          </div>

          <div className="mb-1 z-[100] ">
            <Group>
              <HoverCard
                width={320}
                shadow="md"
                withArrow
                openDelay={200}
                closeDelay={400}
              >
                <HoverCard.Target>
                  <div className="flex items-center gap-1 line-clamp-1 max-w-[200px]">
                    <Link
                      href={"/experts/" + moduleData?.moduleExpert.expert?.slug}
                      className="  flex items-center gap-2 hover:underline "
                    >
                      <span>
                        {moduleData?.moduleExpert.expert?.firstName}
                        {""}
                        {moduleData?.moduleExpert.expert?.lastName}
                      </span>
                    </Link>
                  </div>
                </HoverCard.Target>
                <HoverCard.Dropdown>
                  <Group>
                    <Avatar
                      radius="xl"
                      src={
                        moduleData.imagePath != null
                          ? FullPath(moduleData.imagePath)
                          : null
                      }
                      sx={{
                        [".mantine-Avatar-placeholder"]: {
                          color: "#0049e0",
                          background: "#e6edfc",
                        },
                      }}
                      // color={MANTINE_COLORS[Math.floor(Math.random() * MANTINE_COLORS.length)]}
                    >
                      {moduleData.moduleExpert.expert?.firstName.slice(0, 1)} +
                      {moduleData.moduleExpert.expert?.lastName.slice(0, 1)}
                    </Avatar>

                    <Stack spacing={5}>
                      <Text
                        className="flex items-center gap-1"
                        size="sm"
                        weight={700}
                        sx={{ lineHeight: 1 }}
                      >
                        <span>
                          {moduleData.moduleExpert.expert?.firstName +
                            " " +
                            moduleData.moduleExpert.expert?.lastName}
                        </span>
                        <VerifiedIcon className="w-[14px] mb-[2.5px] text-primary-normal" />
                      </Text>
                      <Text color="dimmed" size="xs" sx={{ lineHeight: 1 }}>
                        {moduleData.moduleExpert.expert?.note}
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
                      __html: moduleData.moduleExpert.expert?.resume || "",
                    }}
                  />

                  <Group mt="md" spacing="md">
                    <Text size="sm">
                      <b>
                        {moduleData.moduleExpert.expert?._count?.NoteExpert}
                      </b>{" "}
                      Notes
                    </Text>
                    <Text size="sm">
                      <b>
                        {moduleData.moduleExpert.expert?._count?.ModuleExpert}
                      </b>{" "}
                      Modules
                    </Text>
                    <Text size="sm">
                      <b>
                        {
                          moduleData.moduleExpert.expert?._count
                            ?.ExpertsFollowers
                        }
                      </b>{" "}
                      Followers
                    </Text>
                  </Group>
                </HoverCard.Dropdown>
              </HoverCard>
            </Group>
          </div>
        </div>
        <div className="mt-4"></div>
        <div className="flex items-center gap-3 w-full">
          <div className="w-[40px] h-[40px] flex justify-center items-center bg-primary-light rounded-full ">
            <img
              className="w-[25px] object-cover"
              src={
                moduleData.ModulePartner?.[0].organization.imagePath != null
                  ? FullPath(
                      moduleData.ModulePartner?.[0].organization.imagePath
                    )
                  : "/assets/shape-meducate-logo.svg"
              }
              alt=""
            />
          </div>
          <h2 className="max-w-[calc(100%-50px)] flex items-center gap-1">
            <span className="font-[600]">Partenaire</span> :
            <Link
              href={
                "/institutions/" +
                moduleData.ModulePartner?.[0].organization.slug
              }
              className="line-clamp-1 hover:underline"
            >
              {" "}
              {moduleData.ModulePartner?.[0].organization.name || "OKOK"}
            </Link>
          </h2>
        </div>
        <Link
          className="line-clamp-2 min-h-[48px] leading-6 text-[17px]   hover:underline "
          href={"/modules/" + moduleData.slug}
          onClick={(e) => scrollToTop(e, "/modules/" + moduleData.slug, router)}
        >
          {moduleData.title}
        </Link>

        <div className="flex gap-1 ">
          <Badge
            className="!text-[13px] !max-w-[140px] truncate px-3 "
            onClick={() => {
              push({
                pathname: "/modules",
                query: {
                  ...query,
                  category: moduleData.category.id,
                  page: 1,
                },
              });
            }}
            style={{
              background: moduleData?.category?.color + "15",
              color: moduleData?.category?.color,
              borderColor: moduleData?.category?.color + "10",
            }}
          >
            <span className="truncate">{moduleData?.category?.name}</span>
          </Badge>

          <Badge
            className="!text-[13px]"
            onClick={() => {
              push({
                pathname: "/modules",
                query: {
                  ...query,
                  speciality: moduleData.speciality.id,
                  page: 1,
                },
              });
            }}
            style={{
              background: moduleData?.speciality?.color + "15",
              color: moduleData?.speciality?.color,
              borderColor: moduleData?.speciality?.color + "10",
            }}
          >
            {moduleData?.speciality?.name}
          </Badge>
        </div>
        <div className="rating flex items-center gap-2">
          <div className="flex items-center gap-2">
            <b className="text-[17px]">{moduleData.reviews.toFixed(1)}</b>
            <IconStarFilled className="w-[18px] mb-[3px] text-primary-normal" />
          </div>
          <div className="text-[#636363] mb-[2.5px] ">{`(${moduleData.reviewsCount} reviews)`}</div>
        </div>
      </div>
    </div>
  );
}
