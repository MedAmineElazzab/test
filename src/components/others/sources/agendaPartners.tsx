import { Agenda } from "@/api";
import { PARTNERS } from "@/common/constants";
import { PartnersAreaChild, SectionCardLayout } from "@/components";
interface AgendaPartnersProps {
  eventOrganization: Agenda["EventOrganization"];
}
export function AgendaPartners({
  eventOrganization = [],
}: AgendaPartnersProps) {
  return (
    <SectionCardLayout title={PARTNERS}>
      {eventOrganization.map((eventOrg, key) => {
        if (eventOrg.organization) {
          return (
            <PartnersAreaChild
              key={eventOrg.organization.name + key}
              {...eventOrg.organization}
            />
          );
        }
      })}
    </SectionCardLayout>
  );
}
