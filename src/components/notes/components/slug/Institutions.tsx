import { Organization } from "@/api";
import { PartnersAreaChild, SectionCardLayout } from "@/components";

interface props {
  data: {
    noteId?: number;
    organizationId: number;
    organization: Organization;
  }[];
  title ?: string; 
}
export function Institutions({ data , title }: props) {
  return (
    <SectionCardLayout title={title || "institutions"}>
      <div className="flex flex-col">
        {data.map((el, index) => {
          return <PartnersAreaChild key={index} {...el.organization} />;
        })}
      </div>
    </SectionCardLayout>
  );
}
