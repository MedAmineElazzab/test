import ChevDown from "@/_v1/icons/sources/ChevDown";
import Infos from "@/_v1/icons/sources/Infos";
import MenuHeader from "@/_v1/icons/sources/MenuHeader";
import NotificationHeader from "@/_v1/icons/sources/NotificationsHeader";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import {
  AvatarWithMenu,
  SearchWithRedirect
} from "./partails";

interface Props {
  dark: boolean;
}

export default function Header() {
  const [selected, setSelected] = useState("FR");
  return (
    <div
      className={`w-full border border-b border-[#EAECF0] z-[20] bg-white  flex  px-6 py-3  items-center justify-between`}
    >
      {/* <div
        className={`
          transition ease-in-out delay-50
          ${dark ? "text-white" : "text-black"} 
          text-[23px] font-[500] flex-[1] justify-start
        `}
      >
        Dashboard
      </div> */}
      <div className="max-w-[320px] h-[44px]  w-[100%] flex-[2] justify-center">
        {/* <SearchWithMenu dark={dark} /> */}
        <SearchWithRedirect  />
      </div>
      <div className="flex items-center gap-[29px] flex-[1] justify-end">
        <div>
          <div className="bg-[transparent] mr-[-5px] ">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button
                  className=" 
                  flex text-[14px] text-[#667085] leading-[20px] font-inter  font-[500] capitalize 
                  items-center gap-[8px]  justify-center  text-sm  text-balck  focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
                >
                  {selected}
                  <ChevDown />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-2 w-[100px] origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                  <div className="px-1 py-1 ">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => setSelected("FR")}
                          className={`${
                            active ? "bg-[#0049E0] text-white" : "#667085"
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                          FR
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                  <div className="px-1 py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => setSelected("ENG")}
                          className={`${
                            active ? "bg-[#0049E0] text-white" : "#667085"
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                          ENG
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
        <div
          className={`
            flex  gap-[24px] cursor-pointer
            transition ease-in-out delay-50
          `}
        >
          <Infos current={"#667085"} />
          <div className="relative">
            {/* <NotificationWithMenu/> */}
            <NotificationHeader current={"#667085"} />
            <div className="bg-[#F04438] absolute top-[-1.5px] right-[-1.5px]  w-[4px] h-[4px] rounded-full"></div>
          </div>
          <MenuHeader current={"#667085"} />
        </div>
        <AvatarWithMenu />
      </div>
    </div>
  );
}
