import { Agenda } from "@/api";
import {
  DESCRIPTION,
  EVENT_SNIPPETS,
  ORGANISERS,
  ORG_WORD,
  SPEAKERS,
} from "@/common/constants";
import {
  AgendaDescription,
  AgendaExperts,
  AgendaOrganiserWord,
  AgendaOrganizations,
  AgendaSnippets,
  DescriptionIcon,
  ResourcesIcon,
  Tabs,
  TranscriptIcon,
} from "@/components";
import { useRouter } from "next/router";
interface TabsAgendaProps
  extends Pick<Agenda, "description" | "id" | "organizerWord" | "isStarted"> {}
export function TabsAgenda({
  description,
  id,
  organizerWord,
  isStarted,
}: TabsAgendaProps) {
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
      className="w-full rounded-md"
      defaultValue={DESCRIPTION}
      classNames={{
        tabLabel: "py-1",
      }}
      onTabChange={handleSwitchTabs}
      data={[
        {
          component: <AgendaDescription description={description} />,
          icon: <DescriptionIcon />,
          name: DESCRIPTION,
        },
        {
          component: <AgendaOrganiserWord organizerWord={organizerWord} />,
          icon: <TranscriptIcon />,
          name: ORG_WORD,
        },
        {
          component: <AgendaExperts id={id} />,
          icon: <ResourcesIcon />,
          name: SPEAKERS,
        },
        {
          component: <AgendaOrganizations id={id} />,
          icon: <ResourcesIcon />,
          name: ORGANISERS,
        },
        ...[
          isStarted
            ? {
                component: <AgendaSnippets id={id} />,
                icon: <ResourcesIcon />,
                name: EVENT_SNIPPETS,
              }
            : null,
        ],
      ]}
    />
  );
}
