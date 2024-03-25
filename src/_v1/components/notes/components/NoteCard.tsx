import { Bookmark_Note, Note } from "@/_v1/api/note";
import Badge from "@/_v1/components/badges/Badge";
import {
  BookMarkedIcon,
  DateIcon,
  FavouriteCircledIcon,
  PathIcon,
} from "@/_v1/icons";
import { Limit, formatDateToFrench, removeHTMLTags } from "@/_v1/lib/utils";
import { Tooltip } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function NoteCard(NoteDetails: Note) {
  const { push, query } = useRouter();
  const [isMarked, setIsMarked] = useState<boolean>(NoteDetails.isBookmarked);
  const handleBookMarking = async () => {
    try {
      await Bookmark_Note(NoteDetails.slug);
      setIsMarked(!isMarked);
      notifications.show({
        title: (
          <span className="font-bold">
            {isMarked
              ? "This note has been removed from bookmark successfully!"
              : "This note is bookmared successfully!"}
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
    <div className="Note flex flex-col justify-between  gap-2 p-[20px]  rounded-[5px]  border bg-white hover:shadow-note transition-all">
      <div>
        <div className="head-text flex gap-2 justify-between  items-center">
          <div className="date group text-sm truncate gap-1 bg-primary-normal/10 border border-opacity-5  text-primary-normal border-primary-normal px-3 py-[5px]  flex items-center transition-all  rounded-[5px] text-[13px] font-[600]  ">
            <DateIcon className="w-[19px]" />
            <span className="text-sm">
              {formatDateToFrench(NoteDetails.createdAt)}
            </span>
          </div>
          <Tooltip
            onClick={handleBookMarking}
            styles={{
              tooltip: {
                background: "#191c1f",
              },
            }}
            label={isMarked ? "unBookmark Note" : "Bookmark Note"}
            withArrow
            position="top"
          >
            <div
              className={"cursor-pointer flex  border-2 transition-all p-[2px] border-transparent  rounded-full".concat(
                " ",
                isMarked
                  ? "hover:border-[#1DCB2440]"
                  : "hover:border-primary-normal/30"
              )}
            >
              {isMarked ? (
                <BookMarkedIcon className="w-[31px]" />
              ) : (
                <FavouriteCircledIcon className="w-[31px]" />
              )}
            </div>
          </Tooltip>
        </div>
        <div className="">
          <Link
            href={`/notes/${NoteDetails.slug}`}
            className="content text-[17px] font-[500] line-clamp-1 mt-5 leading-7 hover:underline text-[#292d33]"
          >
            {NoteDetails.title}
          </Link>
          <p className="mt-2 text-sm text-[#6a7483] line-clamp-2">
            
            {Limit(removeHTMLTags(NoteDetails.summary))}
          </p>
        </div>
      </div>
      <div className="tags-details mt-5 gap-2 flex flex-wrap">
        <Tooltip label={"Speciality"} withArrow position="top">
          <Badge
            onClick={() => {
              push({
                query: {
                  ...query,
                  speciality: NoteDetails.speciality.id,
                  page: 1,
                },
              });
            }}
            style={{
              background: NoteDetails.speciality.color + "15",
              color: NoteDetails.speciality.color,
              borderColor: NoteDetails.speciality.color + "10",
            }}
          >
            {NoteDetails.speciality.name}
          </Badge>
        </Tooltip>
        <Tooltip label={"Category"} withArrow position="top">
          <Badge
            onClick={() => {
              push({
                query: {
                  ...query,
                  category: NoteDetails.category.id,
                  page: 1,
                },
              });
            }}
            style={{
              background: NoteDetails.category.color + "15",
              color: NoteDetails.category.color,
              borderColor: NoteDetails.category.color + "10",
            }}
          >
            {NoteDetails.category.name}
          </Badge>
        </Tooltip>
        <Tooltip label={"Type"} withArrow position="top">
          <Badge
            style={{
              background: NoteDetails.noteType.color + "15",
              color: NoteDetails.noteType.color,
              borderColor: NoteDetails.noteType.color + "10",
            }}
          >
            {NoteDetails.noteType?.name.replace("Source:", "")}
          </Badge>
        </Tooltip>
        <Tooltip label={"Level"} withArrow position="top">
          <Badge
            style={{
              background: NoteDetails.noteLevel.color + "15",
              color: NoteDetails.noteLevel.color,
              borderColor: NoteDetails.noteLevel.color + "10",
            }}
          >
            {NoteDetails.noteLevel?.name}
          </Badge>
        </Tooltip>

        <Tooltip label={"Pathology"} withArrow position="top">
          <Badge
            onClick={() => {
              push({
                query: {
                  ...query,
                  pathology: NoteDetails.disease.id,
                  page: 1,
                },
              });
            }}
            style={{
              background: NoteDetails.disease.color + "15",
              color: NoteDetails.disease.color,
              borderColor: NoteDetails.disease.color + "10",
            }}
          >
            <PathIcon className="w-[20px]" />
            <span className="text-sm">{NoteDetails.disease.name}</span>
          </Badge>
        </Tooltip>
      </div>
    </div>
  );
}