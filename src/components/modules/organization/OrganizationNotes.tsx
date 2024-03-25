import { SIBLINGS } from "@/common/constants";
import { Divider, NoteCard, Pagination } from "@/components";
import { useGetOrganizationNotes } from "@/services";
import { useRouter } from "next/router";
const PER_PAGE = 8;

interface OrganizationNotesProps {
  id: number;
}
export function OrganizationNotes(props: OrganizationNotesProps) {
  const { query } = useRouter();
  const { page } = query;
  const { data } = useGetOrganizationNotes({
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
              data.items.map((noteElement ,index) => (
                <NoteCard
                  specialityOnNote={noteElement.SpecialityOnNote}
                  noteDisease={noteElement.NoteDisease}
                  key={noteElement.slug + index}
                  {...noteElement}
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