import { Agenda } from "@/api";
import { Badge } from "@/components";
import { SectionCardLayout } from "@/components/modules/module";
import { ModulesPathnames } from "@/enum";
import { useRouter } from "next/router";

interface AgendaKeywordsProps {
  eventHashTag: Agenda["EventHashTag"];
}
export function AgendaKeywords({ eventHashTag = [] }: AgendaKeywordsProps) {
  const { push } = useRouter();
  const handleHashTagClick = (hashTag: string) => {
    push({
      pathname: ModulesPathnames.EVENT,
      query: {
        keyWords: hashTag,
      },
    });
  };
  return (
    <SectionCardLayout title="mots clés">
      <div className="flex items-center flex-wrap gap-2">
        {eventHashTag != null &&
          eventHashTag.map((evnHash) => {
            if (evnHash.hashTag != null) {
              return (
                <Badge
                  key={evnHash.hashTag.id + evnHash.hashTag.name}
                  onClick={handleHashTagClick.bind(null, evnHash.hashTag.name)}
                  size="lg"
                  variant="outline"
                  color="secondary"
                  withHover
                  clickable
                >
                  #{evnHash.hashTag.name}
                </Badge>
              );
            }
          })}
      </div>
    </SectionCardLayout>
  );
}
