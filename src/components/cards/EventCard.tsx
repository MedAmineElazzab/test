import { Agenda, EventDisease } from "@/api";
import {
  Avatar,
  Badge,
  Divider,
  Link,
  SaveButton,
  Tooltip,
} from "@/components";
import { ModulesPathnames } from "@/enum";
import { handleEventBokmarking } from "@/services";
import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import { useRouter } from "next/router";

export interface EventCardProps
  extends Pick<
  Agenda,
    "isBookmarked" | "title" | "slug" | "city" | "timeSlot" | "category"
  > {
  eventOrganizations: Agenda["EventOrganization"];
  eventSpeciality: Agenda["EventSpeciality"];
  eventDisease: Agenda["EventDisease"];
}

export const EventCard = ({
  city,
  eventDisease = [],
  eventOrganizations = [],
  eventSpeciality = [],
  isBookmarked,
  slug,
  timeSlot,
  title,
}: EventCardProps) => {
  const { query, push } = useRouter();
  const DateTime = timeSlot ? timeSlot.dateTimeFrom : new Date();
  const parsedDate = parseISO(String(DateTime));
  const formattedDate = format(parsedDate, "dd MMM, yyyy", { locale: fr });
  var Disease2ToDisplay: EventDisease | null = null;

  const SpecialityToDisplay = query?.speciality
    ? eventSpeciality.find(
        (spc) =>
          query?.speciality != null &&
          spc.specialityId === Number(query.speciality)
      ) || eventSpeciality?.[0]
    : eventSpeciality?.[0];

  const DiseaseToDisplay = query?.disease
    ? eventDisease.find(
        (dis) =>
          query?.disease != null && dis.diseaseId === Number(query.disease)
      ) || eventDisease?.[0]
    : eventDisease?.[0];

  if (eventDisease.length > 1) {
    if (query?.disease != null) {
      Disease2ToDisplay = eventDisease.filter((dis) =>
        query?.disease != null ? dis.diseaseId != Number(query.disease) : null
      )?.[0];
    } else {
      Disease2ToDisplay = eventDisease[1];
    }
  }

  const Keys =
    eventDisease.length + eventSpeciality.length - (Disease2ToDisplay ? 3 : 2);

  const handleSpecialityClick = () => {
    push({
      pathname: ModulesPathnames.EVENT,
      query: {
        ...query,
        speciality: SpecialityToDisplay.specialityId,
        page: 1,
      },
    });
  };

  const handleDiseaseClick = (diseaseToDisplay: EventDisease | null) => {
    if (diseaseToDisplay) {
      push({
        pathname: ModulesPathnames.EVENT,
        query: {
          ...query,
          disease: diseaseToDisplay.diseaseId,
          page: 1,
        },
      });
    }
  };

  const handleBookmarkClick = (isSaved: boolean) => {
    handleEventBokmarking(slug, isSaved);
  };
  return (
    <div className="Note flex flex-col p-4 gap-6 h-fit bg-white rounded-md transition-all hover:shadow-card">
      <div className="flex flex-col justify-between h-full gap-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-10 text-sm text-gray-500 ">
              <span className="capitalize  font-normal">{formattedDate}</span>
              {city && (
                <div className="flex items-center gap-1">
                  {city.country && (
                    <>
                      <img
                        className="w-5 h-5 rounded-full"
                        src={city.country.flag}
                        alt={city.country.native_name}
                      />
                      <Tooltip
                        label={`${city.name}, ${city.country.alpha2_code}`}
                      >
                        <span className="max-w-20 truncate">
                          {city.name}, {city.country.alpha2_code}
                        </span>
                      </Tooltip>
                    </>
                  )}
                </div>
              )}
            </div>
            <SaveButton
              isBookmarked={isBookmarked}
              onClick={handleBookmarkClick}
            />
          </div>
          <Link href={`${ModulesPathnames.EVENT}/${slug}`}>
            <h2 className="capitalize-first cursor-pointer text-black leading-5 h-10 max-w-[95%] line-clamp-2 font-semibold">
              {title}
            </h2>
          </Link>
        </div>
        <div className="flex flex-col gap-2 min-h-10">
          {eventOrganizations && (
            <>
              <span className="text-gray-500 text-xs font-semibold leading-4">
                {"Organisateur(s)"} :
              </span>
              <div className="flex items-center gap-2 max-w-full min-h-10">
                {eventOrganizations &&
                  eventOrganizations.length != 0 &&
                  eventOrganizations
                    .slice(0, 2)
                    .map((partner, index, array) => {
                      const abbreviation = partner.organization
                        ? partner.organization.abbreviation != null &&
                          partner.organization.abbreviation.length > 0
                          ? partner.organization.abbreviation.slice(0, 2)
                          : ""
                        : "";
                      return (
                        <div
                          className="flex items-center gap-2 max-w-full min-h-10"
                          key={
                            partner.organization.slug +
                            index +
                            partner.organization.id
                          }
                        >
                          <div>
                            {partner.organization && (
                              <div className="flex items-center gap-2 max-w-full">
                                <Avatar
                                  color="primary"
                                  radius="xl"
                                  verified={partner.organization.isMarked}
                                  src={partner.organization.imagePath}
                                >
                                  {abbreviation}
                                </Avatar>
                                <Link
                                  className="truncate hover:underline text-sm font-semibold w-fit max-w-14"
                                  href={`${ModulesPathnames.INSTITUTION}/${partner.organization.slug}`}
                                >
                                  {partner.organization.abbreviation}
                                </Link>
                              </div>
                            )}
                          </div>
                          {(index !== array.length - 1 ||
                            (index !== array.length - 2 &&
                              eventOrganizations.length > 2)) && (
                            <div className="flex items-center justify-center">
                              <Divider
                                className="w-0.5 opacity-30 h-5"
                                orientation="vertical"
                              />
                            </div>
                          )}
                        </div>
                      );
                    })}

                {eventOrganizations.length > 2 && (
                  <Badge color="secondary" withHover variant="filled" size="lg">
                    +
                  </Badge>
                )}
              </div>
            </>
          )}
        </div>
        <div>
          <Divider
            orientation="horizontal"
            className="w-full opacity-30 h-0.5"
          />
          <div className="tags-keywords mt-4 relative flex flex-wrap gap-x-2 gap-y-1 min-h-16">
            <div className="grid grid-cols-2 gap-2 w-full">
              {SpecialityToDisplay && SpecialityToDisplay.speciality && (
                <Badge
                  key={SpecialityToDisplay.specialityId}
                  withTooltip
                  clickable
                  withHover
                  color="secondary"
                  variant="filled"
                  size="lg"
                  onClick={handleSpecialityClick}
                >
                  {SpecialityToDisplay.speciality.name}
                </Badge>
              )}

              {DiseaseToDisplay && DiseaseToDisplay.disease && (
                <Badge
                  key={DiseaseToDisplay.diseaseId}
                  color="secondary"
                  withMaxWidth
                  clickable
                  variant="outline"
                  withHover
                  size="lg"
                  withTooltip
                  onClick={handleDiseaseClick.bind(null, DiseaseToDisplay)}
                >
                  {DiseaseToDisplay.disease.name}
                </Badge>
              )}
            </div>
            {Disease2ToDisplay && Disease2ToDisplay.disease && (
              <div className="flex items-center gap-2">
                <Badge
                  key={Disease2ToDisplay.diseaseId}
                  color="secondary"
                  clickable
                  variant="outline"
                  withMaxWidth
                  withHover
                  size="lg"
                  withTooltip
                  onClick={handleDiseaseClick.bind(null, Disease2ToDisplay)}
                >
                  {Disease2ToDisplay.disease.name}
                </Badge>
                {Keys != 0 && (
                  <Badge withHover color="secondary" variant="filled" size="lg">
                    +
                  </Badge>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
