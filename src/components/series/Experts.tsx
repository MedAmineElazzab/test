import { SIBLINGS } from "@/common/constants";
import { Divider, ExpertCard, Pagination } from "@/components";
import { useGetSerieExperts } from "@/services";

interface SerieExpertsProps {
  id: number;
}
export function SerieExperts(props: SerieExpertsProps) {
  const { data } = useGetSerieExperts({
    page: 1,
    perPage: 6,
    serieId: props.id,
  });
  return (
    <div>
      {data && (
        <>
          <div className="data-cards-container grid grid-cols-3 mt-4 min-h-600 gap-3 mb-8">
            {data?.items &&
              data.items.map((expert) => (
                <ExpertCard key={expert.id} {...expert} />
              ))}
          </div>

          {data?.meta && (
            <div className="flex flex-col gap-5 mb-5 px-6">
              <Divider
                className="opacity-30 w-full h-0.5"
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