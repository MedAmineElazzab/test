import { PARTNERS } from "@/common/constants";
import {
  Avatar,
  Badge,
  Divider,
  Link,
  SaveButton,
  ViewState
} from "@/components";
import { LEVELS, ModulesPathnames } from "@/enum";
import { FullPath, TimeFormatHM } from "@/lib";
import { handleModuleBokmarking } from "@/services";
import { Module } from "@/services/types";
import { useRouter } from "next/router";
export interface ModuleCardProps
  extends Pick<
    Module,
    | "imagePath"
    | "isBookmarked"
    | "duration"
    | "slug"
    | "title"
    | "status"
    | "moduleExpert"
    | "level"
  > {
  modulePartner: Module["ModulePartner"];
  diseaseOnModule: Module["DiseaseOnModule"];
  specialityOnModule: Module["SpecialityOnModule"];
  categoryOnModule: Module["CategoryOnModule"];
}
export function ModuleCard(props: ModuleCardProps) {
  const { query, push } = useRouter();
  const ModulePartner = props.modulePartner;
  const ModuleExpert = props.moduleExpert?.expert;
  const AdditionalKey =
    props.diseaseOnModule.length -
    1 +
    props.specialityOnModule.length -
    1 +
    props.categoryOnModule.length -
    1;

  const SpecialityToDisplay = query?.speciality
    ? props.specialityOnModule.find(
        (spc) =>
          query?.speciality != null &&
          spc.specialityId === Number(query.speciality)
      )?.speciality || props.specialityOnModule?.[0].speciality
    : props.specialityOnModule?.[0]?.speciality;

  const DiseaseToDisplay = query?.disease
    ? props.diseaseOnModule.find(
        (disease) =>
          query?.disease != null && disease.diseaseId === Number(query.disease)
      )?.disease || props.diseaseOnModule?.[0]?.disease
    : props.diseaseOnModule?.[0]?.disease;

  const CatgeoryToDisplay = query?.category
    ? props.categoryOnModule.find(
        (cat) =>
          query?.category != null && cat.categoryId === Number(query.category)
      )?.category || props.categoryOnModule?.[0]?.category
    : props.categoryOnModule?.[0]?.category;

  const handleCategoryClick = () => {
    push({
      pathname: ModulesPathnames.MODULE,
      query: {
        ...query,
        category: CatgeoryToDisplay.id,
        page: 1,
      },
    });
  };
  const handleSpecialityClick = () => {
    push({
      pathname: ModulesPathnames.MODULE,

      query: {
        ...query,
        speciality: SpecialityToDisplay.id,
        page: 1,
      },
    });
  };
  const handleDiseaseClick = () => {
    push({
      pathname: ModulesPathnames.MODULE,
      query: {
        ...query,
        disease: DiseaseToDisplay.id,
        page: 1,
      },
    });
  };
  const handleBokmarking = (isSaved: boolean) => {
    handleModuleBokmarking(props.slug, isSaved);
  };

  return (
    <div>
      <div className="relative module-card w-full p-1 bg-white rounded-lg hover:shadow-module-card">
        <div
          className="relative image-section p-2 mb-1 h-44 bg-cover bg-center flex flex-col justify-between rounded-md"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #0049E0 100%), url('${FullPath(
              props.imagePath
            )}')`,
          }}
        >
          <div className="top-section flex items-center justify-between">
            <Badge variant="dot" color="secondary" size="lg">
              {props.level && LEVELS[props.level]}
            </Badge>
            <SaveButton
              isBookmarked={props.isBookmarked}
              onClick={handleBokmarking}
            />
          </div>
          <div className="bottom-section flex items-end justify-between">
            {ModuleExpert && (
              <div className="expert-area flex items-center gap-2 w-f-67">
                <Avatar
                  color="primary"
                  radius={"xl"}
                  size="md"
                  src={ModuleExpert.imagePath}
                  verified
                >
                  {ModuleExpert.firstName != null &&
                  ModuleExpert.firstName.length > 0 &&
                  ModuleExpert.lastName != null &&
                  ModuleExpert.lastName.length > 0
                    ? ModuleExpert.firstName[0] + ModuleExpert.lastName[0]
                    : ""}
                </Avatar>
                <div>
                  <Link
                    href={`${ModulesPathnames.EXPERT}/${ModuleExpert.slug}`}
                    className="line-clamp-1 text-white hover:underline text-sm min-w-36 font-semibold"
                  >
                    {ModuleExpert.firstName + " " + ModuleExpert.lastName}
                  </Link>
                  <p className="text-gray-300 text-sm line-clamp-1 max-w-48">
                    {ModuleExpert.note}
                  </p>
                </div>
              </div>
            )}

            <div className="duration text-xs text-white">
              {props.duration != null && TimeFormatHM(props.duration)}
            </div>
          </div>
        </div>
        <div className="relative content p-4 flex flex-col gap-6">
          <div className="relative flex justify-between items-start">
            <Link
              href={`${ModulesPathnames.MODULE}/${props.slug}`}
              className="line-clamp-2 text-base hover:underline font-semibold min-h-12"
            >
              {props.title}
            </Link>
            <div className="w-11 flex items-end justify-end">
              <ViewState status={props.status} />
            </div>
          </div>

          <div className="partners flex flex-col gap-4">
            <h3 className="text-gray-500 font-semibold text-xs">
              {PARTNERS} :
            </h3>
            <div className="flex items-center gap-2 max-w-full min-h-10">
              {ModulePartner &&
                ModulePartner.slice(0, 2).map((partner, index, array) => {
                  if (partner.organization) {
                    const abbreviation =
                      partner.organization.abbreviation != null &&
                      partner.organization.abbreviation.length > 0
                        ? partner.organization.abbreviation.slice(0, 2)
                        : "";
                    return (
                      <>
                        <div key={partner.organization.slug + index}>
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
                        </div>
                        {(index !== array.length - 1 ||
                          (index !== array.length - 2 &&
                            ModulePartner.length > 2)) && (
                          <div className="flex items-center justify-center">
                            <Divider
                              className="w-0.5 opacity-30 h-5"
                              orientation="vertical"
                            />
                          </div>
                        )}
                      </>
                    );
                  }
                })}

              {ModulePartner.length > 2 && (
                <Badge color="secondary" withHover variant="filled" size="lg">
                  +
                </Badge>
              )}
            </div>
          </div>
          <div>
            <Divider
              orientation="horizontal"
              className="w-full opacity-30 h-0.5"
            />
            <div className="tags-keywords mt-4 relative flex flex-wrap gap-2">
              <div className="grid grid-cols-2 gap-2 w-full">
                {CatgeoryToDisplay && (
                  <Badge
                    key={CatgeoryToDisplay.id}
                    withTooltip
                    withHover
                    clickable
                    color="primary"
                    variant="filled"
                    size="lg"
                    onClick={handleCategoryClick}
                  >
                    {CatgeoryToDisplay.name}
                  </Badge>
                )}

                {SpecialityToDisplay && (
                  <Badge
                    key={SpecialityToDisplay.id}
                    withTooltip
                    withMaxWidth
                    clickable
                    withHover
                    color="secondary"
                    variant="filled"
                    size="lg"
                    onClick={handleSpecialityClick}
                  >
                    {SpecialityToDisplay.name}
                  </Badge>
                )}
              </div>
              {DiseaseToDisplay && (
                <Badge
                  key={DiseaseToDisplay.id}
                  withTooltip
                  withMaxWidth
                  withHover
                  clickable
                  color="secondary"
                  variant="outline"
                  size="lg"
                  onClick={handleDiseaseClick}
                >
                  {DiseaseToDisplay.name}
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
      </div>
    </div>
  );
}
