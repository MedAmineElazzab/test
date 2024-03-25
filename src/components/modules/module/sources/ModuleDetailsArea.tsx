import { Disease, HashTag, Speciality } from "@/api";
import { Badge, SectionCardLayout } from "@/components";
import { useRouter } from "next/router";
interface ModuleDetailsAreaProps {
  specialities: {
    speciality: Speciality;
    moduleId: number;
    specialityId: number;
  }[];
  diseases: {
    moduleId: number;
    diseaseId: number;
    disease: Disease;
  }[];
}

export function ModuleDetailsArea({
  diseases,
  specialities,
}: ModuleDetailsAreaProps) {
  const { push } = useRouter();
  return (
    <SectionCardLayout title="TAGS">
      <div className="flex items-center flex-wrap gap-2">
        {specialities?.map((el) => {
          return (
            <Badge
              key={el.specialityId}
              size="lg"
              withTooltip
              clickable
              withHover
              className="max-w-[calc(50%-8px)]"
              onClick={() => {
                push({
                  pathname: "v2/modules",
                  query: {
                    speciality: el?.speciality.id,
                    page: 1,
                  },
                });
              }}
              sx={{
                color: el?.speciality.color,
                background: el?.speciality.bgColor + "60",
                ["&:hover"]: {
                  background: el?.speciality.bgColor  ,
                }
              }}
            >
              {el?.speciality?.name}
            </Badge>
          );
        })}

        {diseases?.map((el) => {
          return (
            <Badge
              key={el.diseaseId}
              size="lg"
              variant="outline"
              color="secondary"
              withTooltip
              clickable
              // className="max-w-[calc(50%-8px)]"
              onClick={() => {
                push({
                  pathname: "v2/modules",
                  query: {
                    disease: el?.disease.id,
                    page: 1,
                  },
                });
              }}
            >
              {el?.disease?.name}
            </Badge>
          );
        })}
      </div>
    </SectionCardLayout>
  );
}
