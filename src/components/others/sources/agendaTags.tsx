import { Agenda } from "@/api";
import { TAGS } from "@/common/constants";
import { Badge, SectionCardLayout } from "@/components";
import { ModulesPathnames } from "@/enum";
import { useRouter } from "next/router";

interface AgendaTagsProps extends Pick<Agenda, "eventType"> {
  eventDisease: Agenda["EventDisease"];
  eventSpeciality: Agenda["EventSpeciality"];
}
export function AgendaTags({
  eventDisease = [],
  eventSpeciality = [],
  eventType,
}: AgendaTagsProps) {
  const { push } = useRouter();
  const handleSpecialityClick = (id: number) => {
    push({
      pathname: ModulesPathnames.EVENT,
      query: {
        speciality: id,
      },
    });
  };
  const handleDiseaseClick = (id: number) => {
    push({
      pathname: ModulesPathnames.EVENT,
      query: {
        disease: id,
      },
    });
  };
  return (
    <SectionCardLayout title={TAGS}>
      <div className="flex flex-wrap  items-center gap-2">
        {eventType != null && (
          <Badge
            size="lg"
            color="primary"
            variant="filled"
            withTooltip
            clickable
          >
            {eventType.name}
          </Badge>
        )}

        {eventSpeciality != null &&
          eventSpeciality.map((evSpec, key) => {
            if (evSpec.speciality != null) {
              return (
                <Badge
                  key={evSpec.specialityId + evSpec.speciality.name + key}
                  color="secondary"
                  clickable
                  variant="filled"
                  withHover
                  size="lg"
                  withTooltip
                  onClick={handleSpecialityClick.bind(
                    null,
                    evSpec.specialityId
                  )}
                >
                  {evSpec.speciality.name}
                </Badge>
              );
            }
          })}

        {eventDisease != null &&
          eventDisease.map((evDis, key) => {
            if (evDis.disease != null) {
              return (
                <Badge
                  key={evDis.diseaseId + evDis.disease.name + key}
                  color="secondary"
                  clickable
                  variant="outline"
                  withHover
                  size="lg"
                  withTooltip
                  onClick={handleDiseaseClick.bind(null, evDis.diseaseId)}
                >
                  {evDis.disease.name}
                </Badge>
              );
            }
          })}
      </div>
    </SectionCardLayout>
  );
}
