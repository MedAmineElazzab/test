import { Disease } from "@/_v1/api/pathology";
import { Profession } from "@/_v1/api/professions";
import { SerieProfession } from "@/_v1/api/serie";
import { Speciality } from "@/_v1/api/speciality";
import Badge from "@/_v1/components/badges/Badge";
import { Tooltip } from "@mantine/core";
import { useRouter } from "next/router";
interface DetailsProps {
  speciality: Speciality;
  disease: Disease;
  profession: SerieProfession[];
}
export default function Details({
  speciality,
  disease,
  profession,
}: DetailsProps) {
  const { push } = useRouter();
  console.log(profession);
  return (
    <div className="flex flex-wrap py-[30px] gap-2 gap-y-3 rounded-md  px-[25px] bg-white border">
      {speciality && (
        <Tooltip label={"Speciality"} withArrow position="top">
          <Badge
            onClick={() => {
              push({
                pathname: "/series",
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
      )}
      {disease && (
        <Tooltip label={"Pathology"} withArrow position="top">
          <Badge
            onClick={() => {
              push({
                pathname: "/series",
                query: {
                  pathology: disease?.id,
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
      )}
      {profession &&
        profession.map((el, index) => {
          return (
            <Tooltip key={index} label={"Profil"} withArrow position="top">
              <Badge
                onClick={() => {
                  push({
                    pathname: "/series",
                    query: {
                      profil: el?.professionId,
                      page: 1,
                    },
                  });
                }}
                style={{
                  background: el?.profession?.color + "15",
                  color: el?.profession?.color,
                  borderColor: el?.profession?.color + "10",
                }}
              >
                {el?.profession?.name}
              </Badge>
            </Tooltip>
          );
        })}
    </div>
  );
}
