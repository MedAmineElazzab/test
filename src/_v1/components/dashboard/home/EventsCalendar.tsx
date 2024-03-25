import { Menu, rem } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { IconDotsVertical, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import EventElement from "./components/events-calendar/Event";

export default function EventsCalendar() {
  const [value, setValue] = useState<Date | null>(null);

  return (
    <div className="relative bg-[#fff] w-full h-full flex flex-col border rounded-md border-[#E2E8F0]">
      <div className="calendar-container px-[30px] w-full flex flex-col">
        <DatePicker
          sx={{
            [".mantine-9nozta"]: {
              borderRadius: "50%",
            },
            [".mantine-9nozta[data-selected]"]: {
              background: "#0049e0",
              fontWeight: 600,
            },
            [".mantine-9nozta[data-selected]:hover"]: {
              background: "#004be0d3",
            },

            [".mantine-DatePicker-monthLevel , .mantine-YearLevel-yearLevel , .mantine-DecadeLevel-decadeLevel"]:
              {
                width: "100%",
              },
            [".mantine-MonthsList-monthsListCell"]: {
              textAlign: "center",
            },
            [".mantine-CalendarHeader-calendarHeader"]: {
              maxWidth: "100%",
              marginBottom: "30px",
            },
            ["table"]: {
              width: "100%",
            },
            [".mantine-UnstyledButton-root"]: {
              fontSize: "18px",
            },
            [".mantine-MonthsList-monthsListRow .mantine-UnstyledButton-root , .mantine-YearsList-yearsListCell  .mantine-UnstyledButton-root"]:
              {
                width: "100%",
              },
            [".mantine-Day-day"]: {
              fontSize: "15px !important",
            },
          }}
          className="mt-[25px]"
          allowDeselect
          value={value}
          onChange={setValue}
        />
        <div className="line relative w-full h-[1px]  bg-[#efefef] mt-[10px]"></div>
      </div>
      <div className="events relative h-[auto] ">
        <div className="header flex px-[30px] mt-[20px] justify-between items-center">
          <h1 className="text-[18px]  font-[600] text-[#000]">
            Upcoming Events
          </h1>
          <Menu width={120} shadow="md">
            <Menu.Target>
              <IconDotsVertical
                className="text-[#696F8C] hover:bg-slate-100 rounded-full h-[25px] p-1 w-[25px] cursor-pointer"
                strokeWidth={1.2}
              />
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                color="red"
                icon={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
              >
                Clear All
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </div>
        <div
          className={
            "events-data  px-[30px] flex flex-col gap-3  pt-[20px] overflow-y-auto overflow-x-hidden h-[176px] pb-[40px]"
          }
        >
          <div className="flex items-center justify-between">
            <div className="time pl-3 text-[#A098AE] text-[13px]">08.00 AM</div>
            <div className="details flex flex-col gap-2 w-[70%] border-l-4 rounded-[4px] pl-[13px] border-orange-300 ">
              <span className="category bg-orange-100 text-orange-600 w-fit py-[3px] px-2  rounded text-[12px]">
                Event Medical
              </span>
              <h2 className="text-[15px] line-clamp-2 font-[500]">
                Carl Cox in project medical in project medical in project
                medical{" "}
              </h2>
            </div>
          </div>
          <EventElement />
          <EventElement />
          <EventElement />
        </div>
      </div>
    </div>
  );
}
