import { Category } from "@/_v1/api/category";
import { NotePatched, noteLevel, noteType } from "@/_v1/api/note";
import { Disease } from "@/_v1/api/pathology";
import { Speciality } from "@/_v1/api/speciality";
import Badge from "@/_v1/components/badges/Badge";
import Tags from "@/_v1/components/sources/tags";
import { Tooltip } from "@mantine/core";
import { useRouter } from "next/router";
interface DetailsProps {
  speciality: Speciality;
  category: Category;
  disease: Disease;
  noteType: noteType;
  noteLevel: noteLevel;
}
export default function Details({
  speciality,
  category,
  disease,
  noteLevel,
  noteType,
}: DetailsProps) {
  const { push, query } = useRouter();

  return (
    <div className="flex flex-wrap py-[30px] gap-2 gap-y-3 rounded-md  px-[25px] bg-white border">
      {/* <Tooltip label={"Speciality"} withArrow position="top">
        <Badge
          onClick={() => {
            push({
              pathname: "/notes",
              query: {
                speciality: speciality.id,
                page: 1,
              },
            });
          }}
          style={{
            background: speciality?.color + "15",
            color: speciality?.color,
            borderColor: speciality?.color + "10",
          }}
        >
          {speciality?.name}
        </Badge>
      </Tooltip>
      <Tooltip label={"Category"} withArrow position="top">
        <Badge
          onClick={() => {
            push({
              pathname: "/notes",
              query: {
                category: category?.id,
                page: 1,
              },
            });
          }}
          style={{
            background: category?.color + "15",
            color: category?.color,
            borderColor: category?.color + "10",
          }}
        >
          {category?.name}
        </Badge>
      </Tooltip>

      <Tooltip label={"Pathology"} withArrow position="top">
        <Badge
          onClick={() => {
            push({
              pathname: "/notes",
              query: {
                disease: disease?.id,
                page: 1,
              },
            });
          }}
          style={{
            background: disease?.color + "15",
            color: disease?.color,
            borderColor: disease?.color + "10",
          }}
        >
          {disease?.name}
        </Badge>
      </Tooltip>
      <Tooltip label={"Level"} withArrow position="top">
        <Badge
          style={{
            background: noteLevel?.color + "15",
            color: noteLevel?.color,
            borderColor: noteLevel?.color + "10",
          }}
        >
          {noteLevel?.name}
        </Badge>
      </Tooltip>
      <Tooltip label={"Type"} withArrow position="top">
        <Badge
          style={{
            background: noteType?.color + "15",
            color: noteType?.color,
            borderColor: noteType?.color + "10",
          }}
        >
          {noteType?.name?.replace("Source:", "")}
        </Badge>
      </Tooltip> */}
      {/* <Tags
        // tags={[
        //   { type: "level", ...note?.noteLevel },
        //   { type: "speciality", ...note?.speciality },
        //   // { type: "category", ...note?.category },
        //   // { type: "medicine", ...note?.medicine },
        //   // { type: "dci", ...note?.dci },
        //   // { type: "type", ...note?.noteType },
        //   // { type: "pathology", ...note?.pathology },
        // ]}
        disease={disease}
      /> */}
    </div>
  );
}
