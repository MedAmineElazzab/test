/* eslint-disable @next/next/no-img-element */

import { truncate } from "@/_v1/functions";
import {
  CancelSearchIcon,
  LampIcon,
  LogoutIcon,
  NotificationPlusIcon,
  SettingsIcon,
} from "@/_v1/icons";
import BellIcon from "@/_v1/icons/sources/BellIcon";
import CheckedIcon from "@/_v1/icons/sources/CheckedIcon";
import ChevDown from "@/_v1/icons/sources/ChevDown";
import LoopSearch from "@/_v1/icons/sources/LoopSearch";
import SearchBoxIcon from "@/_v1/icons/sources/SearchBoxIcon";
import { User } from "@/api/user";
import { TitleAbbreviation } from "@/enum";
import { Menu, Transition } from "@headlessui/react";
import { deleteCookie } from "cookies-next";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import ThumbnailCard from "../../boxes/ThumbnailCard";

export const AvatarWithMenu = () => {
  const { user } = useSelector((state: { user: { user: User } }) => state.user);
  return (
    <div className="flex">
      <Menu as="div" className="relative flex flex-col items-end">
        {({ open }) => (
          <>
            <div className="min-w-[115px] h-[40px]">
              <Menu.Button className="">
                <div
                  className={`
                  flex gap-[12px] items-center 
                  ${"text-[#000000]"}
                `}
                >
                  <div className="relative w-[40px] h-[40px]  rounded-full">
                    {user?.imagePath ? (
                      <img
                        className="w-[100%] h-[100%] rounded-full object-cover "
                        src={user?.imagePath}
                        alt="photo profile"
                      />
                    ) : (
                      <div className=" w-[40px] h-[40px]  rounded-full bg-primary-light flex items-center justify-center text-primary-normal text-[16px] font-[600] uppercase   ">
                        {user?.firstName[0]}
                        {user?.lastName[0]}
                      </div>
                    )}
                    {/* <div
                      style={{ border: "2px solid white" }}
                      className="w-[14px] h-[14px] bg-[#12B76A] rounded-full absolute bottom-[-1px] right-[-1px] outline-3 outline-solid outline-blue-500"
                    ></div> */}
                  </div>
                  <div className="flex flex-col justify-start items-start mr-[4px] max-w-[130px] ">
                    <h5 className="text-[14px] text-[#101828] leading-[20px] font-inter truncate   font-[600] capitalize w-full ">
                      {TitleAbbreviation[user?.titleName]} {user?.lastName}{" "}
                      {user?.firstName}
                    </h5>
                    <span className="text-[14px] font-[400] text-[#667085] leading-[20px] truncate">
                      {user?.profession?.name}
                    </span>
                  </div>
                  <ChevDown />
                </div>
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
              <Menu.Items
                className={`
                  absolute mt-[52px] 
                  origin-top-right divide-y rounded-[2px]  shadow-lg
                  ring-1 ring-black ring-opacity-5 focus:outline-none
                  ${"divide-gray-100 bg-white text-black"}
                `}
              >
                <div className="flex flex-col w-[175px] max-h-[400px] overflow-y-auto overflow-x-hidden py-[12px]">
                  {/* <div className="flex flex-row items-center gap-[10px] px-[16px] justify-center">
                    <div className="relative w-[40px] h-[40px] overflow-hidden rounded-full">
                      <ThumbnailCard
                        height="100%"
                        path="https://res.cloudinary.com/dxjh2x7jn/image/upload/v1699967678/images/noImage_4_yozuxs.jpg"
                        withOverflow={false}
                      />
                    </div>
                    <div className="flex flex-col text-center">
                      <h5 className="text-[14px] font-bold">Ahmen Ali</h5>
                      <p className="text-[13px] text-[#757B8C]">Doctor</p>
                    </div>
                  </div> */}
                  <div
                    className={`
                     
                      `}
                    //  pt-[15px] px-[16px] border-t-[1px]  ${dark ? "border-[#69738650]" : "border-[#E4E8EE]"}
                  >
                    <Link href="#">
                      <span
                        className={`
                          flex gap-[10px] justify-center items-center hover:bg-[#0049E0]/10 my-[-16px] p-[17.5px] 
                          text-[#0049E0]
                        `}
                      >
                        <SettingsIcon
                          width={20}
                          height={20}
                          color={"#0049E0"}
                        />
                        <span className="text-[14px]">{"Paramètres"}</span>
                      </span>
                    </Link>
                  </div>
                  <div
                    className={`
                      pt-[15px] mt-[15px] px-[16px] border-t-[1px] 
                      ${"border-[#E4E8EE]"}
                    `}
                  >
                    <button
                      onClick={() => {
                        deleteCookie("token");
                        deleteCookie("refreshToken");
                        signOut();
                      }}
                      className="text-[13px] px-[4px] py-[6px] w-[100%] rounded-[4px] gap-[12px] bg-[#0049E0]  border-[1px] border-[#0049E0] flex items-center justify-center"
                    >
                      <LogoutIcon width={20} height={20} color="#ffffff" />
                      <span className="text-[13px] !text-[#ffffff]">
                        Se déconnecter
                      </span>
                    </button>
                  </div>
                </div>
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </div>
  );
};

export const NotificationWithMenu = ({ dark }: { dark: boolean }) => {
  return (
    <div className="flex justify-center items-center">
      <Menu as="div" className="relative flex flex-col items-end">
        {({ open }) => (
          <>
            <div className="flex w-[24px] h-[25px] items-center justify-center">
              <Menu.Button className="">
                <div className="relative flex gap-[10px] items-center">
                  <span className="absolute top-[-4px] right-[0] w-[11px] h-[11px] rounded-full text-white bg-[#EC5252] text-[8px] font-bold flex items-center justify-center">
                    <b style={{ lineHeight: 0 }}>6</b>
                  </span>
                  <BellIcon
                    width={24}
                    height={24}
                    color={dark ? "#757B8C" : "#0049E0"}
                  />
                </div>
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
              <Menu.Items
                className={`
                  absolute mt-[45px] 
                  origin-top-right divide-y rounded-[2px]  shadow-lg
                  ring-1 ring-black ring-opacity-5 focus:outline-none
                  ${
                    dark
                      ? "divide-gray-100 bg-[#2E2F34] text-[#E5E5E5]"
                      : "divide-gray-100 bg-white text-black"
                  }
                `}
              >
                <div className="flex flex-col w-[330px] max-h-[400px] overflow-y-auto">
                  <div className="flex justify-between items-center text-[14px] px-[16px] py-[4px] pt-[15px] pb-[10px]">
                    <div>
                      <h5>Notifications</h5>
                    </div>
                    <div className="flex gap-[4px] items-center">
                      <span>Mark all as read</span>
                      <CheckedIcon width={14} height={14} />
                    </div>
                  </div>
                  <div>
                    <div
                      className={`
                        flex gap-[20px] px-[16px] py-[14px] 
                        border-b-[1px] border-[#E4E8EE]
                        ${dark && "!border-[#697386]"}
                        last:border-b-[0px]
                        relative
                        hover:bg-[#0049E010]
                      `}
                    >
                      <span className="w-[8px] h-[8px] bg-[#0049E0] absolute top-[7px] left-[7px] rounded"></span>
                      <div className="relative w-[32px] h-[32px] overflow-hidden rounded-full">
                        <ThumbnailCard
                          height="100%"
                          path="https://res.cloudinary.com/dxjh2x7jn/image/upload/v1699967678/images/noImage_4_yozuxs.jpg"
                          withOverflow={false}
                        />
                      </div>
                      <div className="flex flex-col w-[calc(100%-45px)]">
                        <h4>
                          <b>Lex Murphy</b> requested access to
                          <b>UNIX directory tree hierarchy</b>
                        </h4>
                        {/* <div className="flex gap-[10px] mt-[10px]">
                          <button
                            onClick={() => {}}
                            className="text-[13px] px-[8px] py-[4px] rounded-[4px] bg-[#0049E0] text-[#ffffff] border-[1px] border-[#0049E0]"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => {}}
                            className={`
                              text-[13px] px-[8px] py-[4px] rounded-[4px] bg-transparent text-[#3C4257] border-[1px] border-[#DDDEE1]
                              ${
                                dark &&
                                "bg-[#43464C] border-[0] !text-[#FFFFFFA6]"
                              }
                            `}
                          >
                            Approve
                          </button>
                        </div> */}
                        <span className="text-[#A5ACB8] text-[14px] mt-[10px]">
                          Today at 9:42 AM
                        </span>
                      </div>
                    </div>
                    <div
                      className={`
                        flex gap-[20px] px-[16px] py-[14px] 
                        border-b-[1px] border-[#E4E8EE]
                        ${dark && "!border-[#697386]"}
                        last:border-b-[0px]
                        hover:bg-[#0049E010]
                      `}
                    >
                      <div className="relative w-[32px] h-[32px] overflow-hidden rounded-full">
                        <ThumbnailCard
                          height="100%"
                          path="https://res.cloudinary.com/dxjh2x7jn/image/upload/v1699967678/images/noImage_4_yozuxs.jpg"
                          withOverflow={false}
                        />
                      </div>
                      <div className="flex flex-col w-[calc(100%-45px)]">
                        <h4>
                          <b>Ray Arnold</b> left 6 comments on{" "}
                          <b>Isla Nublar SOC2 compliance report</b>
                        </h4>

                        <span className="text-[#A5ACB8] text-[14px] mt-[10px]">
                          Today at 9:42 AM
                        </span>
                      </div>
                    </div>
                    <div
                      className={`
                        flex gap-[20px] px-[16px] py-[14px] 
                        border-b-[1px] border-[#E4E8EE]
                        ${dark && "!border-[#697386]"}
                        last:border-b-[0px]
                        hover:bg-[#0049E010]
                      `}
                    >
                      <div className="relative w-[32px] h-[32px] overflow-hidden rounded-full">
                        <ThumbnailCard
                          height="100%"
                          path="https://res.cloudinary.com/dxjh2x7jn/image/upload/v1699967678/images/noImage_4_yozuxs.jpg"
                          withOverflow={false}
                        />
                      </div>
                      <div className="flex flex-col w-[calc(100%-45px)]">
                        <h4>
                          <b>Denise Nedry</b> replied to <b>Anna Srzand</b>
                        </h4>
                        <div className="flex mt-[10px] gap-[8px]">
                          <span
                            className={`
                              w-[4px] flex-[1] rounded-full
                              ${dark ? "bg-[#697386]" : "bg-[#DDDEE1]"}
                            `}
                          ></span>
                          <p className="text-[13.5px] w-[calc(100%-12px)] my-[4px]">
                            {truncate(
                              `“Oh, I finished de-bugging the phones, but the  system's compiling for eighteen minutes, or twenty. So, some minor systems may go on and off for a while.”`,
                              92
                            )}
                          </p>
                        </div>
                        <span className="text-[#A5ACB8] text-[14px] mt-[10px]">
                          Today at 9:42 AM
                        </span>
                      </div>
                    </div>
                    <div
                      className={`
                        flex gap-[20px] px-[16px] py-[14px] 
                        border-b-[1px] border-[#E4E8EE]
                        ${dark && "!border-[#697386]"}
                        last:border-b-[0px]
                        hover:bg-[#0049E010]
                      `}
                    >
                      <div className="relative w-[32px] h-[32px] overflow-hidden rounded-full">
                        <ThumbnailCard
                          height="100%"
                          path="https://res.cloudinary.com/dxjh2x7jn/image/upload/v1699967678/images/noImage_4_yozuxs.jpg"
                          withOverflow={false}
                        />
                      </div>
                      <div className="flex flex-col w-[calc(100%-45px)]">
                        <h4>
                          <b>Denise Nedry</b> commented on{" "}
                          <b>Isla Nublar SOC2 compliance</b>
                          report
                        </h4>
                        <div className="flex mt-[10px] gap-[8px]">
                          <span
                            className={`
                              w-[4px] flex-[1] rounded-full
                              ${dark ? "bg-[#697386]" : "bg-[#DDDEE1]"}
                            `}
                          ></span>
                          <p className="text-[13.5px] w-[calc(100%-12px)] my-[4px]">
                            {truncate(
                              `“Oh, I finished de-bugging the phones, but the system's compiling for eighteen minutes, or twenty.  So, some minor systems may go on and off for a while.”`,
                              92
                            )}
                          </p>
                        </div>
                        <div className="flex gap-[10px] mt-[10px]">
                          <button
                            onClick={() => {}}
                            className={`
                              text-[13px] px-[12px] py-[8px] rounded-[4px] bg-transparent text-[#3C4257] border-[1px] border-[#DDDEE1] flex items-center gap-[8px]
                              ${
                                dark &&
                                "!bg-[#43464C] !border-[0] !text-[#FFFFFFA6]"
                              }
                            `}
                          >
                            <NotificationPlusIcon
                              width={10}
                              height={10}
                              color={dark ? "#FFFFFFA6" : "#3C4257"}
                            />
                            <span>Add to favorites</span>
                          </button>
                        </div>
                        <span className="text-[#A5ACB8] text-[14px] mt-[10px]">
                          Today at 9:42 AM
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </div>
  );
};

export const SearchWithMenu = ({ dark }: { dark: boolean }) => {
  // note: the id field is mandatory

  const handleOnSearch = (string: string, results: any) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string, results);
  };

  const handleOnHover = (result: any) => {
    // the item hovered
    console.log(result);
  };

  const handleOnSelect = (item: any) => {
    // the item selected
    console.log(item);
  };

  const handleOnFocus = () => {
    console.log("Focused");
  };

  const formatResult = (item: any) => {
    return (
      <>
        <span style={{ display: "block", textAlign: "left" }}>
          name: {item.name}
        </span>
      </>
    );
  };

  return (
    <div className="auto-complete">
      <div className="w-[100%] relative flex items-center">
        <ReactSearchAutocomplete
          items={[]}
          onSearch={handleOnSearch}
          onHover={handleOnHover}
          onSelect={handleOnSelect}
          onFocus={handleOnFocus}
          autoFocus
          formatResult={formatResult}
          showIcon={false}
          placeholder="Recherche globale"
          className="custom-search"
          styling={{
            height: "34px",
            border: dark ? "1px solid #94A3B880" : "1px solid #757B8C33",
            borderRadius: "8px",
            backgroundColor: dark ? "#282C38" : "#F3F7FA",
            boxShadow: "none",
            // hoverBackgroundColor: "lightgreen",
            color: dark ? "#94A2BC" : "#757B8C",
            fontSize: "13px",
            iconColor: dark ? "#757B8C" : "#94A2BC",
            // lineColor: "lightgreen",
            placeholderColor: dark ? "#757B8C" : "#94A2BC",
            clearIconMargin: "3px 8px 0 0",
            zIndex: 2,
          }}
        />
        <div className="absolute left-[12px] z-[10]">
          <SearchBoxIcon />
        </div>
      </div>
    </div>
  );
};

export const SearchWithRedirect = () => {
  const { push, pathname } = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchTerm !== "") {
      push(`/search?q=${encodeURIComponent(searchTerm)}`);
      setSearchTerm("");
    }
  };

  const hideSearch = (path: any) =>
    String(path)
      ?.split("/")
      ?.filter((e: string) => e !== "")
      ?.includes("search");

  return (
    <form
      onSubmit={handleSearch}
      className={`
        relative h-[44px] max-w-[500px] w-[100%] flex items-center
        ${hideSearch(pathname) ? "hidden" : ""}
      `}
    >
      <div className="absolute left-[12px] z-[10]">
        <SearchBoxIcon />
      </div>
      <input
        type="text"
        name="search"
        value={searchTerm}
        aria-autocomplete="both"
        aria-haspopup="false"
        autoCapitalize="off"
        autoCorrect="off"
        autoFocus={false}
        autoComplete="off"
        onChange={(e) => setSearchTerm(e.target.value)}
        className={`
          w-[100%] h-[100%] text-[16px] pl-[40px] pr-[44px] rounded-[4px]
          transition ease-in-out delay-50 font-[500] placeholder:font-[400] placeholder:text-[15px]
          ${" text-black bg-[transparent] border-[1px] border-[#757B8C33] placeholder:text-[#757B8C] focus:outline-none"}
        `}
        placeholder="Recherche globale"
      />
      <button
        type="submit"
        className="hidden  absolute right-[6px] w-[32px] h-[32px] bg-[#0056D2] rounded-[4px]  justify-center items-center"
      >
        <LoopSearch width={20} height={20} color="white" />
      </button>
    </form>
  );
};

export const SearchBar = ({ defaultQuery = "" }: { defaultQuery?: string }) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>(defaultQuery);

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchTerm !== "")
      router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
  };

  const isType = () => searchTerm !== "";

  return (
    <form
      onSubmit={handleSearch}
      className="w-[100%] h-[100%] relative flex items-center"
    >
      <input
        type="text"
        name="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-[100%] h-[100%] text-[15px] pl-[20px] pr-[42px] rounded-[8px] !outline-none"
        placeholder="Recherche globale"
        autoComplete="off"
      />
      {isType() && (
        <button
          onClick={() => setSearchTerm("")}
          type="button"
          className="absolute right-[50px] cursor-pointer"
        >
          <CancelSearchIcon width={16} height={16} />
        </button>
      )}
      <button
        type="submit"
        className="absolute right-[0px] w-[40px] h-[40px] bg-[#0056D2] rounded-full flex justify-center items-center top-[0] cursor-pointer"
      >
        <LampIcon color="white" width={20} height={20} />
      </button>
    </form>
  );
};
