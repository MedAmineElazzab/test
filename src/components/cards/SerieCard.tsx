import { Serie } from "@/api";
import { Badge, Divider, Link, Progress, SaveButton, ViewState } from "@/components";
import { ModulesPathnames, ModulesTitles } from "@/enum";
import { FullPath, TimeFormatHM } from "@/lib";
import { handleSerieBokmarking } from "@/services";
import { useRouter } from "next/router";

export interface SerieCardProps
  extends Pick<
    Serie,
    | "imagePath"
    | "isBookmarked"
    | "duration"
    | "slug"
    | "title"
    | "status"
    | "_count"
    | "progress"
  > {
  seriePartner: Serie["SeriePartner"];
  diseaseOnSerie: Serie["DiseaseOnSerie"];
  specialityOnSerie: Serie["SpecialityOnSerie"];
  categoryOnSerie: Serie["CategoryOnSerie"];
}
export function SerieCard(props: SerieCardProps) {
  const { push, query } = useRouter();

  const CategoryToDisplay = query?.category
    ? props.categoryOnSerie.find(
        (cat) =>
          query?.category != null && cat.categoryId === Number(query.category)
      )?.category || props.categoryOnSerie?.[0]?.category
    : props.categoryOnSerie?.[0]?.category;

  const SpecialityToDisplay = query?.speciality
    ? props.specialityOnSerie.find(
        (spc) =>
          query?.speciality != null &&
          spc.specialityId === Number(query.speciality)
      )?.speciality || props.specialityOnSerie?.[0]?.speciality
    : props.specialityOnSerie?.[0]?.speciality;

  const DiseaseToDisplay = query?.disease
    ? props.diseaseOnSerie.find(
        (disease) =>
          query?.disease != null && disease.diseaseId === Number(query.disease)
      )?.disease || props.diseaseOnSerie?.[0]?.disease
    : props.diseaseOnSerie?.[0]?.disease;

  const AdditionalKey =
    props.diseaseOnSerie.length +
    props.specialityOnSerie.length +
    props.categoryOnSerie.length -
    3;

  const handleBookmarking = (isSaved: boolean) => {
    handleSerieBokmarking(props.slug, isSaved);
  };
  const handleCategoryClick = () => {
    push({
      query: {
        ...query,
        category: CategoryToDisplay.id,
        page: 1,
      },
    });
  };
  const handleSpeacialityClick = () => {
    push({
      query: {
        ...query,
        speciality: SpecialityToDisplay.id,
        page: 1,
      },
    });
  };
  const handleDiseaseClick = () => {
    push({
      query: { ...query, disease: DiseaseToDisplay.id, page: 1 },
    });
  };

  return (
    <div className="serie-card h-fit flex flex-col bg-white p-1 rounded-lg hover:shadow-module-card">
      <div
        className="relative image-section p-2 mb-1 h-44 bg-cover bg-center flex flex-col justify-between rounded-md"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #0049E0 100%), url('${FullPath(
            props.imagePath
          )}')`,
        }}
      >
        <div className="top-section flex items-center justify-between">
          <Badge variant="filled" color="secondary" size="lg">
            {props._count.SerieModule} {ModulesTitles.MODULES}
          </Badge>
          <SaveButton
            isBookmarked={props.isBookmarked}
            onClick={handleBookmarking}
          />
        </div>
        <div className="bottom-section flex justify-end">
          <div className="duration text-xs text-white">
            {TimeFormatHM(props.duration)}
          </div>
        </div>
      </div>
      <div className="relative content p-4 flex flex-col gap-6">
        <div className="relative flex justify-between items-start ">
          <Link
            href={`${ModulesPathnames.SERIE}/${props.slug}`}
            className={
              "line-clamp-2 text-base hover:underline font-semibold min-h-12"
            }
          >
            {props.title}
          </Link>
          <div className="w-11 flex items-end justify-end">
            <ViewState status={props.status} />
          </div>
        </div>
        <div className="partners flex flex-col gap-4 min-h-12">
          {props.progress != null && (
            <div className="flex flex-col gap-1">
              <h3 className="text-gray-500 font-semibold text-xs">
                Votre progression :
              </h3>
              <div className="progression flex justify-between items-center gap-3">
                <Progress
                  color="primary"
                  value={props.progress}
                  className="h-2 w-full"
                />
                <span className="text-xs text-gray-700">{props.progress}%</span>
              </div>
            </div>
          )}
        </div>
        <div>
          <Divider
            className="w-full opacity-30 h-0.5"
            orientation="horizontal"
          />
          <div className="tags-keywords mt-4 relative flex flex-wrap gap-2">
            <div className=" grid grid-cols-2 gap-2 w-full">
              <Badge
                key={CategoryToDisplay.id}
                withTooltip
                withHover
                clickable
                color="primary"
                variant="filled"
                size="lg"
                onClick={handleCategoryClick}
              >
                {CategoryToDisplay.name}
              </Badge>
              <Badge
                key={SpecialityToDisplay.id}
                withTooltip
                withMaxWidth
                clickable
                withHover
                color="secondary"
                variant="filled"
                size="lg"
                onClick={handleSpeacialityClick}
              >
                {SpecialityToDisplay.name}
              </Badge>
            </div>
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
            {AdditionalKey !== 0 && (
              <Badge withHover color="secondary" variant="filled" size="lg">
                +
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
