import { Organization } from "@/api";
import { DESCRIPTION, OPINION } from "@/common/constants";
import {
  DescriptionIcon,
  ModuleIcon,
  NoteIcon,
  OrganizationAgendas,
  OrganizationDescription,
  OrganizationExperts,
  OrganizationModules,
  OrganizationNotes,
  ResourcesIcon,
  Tabs,
} from "@/components";
import { ModuleTitles, ModulesTitles } from "@/enum";
import { useRouter } from "next/router";
interface OrganizationTabsProps extends Pick<Organization, "about" | "id"> {}
export function OrganizationTabs({ about, id }: OrganizationTabsProps) {
  const { push, query } = useRouter();

  const handleSwitchTabs = () => {
    let existingQuery = query;
    if (existingQuery?.page != null) {
      delete existingQuery.page;
      push({
        query: existingQuery,
      });
    }
  };

  return (
    <Tabs
      className=" w-full rounded-md"
      defaultValue={DESCRIPTION}
      classNames={{
        tabLabel: "py-1",
      }}
      onTabChange={handleSwitchTabs}
      data={[
        {
          component: <OrganizationDescription description={about} />,
          icon: <DescriptionIcon />,
          name: DESCRIPTION,
        },
        {
          component: <OrganizationNotes id={id} />,
          icon: <NoteIcon className="w-5 h-5" />,
          name: OPINION,
        },
        {
          component: <OrganizationModules id={id} />,
          icon: <ModuleIcon className="w-5 h-5" />,
          name: ModulesTitles.MODULES,
        },
        {
          component: <OrganizationAgendas id={id} />,
          icon: <ResourcesIcon />,
          name: ModuleTitles.AGENDA,
        },
        {
          component: <OrganizationExperts id={id} />,
          icon: <ResourcesIcon />,
          name: ModuleTitles.EXPERT,
        },
      ]}
    />
  );
}
