// Import des types manquants

import { Disease, Speciality, noteLevel } from "@/api";
import { Badge, SectionCardLayout } from "@/components";
import { useRouter } from "next/router";

interface DetailsProps {
  specialities: Speciality[];
  noteLevel?: noteLevel;
  diseases: Disease[];
  path : string;
}

export function Details({ specialities, diseases, noteLevel  , path}: DetailsProps) {
  const { push, query } = useRouter();

  return (
    <SectionCardLayout title="Tags">
      <div className="flex flex-wrap  items-center gap-2  ">
        {noteLevel && (
          <Badge
            size="lg"
            withTooltip
            clickable
            onClick={() => {
              push({
                pathname: path,
                query: {
                  level: noteLevel?.id,
                  page: 1,
                },
              });
            }}
            sx={{
              color: noteLevel.color,
              background: noteLevel.bgColor + "60",
            }}
          >
            {noteLevel?.name}
          </Badge>
        )}

        {specialities?.map((el) => {
          return (
            <Badge
              key={el.id}
              size="lg"
              withTooltip
              clickable
              onClick={() => {
                push({
                  pathname: path,
                  query: {
                    speciality: el?.id,
                    page: 1,
                  },
                });
              }}
              sx={{
                color: el?.color,
                background: el?.bgColor + "60",
              }}
            >
              {el?.name}
            </Badge>
          );
        })}

        {diseases?.map((el) => {
          return (
            <Badge
              key={el.id}
              size="lg"
              variant="outline"
              color="secondary"
              withTooltip
              clickable
              onClick={() => {
                push({
                  pathname: path,
                  query: {
                    disease: el?.id,
                    page: 1,
                  },
                });
              }}
            >
              {el?.name}
            </Badge>
          );
        })}
      </div>
    </SectionCardLayout>
  );
}
