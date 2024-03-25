import { NoteHashTag } from "@/_v1/api/note";
import Badge from "@/_v1/components/badges/Badge";
import { useRouter } from "next/router";

interface KeywordsProps {
  NoteHashTag: NoteHashTag[];
}
export default function Keywords({ NoteHashTag }: KeywordsProps) {
  const { push } = useRouter();
  return (
    <div className="flex flex-wrap py-[30px] gap-2 rounded-md gap-y-3  px-[25px] bg-white border">
      {NoteHashTag?.map((el, index) => {
        return (
          <Badge
            onClick={() => {
              push("/notes?keyWords=" + el?.hashTag?.name);
            }}
            key={index}
            style={{ background: "#0049e015" }}
            className=" border-primary-normal text-primary-normal"
          >
            #{el?.hashTag?.name}
          </Badge>
        );
      })}
    </div>
  );
}
