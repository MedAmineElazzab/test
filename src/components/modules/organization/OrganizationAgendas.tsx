import { SIBLINGS } from "@/common/constants";
import { Divider, EventCard, ModuleCard, Pagination } from "@/components";
import { useGetInstitutionEvents } from "@/services";
import { useRouter } from "next/router";
const PER_PAGE = 8;

interface OrganizationAgendasProps {
  id: number;
}

export function OrganizationAgendas(props: OrganizationAgendasProps) {
  const { query } = useRouter();
  const { page } = query;
  const { data } = useGetInstitutionEvents({
    page: page != null ? Number(page) : 1,
    perPage: PER_PAGE,
    organizationId: props.id,
  });

  return (
    <div>
      {data && (
        <>
          <div className="data-cards-container grid grid-cols-4 mt-4 min-h-600 gap-3 mb-8">
            {data.items &&
              data.items.map((EventElement, index) => (
                <EventCard
                  {...EventElement}
                  eventOrganizations={EventElement.EventOrganization}
                  eventDisease={EventElement.EventDisease}
                  eventSpeciality={EventElement.EventSpeciality}
                  key={EventElement.slug + index}
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
