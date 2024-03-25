import { Expert } from "@/api";
import { DESCRIPTION, OPINION } from "@/common/constants";
import {
  DescriptionIcon,
  ExpertAgendas,
  ExpertDescription,
  ExpertInstitutions,
  ExpertModules,
  ExpertNotes,
  ModuleIcon,
  NoteIcon,
  ResourcesIcon,
  Tabs,
} from "@/components";
import { ModuleTitles, ModulesTitles } from "@/enum";
import { useRouter } from "next/router";
interface ExpertTabsProps extends Pick<Expert, "about" | "id"> {}
export function ExpertTabs({ about, id }: ExpertTabsProps) {
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
          component: <ExpertDescription description={about} />,
          icon: <DescriptionIcon />,
          name: DESCRIPTION,
        },
        {
          component: <ExpertNotes id={id} />,
          icon: <NoteIcon className="w-5 h-5" />,
          name: OPINION,
        },
        {
          component: <ExpertModules id={id} />,
          icon: <ModuleIcon className="w-5 h-5" />,
          name: ModulesTitles.MODULES,
        },
        {
          component: <ExpertAgendas id={id} />,
          icon: <ResourcesIcon />,
          name: ModuleTitles.AGENDA,
        },
        {
          component: <ExpertInstitutions id={id} />,
          icon: <ResourcesIcon />,
          name: ModuleTitles.INSTITUTION,
        },
      ]}
    />
  );
}
