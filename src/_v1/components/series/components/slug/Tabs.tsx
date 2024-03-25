import { Tabs as MantineTabs } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

interface Tab {
  label: string;
  value: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultValue?: string;
}

const Tabs: React.FC<TabsProps> = ({ tabs, defaultValue }) => {
  const {query} = useRouter();
  return (
    <div className="w-[100%]">
      <MantineTabs
        sx={{
          [".mantine-1fhx7hs[data-active]"]: {
            color: "#0049e0",
            border: "none",
          },
          [".mantine-Tabs-panel"]: {
            paddingBottom: "0 !important",
          },

          [".mantine-1fhx7hs"]: {
            color: "#000",
            fontWeight: 600,
            border: "none",
          },
          [".mantine-1fhx7hs:hover"]: {
            background: "transparent",
            borderBottom: "none",
            color: "#0049e0",
          },
        }}
        className="h-full pb-0 "
        defaultValue={defaultValue || tabs[0]?.value || "all"}
      >
        <MantineTabs.List
          defaultValue={defaultValue || tabs[0]?.value || "Description"}
          className="border-b-[1px] border-primary-normal/10 w-[100%] py-[20px]"
        >
          {tabs.map((tab) => (
            <MantineTabs.Tab
              className="text-[16px]"
              value={tab.value}
              key={tab.value}
            >
              <Link href={"/modules/"+query?.slug?.[0]+"#"+tab.value}>
              {tab.label}
              </Link>
            </MantineTabs.Tab>
          ))}
        </MantineTabs.List>
        <div className="relative">
          {tabs.map((tab) => (
            <MantineTabs.Panel
              className="w-full"
              value={tab.value}
              pb="xs"
              key={tab.value}
              
            >
              {tab.content}
            </MantineTabs.Panel>
          ))}
        </div>
      </MantineTabs>
    </div>
  );
};

export default Tabs;
