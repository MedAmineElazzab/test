import LottieAnimation from "@/_v1/components/Animation/LottieAnimation";
import { Menu, Tabs, rem } from "@mantine/core";
import { IconDotsVertical, IconTrash } from "@tabler/icons-react";
export const nothingFoundLottie = require("@assets/animations/notfound.json");

export default function Notifications() {
  return (
    <div className="relative bg-white w-full h-full border rounded-md border-[#E2E8F0]">
      <div className="header h-fit pt-8  flex flex-col  px-4">
        <div className="flex items-center justify-between ">
          <div className="flex items-center gap-2">
            <span className="font-[600] text-[17px]">Notifications</span>
            <div className="number bg-primary-normal font-[600] w-[20px] h-[20px] flex justify-center items-center rounded-full text-sm text-white">
              0
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className=" bg-primary-normal/10 py-1 border border-primary-normal/5 hover:shadow transition-all px-3 rounded-[30px] text-xs font-[500] cursor-pointer text-primary-normal">
              Mark all as read
            </span>
            <Menu width={120} shadow="md">
              <Menu.Target>
                <IconDotsVertical
                  className="text-[#696F8C] w-[20px] cursor-pointer"
                  strokeWidth={1.2}
                />
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item
                  color="red"
                  icon={
                    <IconTrash style={{ width: rem(14), height: rem(14) }} />
                  }
                >
                  Clear All
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </div>
        </div>
      </div>
      <Tabs
        sx={{
          [".mantine-Tabs-tabsList"]: {
            // borderBottom: "none",
          },
          [".mantine-1fhx7hs[data-active]"]: {
            borderColor: "#0049e0",
            color: "#0049e0",
          },

          [".mantine-1fhx7hs"]: {
            fontWeight: 600,
            color: "#696F8C",
          },
        }}
        className="mt-3 h-full"
        defaultValue="all"
      >
        <Tabs.List className="px-3 shadow-notif border-b pb-[2px]">
          <Tabs.Tab value="all">All</Tabs.Tab>
          <Tabs.Tab value="Mentions">Mentions</Tabs.Tab>
          <Tabs.Tab value="Archived">Archived</Tabs.Tab>
        </Tabs.List>
        <div className="relative  px-3 overflow-y-auto overflow-x-hidden h-[calc(100%-108px)]">
          <Tabs.Panel
            value="all"
            className="flex flex-col h-full justify-center items-center"
            pb="xs"
          >
            <div className="w-[190px] relative   pointer-events-none">
              <LottieAnimation loop animationData={nothingFoundLottie} />
            </div>
          </Tabs.Panel>
          <Tabs.Panel value="Mentions" pb="xs">
            mentions
          </Tabs.Panel>
          <Tabs.Panel value="Archived" pb="xs">
            mentions
          </Tabs.Panel>
        </div>
      </Tabs>
    </div>
  );
}
