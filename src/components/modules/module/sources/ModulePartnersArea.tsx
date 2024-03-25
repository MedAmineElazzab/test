import { Organization } from "@/api";
import {
    PartnersAreaChild,
    SectionCardLayout
} from "@/components";
interface ModulePartnerAreaProps {
  organizations: Organization[];
}

export function ModulePartnerArea({ organizations }: ModulePartnerAreaProps) {
  return (
    <SectionCardLayout title={"Partenaires"}>
      <div className="flex flex-col">
        {organizations.map((el, index) => {
          return <PartnersAreaChild key={index} {...el} />;
        })}
      </div>
    </SectionCardLayout>
  );
}
