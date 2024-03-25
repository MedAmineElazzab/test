import { SIBLINGS } from "@/common/constants";
import { Divider, InstitutionCard, Pagination } from "@/components";
import { useGetEventInstitutions } from "@/services";
import { useRouter } from "next/router";
const PER_PAGE = 8;

interface AgendaOrganizationsProps {
  id: number;
}

export function AgendaOrganizations(props: AgendaOrganizationsProps) {
  const { query } = useRouter();
  const { page } = query;
  const { data } = useGetEventInstitutions({
    page: page != null ? Number(page) : 1,
    perPage: PER_PAGE,
    eventId: props.id,
  });

  return (
    <div>
      {data && (
        <>
          <div className="data-cards-container grid grid-cols-3 mt-4 min-h-600 gap-3 mb-8">
            {data.items &&
              data.items.map((InstitutionElement, index) => (
                <InstitutionCard
                  {...InstitutionElement}
                  key={InstitutionElement.slug + index}
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
