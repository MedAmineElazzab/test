import { HashTag } from "@/api";
import {
    Badge,
    SectionCardLayout
} from "@/components";
import { useRouter } from "next/router";
interface ModuleTagsAreaProps {
  tags: HashTag[];
}

export function ModuleTagsArea({ tags }: ModuleTagsAreaProps) {
    const { push } = useRouter();
    return (
      <SectionCardLayout title="mots clés">
        <div className="flex items-center flex-wrap gap-2">
          {tags?.map((el) => {
            return (
              <Badge
                key={el.id + el?.name}
                onClick={() => {
                  push("/v2/notes?keyWords=" + el?.name);
                }}
                size="lg"
                variant="outline"
                color="secondary"
                withHover
                clickable
              >
                #{el?.name}
              </Badge>
            );
          })}
        </div>
      </SectionCardLayout>
  );
}
