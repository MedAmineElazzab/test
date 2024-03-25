import {
  Tabs as MantineTabs,
  TabsProps as MantineTabsProps,
} from "@mantine/core";
import { ReactNode } from "react";
import { Text } from "..";
type datatype =  {
  name: string;
  icon: ReactNode;
  component: ReactNode;
} | null
interface TabsProps extends Omit<MantineTabsProps, "children"> {
  data: datatype[];
  children?: ReactNode;
}

export function Tabs(props: TabsProps) {
  const filteredData = props.data.filter((el) => el !== null);
  return (
    <MantineTabs
      sx={{
        [".mantine-Tabs-tab[aria-selected=true]"]: {
          backgroundColor: "#E6EDFC",
          color: "#0049e0",
          borderColor: "#0049e0",
        },
        [".mantine-Tabs-tab[aria-selected=false]"]: {
          backgroundColor: "transparent",
          color: "#98A2B3",
        },
        [".mantine-Tabs-tabsList"]: {
          borderColor: "#F3F4F8 !important",
        },
      }}
      {...props}
    >
      <MantineTabs.List>
        {filteredData?.map((el, index) => (
          <MantineTabs.Tab key={index} value={el?.name as string} icon={el?.icon}>
            <Text className="text-sm font-semibold text-current">
              {el?.name}
            </Text>
          </MantineTabs.Tab>
        ))}
      </MantineTabs.List>

      {filteredData?.map((el, index) => (
        <MantineTabs.Panel
          className="min-h-[500px] mt-4  rounded-sm w-full"
          key={index}
          value={el?.name as string}
        >
          {el?.component}
        </MantineTabs.Panel>
      ))}
    </MantineTabs>
  );
}
