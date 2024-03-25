import { Organization } from "@/api";
import { PartnersAreaChild, SectionCardLayout } from "@/components";

interface props {
  data: {
    noteId?: number;
    organizationId: number;
    organization: Organization;
  }[];
}
export function Organisations({ data }: props) {
  return (
    <SectionCardLayout title={"Partenaires"}>
      <div className="flex flex-col">
        {data.map((el, index) => {
          return <PartnersAreaChild key={index} {...el.organization} />;
        })}
      </div>
    </SectionCardLayout>
  );
}
