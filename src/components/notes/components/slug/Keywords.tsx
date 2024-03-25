import { HashTags } from "@/api";
import { Badge, SectionCardLayout } from "@/components";
import { useRouter } from "next/router";

interface KeywordsProps {
  hashtags : HashTags[];
  path : string;
}
export function Keywords({ hashtags, path }: KeywordsProps) {
  const { push } = useRouter();
  return (
    <SectionCardLayout title="mots clés">
      <div className="flex items-center flex-wrap gap-2">
        {hashtags?.map((el) => {
          return (
            <Badge
              key={el.hashTag.id + el.hashTag.name}
              onClick={() => {
                push(path + `?keyWords=${el?.hashTag?.name}`);
              }}
              size="lg"
              variant="outline"
              color="secondary"
              withHover
              clickable
            >
              #{el?.hashTag?.name}
            </Badge>
          );
        })}
      </div>
    </SectionCardLayout>
  );
}
