import { SIBLINGS } from "@/common/constants";
import { Divider, ModuleCard, Pagination } from "@/components";
import { useGetSerieModules } from "@/services";

interface SerieModulesProps {
  id: number;
}
export function SerieModules(props: SerieModulesProps) {
  const { data } = useGetSerieModules({
    page: 1,
    perPage: 6,
    seriesId: props.id,
  });

  return (
    <div>
      {data && (
        <>
          <div className="data-cards-container grid grid-cols-3 mt-4 min-h-600 gap-3 mb-8">
            {data.items &&
              data.items.map((moduleElement) => (
                <ModuleCard
                  categoryOnModule={moduleElement.CategoryOnModule}
                  specialityOnModule={moduleElement.SpecialityOnModule}
                  diseaseOnModule={moduleElement.DiseaseOnModule}
                  modulePartner={moduleElement.ModulePartner}
                  {...moduleElement}
                  key={moduleElement.slug}
                />
              ))}
          </div>
          {data.meta && (
            <div className="flex flex-col gap-5 mb-5 px-6">
              <Divider
                className="w-full opacity-30 h-0.5"
                orientation="horizontal"
              />
              <div>
                <Pagination
                  initialPage={data.meta.currentPage}
                  siblings={SIBLINGS}
                  total={data.meta.totalPages}
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
