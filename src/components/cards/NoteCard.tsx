import { Note } from "@/api";
import { ALERT, EXPERT_OPINION } from "@/common/constants";
import { ModulesPathnames } from "@/enum";
import { handleNoteBokmarking } from "@/services";
import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import { useRouter } from "next/router";
import { Avatar, Badge, Link, SaveButton } from "..";
import { LottieAnimations } from "../Animation";
export const AlertAnim = require("@assets/animations/RedAlert.json");

export interface NoteCardProps
  extends Pick<
    Note,
    | "isBookmarked"
    | "slug"
    | "title"
    | "dateOfPublication"
    | "noteLevel"
    | "noteExpert"
  > {
  noteDisease: Note["NoteDisease"];
  specialityOnNote: Note["SpecialityOnNote"];
}

export const NoteCard = (props: NoteCardProps) => {
  const { push, query } = useRouter();
  const AdditionalKey =
    props.noteDisease.length - 1 + props.specialityOnNote.length - 1;

  const SpecialityToDisplay = query?.speciality
    ? props.specialityOnNote.find(
        (spc) =>
          query?.speciality != null &&
          spc.specialityId === Number(query.speciality)
      ) || props.specialityOnNote?.[0]
    : props.specialityOnNote?.[0];

  const DiseaseToDisplay = query?.disease
    ? props.noteDisease.find(
        (disease) =>
          query?.disease != null && disease.diseaseId === Number(query.disease)
      ) || props.noteDisease?.[0]
    : props.noteDisease?.[0];

  const parsedDate = parseISO(props.dateOfPublication);
  const formattedDate = format(parsedDate, "d MMM yyyy HH:mm", { locale: fr });
  const handleLevelClick = () => {
    if (query?.level != null) {
      const existingQuery = { ...query };
      delete existingQuery["level"];
      push({
        pathname: ModulesPathnames.NOTE,
        query: {
          ...existingQuery,
          page: 1,
        },
      });
    } else {
      push({
        pathname: ModulesPathnames.NOTE,
        query: {
          ...query,
          level: props.noteLevel.id,
          page: 1,
        },
      });
    }
  };
  const handleSpecialityClick = () => {
    push({
      pathname: ModulesPathnames.NOTE,

      query: {
        ...query,
        speciality: SpecialityToDisplay.speciality.id,
        page: 1,
      },
    });
  };
  const handleDiseaseClick = () => {
    push({
      pathname: ModulesPathnames.NOTE,

      query: {
        ...query,
        disease: DiseaseToDisplay.disease.id,
        page: 1,
      },
    });
  };
  const handleBokmarking = (isSaved: boolean) => {
    handleNoteBokmarking(props.slug, isSaved);
  };
  const Expert = props.noteExpert?.expert;
  return (
    <div className="Note flex flex-col p-4 gap-6 h-fit bg-white rounded-md transition-all hover:shadow-card">
      <div className="flex flex-col justify-between h-full gap-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-500 capitalize text-sm font-normal">
              {formattedDate}
            </span>
            <div className="flex gap-1 items-center">
              <div className="w-9 h-9 pointer-events-none">
                {props.noteLevel.name == ALERT && (
                  <LottieAnimations loop animationData={AlertAnim} />
                )}
              </div>
              <SaveButton
                isBookmarked={props.isBookmarked}
                onClick={handleBokmarking}
              />
            </div>
          </div>
          <Link href={`${ModulesPathnames.NOTE}/${props.slug}`}>
            <h2 className="capitalize-first cursor-pointer text-black leading-5 h-10 max-w-[95%] line-clamp-2 font-semibold">
              {props.title}
            </h2>
          </Link>
        </div>
        <div className="flex flex-col gap-2 min-h-16">
          {Expert && (
            <>
              <span className="text-gray-500 text-xs font-semibold leading-4">
                {EXPERT_OPINION} :
              </span>
              <div className="flex items-center gap-3">
                <Avatar src={Expert.imagePath} color="primary" radius={"xl"}>
                  {Expert.firstName != null &&
                  Expert.firstName.length > 0 &&
                  Expert.lastName != null &&
                  Expert.lastName.length > 0
                    ? Expert.firstName[0] + Expert.lastName[0]
                    : ""}
                </Avatar>
                <div className="flex flex-col">
                  <Link href={`${ModulesPathnames.EXPERT}/${Expert.slug}`}>
                    <h3 className="text-sm hover:underline cursor-pointer font-semibold text-gray-700 leading-5">
                      {`${Expert.firstName} ${Expert.lastName}`}
                    </h3>
                  </Link>
                  <span className="leading-5 max-w-full line-clamp-1 text-gray-400 font-normal text-xs">
                    {Expert.note}
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="border-t flex flex-col border-t-gray-100 gap-2 pt-4">
        <div className="flex items-center gap-2">
          <Badge
            id={props.slug + props.noteLevel.name}
            sx={{
              backgroundColor: `${props.noteLevel.bgColor}60 !important`,
              color: `${props.noteLevel.color}!important`,
            }}
            withMaxWidth
            clickable
            color="primary"
            variant="filled"
            size="lg"
            withTooltip
            onClick={handleLevelClick}
          >
            {props.noteLevel.name}
          </Badge>
          {SpecialityToDisplay && (
            <Badge
              sx={{
                backgroundColor: `${SpecialityToDisplay.speciality.bgColor}60 !important`,
                color: `${SpecialityToDisplay.speciality.color} !important`,
              }}
              onClick={handleSpecialityClick}
              withMaxWidth
              clickable
              variant="filled"
              size="lg"
              withTooltip
            >
              {SpecialityToDisplay.speciality.name}
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          {DiseaseToDisplay && (
            <Badge
              color="secondary"
              withMaxWidth
              clickable
              variant="outline"
              withHover
              size="lg"
              withTooltip
              onClick={handleDiseaseClick}
            >
              {DiseaseToDisplay.disease.name}
            </Badge>
          )}

          {AdditionalKey != 0 && (
            <Badge withHover color="secondary" variant="filled" size="lg">
              +
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
};
